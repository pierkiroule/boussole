import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx';
import CompassGame from './components/CompassGame.jsx';
import Tutorial from './components/Tutorial.jsx';
import HelpSystem from './components/HelpSystem.jsx';
import WiFouGame from './components/WiFouGame.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'game', 'tutorial', 'help', 'wifou'
  const [gameConfig, setGameConfig] = useState(null);
  const [helpSection, setHelpSection] = useState('rules');

  const handleStartGame = (config) => {
    setGameConfig(config);
    setCurrentScreen('game');
  };

  const handleShowTutorial = () => {
    setCurrentScreen('tutorial');
  };

  const handleShowRules = () => {
    setHelpSection('rules');
    setCurrentScreen('help');
  };

  const handleTutorialComplete = () => {
    setCurrentScreen('home');
  };

  const handleHelpClose = () => {
    setCurrentScreen('home');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleStartWiFouGame = () => {
    setCurrentScreen('wifou');
  };

  return (
    <div className="flex min-h-screen items-start sm:items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartGame={handleStartGame}
            onShowTutorial={handleShowTutorial}
            onShowRules={handleShowRules}
            onStartWiFouGame={handleStartWiFouGame}
          />
        )}
        
        {currentScreen === 'game' && gameConfig && (
          <CompassGame
            config={gameConfig}
            onBackToHome={handleBackToHome}
          />
        )}
        
        {currentScreen === 'tutorial' && (
          <Tutorial onComplete={handleTutorialComplete} />
        )}
        
        {currentScreen === 'help' && (
          <HelpSystem
            isVisible={true}
            onClose={handleHelpClose}
            section={helpSection}
          />
        )}
        
        {currentScreen === 'wifou' && (
          <WiFouGame />
        )}
      </div>
    </div>
  );
}

