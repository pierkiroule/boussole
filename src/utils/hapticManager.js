// Système de feedback haptique pour mobile
export class HapticManager {
  static isEnabled = true;
  static vibrationPatterns = {
    light: [10],
    medium: [20],
    heavy: [50],
    success: [10, 10, 10],
    error: [50, 50, 50],
    warning: [30, 30],
    notification: [15, 5, 15],
    button: [5],
    swipe: [10],
    longPress: [20]
  };

  static init() {
    // Vérifier si l'API Vibration est supportée
    if (!('vibrate' in navigator)) {
      console.warn('API Vibration non supportée');
      this.isEnabled = false;
    }
  }

  static vibrate(pattern = 'light') {
    if (!this.isEnabled || !navigator.vibrate) return;

    const vibrationPattern = this.vibrationPatterns[pattern] || this.vibrationPatterns.light;
    
    try {
      navigator.vibrate(vibrationPattern);
    } catch (error) {
      console.warn('Erreur de vibration:', error);
    }
  }

  static vibrateCustom(pattern) {
    if (!this.isEnabled || !navigator.vibrate) return;

    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Erreur de vibration personnalisée:', error);
    }
  }

  static vibrateSuccess() {
    this.vibrate('success');
  }

  static vibrateError() {
    this.vibrate('error');
  }

  static vibrateWarning() {
    this.vibrate('warning');
  }

  static vibrateNotification() {
    this.vibrate('notification');
  }

  static vibrateButton() {
    this.vibrate('button');
  }

  static vibrateSwipe() {
    this.vibrate('swipe');
  }

  static vibrateLongPress() {
    this.vibrate('longPress');
  }

  static toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  static setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  static isSupported() {
    return 'vibrate' in navigator;
  }

  static getStatus() {
    return {
      supported: this.isSupported(),
      enabled: this.isEnabled
    };
  }
}

// Initialiser automatiquement
HapticManager.init();