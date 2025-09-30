// Attaques du Wifou - Version courte 5 tours pour famille

export const ATTACKS = {
  // Version courte - 5 attaques simples pour famille
  
  1: {
    id: 1,
    title: 'Le Repas TikTok',
    chapter: 1,
    category: 'repas',
    description: `Au dîner, le Wi-Fou impose que chaque assiette diffuse un TikTok en direct !`,
    target: 'La table familiale',
    effect: 'Distraction pendant les repas',
    educational: 'Repas en famille, attention et lien social'
  },

  2: {
    id: 2,
    title: 'La Chaise Connectée',
    chapter: 1,
    category: 'repas',
    description: `Une chaise envoie un message : "Pas de place pour toi sans ton smartphone !"`,
    target: 'Toute la famille',
    effect: 'Exclusion sociale liée aux écrans',
    educational: 'Pression sociale et conformité numérique'
  },

  3: {
    id: 3,
    title: 'La Nuit des Notifications',
    chapter: 2,
    category: 'sommeil',
    description: `Minuit. Le Wi-Fou bombarde la chambre d'alertes fantômes !`,
    target: 'Toute la famille',
    effect: 'Perturbation du sommeil',
    educational: 'Importance du sommeil et déconnexion nocturne'
  },

  4: {
    id: 4,
    title: 'Le Défi TikTok',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wi-Fou oblige toute la famille à danser en direct devant 10 000 spectateurs !`,
    target: 'Toute la famille',
    effect: 'Exposition publique forcée',
    educational: 'Vie privée et pression des réseaux sociaux'
  },

  5: {
    id: 5,
    title: 'Le Mot de Passe Volé',
    chapter: 4,
    category: 'securite',
    description: `Le Wi-Fou a peint tous les mots de passe secrets sur les murs de la maison !`,
    target: 'Toute la famille',
    effect: 'Perte de sécurité des comptes',
    educational: 'Sécurité des comptes et protection des données'
  }
};

// Fonction pour obtenir une attaque par ID
export function getAttackById(id) {
  return ATTACKS[id];
}

// Fonction pour obtenir toutes les attaques
export function getAllAttacks() {
  return Object.values(ATTACKS);
}

// Fonction pour obtenir les attaques d'un chapitre
export function getAttacksByChapter(chapterNumber) {
  return Object.values(ATTACKS).filter(attack => attack.chapter === chapterNumber);
}

// Fonction pour obtenir les attaques d'une catégorie
export function getAttacksByCategory(category) {
  return Object.values(ATTACKS).filter(attack => attack.category === category);
}

// Catégories disponibles
export const ATTACK_CATEGORIES = {
  REPAS: 'repas',
  SOMMEIL: 'sommeil',
  RESEAUX: 'reseaux',
  SECURITE: 'securite'
};