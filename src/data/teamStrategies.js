// Stratégies d'équipes pour le nouveau gameplay Wi-Fou vs Cleaners
// Organisé par équipe et type de stratégie

export const TEAM_STRATEGIES = {
  'WiFou': {
    'Zombification': {
      'Dépendance': [
        {
          id: 'WF-DEP-001',
          name: 'Boucle de Récompenses',
          description: 'Créer des notifications constantes qui donnent l\'illusion de récompenses',
          effect: 'Augmente l\'addiction aux écrans',
          points: 3,
          argument: 'Les notifications donnent un sentiment d\'accomplissement et de connexion sociale',
          counterArgument: 'Cette dopamine artificielle crée une dépendance malsaine'
        },
        {
          id: 'WF-DEP-002',
          name: 'FOMO (Fear of Missing Out)',
          description: 'Créer l\'angoisse de rater quelque chose d\'important',
          effect: 'Force à rester connecté en permanence',
          points: 2,
          argument: 'Rester connecté permet de ne rien rater et d\'être toujours informé',
          counterArgument: 'Cette anxiété constante nuit à la santé mentale et aux relations'
        },
        {
          id: 'WF-DEP-003',
          name: 'Design Captivant',
          description: 'Utiliser des couleurs, sons et animations pour captiver l\'attention',
          effect: 'Rend difficile de se déconnecter',
          points: 2,
          argument: 'Un design attrayant rend l\'expérience plus agréable',
          counterArgument: 'Ce design manipule notre attention et notre temps de façon malsaine'
        }
      ],
      'Isolation': [
        {
          id: 'WF-ISO-001',
          name: 'Bulles de Filtre',
          description: 'Montrer seulement le contenu qui confirme les opinions existantes',
          effect: 'Isole dans une vision du monde limitée',
          points: 3,
          argument: 'Cela évite les conflits et les discussions désagréables',
          counterArgument: 'Cela empêche la croissance personnelle et la compréhension mutuelle'
        },
        {
          id: 'WF-ISO-002',
          name: 'Communication Virtuelle',
          description: 'Remplacer les interactions réelles par des émojis et messages courts',
          effect: 'Réduit la qualité des relations humaines',
          points: 2,
          argument: 'C\'est plus pratique et rapide de communiquer en ligne',
          counterArgument: 'Cela appauvrit la communication et les liens émotionnels'
        },
        {
          id: 'WF-ISO-003',
          name: 'Comparaison Sociale',
          description: 'Montrer constamment la vie "parfaite" des autres',
          effect: 'Crée de l\'insatisfaction et de la jalousie',
          points: 3,
          argument: 'Voir le succès des autres peut être motivant',
          counterArgument: 'Ces comparaisons constantes détruisent l\'estime de soi'
        }
      ],
      'Conflit': [
        {
          id: 'WF-CON-001',
          name: 'Règles Contradictoires',
          description: 'Créer des attentes contradictoires sur l\'usage numérique',
          effect: 'Génère des disputes familiales',
          points: 2,
          argument: 'Chacun peut avoir ses propres règles selon ses besoins',
          counterArgument: 'Ces contradictions créent de la confusion et des conflits'
        },
        {
          id: 'WF-CON-002',
          name: 'Double Standard',
          description: 'Permettre aux parents d\'utiliser les écrans mais pas aux enfants',
          effect: 'Crée de l\'injustice perçue',
          points: 2,
          argument: 'Les parents sont plus responsables et peuvent gérer les écrans',
          counterArgument: 'Ce double standard mine la confiance et l\'équité familiale'
        },
        {
          id: 'WF-CON-003',
          name: 'Surveillance Invasive',
          description: 'Contrôler tous les aspects de la vie numérique des enfants',
          effect: 'Crée de la méfiance et de la rébellion',
          points: 3,
          argument: 'La surveillance protège les enfants des dangers en ligne',
          counterArgument: 'Cette surveillance excessive viole la vie privée et la confiance'
        }
      ]
    }
  },
  'Cleaners': {
    'Reboussolage': {
      'Équilibre': [
        {
          id: 'CL-EQU-001',
          name: 'Horaires Flexibles',
          description: 'Établir des créneaux d\'usage numérique adaptés aux besoins de chacun',
          effect: 'Crée un équilibre entre usage numérique et vie réelle',
          points: 3,
          argument: 'Des horaires flexibles respectent les besoins individuels tout en maintenant l\'équilibre',
          counterArgument: 'Cela peut créer de la confusion sur les limites acceptables'
        },
        {
          id: 'CL-EQU-002',
          name: 'Activités Alternatives',
          description: 'Proposer des activités non-numériques attrayantes',
          effect: 'Réduit naturellement le temps d\'écran',
          points: 2,
          argument: 'Des alternatives intéressantes rendent la déconnexion plus facile',
          counterArgument: 'Cela peut être perçu comme une obligation plutôt qu\'un choix'
        },
        {
          id: 'CL-EQU-003',
          name: 'Zones Sans Écran',
          description: 'Créer des espaces et moments dédiés aux interactions réelles',
          effect: 'Renforce les liens familiaux et la communication',
          points: 3,
          argument: 'Ces zones préservent la qualité des relations familiales',
          counterArgument: 'Cela peut être vu comme une restriction de liberté'
        }
      ],
      'Éducation': [
        {
          id: 'CL-EDU-001',
          name: 'Transparence Numérique',
          description: 'Expliquer clairement les risques et bénéfices du numérique',
          effect: 'Développe l\'esprit critique des enfants',
          points: 3,
          argument: 'Comprendre les enjeux aide à faire des choix éclairés',
          counterArgument: 'Cela peut créer de l\'anxiété inutile chez les enfants'
        },
        {
          id: 'CL-EDU-002',
          name: 'Co-construction des Règles',
          description: 'Impliquer toute la famille dans l\'élaboration des règles numériques',
          effect: 'Augmente l\'adhésion et le respect des règles',
          points: 3,
          argument: 'Des règles créées ensemble sont mieux acceptées et respectées',
          counterArgument: 'Cela peut prendre du temps et créer des discussions difficiles'
        },
        {
          id: 'CL-EDU-003',
          name: 'Modélisation Parentale',
          description: 'Les parents montrent l\'exemple d\'un usage équilibré',
          effect: 'Crée un modèle positif pour les enfants',
          points: 2,
          argument: 'Les enfants apprennent mieux par l\'exemple que par les règles',
          counterArgument: 'Les parents ont aussi besoin de flexibilité dans leur usage'
        }
      ],
      'Protection': [
        {
          id: 'CL-PRO-001',
          name: 'Sécurité Graduée',
          description: 'Mettre en place des protections adaptées à l\'âge et à la maturité',
          effect: 'Protège tout en respectant l\'autonomie croissante',
          points: 3,
          argument: 'Une protection adaptée grandit avec l\'enfant',
          counterArgument: 'Cela peut être complexe à gérer et à ajuster'
        },
        {
          id: 'CL-PRO-002',
          name: 'Communication Ouverte',
          description: 'Encourager le dialogue sur les expériences numériques',
          effect: 'Crée un environnement de confiance et de soutien',
          points: 3,
          argument: 'Une communication ouverte permet d\'identifier et résoudre les problèmes',
          counterArgument: 'Cela peut être difficile à maintenir dans le temps'
        },
        {
          id: 'CL-PRO-003',
          name: 'Esprit Critique',
          description: 'Développer la capacité à analyser et évaluer le contenu en ligne',
          effect: 'Renforce l\'autonomie et la sécurité personnelle',
          points: 2,
          argument: 'Un esprit critique est la meilleure protection contre les manipulations',
          counterArgument: 'Cela peut rendre les enfants trop méfiants ou cyniques'
        }
      ]
    }
  }
};

