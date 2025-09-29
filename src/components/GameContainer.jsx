import React, { useState, useEffect } from 'react';
import ChapterIntro from './ChapterIntro';
import AttackDisplay from './AttackDisplay';
import MasterVoting from './MasterVoting';
import ScoreDisplay from './ScoreDisplay';
import { getGameDurationConfig } from '../data/gameConfig';
import { getAttackById } from '../data/attacks';
import { getChapterById } from '../data/chapters';

export default function GameContainer({ gameConfig, onEndGame, onBackToWelcome }) {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentMaster, setCurrentMaster] = useState(0);
  const [currentAttack, setCurrentAttack] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [gamePhase, setGamePhase] = useState('intro'); // 'intro', 'attack', 'voting', 'scoring'
  const [playerScores, setPlayerScores] = useState({});
  const [playerParades, setPlayerParades] = useState({});
  const [gameHistory, setGameHistory] = useState([]);

  const durationConfig = getGameDurationConfig(gameConfig.gameDuration);
  const totalTurns = durationConfig.turns;

  // Initialiser les scores
  useEffect(() => {
    const initialScores = {};
    gameConfig.playerNames.forEach((name, index) => {
      initialScores[index] = 0;
    });
    setPlayerScores(initialScores);
  }, [gameConfig.playerNames]);

  // Déterminer l'attaque actuelle
  useEffect(() => {
    if (currentTurn <= totalTurns) {
      const attackId = durationConfig.attacks[currentTurn - 1];
      const attack = getAttackById(attackId);
      setCurrentAttack(attack);
      
      if (attack) {
        const chapter = getChapterById(`chapter_${attack.chapter}`);
        setCurrentChapter(chapter);
      }
    }
  }, [currentTurn, durationConfig, totalTurns]);

  const handleStartAttack = () => {
    setGamePhase('attack');
  };

  const handleParadesSubmitted = (parades) => {
    setPlayerParades(parades);
    setGamePhase('voting');
  };

  const handleMasterVote = (scores) => {
    // Mettre à jour les scores
    const newScores = { ...playerScores };
    Object.keys(scores).forEach(playerIndex => {
      newScores[playerIndex] += scores[playerIndex];
    });
    setPlayerScores(newScores);

    // Enregistrer l'historique
    const historyEntry = {
      turn: currentTurn,
      attack: currentAttack,
      master: gameConfig.playerNames[currentMaster],
      parades: playerParades,
      scores: scores
    };
    setGameHistory([...gameHistory, historyEntry]);

    // Passer au tour suivant ou terminer
    if (currentTurn >= totalTurns) {
      setGamePhase('ended');
    } else {
      // Rotation du Maître
      const nextMaster = (currentMaster + 1) % gameConfig.playerNames.length;
      setCurrentMaster(nextMaster);
      setCurrentTurn(currentTurn + 1);
      setGamePhase('intro');
      setPlayerParades({});
    }
  };

  const handleEndGame = () => {
    onEndGame();
  };

  const getCurrentMasterName = () => {
    return gameConfig.playerNames[currentMaster];
  };

  const getPlayersExceptMaster = () => {
    return gameConfig.playerNames.filter((_, index) => index !== currentMaster);
  };

  if (gamePhase === 'ended') {
    return (
      <ScoreDisplay
        playerNames={gameConfig.playerNames}
        playerScores={playerScores}
        gameHistory={gameHistory}
        onNewGame={onBackToWelcome}
        onEndGame={handleEndGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête du jeu */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center text-white">
            <div>
              <h1 className="text-2xl font-bold">🛡️ Gardiens de l'Esprit Familial</h1>
              <p className="text-sm opacity-80">
                Tour {currentTurn}/{totalTurns} • Maître: {getCurrentMasterName()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Chapitre</div>
              <div className="text-lg font-semibold">
                {currentChapter ? `${currentChapter.emoji} ${currentChapter.title}` : '...'}
              </div>
            </div>
          </div>
        </div>

        {/* Contenu selon la phase */}
        {gamePhase === 'intro' && currentChapter && (
          <ChapterIntro
            chapter={currentChapter}
            onStartAttack={handleStartAttack}
          />
        )}

        {gamePhase === 'attack' && currentAttack && (
          <AttackDisplay
            attack={currentAttack}
            masterName={getCurrentMasterName()}
            players={getPlayersExceptMaster()}
            onParadesSubmitted={handleParadesSubmitted}
          />
        )}

        {gamePhase === 'voting' && (
          <MasterVoting
            attack={currentAttack}
            parades={playerParades}
            masterName={getCurrentMasterName()}
            onVote={handleMasterVote}
          />
        )}
      </div>
    </div>
  );
}