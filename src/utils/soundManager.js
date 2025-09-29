// Système d'effets sonores pour le jeu
export class SoundManager {
  static audioContext = null;
  static sounds = {};
  static isEnabled = true;

  static init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.createSounds();
    } catch (error) {
      console.warn('AudioContext non supporté:', error);
      this.isEnabled = false;
    }
  }

  static createSounds() {
    if (!this.audioContext) return;

    // Son de notification douce
    this.sounds.notification = this.createTone(800, 0.1, 'sine');
    
    // Son de succès
    this.sounds.success = this.createChord([523, 659, 784], 0.3, 'sine');
    
    // Son d'erreur
    this.sounds.error = this.createTone(200, 0.5, 'sawtooth');
    
    // Son de transition
    this.sounds.transition = this.createTone(440, 0.2, 'triangle');
    
    // Son de clic
    this.sounds.click = this.createTone(1000, 0.05, 'square');
    
    // Son de victoire
    this.sounds.victory = this.createMelody([523, 659, 784, 1047], 0.15);
  }

  static createTone(frequency, duration, waveType = 'sine') {
    return () => {
      if (!this.isEnabled || !this.audioContext) return;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = waveType;

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
  }

  static createChord(frequencies, duration, waveType = 'sine') {
    return () => {
      if (!this.isEnabled || !this.audioContext) return;

      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        oscillator.type = waveType;

        const delay = index * 0.05;
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime + delay);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + delay + duration);

        oscillator.start(this.audioContext.currentTime + delay);
        oscillator.stop(this.audioContext.currentTime + delay + duration);
      });
    };
  }

  static createMelody(frequencies, noteDuration) {
    return () => {
      if (!this.isEnabled || !this.audioContext) return;

      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        oscillator.type = 'sine';

        const startTime = this.audioContext.currentTime + (index * noteDuration);
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + noteDuration);

        oscillator.start(startTime);
        oscillator.stop(startTime + noteDuration);
      });
    };
  }

  static play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }

  static playNotification() {
    this.play('notification');
  }

  static playSuccess() {
    this.play('success');
  }

  static playError() {
    this.play('error');
  }

  static playTransition() {
    this.play('transition');
  }

  static playClick() {
    this.play('click');
  }

  static playVictory() {
    this.play('victory');
  }

  static toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  static setEnabled(enabled) {
    this.isEnabled = enabled;
  }
}

// Initialiser le système audio au premier clic utilisateur
let audioInitialized = false;
document.addEventListener('click', () => {
  if (!audioInitialized) {
    SoundManager.init();
    audioInitialized = true;
  }
}, { once: true });