// Situations de confrontation entre les équipes
export const CONFRONTATION_SCENARIOS = [
  {
    id: 'CONF-001',
    title: 'Crise du WiFi Familial',
    situation: 'Le WiFi familial est surchargé. Léo veut regarder Netflix, sa sœur fait ses devoirs en ligne, et papa travaille en visioconférence. Tout le monde se dispute pour l\'accès.',
    context: 'Situation de conflit d\'usage qui teste la capacité des équipes à proposer des solutions',
    stakes: 'Qui contrôle la paix familiale numérique ?',
    wifouObjective: 'Créer du chaos et des disputes',
    cleanerObjective: 'Trouver un équilibre équitable'
  },
  {
    id: 'CONF-002',
    title: 'Addiction aux Réseaux Sociaux',
    situation: 'Emma, 15 ans, passe 8h par jour sur TikTok et Instagram. Ses notes chutent, elle ne dort plus, et sa famille s\'inquiète. Elle refuse de réduire son usage.',
    context: 'Situation d\'addiction qui nécessite une approche délicate',
    stakes: 'L\'avenir scolaire et la santé mentale d\'Emma',
    wifouObjective: 'Renforcer l\'addiction et isoler Emma',
    cleanerObjective: 'Aider Emma à retrouver l\'équilibre'
  },
  {
    id: 'CONF-003',
    title: 'Sécurité Numérique en Famille',
    situation: 'Les parents découvrent que Tom, 13 ans, a donné ses identifiants à un "ami" en ligne qui s\'est avéré être un prédateur. La famille est en panique.',
    context: 'Situation de sécurité qui teste les réactions face au danger',
    stakes: 'La sécurité de Tom et la confiance familiale',
    wifouObjective: 'Créer de la panique et de la méfiance',
    cleanerObjective: 'Gérer la crise et renforcer la sécurité'
  },
  {
    id: 'CONF-004',
    title: 'Double Standard Parental',
    situation: 'Les enfants se plaignent que leurs parents passent plus de temps sur leurs téléphones qu\'eux, mais imposent des limites strictes aux enfants.',
    context: 'Situation d\'injustice perçue qui teste l\'équité familiale',
    stakes: 'La crédibilité parentale et l\'harmonie familiale',
    wifouObjective: 'Exploiter l\'injustice et créer de la rébellion',
    cleanerObjective: 'Rétablir l\'équité et l\'exemplarité'
  },
  {
    id: 'CONF-005',
    title: 'Harcèlement en Ligne',
    situation: 'Sarah est victime de cyberharcèlement par ses camarades de classe. Elle se renferme et refuse d\'en parler à ses parents.',
    context: 'Situation de victimisation qui nécessite sensibilité et action',
    stakes: 'Le bien-être émotionnel et social de Sarah',
    wifouObjective: 'Isoler Sarah et aggraver la situation',
    cleanerObjective: 'Soutenir Sarah et résoudre le problème'
  }
];

// Fonction pour obtenir une stratégie aléatoire pour une équipe
export function getRandomStrategy(team, category, type) {
  const strategies = TEAM_STRATEGIES[team]?.[category]?.[type];
  if (!strategies || strategies.length === 0) {
    return null;
  }
  return strategies[Math.floor(Math.random() * strategies.length)];
}

// Fonction pour obtenir un scénario de confrontation aléatoire
export function getRandomConfrontationScenario() {
  return CONFRONTATION_SCENARIOS[Math.floor(Math.random() * CONFRONTATION_SCENARIOS.length)];
}

// Fonction pour obtenir toutes les stratégies d'une équipe
export function getAllTeamStrategies(team) {
  const teamStrategies = TEAM_STRATEGIES[team];
  if (!teamStrategies) return [];
  
  const allStrategies = [];
  Object.values(teamStrategies).forEach(category => {
    Object.values(category).forEach(type => {
      allStrategies.push(...type);
    });
  });
  return allStrategies;
}