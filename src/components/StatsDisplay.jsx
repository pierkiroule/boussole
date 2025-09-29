import { useState } from 'react';
import { GameStatsManager } from '../utils/gameStatsManager';

export default function StatsDisplay({ onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const stats = GameStatsManager.getStats();

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getShieldName = (shieldId) => {
    const names = {
      liberty: '🆓 Liberté',
      heart: '❤️ Cœur',
      rules: '📋 Règles',
      security: '🔒 Sécurité'
    };
    return names[shieldId] || shieldId;
  };

  const getMostUsedShield = () => {
    const shields = Object.entries(stats.shieldsUsed);
    if (shields.length === 0) return null;
    
    const mostUsed = shields.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    
    return {
      id: mostUsed[0],
      count: mostUsed[1],
      name: getShieldName(mostUsed[0])
    };
  };

  const mostUsedShield = getMostUsedShield();
  const riddleAccuracy = stats.riddlesAnswered > 0 
    ? Math.round((stats.riddlesCorrect / stats.riddlesAnswered) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📊 Statistiques</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Onglets */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            📈 Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'achievements' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            🏅 Achievements
          </button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistiques générales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.gamesPlayed}</div>
                <div className="text-sm text-blue-800">Parties jouées</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalTurnsPlayed}</div>
                <div className="text-sm text-green-800">Tours joués</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.longestGame}</div>
                <div className="text-sm text-purple-800">Plus long jeu</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{riddleAccuracy}%</div>
                <div className="text-sm text-yellow-800">Précision énigmes</div>
              </div>
            </div>

            {/* Boucliers utilisés */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🛡️ Boucliers Utilisés</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.shieldsUsed).map(([shieldId, count]) => (
                  <div key={shieldId} className="text-center">
                    <div className="text-2xl mb-2">{getShieldName(shieldId).split(' ')[0]}</div>
                    <div className="font-semibold text-gray-800">{count}</div>
                    <div className="text-xs text-gray-600">{getShieldName(shieldId).split(' ')[1]}</div>
                  </div>
                ))}
              </div>
              {mostUsedShield && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Bouclier préféré : <span className="font-semibold">{mostUsedShield.name}</span> ({mostUsedShield.count} utilisations)
                  </p>
                </div>
              )}
            </div>

            {/* Préférences */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">⚙️ Préférences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Durée préférée</div>
                  <div className="font-semibold text-gray-800 capitalize">{stats.favoriteGameDuration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Temps total joué</div>
                  <div className="font-semibold text-gray-800">{formatTime(stats.totalTimePlayed)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🏅</div>
              <h3 className="text-lg font-semibold text-gray-800">Achievements Débloqués</h3>
              <p className="text-sm text-gray-600">{stats.achievements.length} sur 5 achievements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.achievements.map((achievement) => (
                <div key={achievement} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🏆</div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {GameStatsManager.getAchievementName(achievement)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {GameStatsManager.getAchievementDescription(achievement)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {stats.achievements.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔒</div>
                <p className="text-gray-600">Aucun achievement débloqué pour le moment</p>
                <p className="text-sm text-gray-500 mt-2">Continuez à jouer pour débloquer des achievements !</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end mt-6 pt-6 border-t">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            ✅ Fermer
          </button>
        </div>
      </div>
    </div>
  );
}