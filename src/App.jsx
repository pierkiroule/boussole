import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx';
import WiFouGame from './components/WiFouGame.jsx';
import TeamDebateGame from './components/TeamDebateGame.jsx';
import Tutorial from './components/Tutorial.jsx';
import HelpSystem from './components/HelpSystem.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'original', 'debate', 'tutorial', 'rules'
  const [gameConfig, setGameConfig] = useState(null);

  const handleStartGame = (config) => {
    setGameConfig(config);
    setCurrentScreen('original');
  };

  const handleStartWiFouGame = () => {
    setCurrentScreen('debate');
  };

  const handleShowTutorial = () => {
    setCurrentScreen('tutorial');
  };

  const handleShowRules = () => {
    setCurrentScreen('rules');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setGameConfig(null);
  };

  const BackToHomeButton = () => (
    <button
      onClick={handleBackToHome}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        padding: '12px 20px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        color: '#1e293b',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 1)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      ← Retour à l'accueil
    </button>
  );

  switch (currentScreen) {
    case 'home':
      return (
        <HomeScreen
          onStartGame={handleStartGame}
          onShowTutorial={handleShowTutorial}
          onShowRules={handleShowRules}
          onStartWiFouGame={handleStartWiFouGame}
        />
      );
    case 'original':
      return (
        <>
          <BackToHomeButton />
          <WiFouGame gameConfig={gameConfig} />
        </>
      );
    case 'debate':
      return (
        <>
          <BackToHomeButton />
          <TeamDebateGame gameConfig={gameConfig} />
        </>
      );
    case 'tutorial':
      return (
        <>
          <BackToHomeButton />
          <Tutorial />
        </>
      );
    case 'rules':
      return (
        <>
          <BackToHomeButton />
          <HelpSystem />
        </>
      );
    default:
      return (
        <HomeScreen
          onStartGame={handleStartGame}
          onShowTutorial={handleShowTutorial}
          onShowRules={handleShowRules}
          onStartWiFouGame={handleStartWiFouGame}
        />
      );
  }
}

