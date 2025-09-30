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
  },

  // Pack 2 - 12 nouvelles situations réalistes
  
  13: {
    id: 13,
    title: 'Séries en continu',
    chapter: 7,
    category: 'sommeil',
    description: `Un ado enchaîne les épisodes jusqu'à 3h du matin.`,
    target: 'Toute la famille',
    effect: 'Perturbation du sommeil et fatigue',
    educational: 'Gestion du temps et sommeil réparateur',
    shieldResponses: {
      security: "J'éteins pour protéger mon sommeil.",
      heart: "Je propose de regarder ensemble demain.",
      liberty: "Je continue, c'est mon choix.",
      respect: "On se met d'accord sur une limite d'épisodes."
    }
  },

  14: {
    id: 14,
    title: 'Téléphone au collège',
    chapter: 7,
    category: 'education',
    description: `Un élève sort son téléphone en classe malgré l'interdiction.`,
    target: 'Toute la famille',
    effect: 'Problèmes disciplinaires et baisse de concentration',
    educational: 'Respect des règles et concentration en cours',
    shieldResponses: {
      security: "Je le range pour éviter les problèmes.",
      heart: "Je l'utilise seulement pour un message urgent.",
      liberty: "Je choisis de le garder, même si c'est risqué.",
      respect: "On suit la règle : pas de téléphone en cours."
    }
  },

  15: {
    id: 15,
    title: 'Casque en permanence',
    chapter: 8,
    category: 'isolement',
    description: `Un ado garde ses écouteurs toute la journée, même en famille.`,
    target: 'Toute la famille',
    effect: 'Isolement et rupture de communication',
    educational: 'Présence et écoute des autres',
    shieldResponses: {
      security: "J'enlève le casque pour rester attentif autour de moi.",
      heart: "Je partage ma musique avec les autres.",
      liberty: "Je garde mes écouteurs, ça me rassure.",
      respect: "On décide : pas d'écouteurs pendant les repas."
    }
  },

  16: {
    id: 16,
    title: 'Streaming perso',
    chapter: 8,
    category: 'privacy',
    description: `Un ado veut streamer sa partie de jeu en direct.`,
    target: 'Toute la famille',
    effect: 'Exposition publique et risques de sécurité',
    educational: 'Vie privée et sécurité en ligne',
    shieldResponses: {
      security: "Je vérifie que ma caméra est coupée.",
      heart: "Je propose un stream avec mes amis proches seulement.",
      liberty: "Je décide de streamer, c'est mon choix.",
      respect: "On fixe des règles avant de diffuser en ligne."
    }
  },

  17: {
    id: 17,
    title: 'Amis virtuels',
    chapter: 9,
    category: 'securite',
    description: `Un ado discute chaque soir avec un ami qu'il n'a jamais rencontré en vrai.`,
    target: 'Toute la famille',
    effect: 'Risques de sécurité et manipulation',
    educational: 'Prudence avec les relations en ligne',
    shieldResponses: {
      security: "Je vérifie qui c'est vraiment.",
      heart: "Je partage cette relation avec mes parents.",
      liberty: "Je continue de parler avec lui, c'est mon choix.",
      respect: "On décide ensemble de ce qui est prudent de partager."
    }
  },

  18: {
    id: 18,
    title: 'Téléphone pendant les devoirs en groupe',
    chapter: 9,
    category: 'education',
    description: `Un ado consulte TikTok au lieu d'aider ses camarades.`,
    target: 'Toute la famille',
    effect: 'Échec du travail de groupe et conflits',
    educational: 'Coopération et respect des autres',
    shieldResponses: {
      security: "Je range mon tel pour me concentrer.",
      heart: "On s'entraide d'abord, ensuite on regarde ensemble.",
      liberty: "Je choisis de garder mon tel pendant les devoirs.",
      respect: "On se met d'accord : pas de réseaux sociaux pendant les devoirs."
    }
  },

  19: {
    id: 19,
    title: 'Publicité cachée',
    chapter: 10,
    category: 'argent',
    description: `Un jeu gratuit pousse à acheter des options payantes.`,
    target: 'Toute la famille',
    effect: 'Dépenses imprévues et addiction aux achats',
    educational: 'Marketing et manipulation commerciale',
    shieldResponses: {
      security: "Je bloque les achats intégrés.",
      heart: "Je demande conseil avant d'acheter.",
      liberty: "J'achète, c'est mon choix.",
      respect: "On décide ensemble d'un budget jeux."
    }
  },

  20: {
    id: 20,
    title: 'Télétravail et partage du Wi-Fi',
    chapter: 10,
    category: 'equite',
    description: `Un parent a besoin du Wi-Fi pour travailler, un ado l'utilise pour YouTube en 4K.`,
    target: 'Toute la famille',
    effect: 'Conflits d\'usage et problèmes professionnels',
    educational: 'Partage équitable des ressources',
    shieldResponses: {
      security: "Je coupe la vidéo pour ne pas faire bugger.",
      heart: "Je propose de regarder ensemble plus tard.",
      liberty: "Je continue, j'ai le droit d'utiliser le Wi-Fi.",
      respect: "On fixe une priorité au travail pendant les heures critiques."
    }
  },

  21: {
    id: 21,
    title: 'Contenu choquant',
    chapter: 11,
    category: 'securite',
    description: `Un ado tombe sur une vidéo violente.`,
    target: 'Toute la famille',
    effect: 'Traumatisme et exposition à la violence',
    educational: 'Protection contre les contenus inappropriés',
    shieldResponses: {
      security: "Je quitte la vidéo immédiatement.",
      heart: "J'en parle à quelqu'un de confiance.",
      liberty: "Je choisis de continuer à regarder.",
      respect: "On discute en famille de ce qu'on regarde ou pas."
    }
  },

  22: {
    id: 22,
    title: 'Groupe WhatsApp de classe',
    chapter: 11,
    category: 'concentration',
    description: `Un groupe envoie des dizaines de messages par heure → ça envahit.`,
    target: 'Toute la famille',
    effect: 'Surstimulation et perte de concentration',
    educational: 'Gestion des notifications et attention',
    shieldResponses: {
      security: "Je coupe les notifs.",
      heart: "Je participe seulement aux échanges utiles.",
      liberty: "Je reste actif dans le groupe, c'est mon choix.",
      respect: "On fixe ensemble des horaires raisonnables."
    }
  },

  23: {
    id: 23,
    title: 'Console dans le salon',
    chapter: 12,
    category: 'partage',
    description: `Un ado monopolise la console toute la journée.`,
    target: 'Toute la famille',
    effect: 'Exclusion des autres et conflits familiaux',
    educational: 'Partage et respect des autres',
    shieldResponses: {
      security: "Je fais une pause pour ne pas me fatiguer.",
      heart: "Je propose une partie en multijoueur.",
      liberty: "Je continue seul, j'ai envie.",
      respect: "On organise des tours de jeu pour tout le monde."
    }
  },

  24: {
    id: 24,
    title: 'Vacances connectées',
    chapter: 12,
    category: 'moments',
    description: `En vacances, tout le monde reste sur son écran au lieu de profiter.`,
    target: 'Toute la famille',
    effect: 'Gaspillage des moments précieux',
    educational: 'Présence et profiter du moment présent',
    shieldResponses: {
      security: "Je mets le téléphone de côté pour ne pas me distraire.",
      heart: "Je propose une activité dehors avec la famille.",
      liberty: "Je garde mon téléphone, c'est ma façon de profiter.",
      respect: "On décide ensemble de moments sans écran."
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