// Système de sauvegarde et chargement de parties
export class GameSaveManager {
  static SAVE_KEY = 'gardiens_esprit_familial_save';

  static saveGame(gameData) {
    try {
      const saveData = {
        ...gameData,
        timestamp: Date.now(),
        version: '1.0'
      };
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return false;
    }
  }

  static loadGame() {
    try {
      const saveData = localStorage.getItem(this.SAVE_KEY);
      if (!saveData) return null;
      
      const gameData = JSON.parse(saveData);
      
      // Vérifier la version et la validité des données
      if (gameData.version !== '1.0') {
        console.warn('Version de sauvegarde incompatible');
        return null;
      }
      
      // Vérifier que la sauvegarde n'est pas trop ancienne (7 jours)
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes
      if (Date.now() - gameData.timestamp > maxAge) {
        console.warn('Sauvegarde trop ancienne');
        this.clearSave();
        return null;
      }
      
      return gameData;
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      return null;
    }
  }

  static clearSave() {
    try {
      localStorage.removeItem(this.SAVE_KEY);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  }

  static hasSave() {
    return localStorage.getItem(this.SAVE_KEY) !== null;
  }

  static getSaveInfo() {
    try {
      const saveData = localStorage.getItem(this.SAVE_KEY);
      if (!saveData) return null;
      
      const gameData = JSON.parse(saveData);
      return {
        timestamp: gameData.timestamp,
        playerCount: gameData.gameConfig?.playerNames?.length || 0,
        currentTurn: gameData.currentTurn || 0,
        totalTurns: gameData.durationConfig?.turns || 0,
        gameDuration: gameData.gameConfig?.gameDuration || 'normal'
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des infos:', error);
      return null;
    }
  }
}