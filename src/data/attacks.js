// Attaques du Wifou - Pack de 12 situations réalistes pour famille

export const ATTACKS = {
  // Pack de 12 situations réalistes de conflits familiaux autour du numérique
  
  1: {
    id: 1,
    title: 'Téléphone à table',
    chapter: 1,
    category: 'repas',
    description: `Au repas, un membre garde son téléphone et ne parle plus.`,
    target: 'La table familiale',
    effect: 'Rupture de communication pendant les repas',
    educational: 'Repas en famille, attention et lien social',
    shieldResponses: {
      security: "Je coupe les notifications pour manger tranquille.",
      heart: "Je propose un tour de table d'histoires réelles.",
      liberty: "Je décide de poser mon téléphone, même si les autres le gardent.",
      respect: "On se met d'accord : pas de téléphone à table pour tout le monde."
    }
  },

  2: {
    id: 2,
    title: 'Téléphone la nuit',
    chapter: 1,
    category: 'sommeil',
    description: `Un ado garde son smartphone sous l'oreiller et dort mal.`,
    target: 'Toute la famille',
    effect: 'Perturbation du sommeil',
    educational: 'Importance du sommeil et déconnexion nocturne',
    shieldResponses: {
      security: "Je pose le téléphone hors de la chambre.",
      heart: "On discute avant de dormir pour se détendre.",
      liberty: "Je choisis moi-même quand j'éteins mon téléphone.",
      respect: "Nouvelle règle : pas de téléphones dans les chambres."
    }
  },

  3: {
    id: 3,
    title: 'Temps d\'écran excessif',
    chapter: 2,
    category: 'usage',
    description: `Un enfant joue aux jeux vidéo depuis 3 heures sans pause.`,
    target: 'Toute la famille',
    effect: 'Surconsommation numérique',
    educational: 'Gestion du temps d\'écran et équilibre',
    shieldResponses: {
      security: "Je m'arrête pour reposer mes yeux et mon corps.",
      heart: "Je propose une activité avec quelqu'un de la famille.",
      liberty: "Je choisis de continuer, c'est mon moment.",
      respect: "On fixe ensemble un temps raisonnable d'écran."
    }
  },

  4: {
    id: 4,
    title: 'Photo publiée sans accord',
    chapter: 2,
    category: 'privacy',
    description: `Un frère ou un parent poste une photo sans demander.`,
    target: 'Toute la famille',
    effect: 'Violation de la vie privée',
    educational: 'Respect de la vie privée et consentement',
    shieldResponses: {
      security: "Je demande à la supprimer, c'est privé.",
      heart: "J'en parle calmement pour garder la relation.",
      liberty: "Je choisis ce que je veux publier de moi.",
      respect: "On établit une règle : toujours demander avant de poster."
    }
  },

  5: {
    id: 5,
    title: 'Jeu en ligne tard le soir',
    chapter: 3,
    category: 'sommeil',
    description: `Un ado joue en ligne jusqu'à minuit au lieu de dormir.`,
    target: 'Toute la famille',
    effect: 'Perturbation du rythme de sommeil',
    educational: 'Rythme de vie et sommeil réparateur',
    shieldResponses: {
      security: "Je coupe le jeu pour protéger mon sommeil.",
      heart: "Je joue un peu mais je préviens mes amis que je pars tôt.",
      liberty: "Je continue, c'est mon choix.",
      respect: "On décide ensemble d'une heure limite."
    }
  },

  6: {
    id: 6,
    title: 'Devoirs interrompus',
    chapter: 3,
    category: 'education',
    description: `Un ado garde son téléphone à côté en travaillant → messages et vidéos interrompent la concentration.`,
    target: 'Toute la famille',
    effect: 'Baisse de concentration et résultats scolaires',
    educational: 'Concentration et apprentissage efficace',
    shieldResponses: {
      security: "Je mets le tel en mode avion pour me protéger des distractions.",
      heart: "Je demande de l'aide pour rester concentré.",
      liberty: "Je choisis d'écouter de la musique sur mon tel en bossant.",
      respect: "On fixe une règle : téléphone rangé pendant les devoirs."
    }
  },

  7: {
    id: 7,
    title: 'Mot de passe partagé',
    chapter: 4,
    category: 'securite',
    description: `Un copain demande ton mot de passe pour jouer avec ton compte.`,
    target: 'Toute la famille',
    effect: 'Risque de sécurité des comptes',
    educational: 'Sécurité des comptes et protection des données',
    shieldResponses: {
      security: "Je garde mon mot de passe secret.",
      heart: "Je propose de jouer ensemble autrement.",
      liberty: "Je partage mon mot de passe, c'est mon choix.",
      respect: "On établit : jamais partager de mot de passe."
    }
  },

  8: {
    id: 8,
    title: 'Conflit d\'équité',
    chapter: 4,
    category: 'equite',
    description: `Un ado dit : "Papa, toi tu es toujours sur ton tel mais moi j'ai pas le droit !"`,
    target: 'Toute la famille',
    effect: 'Injustice perçue et conflit familial',
    educational: 'Équité et cohérence des règles familiales',
    shieldResponses: {
      security: "Je montre l'exemple en posant mon téléphone.",
      heart: "Je prends un moment pour échanger avec toi sans écran.",
      liberty: "Je garde mon téléphone, chacun son usage.",
      respect: "On discute d'une règle valable pour tout le monde."
    }
  },

  9: {
    id: 9,
    title: 'Isolement dans la chambre',
    chapter: 5,
    category: 'isolement',
    description: `Un ado passe ses soirées seul avec son écran, sans voir la famille.`,
    target: 'Toute la famille',
    effect: 'Isolement social et déconnexion familiale',
    educational: 'Équilibre entre temps personnel et familial',
    shieldResponses: {
      security: "Je fais une pause pour protéger mon équilibre.",
      heart: "Je rejoins les autres pour un moment partagé.",
      liberty: "Je choisis de rester dans ma chambre, c'est mon espace.",
      respect: "On se met d'accord : au moins un moment ensemble chaque soir."
    }
  },

  10: {
    id: 10,
    title: 'Notifications envahissantes',
    chapter: 5,
    category: 'concentration',
    description: `Pendant un film en famille, des téléphones sonnent sans arrêt.`,
    target: 'Toute la famille',
    effect: 'Perturbation des moments partagés',
    educational: 'Présence et attention aux autres',
    shieldResponses: {
      security: "Je coupe le son pour profiter du film.",
      heart: "On commente ensemble le film sans écran parasite.",
      liberty: "Je garde mon tel actif, je choisis.",
      respect: "On fixe une règle : mode silencieux pendant le film."
    }
  },

  11: {
    id: 11,
    title: 'Achat en ligne imprévu',
    chapter: 6,
    category: 'argent',
    description: `Un enfant commande un jeu en ligne sans prévenir.`,
    target: 'Toute la famille',
    effect: 'Dépenses non contrôlées',
    educational: 'Gestion de l\'argent et responsabilité',
    shieldResponses: {
      security: "Je bloque les achats automatiques.",
      heart: "On en discute ensemble avant tout achat.",
      liberty: "Je choisis mes achats numériques.",
      respect: "On établit une règle : toujours demander avant de payer."
    }
  },

  12: {
    id: 12,
    title: 'Comparaison sociale',
    chapter: 6,
    category: 'estime',
    description: `Un ado voit des photos "parfaites" d'autres familles et se sent inadéquat.`,
    target: 'Toute la famille',
    effect: 'Baisse de l\'estime de soi',
    educational: 'Image de soi et réalité vs réseaux sociaux',
    shieldResponses: {
      security: "Je limite mon temps sur les réseaux sociaux.",
      heart: "On parle de nos vraies forces en famille.",
      liberty: "Je choisis de ne pas me comparer aux autres.",
      respect: "On établit : pas de comparaison, chacun est unique."
    }
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