// Configuration générale du jeu "Les Gardiens de l'Esprit Familial"

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
      description: 'Idéal pour débuter',
      attacks: [1, 2, 3, 4, 5] // 1 chapitre + 1 attaque du chapitre 2
    },
    NORMAL: {
      id: 'normal',
      label: 'Partie normale',
      turns: 8,
      estimatedTime: '25 min',
      description: 'Expérience équilibrée',
      attacks: [1, 2, 3, 4, 5, 6, 7, 8] // 2 chapitres complets
    },
    LONG: {
      id: 'long',
      label: 'Partie longue',
      turns: 12,
      estimatedTime: '35 min',
      description: 'Aventure complète',
      attacks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // 3 chapitres complets
    },
    MARATHON: {
      id: 'marathon',
      label: 'Partie marathon',
      turns: 20,
      estimatedTime: '50 min',
      description: 'Épopée légendaire',
      attacks: 'random' // Attaques aléatoires de tous les chapitres
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
    WELCOME: "🛡️ Bienvenue, Gardiens de l'Esprit Familial !",
    GAME_START: "🌅 L'aventure commence...",
    GAME_END: "✨ L'esprit familial est sauvé !",
    MASTER_ROTATION: "🔄 Le Maître Gardien change...",
    PHARMAKON_DISTRIBUTION: "💊 Distribution des points Pharmakon...",
    SHIELD_ACTIVATION: "🛡️ Bouclier activé !",
    ATTACK_REVEAL: "👻 Le Wi-Fou lance son attaque !"
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
    LIBERTY: { color: '#3B82F6', bgColor: '#EFF6FF', borderColor: '#3B82F6' },
    HEART: { color: '#EF4444', bgColor: '#FEF2F2', borderColor: '#EF4444' },
    RULES: { color: '#10B981', bgColor: '#F0FDF4', borderColor: '#10B981' },
    SECURITY: { color: '#F59E0B', bgColor: '#FFFBEB', borderColor: '#F59E0B' }
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