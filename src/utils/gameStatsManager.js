// Système de statistiques du jeu
export class GameStatsManager {
  static STATS_KEY = 'gardiens_esprit_familial_stats';

  static getStats() {
    try {
      const stats = localStorage.getItem(this.STATS_KEY);
      return stats ? JSON.parse(stats) : this.getDefaultStats();
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error);
      return this.getDefaultStats();
    }
  }

  static getDefaultStats() {
    return {
      gamesPlayed: 0,
      totalTurnsPlayed: 0,
      totalTimePlayed: 0, // en minutes
      shieldsUsed: {
        liberty: 0,
        heart: 0,
        rules: 0,
        security: 0
      },
      riddlesAnswered: 0,
      riddlesCorrect: 0,
      favoriteGameDuration: 'normal',
      longestGame: 0,
      achievements: []
    };
  }

  static updateStats(gameData) {
    try {
      const stats = this.getStats();
      
      // Incrémenter les parties jouées
      stats.gamesPlayed++;
      
      // Ajouter les tours joués
      stats.totalTurnsPlayed += gameData.currentTurn || 0;
      
      // Mettre à jour la durée préférée
      const duration = gameData.gameConfig?.gameDuration || 'normal';
      stats.favoriteGameDuration = duration;
      
      // Mettre à jour le jeu le plus long
      if (gameData.currentTurn > stats.longestGame) {
        stats.longestGame = gameData.currentTurn;
      }
      
      // Compter les boucliers utilisés
      if (gameData.gameHistory) {
        gameData.gameHistory.forEach(turn => {
          if (turn.parades) {
            Object.values(turn.parades).forEach(parade => {
              if (parade.shieldId && stats.shieldsUsed[parade.shieldId] !== undefined) {
                stats.shieldsUsed[parade.shieldId]++;
              }
            });
          }
        });
      }
      
      // Sauvegarder les stats
      localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
      
      // Vérifier les achievements
      this.checkAchievements(stats);
      
      return stats;
    } catch (error) {
      console.error('Erreur lors de la mise à jour des stats:', error);
      return this.getStats();
    }
  }

  static checkAchievements(stats) {
    const achievements = [...stats.achievements];
    
    // Achievement: Première partie
    if (stats.gamesPlayed === 1 && !achievements.includes('first_game')) {
      achievements.push('first_game');
    }
    
    // Achievement: 10 parties
    if (stats.gamesPlayed === 10 && !achievements.includes('veteran')) {
      achievements.push('veteran');
    }
    
    // Achievement: Maître des boucliers
    const totalShieldsUsed = Object.values(stats.shieldsUsed).reduce((sum, count) => sum + count, 0);
    if (totalShieldsUsed >= 50 && !achievements.includes('shield_master')) {
      achievements.push('shield_master');
    }
    
    // Achievement: Sage des énigmes
    if (stats.riddlesCorrect >= 20 && !achievements.includes('riddle_sage')) {
      achievements.push('riddle_sage');
    }
    
    // Achievement: Marathon
    if (stats.longestGame >= 15 && !achievements.includes('marathon')) {
      achievements.push('marathon');
    }
    
    // Mettre à jour les achievements
    if (achievements.length > stats.achievements.length) {
      stats.achievements = achievements;
      localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
      
      // Notifier les nouveaux achievements
      const newAchievements = achievements.slice(stats.achievements.length);
      newAchievements.forEach(achievement => {
        if (window.showNotification) {
          const achievementNames = {
            first_game: '🎮 Première Partie',
            veteran: '🏆 Vétéran',
            shield_master: '🛡️ Maître des Boucliers',
            riddle_sage: '🧠 Sage des Énigmes',
            marathon: '🏃 Marathon'
          };
          window.showNotification(`🏅 Achievement débloqué: ${achievementNames[achievement]} !`, 'success', 5000);
        }
      });
    }
  }

  static getAchievementName(achievementId) {
    const names = {
      first_game: '🎮 Première Partie',
      veteran: '🏆 Vétéran',
      shield_master: '🛡️ Maître des Boucliers',
      riddle_sage: '🧠 Sage des Énigmes',
      marathon: '🏃 Marathon'
    };
    return names[achievementId] || achievementId;
  }

  static getAchievementDescription(achievementId) {
    const descriptions = {
      first_game: 'Jouez votre première partie',
      veteran: 'Jouez 10 parties',
      shield_master: 'Utilisez 50 boucliers au total',
      riddle_sage: 'Répondez correctement à 20 énigmes',
      marathon: 'Terminez une partie de 15 tours ou plus'
    };
    return descriptions[achievementId] || 'Achievement mystérieux';
  }

  static clearStats() {
    try {
      localStorage.removeItem(this.STATS_KEY);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression des stats:', error);
      return false;
    }
  }
}