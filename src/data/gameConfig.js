// Configuration générale du jeu "Le Wifou"

export const GAME_CONFIG = {
  // Configuration des joueurs
  PLAYERS: {
    MIN_PLAYERS: 2,
    MAX_PLAYERS: 6,
    DEFAULT_PLAYERS: 4
  },

  // Configuration des parties - Partie courte fixe de 15 minutes
  GAME_DURATIONS: {
    SHORT: {
      id: 'short',
      label: 'Partie courte',
      turns: 5,
      estimatedTime: '15 min',
      description: 'Idéal pour jouer en famille sans complexité',
      attacks: [1, 2, 3, 4, 5] // 5 situations fondamentales
    }
  },

  // Système de points
  SCORING: {
    PHARMAKON_POINTS_PER_TURN: 3,
    MAX_POINTS_PER_PLAYER_PER_TURN: 3,
    MIN_POINTS_PER_PLAYER_PER_TURN: 0
  },

  // Messages du jeu - Thème Gothique
  MESSAGES: {
    WELCOME: "🦇 Bienvenue, Gardiens des Ténèbres !",
    GAME_START: "🌙 Le rituel commence...",
    GAME_END: "🦇 Le Wifou est banni ! L'équilibre mystique est restauré !",
    MASTER_ROTATION: "🔄 Le Maître des Ténèbres change...",
    PHARMAKON_DISTRIBUTION: "⚗️ Distribution des élixirs mystiques...",
    SHIELD_ACTIVATION: "🛡️ Bouclier des anciens activé !",
    ATTACK_REVEAL: "👻 Le Wifou lance son sort maléfique !"
  },

  // Configuration de l'interface
  UI: {
    ANIMATION_DURATION: 300,
    TYPING_SPEED: 50,
    FADE_IN_DURATION: 500,
    BUTTON_HOVER_SCALE: 1.05
  },

  // Configuration des boucliers - Thème Gothique
  SHIELD_CONFIG: {
    SECURITY: { color: '#8B4513', bgColor: '#2D1B00', borderColor: '#8B4513' },
    HEART: { color: '#DC143C', bgColor: '#2D0000', borderColor: '#DC143C' },
    LIBERTY: { color: '#9370DB', bgColor: '#1A0033', borderColor: '#9370DB' },
    RESPECT: { color: '#228B22', bgColor: '#002D00', borderColor: '#228B22' }
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

// Fonction pour obtenir une attaque aléatoire pour les parties marathon
export function getRandomAttackId() {
  // Génère un ID aléatoire entre 1 et 100 pour les situations de la famille Déboussolée
  return Math.floor(Math.random() * 100) + 1;
}

// Fonction pour obtenir les attaques d'une durée de jeu (gère les attaques aléatoires)
export function getAttacksForDuration(durationId) {
  const duration = GAME_CONFIG.GAME_DURATIONS[durationId.toUpperCase()];
  if (!duration) return [];
  
  if (duration.attacks === 'random') {
    // Pour les parties marathon, génère des attaques aléatoires
    const randomAttacks = [];
    for (let i = 0; i < duration.turns; i++) {
      randomAttacks.push(getRandomAttackId());
    }
    return randomAttacks;
  }
  
  return duration.attacks;
}