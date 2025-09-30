import { getAllShields } from '../data/shields';

export default function ScoreDisplay({ playerNames, playerScores, gameHistory, onNewGame, onEndGame }) {
  const shields = getAllShields();

  // Calculer le classement (basé sur le nombre de bonnes réponses)
  const sortedScores = Object.entries(playerScores)
    .map(([index, score]) => ({
      index: parseInt(index),
      name: playerNames[index],
      score
    }))
    .sort((a, b) => b.score - a.score);

  const winner = sortedScores[0];

  // Calculer les statistiques de valeurs pour chaque joueur (quand il était Maître)
  const playerValueStats = {};
  playerNames.forEach((name, index) => {
    playerValueStats[index] = {
      name,
      liberty: 0,
      heart: 0,
      rules: 0,
      security: 0,
      total: 0
    };
  });

  // Parcourir l'historique pour compter les choix de chaque Maître
  gameHistory.forEach(entry => {
    if (entry.master && entry.master.index !== undefined && entry.master.choice) {
      const masterIndex = entry.master.index;
      const choice = entry.master.choice;
      
      if (playerValueStats[masterIndex]) {
        playerValueStats[masterIndex][choice]++;
        playerValueStats[masterIndex].total++;
      }
    }
  });

  // Calculer les pourcentages
  const getPercentage = (count, total) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  // Trouver la valeur dominante de la famille
  const familyValues = {
    liberty: 0,
    heart: 0,
    rules: 0,
    security: 0
  };

  gameHistory.forEach(entry => {
    if (entry.master && entry.master.choice) {
      familyValues[entry.master.choice]++;
    }
  });

  const dominantValue = Object.entries(familyValues)
    .sort((a, b) => b[1] - a[1])[0];

  const getShieldByValue = (value) => {
    return shields.find(s => s.id === value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Fin de Partie</h1>
          <p className="text-xl text-gray-600">Le Wifou est chassé ! La famille Déboussolée est libérée !</p>
        </div>

        {/* 🎖️ Scores - Meilleur chasseur de Wifou */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8 text-center">
          <div className="text-6xl mb-4">👑</div>
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Meilleur Chasseur de Wifou</h2>
          <p className="text-3xl font-bold text-yellow-700">{winner.name}</p>
          <p className="text-lg text-yellow-600">{winner.score} bonne{winner.score > 1 ? 's' : ''} réponse{winner.score > 1 ? 's' : ''}</p>
          <p className="text-sm text-yellow-600 mt-2">
            {winner.name} a deviné le plus souvent les choix des autres Maîtres !
          </p>
        </div>

        {/* Classement complet */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Classement des Joueurs</h3>
          <div className="space-y-3">
            {sortedScores.map((player, index) => (
              <div key={player.index} className="flex items-center justify-between bg-white rounded-lg p-4 border-2 border-gray-200">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 ${
                    index === 0 ? 'bg-yellow-400 text-white' :
                    index === 1 ? 'bg-gray-300 text-gray-700' :
                    index === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-semibold text-gray-800 text-lg">{player.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-700">{player.score}</div>
                  <div className="text-xs text-gray-500">point{player.score > 1 ? 's' : ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 Statistiques des valeurs choisies par joueur */}
        <div className="bg-purple-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📊 Statistiques de Valeurs</h3>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Quand chaque joueur était Maître du Jeu, quelle valeur a-t-il défendu ?
          </p>

          <div className="space-y-6">
            {Object.entries(playerValueStats).map(([index, stats]) => {
              if (stats.total === 0) return null; // Ne pas afficher les joueurs qui n'ont pas été Maître

              const playerIndex = parseInt(index);
              
              return (
                <div key={playerIndex} className="bg-white rounded-lg p-5 border-2 border-purple-200">
                  <h4 className="font-bold text-lg text-gray-800 mb-4">{stats.name}</h4>
                  
                  <div className="space-y-2">
                    {/* Liberté */}
                    {stats.liberty > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-xl mr-2">🆓</span>
                            <span className="text-sm font-medium text-gray-700">Liberté</span>
                          </div>
                          <span className="text-sm font-bold text-blue-600">
                            {getPercentage(stats.liberty, stats.total)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${getPercentage(stats.liberty, stats.total)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Cœur */}
                    {stats.heart > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-xl mr-2">❤️</span>
                            <span className="text-sm font-medium text-gray-700">Cœur</span>
                          </div>
                          <span className="text-sm font-bold text-red-600">
                            {getPercentage(stats.heart, stats.total)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all"
                            style={{ width: `${getPercentage(stats.heart, stats.total)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Règles */}
                    {stats.rules > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-xl mr-2">📋</span>
                            <span className="text-sm font-medium text-gray-700">Règles</span>
                          </div>
                          <span className="text-sm font-bold text-green-600">
                            {getPercentage(stats.rules, stats.total)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${getPercentage(stats.rules, stats.total)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Sécurité */}
                    {stats.security > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-xl mr-2">🔒</span>
                            <span className="text-sm font-medium text-gray-700">Sécurité</span>
                          </div>
                          <span className="text-sm font-bold text-yellow-600">
                            {getPercentage(stats.security, stats.total)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all"
                            style={{ width: `${getPercentage(stats.security, stats.total)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {stats.total} tour{stats.total > 1 ? 's' : ''} comme Maître
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Valeur dominante de la famille */}
        {dominantValue && (
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-8 text-center border-2 border-purple-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏠 Valeur Dominante de la Famille Déboussolée</h3>
            <div className="text-6xl mb-4">{getShieldByValue(dominantValue[0])?.emoji}</div>
            <h4 className="text-2xl font-bold text-purple-800 mb-2">
              {getShieldByValue(dominantValue[0])?.name}
            </h4>
            <p className="text-gray-700 mb-2">
              {getShieldByValue(dominantValue[0])?.description}
            </p>
            <p className="text-sm text-purple-700">
              Cette valeur a été choisie {dominantValue[1]} fois sur {gameHistory.length} tour{gameHistory.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNewGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            🛡️ Nouvelle Aventure
          </button>
          <button
            onClick={onEndGame}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            🏠 Retour à l'Accueil
          </button>
        </div>
      </div>
    </div>
  );
}