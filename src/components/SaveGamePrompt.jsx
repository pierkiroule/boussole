// React import not needed for JSX in React 17+
import { GameSaveManager } from '../utils/gameSaveManager';

export default function SaveGamePrompt({ onLoadGame, onDismiss }) {
  const saveInfo = GameSaveManager.getSaveInfo();

  if (!saveInfo) return null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLoadGame = () => {
    const gameData = GameSaveManager.loadGame();
    if (gameData) {
      onLoadGame(gameData);
    }
  };

  const handleDeleteSave = () => {
    GameSaveManager.clearSave();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md mx-4 animate-fade-in">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">💾</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Partie Sauvegardée</h2>
          <p className="text-gray-600">Une partie précédente a été détectée</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Sauvegardée le :</span>
              <span className="font-medium">{formatDate(saveInfo.timestamp)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Joueurs :</span>
              <span className="font-medium">{saveInfo.playerCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Progression :</span>
              <span className="font-medium">{saveInfo.currentTurn}/{saveInfo.totalTurns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Durée :</span>
              <span className="font-medium capitalize">{saveInfo.gameDuration}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLoadGame}
            className="w-full btn-success"
          >
            🔄 Reprendre la Partie
          </button>
          
          <button
            onClick={handleDeleteSave}
            className="w-full btn-danger"
          >
            🗑️ Supprimer la Sauvegarde
          </button>
          
          <button
            onClick={onDismiss}
            className="w-full btn-secondary"
          >
            ✨ Nouvelle Partie
          </button>
        </div>
      </div>
    </div>
  );
}