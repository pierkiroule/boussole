import { useState, useEffect } from 'react';
import ChapterIntro from './ChapterIntro';
import AttackDisplay from './AttackDisplay';
import MasterVoting from './MasterVoting';
import ScoreDisplay from './ScoreDisplay';
import RiddleDisplay from './RiddleDisplay';
import LiveScoreDisplay from './LiveScoreDisplay';
import PhaseTransition from './PhaseTransition';
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
  const [gamePhase, setGamePhase] = useState('intro'); // 'intro', 'attack', 'voting', 'riddle', 'scoring'
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

  const handleParadesSubmitted = (parades) => {
    setPlayerParades(parades);
    setGamePhase('voting');
    SoundManager.playSuccess();
    HapticManager.vibrateSuccess();
    if (window.showNotification) {
      window.showNotification('🛡️ Toutes les parades sont soumises ! Votez maintenant.', 'success');
    }
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

    // Passer à la phase d'énigme ou au tour suivant
    if (currentTurn >= totalTurns) {
      setGamePhase('ended');
      SoundManager.playVictory();
      if (window.showNotification) {
        window.showNotification('🎉 Partie terminée ! Vérifiez les résultats finaux.', 'success');
      }
    } else {
      // Ajouter une phase d'énigme après chaque vote
      setGamePhase('riddle');
      SoundManager.playTransition();
      if (window.showNotification) {
        window.showNotification('🤔 Réfléchissez à cette énigme pour approfondir votre compréhension.', 'info');
      }
    }
  };

  const handleRiddleComplete = (isCorrect) => {
    // Bonus de points pour une bonne réponse à l'énigme
    if (isCorrect) {
      const bonusScores = { ...playerScores };
      bonusScores[currentMaster] = (bonusScores[currentMaster] || 0) + 1;
      setPlayerScores(bonusScores);
      SoundManager.playSuccess();
      if (window.showNotification) {
        window.showNotification(`🎉 ${getCurrentMasterName()} gagne 1 pt bonus pour sa bonne réponse !`, 'success');
      }
    } else {
      SoundManager.playNotification();
      if (window.showNotification) {
        window.showNotification('💭 Réflexion intéressante ! Continuez à apprendre.', 'info');
      }
    }

    // Rotation du Maître et passage au tour suivant
    const nextMaster = (currentMaster + 1) % gameConfig.playerNames.length;
    setCurrentMaster(nextMaster);
    setCurrentTurn(currentTurn + 1);
    setGamePhase('intro');
    setPlayerParades({});
    
    SoundManager.playTransition();
    if (window.showNotification) {
      window.showNotification(`🔄 ${gameConfig.playerNames[nextMaster]} devient le nouveau Maître Gardien !`, 'info');
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
              players={getPlayersExceptMaster()}
              onParadesSubmitted={handleParadesSubmitted}
            />
          </div>
        )}

        {gamePhase === 'voting' && (
          <div className="game-phase-voting">
            <MasterVoting
              attack={currentAttack}
              parades={playerParades}
              masterName={getCurrentMasterName()}
              onVote={handleMasterVote}
            />
          </div>
        )}

        {gamePhase === 'riddle' && (
          <div className="game-phase-riddle">
            <RiddleDisplay
              onRiddleComplete={handleRiddleComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}