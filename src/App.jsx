import React, { useState } from 'react';
import WiFouGame from './components/WiFouGame.jsx';
import TeamDebateGame from './components/TeamDebateGame.jsx';

export default function App() {
  const [gameMode, setGameMode] = useState('selection'); // 'selection', 'original', 'debate'

  const GameSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            👻 Les Wi-Fou Déboussolés
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Choisissez votre mode de jeu
          </p>
          <p className="text-lg text-gray-500">
            Un jeu familial pour débattre de nos usages numériques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mode original */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer" onClick={() => setGameMode('original')}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Mode Original</h2>
              <p className="text-gray-700 text-lg mb-6">
                Le jeu classique où un joueur incarne le Wi-Fou et les autres devinent ses choix
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Comment ça marche :</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Un joueur devient le Maître Wi-Fou</li>
                  <li>• Il choisit une solution à une situation</li>
                  <li>• Les autres joueurs devinent son choix</li>
                  <li>• Points pour ceux qui devinent bien</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mode débat */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer" onClick={() => setGameMode('debate')}>
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Mode Débat</h2>
              <p className="text-gray-700 text-lg mb-6">
                NOUVEAU ! Tous les joueurs débattent en incarnant différents rôles
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Comment ça marche :</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Chaque joueur tire un rôle au hasard</li>
                  <li>• Débat sur une situation numérique</li>
                  <li>• Vote pour le meilleur argument</li>
                  <li>• Débat éducatif et fun !</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            💡 Le mode débat est parfait pour créer des discussions éducatives sur nos usages numériques !
          </p>
        </div>
      </div>
    </div>
  );

  const BackToSelection = () => (
    <button
      onClick={() => setGameMode('selection')}
      className="fixed top-4 left-4 z-50 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all font-semibold"
    >
      ← Retour au menu
    </button>
  );

  switch (gameMode) {
    case 'selection':
      return <GameSelection />;
    case 'original':
      return (
        <>
          <BackToSelection />
          <WiFouGame />
        </>
      );
    case 'debate':
      return (
        <>
          <BackToSelection />
          <TeamDebateGame />
        </>
      );
    default:
      return <GameSelection />;
  }
}

