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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md mx-4 animate-fade-in border-2 border-red-600">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4 animate-flicker">💀</div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Rituel Sauvegardé</h2>
          <p className="text-gray-300">Un rituel précédent a été détecté dans les archives</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-red-600">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Sauvegardé le :</span>
              <span className="font-medium text-gray-200">{formatDate(saveInfo.timestamp)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gardiens :</span>
              <span className="font-medium text-gray-200">{saveInfo.playerCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Progression :</span>
              <span className="font-medium text-gray-200">{saveInfo.currentTurn}/{saveInfo.totalTurns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rituel :</span>
              <span className="font-medium text-red-400">Rituel Court (15 min)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLoadGame}
            className="w-full btn-success"
          >
            🔄 Reprendre le Rituel
          </button>
          
          <button
            onClick={handleDeleteSave}
            className="w-full btn-danger"
          >
            🗑️ Effacer les Archives
          </button>
          
          <button
            onClick={onDismiss}
            className="w-full btn-secondary"
          >
            ✨ Nouveau Rituel
          </button>
        </div>
      </div>
    </div>
  );
}