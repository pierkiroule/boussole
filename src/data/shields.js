// Les 4 Boucliers de Défense des Gardiens de l'Esprit Familial

export const SHIELDS = {
  LIBERTY: {
    id: 'liberty',
    name: 'Bouclier de Liberté',
    emoji: '🆓',
    color: '#3B82F6',
    description: 'Le bouclier du choix conscient',
    power: 'Donne le pouvoir de dire "NON" et de choisir librement',
    protectsAgainst: 'L\'asservissement et la manipulation',
    example: 'Libérer Léa en lui donnant le choix conscient de regarder TikTok ou non'
  },
  HEART: {
    id: 'heart',
    name: 'Bouclier du Cœur',
    emoji: '❤️',
    color: '#EF4444',
    description: 'Le bouclier des liens familiaux',
    power: 'Renforce l\'amour et la solidarité familiale',
    protectsAgainst: 'L\'isolement et la déconnexion émotionnelle',
    example: 'Renforcer les liens familiaux en passant du temps ensemble sans écran'
  },
  RULES: {
    id: 'rules',
    name: 'Bouclier des Règles',
    emoji: '📋',
    color: '#10B981',
    description: 'Le bouclier du cadre protecteur',
    power: 'Établit des limites saines et équitables',
    protectsAgainst: 'Le chaos et l\'excès',
    example: 'Établir une règle : TikTok limité à 30 minutes par jour'
  },
  SECURITY: {
    id: 'security',
    name: 'Bouclier de Sécurité',
    emoji: '🔒',
    color: '#F59E0B',
    description: 'Le bouclier de la protection',
    power: 'Bloque les menaces et préserve l\'intégrité',
    protectsAgainst: 'Les dangers et les manipulations',
    example: 'Bloquer les notifications toxiques et protéger la vie privée'
  }
};

// Fonction pour obtenir un bouclier par ID
export function getShieldById(id) {
  return Object.values(SHIELDS).find(shield => shield.id === id);
}

// Fonction pour obtenir tous les boucliers
export function getAllShields() {
  return Object.values(SHIELDS);
}

// Fonction pour obtenir les boucliers sous forme de tableau pour l'interface
export function getShieldsForUI() {
  return Object.values(SHIELDS).map(shield => ({
    value: shield.id,
    label: `${shield.emoji} ${shield.name}`,
    description: shield.description
  }));
}