// Gestionnaire de version pour forcer les mises à jour
export class VersionManager {
  static VERSION_KEY = 'gardiens_esprit_familial_version';
  static CURRENT_VERSION = typeof __BUILD_VERSION__ !== 'undefined' ? __BUILD_VERSION__ : '1.0.0';

  static init() {
    // Vérifier la version au chargement de l'app
    this.checkVersion();
    
    // Écouter les messages du service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CLEAR_STORAGE') {
          this.clearAllData();
        }
      });
    }
  }

  static checkVersion() {
    const storedVersion = localStorage.getItem(this.VERSION_KEY);
    
    if (!storedVersion) {
      // Première visite
      this.setCurrentVersion();
      return;
    }

    if (storedVersion !== this.CURRENT_VERSION) {
      console.log(`Nouvelle version détectée: ${this.CURRENT_VERSION} (ancienne: ${storedVersion})`);
      
      // Vider toutes les données de l'ancienne version
      this.clearAllData();
      
      // Mettre à jour la version
      this.setCurrentVersion();
      
      // Notifier l'utilisateur
      this.showUpdateNotification();
      
      // Forcer le rechargement de la page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  static setCurrentVersion() {
    localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);
  }

  static clearAllData() {
    try {
      // Vider les sauvegardes de jeu
      localStorage.removeItem('gardiens_esprit_familial_save');
      
      // Vider les statistiques
      localStorage.removeItem('gardiens_esprit_familial_stats');
      
      // Vider tout autre localStorage lié à l'app
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('gardiens_esprit_familial')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      console.log('Données de l\'ancienne version supprimées');
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
    }
  }

  static showUpdateNotification() {
    // Créer une notification visuelle
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 14px;
      max-width: 300px;
    `;
    
    notification.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">🔄 Mise à jour disponible</div>
      <div>Une nouvelle version est disponible. Les données seront mises à jour...</div>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  static forceUpdate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage({ type: 'FORCE_UPDATE' });
      });
    }
    
    // Vider le cache et recharger
    this.clearAllData();
    window.location.reload();
  }

  static getCurrentVersion() {
    return this.CURRENT_VERSION;
  }

  static getStoredVersion() {
    return localStorage.getItem(this.VERSION_KEY);
  }
}