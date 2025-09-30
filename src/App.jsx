import { useState, useEffect } from 'react';
import GameContainer from './components/GameContainer';
import WelcomeScreen from './components/WelcomeScreen';
import NotificationSystem from './components/NotificationSystem';
import SaveGamePrompt from './components/SaveGamePrompt';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { GameSaveManager } from './utils/gameSaveManager';

export default function App() {
  const [gameState, setGameState] = useState('welcome'); // 'welcome', 'playing', 'ended'
  const [gameConfig, setGameConfig] = useState(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  const handleStartGame = (config) => {
    setGameConfig(config);
    setGameState('playing');
  };

  const handleEndGame = () => {
    setGameState('ended');
  };

  const handleBackToWelcome = () => {
    setGameState('welcome');
    setGameConfig(null);
    GameSaveManager.clearSave();
  };

  const handleLoadGame = (loadedGameData) => {
    setGameConfig(loadedGameData.gameConfig);
    setGameState('playing');
    setShowSavePrompt(false);
  };

  const handleDismissSavePrompt = () => {
    setShowSavePrompt(false);
  };

  // Vérifier s'il y a une sauvegarde au chargement
  useEffect(() => {
    if (GameSaveManager.hasSave()) {
      setShowSavePrompt(true);
    }
    
    // Enregistrer le service worker pour PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker enregistré:', registration);
        })
        .catch((error) => {
          console.log('Erreur Service Worker:', error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Système de notifications */}
      <NotificationSystem />
      
      {/* Prompt d'installation PWA */}
      <PWAInstallPrompt />
      
      {/* Prompt de reprise de partie */}
      {showSavePrompt && (
        <SaveGamePrompt
          onLoadGame={handleLoadGame}
          onDismiss={handleDismissSavePrompt}
        />
      )}
      
      {gameState === 'welcome' && (
        <WelcomeScreen onStartGame={handleStartGame} />
      )}
      
      {gameState === 'playing' && gameConfig && (
        <GameContainer 
          gameConfig={gameConfig}
          onEndGame={handleEndGame}
          onBackToWelcome={handleBackToWelcome}
        />
      )}
      
      {gameState === 'ended' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4 animate-flicker" style={{fontFamily: 'Nosifer', textShadow: '0 0 15px #DC143C'}}>🦇 Victoire ! 🦇</h1>
            <p className="text-xl mb-8 text-gray-300">Le Wifou a été banni dans les ténèbres éternelles !<br />L'équilibre mystique est restauré !</p>
            <button
              onClick={handleBackToWelcome}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors animate-glow"
              style={{fontFamily: 'Creepster'}}
            >
              🛡️ Nouveau Rituel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}