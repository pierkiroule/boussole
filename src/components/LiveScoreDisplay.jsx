import React from 'react';

export default function LiveScoreDisplay({ playerNames, playerScores, currentMaster }) {
  // Calculer le classement
  const sortedScores = Object.entries(playerScores)
    .map(([index, score]) => ({
      index: parseInt(index),
      name: playerNames[index],
      score,
      isMaster: parseInt(index) === currentMaster
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="fixed top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-40 max-w-xs">
      <h3 className="text-sm font-bold text-gray-800 mb-3">📊 Scores en Temps Réel</h3>
      <div className="space-y-2">
        {sortedScores.map((player, index) => (
          <div 
            key={player.index} 
            className={`flex items-center justify-between p-2 rounded ${
              player.isMaster ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 ${
                index === 0 ? 'bg-yellow-400 text-white' :
                index === 1 ? 'bg-gray-300 text-gray-700' :
                index === 2 ? 'bg-orange-400 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`text-sm font-medium ${
                player.isMaster ? 'text-yellow-800' : 'text-gray-700'
              }`}>
                {player.name}
                {player.isMaster && ' 👑'}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-800">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}