import React, { useState } from 'react';
import GameContainer from './components/GameContainer';
import WelcomeScreen from './components/WelcomeScreen';
import { GAME_CONFIG } from './data/gameConfig';

export default function App() {
  const [gameState, setGameState] = useState('welcome'); // 'welcome', 'playing', 'ended'
  const [gameConfig, setGameConfig] = useState(null);

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
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
            <h1 className="text-4xl font-bold mb-4">✨ Félicitations !</h1>
            <p className="text-xl mb-8">Vous êtes maintenant de vrais Gardiens de l'Esprit Familial !</p>
            <button
              onClick={handleBackToWelcome}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🛡️ Nouvelle Aventure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}