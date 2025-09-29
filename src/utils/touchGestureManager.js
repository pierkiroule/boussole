// Système de gestes tactiles pour mobile
export class TouchGestureManager {
  static gestures = new Map();
  static isEnabled = true;
  static touchStartX = 0;
  static touchStartY = 0;
  static touchEndX = 0;
  static touchEndY = 0;
  static minSwipeDistance = 50;

  static init() {
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    this.registerDefaultGestures();
  }

  static registerDefaultGestures() {
    // Swipe gauche - Navigation précédente
    this.register('swipeLeft', () => {
      const prevBtn = document.querySelector('[data-previous]');
      if (prevBtn && !prevBtn.disabled) {
        prevBtn.click();
      }
    });

    // Swipe droite - Navigation suivante
    this.register('swipeRight', () => {
      const nextBtn = document.querySelector('[data-next]');
      if (nextBtn && !nextBtn.disabled) {
        nextBtn.click();
      }
    });

    // Swipe haut - Ouvrir les statistiques
    this.register('swipeUp', () => {
      if (window.openStats) {
        window.openStats();
      }
    });

    // Swipe bas - Ouvrir le tutoriel
    this.register('swipeDown', () => {
      if (window.openTutorial) {
        window.openTutorial();
      }
    });

    // Tap long - Menu contextuel
    this.register('longPress', () => {
      this.showContextMenu();
    });

    // Double tap - Valider/Action rapide
    this.register('doubleTap', () => {
      const continueBtn = document.querySelector('[data-continue]');
      if (continueBtn && !continueBtn.disabled) {
        continueBtn.click();
      }
    });
  }

  static register(gesture, callback, description = '') {
    this.gestures.set(gesture, { callback, description });
  }

  static handleTouchStart(event) {
    if (!this.isEnabled) return;
    
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    
    // Démarrer le timer pour le long press
    this.longPressTimer = setTimeout(() => {
      this.executeGesture('longPress');
    }, 500);
  }

  static handleTouchEnd(event) {
    if (!this.isEnabled) return;
    
    clearTimeout(this.longPressTimer);
    
    const touch = event.changedTouches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;
    
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    
    // Détecter le type de geste
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Swipe horizontal
      if (Math.abs(deltaX) > this.minSwipeDistance) {
        if (deltaX > 0) {
          this.executeGesture('swipeRight');
        } else {
          this.executeGesture('swipeLeft');
        }
      }
    } else {
      // Swipe vertical
      if (Math.abs(deltaY) > this.minSwipeDistance) {
        if (deltaY > 0) {
          this.executeGesture('swipeDown');
        } else {
          this.executeGesture('swipeUp');
        }
      }
    }
    
    // Détecter le double tap
    const now = Date.now();
    if (this.lastTap && now - this.lastTap < 300) {
      this.executeGesture('doubleTap');
    }
    this.lastTap = now;
  }

  static executeGesture(gesture) {
    const gestureData = this.gestures.get(gesture);
    if (gestureData) {
      gestureData.callback();
    }
  }

  static showContextMenu() {
    // Créer un menu contextuel mobile
    const menu = document.createElement('div');
    menu.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    menu.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-sm mx-4 animate-fade-in">
        <h3 class="text-lg font-bold text-gray-800 mb-4">📱 Menu Rapide</h3>
        <div class="space-y-3">
          <button class="w-full btn-primary" onclick="window.openTutorial && window.openTutorial()">
            📚 Tutoriel
          </button>
          <button class="w-full btn-secondary" onclick="window.openStats && window.openStats()">
            📊 Statistiques
          </button>
          <button class="w-full btn-success" onclick="window.openShortcuts && window.openShortcuts()">
            ⌨️ Gestes
          </button>
        </div>
        <button class="w-full mt-4 btn-danger" onclick="this.closest('.fixed').remove()">
          ❌ Fermer
        </button>
      </div>
    `;
    
    document.body.appendChild(menu);
    
    // Fermer le menu en cliquant à l'extérieur
    menu.addEventListener('click', (e) => {
      if (e.target === menu) {
        menu.remove();
      }
    });
  }

  static toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  static setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  static getGesturesList() {
    return Array.from(this.gestures.entries()).map(([gesture, data]) => ({
      gesture,
      description: data.description || 'Action personnalisée'
    }));
  }
}

// Initialiser automatiquement
TouchGestureManager.init();