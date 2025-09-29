// Rôles dynamiques pour que tous les joueurs participent activement
// Chaque joueur peut incarner différents rôles selon les situations

export const DYNAMIC_ROLES = {
  'WiFou': {
    name: '👻 Agent Wi-Fou',
    description: 'Vous incarnez les forces du chaos numérique',
    objective: 'Créer de la confusion, des conflits et des problèmes numériques',
    color: 'bg-red-500',
    icon: '👻',
    strategies: [
      'Créer de la dépendance aux écrans',
      'Isoler les membres de la famille',
      'Générer des conflits sur les règles numériques',
      'Exploiter les faiblesses de sécurité',
      'Manipuler les émotions par le numérique'
    ],
    victoryCondition: 'Accumuler des points de "déboussolage"',
    speechStyle: 'Provocateur, manipulateur, mais avec des arguments séducteurs'
  },
  'Cleaner': {
    name: '🛡️ Agent Cleaner',
    description: 'Vous incarnez les forces de l\'équilibre numérique',
    objective: 'Restaurer l\'harmonie familiale et l\'usage responsable',
    color: 'bg-blue-500',
    icon: '🛡️',
    strategies: [
      'Proposer des solutions équilibrées',
      'Éduquer sur les bonnes pratiques',
      'Créer du dialogue familial',
      'Renforcer la sécurité numérique',
      'Promouvoir les activités alternatives'
    ],
    victoryCondition: 'Accumuler des points de "reboussolage"',
    speechStyle: 'Raisonné, éducatif, constructif mais pas moralisateur'
  },
  'Parent': {
    name: '👨‍👩‍👧‍👦 Parent Déboussolé',
    description: 'Vous incarnez un parent de la famille Déboussolée',
    objective: 'Protéger vos enfants tout en gérant vos propres usages numériques',
    color: 'bg-green-500',
    icon: '👨‍👩‍👧‍👦',
    strategies: [
      'Établir des règles pour protéger',
      'Chercher l\'équilibre entre sécurité et liberté',
      'Gérer vos propres contradictions numériques',
      'Éduquer par l\'exemple',
      'Maintenir l\'autorité parentale'
    ],
    victoryCondition: 'Trouver des solutions qui satisfont tout le monde',
    speechStyle: 'Protecteur, parfois contradictoire, soucieux du bien-être familial'
  },
  'Ado': {
    name: '🎮 Ado Déboussolé(e)',
    description: 'Vous incarnez un adolescent de la famille Déboussolée',
    objective: 'Défendre votre liberté numérique tout en restant en sécurité',
    color: 'bg-purple-500',
    icon: '🎮',
    strategies: [
      'Réclamer plus de liberté numérique',
      'Négocier des règles plus flexibles',
      'Défendre votre vie privée',
      'Trouver des compromis acceptables',
      'Éduquer vos parents sur le numérique'
    ],
    victoryCondition: 'Obtenir plus d\'autonomie numérique',
    speechStyle: 'Révolté mais intelligent, parfois immature, cherche l\'indépendance'
  },
  'Enfant': {
    name: '🧸 Enfant Déboussolé(e)',
    description: 'Vous incarnez un enfant de la famille Déboussolée',
    objective: 'Comprendre les règles et rester en sécurité',
    color: 'bg-yellow-500',
    icon: '🧸',
    strategies: [
      'Poser des questions sur les règles',
      'Exprimer vos besoins simplement',
      'Chercher à comprendre pourquoi',
      'Proposer des solutions simples',
      'Rester curieux et ouvert'
    ],
    victoryCondition: 'Comprendre et accepter les règles',
    speechStyle: 'Naïf mais perspicace, pose les bonnes questions, cherche à comprendre'
  },
  'Expert': {
    name: '🔬 Expert Numérique',
    description: 'Vous incarnez un expert en éducation numérique',
    objective: 'Apporter des connaissances et des solutions éclairées',
    color: 'bg-indigo-500',
    icon: '🔬',
    strategies: [
      'Apporter des données et des faits',
      'Proposer des solutions basées sur la recherche',
      'Éduquer sur les risques et bénéfices',
      'Suggérer des outils et méthodes',
      'Médier les conflits avec expertise'
    ],
    victoryCondition: 'Voir vos recommandations adoptées',
    speechStyle: 'Factuel, éducatif, neutre mais engagé pour le bien commun'
  }
};

