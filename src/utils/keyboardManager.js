// Système de raccourcis clavier pour améliorer l'accessibilité
export class KeyboardManager {
  static shortcuts = new Map();
  static isEnabled = true;

  static init() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.registerDefaultShortcuts();
  }

  static registerDefaultShortcuts() {
    // Raccourcis généraux
    this.register('Escape', () => {
      // Fermer les modales ouvertes
      const modals = document.querySelectorAll('[data-modal]');
      modals.forEach(modal => {
        if (modal.style.display !== 'none') {
          modal.style.display = 'none';
        }
      });
    });

    this.register('F1', () => {
      // Ouvrir le tutoriel
      if (window.openTutorial) {
        window.openTutorial();
      }
    });

    this.register('F2', () => {
      // Ouvrir les statistiques
      if (window.openStats) {
        window.openStats();
      }
    });

    // Raccourcis de jeu
    this.register('Space', () => {
      // Continuer/Valider dans les phases de jeu
      const continueBtn = document.querySelector('[data-continue]');
      if (continueBtn && !continueBtn.disabled) {
        continueBtn.click();
      }
    });

    this.register('Enter', () => {
      // Soumettre les formulaires
      const submitBtn = document.querySelector('[data-submit]');
      if (submitBtn && !submitBtn.disabled) {
        submitBtn.click();
      }
    });

    // Raccourcis numériques pour les boucliers
    this.register('1', () => this.selectShield('liberty'));
    this.register('2', () => this.selectShield('heart'));
    this.register('3', () => this.selectShield('rules'));
    this.register('4', () => this.selectShield('security'));

    // Raccourcis de navigation
    this.register('ArrowLeft', () => this.navigatePrevious());
    this.register('ArrowRight', () => this.navigateNext());
    this.register('ArrowUp', () => this.navigateUp());
    this.register('ArrowDown', () => this.navigateDown());
  }

  static register(key, callback, description = '') {
    this.shortcuts.set(key, { callback, description });
  }

  static handleKeyDown(event) {
    if (!this.isEnabled) return;

    // Ignorer si on est dans un input
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    const key = this.getKeyString(event);
    const shortcut = this.shortcuts.get(key);

    if (shortcut) {
      event.preventDefault();
      shortcut.callback();
    }
  }

  static getKeyString(event) {
    let key = '';
    
    if (event.ctrlKey) key += 'Ctrl+';
    if (event.altKey) key += 'Alt+';
    if (event.shiftKey) key += 'Shift+';
    
    key += event.key;
    return key;
  }

  static selectShield(shieldId) {
    const shieldBtn = document.querySelector(`[data-shield="${shieldId}"]`);
    if (shieldBtn) {
      shieldBtn.click();
    }
  }

  static navigatePrevious() {
    const prevBtn = document.querySelector('[data-previous]');
    if (prevBtn && !prevBtn.disabled) {
      prevBtn.click();
    }
  }

  static navigateNext() {
    const nextBtn = document.querySelector('[data-next]');
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
    }
  }

  static navigateUp() {
    const upBtn = document.querySelector('[data-up]');
    if (upBtn && !upBtn.disabled) {
      upBtn.click();
    }
  }

  static navigateDown() {
    const downBtn = document.querySelector('[data-down]');
    if (downBtn && !downBtn.disabled) {
      downBtn.click();
    }
  }

  static toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  static setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  static getShortcutsList() {
    return Array.from(this.shortcuts.entries()).map(([key, data]) => ({
      key,
      description: data.description || 'Action personnalisée'
    }));
  }
}

// Initialiser automatiquement
KeyboardManager.init();