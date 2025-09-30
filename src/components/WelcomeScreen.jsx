import { useState } from 'react';
import { validatePlayerCount } from '../data/gameConfig';
import Tutorial from './Tutorial';
import StatsDisplay from './StatsDisplay';
import TouchGestures from './TouchGestures';
import { SoundManager } from '../utils/soundManager';
import { HapticManager } from '../utils/hapticManager';

export default function WelcomeScreen({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(['']);
  const [currentStep, setCurrentStep] = useState(0); // 0: tutorial, 1: config, 2: names
  const [showTutorial, setShowTutorial] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showGestures, setShowGestures] = useState(false);

  // Durée fixe : partie courte de 15 minutes
  const gameDuration = 'short';

  const handlePlayerCountChange = (count) => {
    if (validatePlayerCount(count)) {
      setPlayerCount(count);
      // Ajuster les noms des joueurs
      const newNames = [...playerNames];
      if (count > playerNames.length) {
        // Ajouter des noms vides
        for (let i = playerNames.length; i < count; i++) {
          newNames.push('');
        }
      } else if (count < playerNames.length) {
        // Supprimer les noms en trop
        newNames.splice(count);
      }
      setPlayerNames(newNames);
    }
  };

  const handlePlayerNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    SoundManager.playSuccess();
    const config = {
      playerCount,
      gameDuration,
      playerNames: playerNames.map((name, index) => name || `Gardien ${index + 1}`)
    };
    onStartGame(config);
  };

  const canStartGame = playerNames.every(name => name.trim() !== '');

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setCurrentStep(1);
  };

  const handleShowTutorial = () => {
    SoundManager.playClick();
    HapticManager.vibrateButton();
    setShowTutorial(true);
  };

  const handleShowStats = () => {
    SoundManager.playClick();
    HapticManager.vibrateButton();
    setShowStats(true);
  };

  const handleShowGestures = () => {
    SoundManager.playClick();
    HapticManager.vibrateButton();
    setShowGestures(true);
  };

  if (showTutorial) {
    return <Tutorial onComplete={handleTutorialComplete} />;
  }

  if (showStats) {
    return <StatsDisplay onClose={() => setShowStats(false)} />;
  }

  if (showGestures) {
    return <TouchGestures onClose={() => setShowGestures(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card p-8 max-w-2xl w-full animate-fade-in">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-400 mb-3 animate-flicker" style={{textShadow: '0 0 10px #DC143C'}}>
            🦇 Le Wifou 🦇
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Le Wifou est un cyber-démon qui rôde dans les ombres digitales, cherchant à posséder la famille Déboussolée.<br />
            Vous, Gardiens des Ténèbres Familiales, réussirez-vous à bannir cette entité maléfique<br />
            et restaurer l'équilibre entre technologie et traditions ancestrales ?
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleShowTutorial}
              className="btn-primary touch-target touch-feedback"
            >
              🕷️ Grimoire
            </button>
            <button
              onClick={handleShowStats}
              className="btn-secondary touch-target touch-feedback"
            >
              🔮 Oracle
            </button>
            <button
              onClick={handleShowGestures}
              className="btn-success touch-target touch-feedback"
            >
              ✋ Rituels
            </button>
          </div>
        </div>

        {/* Étapes */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Configuration de base */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-4" style={{textShadow: '0 0 5px #DC143C'}}>
              ⚰️ Configuration du Rituel
            </h2>

            {/* Durée fixe affichée */}
            <div className="bg-gray-800 border-2 border-red-600 rounded-lg p-4 animate-glow">
              <div className="text-center">
                <div className="font-semibold text-red-400 text-lg">⏰ Rituel Court</div>
                <div className="text-red-300">15 minutes d'horreur</div>
                <div className="text-sm text-gray-400">Parfait pour une séance de terreur familiale</div>
              </div>
            </div>

            {/* Nombre de joueurs */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                👥 Nombre de Gardiens des Ténèbres (2-6)
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handlePlayerCountChange(playerCount - 1)}
                  disabled={playerCount <= 2}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-red-600 text-red-400"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-red-400 min-w-[60px] text-center">
                  {playerCount}
                </span>
                <button
                  onClick={() => handlePlayerCountChange(playerCount + 1)}
                  disabled={playerCount >= 6}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-red-600 text-red-400"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="w-full btn-primary touch-target touch-feedback"
              data-continue
            >
              ➡️ Continuer le Rituel
            </button>
          </div>
        )}

        {/* Noms des joueurs */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-4" style={{textShadow: '0 0 5px #DC143C'}}>
              ✍️ Noms des Gardiens des Ténèbres
            </h2>

            <div className="space-y-4">
              {playerNames.map((name, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gardien des Ténèbres {index + 1}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    placeholder={`Nom du Gardien ${index + 1}`}
                    className="w-full px-4 py-2 border-2 border-red-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-800 text-gray-200 placeholder-gray-400"
                  />
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 btn-secondary touch-target touch-feedback"
                data-previous
              >
                ← Retour aux Ténèbres
              </button>
              <button
                onClick={handleStartGame}
                disabled={!canStartGame}
                className={`flex-1 ${canStartGame ? 'btn-success' : 'bg-gray-600 text-gray-400 cursor-not-allowed'} touch-target touch-feedback font-bold py-3 px-6 rounded-lg transition-colors`}
                data-submit
              >
                🚀 Commencer l'Horreur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}