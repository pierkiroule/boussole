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
  },

  // Pack 3 - 12 nouvelles situations réalistes
  
  25: {
    id: 25,
    title: 'Achat caché en ligne',
    chapter: 13,
    category: 'argent',
    description: `Un ado commande discrètement des skins ou options dans un jeu sans prévenir.`,
    target: 'Toute la famille',
    effect: 'Dépenses cachées et perte de confiance',
    educational: 'Transparence financière et responsabilité',
    shieldResponses: {
      security: "Je bloque les achats automatiques.",
      heart: "J'en parle en famille avant d'acheter.",
      liberty: "Je dépense comme je veux, c'est mon argent.",
      respect: "On fixe ensemble un budget numérique."
    }
  },

  26: {
    id: 26,
    title: 'Téléphone dans le salon partagé',
    chapter: 13,
    category: 'partage',
    description: `Un membre regarde des vidéos avec le son fort pendant que d'autres veulent discuter.`,
    target: 'Toute la famille',
    effect: 'Conflits d\'usage et perturbation',
    educational: 'Respect des espaces partagés',
    shieldResponses: {
      security: "Je mets un casque pour ne pas déranger.",
      heart: "Je propose qu'on regarde ensemble.",
      liberty: "Je continue avec le son, c'est mon choix.",
      respect: "On décide : casque obligatoire si on partage la pièce."
    }
  },

  27: {
    id: 27,
    title: 'Comparaison scolaire',
    chapter: 14,
    category: 'estime',
    description: `Un ado voit ses amis poster leurs bonnes notes → il se sent nul.`,
    target: 'Toute la famille',
    effect: 'Baisse de l\'estime de soi et pression scolaire',
    educational: 'Gestion de la pression sociale et estime de soi',
    shieldResponses: {
      security: "Je coupe les réseaux pour protéger mon moral.",
      heart: "J'en parle avec quelqu'un de confiance.",
      liberty: "Je choisis de regarder quand même, ça me motive.",
      respect: "On discute ensemble de la pression scolaire."
    }
  },

  28: {
    id: 28,
    title: 'Appels vidéo permanents',
    chapter: 14,
    category: 'usage',
    description: `Un ado passe des heures en visio avec un ami, micro ouvert non-stop.`,
    target: 'Toute la famille',
    effect: 'Invasion de la vie privée familiale',
    educational: 'Limites et respect de l\'intimité familiale',
    shieldResponses: {
      security: "Je coupe après un certain temps pour me reposer.",
      heart: "J'invite mon ami à se voir en vrai.",
      liberty: "Je continue la visio, ça me rassure.",
      respect: "On établit une règle : pas de visio pendant les repas ou le soir."
    }
  },

  29: {
    id: 29,
    title: 'Vie privée exposée',
    chapter: 15,
    category: 'privacy',
    description: `Un parent filme ses enfants pour publier une story familiale.`,
    target: 'Toute la famille',
    effect: 'Violation du consentement et de la vie privée',
    educational: 'Consentement et respect de l\'image des enfants',
    shieldResponses: {
      security: "Je refuse d'apparaître sans mon accord.",
      heart: "On choisit une photo à partager ensemble.",
      liberty: "J'accepte d'être filmé, c'est ok pour moi.",
      respect: "Règle commune : on demande toujours avant de poster."
    }
  },

  30: {
    id: 30,
    title: 'Notifications pendant le sport',
    chapter: 15,
    category: 'concentration',
    description: `Un ado garde sa montre connectée et s'arrête toutes les 2 minutes pour lire ses messages.`,
    target: 'Toute la famille',
    effect: 'Perturbation de l\'activité physique',
    educational: 'Présence et concentration dans les activités',
    shieldResponses: {
      security: "Je coupe les notifs pour me concentrer sur l'activité.",
      heart: "Je propose de partager mes résultats avec les autres après.",
      liberty: "Je garde mes notifs actives, c'est mon choix.",
      respect: "On fixe une règle : pas de messages pendant le sport collectif."
    }
  },

  31: {
    id: 31,
    title: 'Téléphone en voiture',
    chapter: 16,
    category: 'securite',
    description: `Un ado utilise son téléphone pendant que son parent conduit et lui demande de regarder.`,
    target: 'Toute la famille',
    effect: 'Risque d\'accident et distraction du conducteur',
    educational: 'Sécurité routière et responsabilité',
    shieldResponses: {
      security: "Je refuse, ça peut distraire le conducteur.",
      heart: "On discute ensemble pendant le trajet.",
      liberty: "Je continue de montrer des vidéos, c'est mon choix.",
      respect: "On décide : pas de vidéos quand quelqu'un conduit."
    }
  },

  32: {
    id: 32,
    title: 'Filtres et retouches',
    chapter: 16,
    category: 'estime',
    description: `Un ado ne veut plus poster de photo sans filtre.`,
    target: 'Toute la famille',
    effect: 'Dépendance aux filtres et perte d\'authenticité',
    educational: 'Image de soi authentique et acceptation',
    shieldResponses: {
      security: "Je garde une photo naturelle pour éviter la dépendance au filtre.",
      heart: "Je partage une photo drôle avec filtre pour rigoler ensemble.",
      liberty: "Je garde mes filtres, c'est mon image.",
      respect: "On se met d'accord : pas de retouche trompeuse entre nous."
    }
  },

  33: {
    id: 33,
    title: 'Multitâche impossible',
    chapter: 17,
    category: 'education',
    description: `Un ado fait ses devoirs tout en répondant aux messages d'un groupe.`,
    target: 'Toute la famille',
    effect: 'Baisse de performance scolaire et stress',
    educational: 'Concentration et efficacité dans le travail',
    shieldResponses: {
      security: "Je coupe les messages pour protéger ma concentration.",
      heart: "Je demande à quelqu'un de m'aider à rester focus.",
      liberty: "Je continue à jongler entre devoirs et messages.",
      respect: "On établit une règle : pas de tel pendant les devoirs."
    }
  },

  34: {
    id: 34,
    title: 'Sortie en famille',
    chapter: 17,
    category: 'moments',
    description: `Pendant une balade, un ado reste le nez sur son écran au lieu de profiter du paysage.`,
    target: 'Toute la famille',
    effect: 'Gaspillage des moments précieux en famille',
    educational: 'Présence et profiter du moment présent',
    shieldResponses: {
      security: "Je range mon tel pour éviter de trébucher.",
      heart: "Je prends une photo et je la partage avec la famille.",
      liberty: "Je continue de regarder mon écran, c'est mon choix.",
      respect: "On se met d'accord : pas de téléphone pendant les balades."
    }
  },

  35: {
    id: 35,
    title: 'Console bloquée',
    chapter: 18,
    category: 'partage',
    description: `Un ado refuse de prêter la console à son frère.`,
    target: 'Toute la famille',
    effect: 'Conflits fraternels et exclusion',
    educational: 'Partage et respect des autres',
    shieldResponses: {
      security: "Je propose une pause pour éviter la dispute.",
      heart: "Je propose une partie en duo.",
      liberty: "Je garde la console pour moi, c'est mon choix.",
      respect: "On établit des tours de jeu équitables."
    }
  },

  36: {
    id: 36,
    title: 'Réunions familiales perturbées',
    chapter: 18,
    category: 'communication',
    description: `Pendant une réunion familiale, un ado scrolle sous la table.`,
    target: 'Toute la famille',
    effect: 'Rupture de communication et manque de respect',
    educational: 'Écoute active et respect des moments familiaux',
    shieldResponses: {
      security: "Je range mon tel pour rester concentré.",
      heart: "Je participe activement à la discussion.",
      liberty: "Je garde mon tel, c'est mon choix.",
      respect: "On fixe une règle : pas de téléphone pendant les discussions familiales."
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