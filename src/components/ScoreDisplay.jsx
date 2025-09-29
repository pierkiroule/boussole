import React from 'react';

export default function ScoreDisplay({ playerNames, playerScores, gameHistory, onNewGame, onEndGame }) {
  // Calculer le classement
  const sortedScores = Object.entries(playerScores)
    .map(([index, score]) => ({
      index: parseInt(index),
      name: playerNames[index],
      score
    }))
    .sort((a, b) => b.score - a.score);

  const winner = sortedScores[0];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Résultats Finaux</h1>
        <p className="text-xl text-gray-600">La bataille contre le Wi-Fou est terminée !</p>
      </div>

      {/* Gagnant */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8 text-center">
        <div className="text-6xl mb-4">👑</div>
        <h2 className="text-2xl font-bold text-yellow-800 mb-2">Grand Gardien de l'Esprit Familial</h2>
        <p className="text-3xl font-bold text-yellow-700">{winner.name}</p>
        <p className="text-lg text-yellow-600">{winner.score} pts Pharmakon</p>
      </div>

      {/* Classement complet */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Classement des Gardiens</h3>
        <div className="space-y-3">
          {sortedScores.map((player, index) => (
            <div key={player.index} className="flex items-center justify-between bg-white rounded-lg p-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                  index === 0 ? 'bg-yellow-400 text-white' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-400 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className="font-semibold text-gray-800">{player.name}</span>
              </div>
              <span className="text-lg font-bold text-gray-700">{player.score} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiques des boucliers */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🛡️ Statistiques des Boucliers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🆓</div>
            <div className="text-sm text-gray-600">Liberté</div>
            <div className="font-semibold text-blue-600">
              {gameHistory.filter(h => 
                Object.values(h.parades).some(p => p.shieldId === 'liberty')
              ).length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">❤️</div>
            <div className="text-sm text-gray-600">Cœur</div>
            <div className="font-semibold text-red-600">
              {gameHistory.filter(h => 
                Object.values(h.parades).some(p => p.shieldId === 'heart')
              ).length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm text-gray-600">Règles</div>
            <div className="font-semibold text-green-600">
              {gameHistory.filter(h => 
                Object.values(h.parades).some(p => p.shieldId === 'rules')
              ).length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm text-gray-600">Sécurité</div>
            <div className="font-semibold text-yellow-600">
              {gameHistory.filter(h => 
                Object.values(h.parades).some(p => p.shieldId === 'security')
              ).length}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 justify-center">
        <button
          onClick={onNewGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          🛡️ Nouvelle Aventure
        </button>
        <button
          onClick={onEndGame}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          🏠 Retour à l'Accueil
        </button>
      </div>
    </div>
  );
}