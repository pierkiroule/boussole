// Les 4 Boucliers de Défense contre le Wifou

export const SHIELDS = {
  SECURITY: {
    id: 'security',
    name: 'Sécurité',
    emoji: '🔒',
    color: '#F59E0B',
    description: 'Se protéger, éviter le danger',
    power: 'Bloque les menaces et préserve l\'intégrité',
    protectsAgainst: 'Les dangers et les manipulations',
    example: 'Bloquer les notifications toxiques et protéger la vie privée'
  },
  HEART: {
    id: 'heart',
    name: 'Lien',
    emoji: '❤️',
    color: '#EF4444',
    description: 'Renforcer les relations',
    power: 'Renforce l\'amour et la solidarité familiale',
    protectsAgainst: 'L\'isolement et la déconnexion émotionnelle',
    example: 'Renforcer les liens familiaux en passant du temps ensemble sans écran'
  },
  LIBERTY: {
    id: 'liberty',
    name: 'Liberté',
    emoji: '🆓',
    color: '#3B82F6',
    description: 'Dire NON, choisir par soi-même',
    power: 'Donne le pouvoir de dire "NON" et de choisir librement',
    protectsAgainst: 'L\'asservissement et la manipulation',
    example: 'Libérer Léa en lui donnant le choix conscient de regarder TikTok ou non'
  },
  RESPECT: {
    id: 'respect',
    name: 'Respect',
    emoji: '🤝',
    color: '#10B981',
    description: 'Vivre ensemble avec justice',
    power: 'Établit des limites saines et équitables',
    protectsAgainst: 'Le chaos et l\'excès',
    example: 'Établir des règles équitables pour tous les membres de la famille'
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