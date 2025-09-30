// Configuration générale du jeu "Le Wifou"

export const GAME_CONFIG = {
  // Configuration des joueurs
  PLAYERS: {
    MIN_PLAYERS: 2,
    MAX_PLAYERS: 6,
    DEFAULT_PLAYERS: 4
  },

  // Configuration des parties
  GAME_DURATIONS: {
    SHORT: {
      id: 'short',
      label: 'Partie courte',
      turns: 5,
      estimatedTime: '15 min',
      description: 'Idéal pour jouer en famille sans complexité',
      attacks: [1, 2, 3, 4, 5] // 5 attaques réalistes pour la version familiale
    },
    NORMAL: {
      id: 'normal',
      label: 'Partie normale',
      turns: 8,
      estimatedTime: '25 min',
      description: 'Expérience équilibrée',
      attacks: [1, 2, 3, 4, 5, 6, 7, 8] // 8 attaques réalistes
    },
    LONG: {
      id: 'long',
      label: 'Partie longue',
      turns: 12,
      estimatedTime: '35 min',
      description: 'Aventure complète avec toutes les situations',
      attacks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // Toutes les 12 attaques réalistes
    },
    MARATHON: {
      id: 'marathon',
      label: 'Partie marathon',
      turns: 20,
      estimatedTime: '50 min',
      description: 'Épopée légendaire',
      attacks: 'random' // Attaques aléatoires parmi les 12 situations réalistes
    }
  },

  // Système de points
  SCORING: {
    PHARMAKON_POINTS_PER_TURN: 3,
    MAX_POINTS_PER_PLAYER_PER_TURN: 3,
    MIN_POINTS_PER_PLAYER_PER_TURN: 0
  },

  // Messages du jeu
  MESSAGES: {
    WELCOME: "🛡️ Bienvenue, Gardiens !",
    GAME_START: "🌅 L'aventure commence...",
    GAME_END: "✨ Le Wifou est chassé ! L'harmonie est restaurée !",
    MASTER_ROTATION: "🔄 Le Maître Gardien change...",
    PHARMAKON_DISTRIBUTION: "💊 Distribution des points Pharmakon...",
    SHIELD_ACTIVATION: "🛡️ Bouclier activé !",
    ATTACK_REVEAL: "👻 Le Wifou lance son attaque !"
  },

  // Configuration de l'interface
  UI: {
    ANIMATION_DURATION: 300,
    TYPING_SPEED: 50,
    FADE_IN_DURATION: 500,
    BUTTON_HOVER_SCALE: 1.05
  },

  // Configuration des boucliers
  SHIELD_CONFIG: {
    SECURITY: { color: '#F59E0B', bgColor: '#FFFBEB', borderColor: '#F59E0B' },
    HEART: { color: '#EF4444', bgColor: '#FEF2F2', borderColor: '#EF4444' },
    LIBERTY: { color: '#3B82F6', bgColor: '#EFF6FF', borderColor: '#3B82F6' },
    RESPECT: { color: '#10B981', bgColor: '#F0FDF4', borderColor: '#10B981' }
  }
};

// Fonction pour obtenir la configuration d'une durée de jeu
export function getGameDurationConfig(durationId) {
  return Object.values(GAME_CONFIG.GAME_DURATIONS).find(duration => duration.id === durationId);
}

// Fonction pour obtenir toutes les durées disponibles
export function getAllGameDurations() {
  return Object.values(GAME_CONFIG.GAME_DURATIONS);
}

// Fonction pour valider le nombre de joueurs
export function validatePlayerCount(count) {
  return count >= GAME_CONFIG.PLAYERS.MIN_PLAYERS && count <= GAME_CONFIG.PLAYERS.MAX_PLAYERS;
}

// Fonction pour obtenir la configuration d'un bouclier
export function getShieldConfig(shieldId) {
  return GAME_CONFIG.SHIELD_CONFIG[shieldId.toUpperCase()];
}