// Situations de débat où tous les rôles peuvent s'exprimer
export const DEBATE_SCENARIOS = [
  {
    id: 'DEB-001',
    title: 'La Crise du WiFi Familial',
    situation: 'Le WiFi familial est surchargé. Léo (15 ans) veut regarder Netflix, Emma (12 ans) fait ses devoirs en ligne, papa travaille en visioconférence, et maman veut appeler sa mère. Tout le monde se dispute pour l\'accès. Le Wi-Fou ricane dans l\'ombre...',
    stakes: 'Qui va contrôler la paix numérique familiale ?',
    roles: {
      'WiFou': 'Exploitez cette situation pour créer le maximum de chaos !',
      'Cleaner': 'Proposez des solutions équitables pour tous !',
      'Parent': 'Vous devez gérer cette crise en gardant l\'autorité !',
      'Ado': 'Défendez votre droit de vous détendre !',
      'Enfant': 'Vous avez besoin d\'internet pour l\'école !',
      'Expert': 'Apportez votre expertise technique et éducative !'
    },
    debateQuestions: [
      'Comment répartir équitablement l\'accès au WiFi ?',
      'Quelles priorités établir entre travail, école et loisirs ?',
      'Comment éviter ce type de conflit à l\'avenir ?'
    ]
  },
  {
    id: 'DEB-002',
    title: 'L\'Addiction de Sarah',
    situation: 'Sarah (16 ans) passe 10h par jour sur TikTok et Instagram. Ses notes chutent, elle ne dort plus, et sa famille s\'inquiète. Elle refuse de réduire son usage et dit que "tout le monde fait pareil". Le Wi-Fou se frotte les mains...',
    stakes: 'L\'avenir scolaire et la santé mentale de Sarah !',
    roles: {
      'WiFou': 'Renforcez son addiction et isolez-la de sa famille !',
      'Cleaner': 'Aidez Sarah à retrouver l\'équilibre !',
      'Parent': 'Vous êtes inquiet(e) mais ne savez pas comment agir !',
      'Ado': 'Défendez Sarah, elle a le droit de faire ce qu\'elle veut !',
      'Enfant': 'Vous ne comprenez pas pourquoi c\'est un problème !',
      'Expert': 'Apportez des solutions basées sur la recherche !'
    },
    debateQuestions: [
      'Comment aider Sarah sans la braquer ?',
      'Quelles sont les vraies causes de cette addiction ?',
      'Comment prévenir ce problème chez les autres enfants ?'
    ]
  },
  {
    id: 'DEB-003',
    title: 'Le Scandale des Mots de Passe',
    situation: 'Les parents ont découvert que Tom (13 ans) a donné ses identifiants à un "ami" en ligne qui s\'est avéré être un prédateur. La famille est en panique. Tom dit qu\'il ne savait pas, les parents veulent tout contrôler, et le Wi-Fou jubile...',
    stakes: 'La sécurité de Tom et la confiance familiale !',
    roles: {
      'WiFou': 'Créez de la panique et de la méfiance totale !',
      'Cleaner': 'Gérez la crise en renforçant la sécurité !',
      'Parent': 'Vous êtes terrifié(e) et voulez tout contrôler !',
      'Ado': 'Défendez Tom, il a fait une erreur, pas un crime !',
      'Enfant': 'Vous ne comprenez pas pourquoi c\'est si grave !',
      'Expert': 'Apportez votre expertise en cybersécurité !'
    },
    debateQuestions: [
      'Comment réagir à cette situation sans paniquer ?',
      'Comment rétablir la confiance tout en sécurisant ?',
      'Comment éduquer sur les dangers sans faire peur ?'
    ]
  },
  {
    id: 'DEB-004',
    title: 'La Révolte Numérique',
    situation: 'Les enfants se sont rebellés contre les règles numériques. Ils disent que leurs parents passent plus de temps sur leurs téléphones qu\'eux, mais leur imposent des limites strictes. "C\'est injuste !" crient-ils. Le Wi-Fou applaudit...',
    stakes: 'La crédibilité parentale et l\'harmonie familiale !',
    roles: {
      'WiFou': 'Exploitez cette injustice pour semer la rébellion !',
      'Cleaner': 'Aidez à rétablir l\'équité et l\'exemplarité !',
      'Parent': 'Vous vous sentez pris(e) en flagrant délit !',
      'Ado': 'Vous avez raison, c\'est totalement injuste !',
      'Enfant': 'Vous ne comprenez pas pourquoi les règles sont différentes !',
      'Expert': 'Proposez des solutions d\'exemplarité parentale !'
    },
    debateQuestions: [
      'Comment les parents peuvent-ils être exemplaires ?',
      'Comment établir des règles équitables pour tous ?',
      'Comment gérer cette crise de crédibilité ?'
    ]
  },
  {
    id: 'DEB-005',
    title: 'Le Cyberharcèlement de Lisa',
    situation: 'Lisa (14 ans) est victime de cyberharcèlement par ses camarades de classe. Elle se renferme, refuse d\'en parler, et ses notes chutent. Ses parents s\'inquiètent mais ne savent pas quoi faire. Le Wi-Fou se régale...',
    stakes: 'Le bien-être émotionnel et social de Lisa !',
    roles: {
      'WiFou': 'Isolez Lisa et aggravez sa souffrance !',
      'Cleaner': 'Soutenez Lisa et trouvez des solutions !',
      'Parent': 'Vous êtes impuissant(e) et terrifié(e) !',
      'Ado': 'Défendez Lisa, personne ne mérite ça !',
      'Enfant': 'Vous voulez aider mais ne savez pas comment !',
      'Expert': 'Apportez votre expertise en prévention du harcèlement !'
    },
    debateQuestions: [
      'Comment aider Lisa à s\'ouvrir ?',
      'Comment lutter contre le cyberharcèlement ?',
      'Comment prévenir ce type de situation ?'
    ]
  }
];

// Fonction pour obtenir un rôle aléatoire
export function getRandomRole() {
  const roles = Object.keys(DYNAMIC_ROLES);
  return roles[Math.floor(Math.random() * roles.length)];
}

// Fonction pour obtenir un scénario de débat aléatoire
export function getRandomDebateScenario() {
  return DEBATE_SCENARIOS[Math.floor(Math.random() * DEBATE_SCENARIOS.length)];
}

// Fonction pour obtenir un rôle spécifique
export function getRole(roleKey) {
  return DYNAMIC_ROLES[roleKey];
}

// Fonction pour obtenir tous les rôles
export function getAllRoles() {
  return DYNAMIC_ROLES;
}