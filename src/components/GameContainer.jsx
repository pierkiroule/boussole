import { useState, useEffect } from 'react';
import ChapterIntro from './ChapterIntro';
import AttackDisplay from './AttackDisplay';
import ScoreDisplay from './ScoreDisplay';
import LiveScoreDisplay from './LiveScoreDisplay';
import { getGameDurationConfig } from '../data/gameConfig';
import { getAttackById } from '../data/attacks';
import { getChapterById } from '../data/chapters';
import { GameSaveManager } from '../utils/gameSaveManager';
import { GameStatsManager } from '../utils/gameStatsManager';
import { SoundManager } from '../utils/soundManager';
import { HapticManager } from '../utils/hapticManager';

export default function GameContainer({ gameConfig, onEndGame, onBackToWelcome }) {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentMaster, setCurrentMaster] = useState(0);
  const [currentAttack, setCurrentAttack] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [gamePhase, setGamePhase] = useState('intro'); // 'intro', 'attack'
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

  // Sauvegarde automatique
  useEffect(() => {
    const gameData = {
      gameConfig,
      currentTurn,
      currentMaster,
      currentAttack,
      currentChapter,
      gamePhase,
      playerScores,
      playerParades,
      gameHistory,
      durationConfig
    };
    
    GameSaveManager.saveGame(gameData);
  }, [currentTurn, currentMaster, gamePhase, playerScores, gameHistory, gameConfig, currentAttack, currentChapter, playerParades, durationConfig]);

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
    SoundManager.playTransition();
    HapticManager.vibrateSwipe();
    if (window.showNotification) {
      window.showNotification(`⚔️ ${getCurrentMasterName()} lance l'attaque !`, 'info');
    }
  };

  const handleVotingComplete = (votingData) => {
    const { masterChoice, masterExplanation, playerVotes, scores } = votingData;
    
    // Mettre à jour les scores (seulement les autres joueurs gagnent des points)
    const newScores = { ...playerScores };
    Object.keys(scores).forEach(playerIndex => {
      newScores[playerIndex] = (newScores[playerIndex] || 0) + scores[playerIndex];
    });
    setPlayerScores(newScores);

    // Enregistrer l'historique avec les choix de valeurs
    const historyEntry = {
      turn: currentTurn,
      attack: currentAttack,
      master: {
        name: gameConfig.playerNames[currentMaster],
        index: currentMaster,
        choice: masterChoice,
        explanation: masterExplanation
      },
      playerVotes: playerVotes,
      scores: scores
    };
    setGameHistory([...gameHistory, historyEntry]);

    // Passer au tour suivant ou terminer
    if (currentTurn >= totalTurns) {
      setGamePhase('ended');
      SoundManager.playVictory();
      if (window.showNotification) {
        window.showNotification('🎉 Partie terminée ! Découvrez les résultats et vos valeurs !', 'success');
      }
    } else {
      // Rotation du Maître et passage au tour suivant
      const nextMaster = (currentMaster + 1) % gameConfig.playerNames.length;
      setCurrentMaster(nextMaster);
      setCurrentTurn(currentTurn + 1);
      setGamePhase('intro');
      setPlayerParades({});
      
      SoundManager.playTransition();
      if (window.showNotification) {
        window.showNotification(`🔄 ${gameConfig.playerNames[nextMaster]} devient le nouveau Maître du Jeu !`, 'info');
      }
    }
  };

  const handleEndGame = () => {
    // Mettre à jour les statistiques
    const gameData = {
      gameConfig,
      currentTurn,
      currentMaster,
      currentAttack,
      currentChapter,
      gamePhase,
      playerScores,
      playerParades,
      gameHistory,
      durationConfig
    };
    
    GameStatsManager.updateStats(gameData);
    
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
      {/* Affichage des scores en temps réel */}
      <LiveScoreDisplay 
        playerNames={gameConfig.playerNames}
        playerScores={playerScores}
        currentMaster={currentMaster}
      />
      
      <div className="max-w-4xl mx-auto">
        {/* En-tête du jeu */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center text-white">
            <div>
              <h1 className="text-2xl font-bold">👻 Le Wifou</h1>
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
          <div className="game-phase-intro">
            <ChapterIntro
              chapter={currentChapter}
              onStartAttack={handleStartAttack}
            />
          </div>
        )}

        {gamePhase === 'attack' && currentAttack && (
          <div className="game-phase-attack">
            <AttackDisplay
              attack={currentAttack}
              masterName={getCurrentMasterName()}
              masterIndex={currentMaster}
              players={getPlayersExceptMaster()}
              playerNames={gameConfig.playerNames}
              onVotingComplete={handleVotingComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}