// Système d'énigmes pour La Famille Déboussolée
// Énigmes organisées par catégorie et niveau de difficulté

export const RIDDLES_DATABASE = {
  'Liberté': {
    'easy': [
      {
        id: 'R1',
        type: 'question',
        question: "Je suis invisible mais je te contrôle. Plus tu me donnes, plus je grandis. Qui suis-je ?",
        answer: "L'habitude",
        explanation: "Les habitudes nous contrôlent souvent sans qu'on s'en rende compte. Plus on les nourrit, plus elles deviennent fortes.",
        category: 'Liberté',
        difficulty: 'easy'
      },
      {
        id: 'R2',
        type: 'question',
        question: "Je peux te rendre libre ou t'emprisonner. Je suis partout mais tu ne me vois pas. Qui suis-je ?",
        answer: "Le choix",
        explanation: "Chaque choix que nous faisons peut nous libérer ou nous enfermer dans des patterns.",
        category: 'Liberté',
        difficulty: 'easy'
      },
      {
        id: 'R3',
        type: 'question',
        question: "Plus tu me cherches, plus je me cache. Plus tu me lâches, plus je reviens. Qui suis-je ?",
        answer: "Le bonheur",
        explanation: "Le bonheur authentique vient souvent quand on arrête de le chercher désespérément.",
        category: 'Liberté',
        difficulty: 'easy'
      }
    ],
    'medium': [
      {
        id: 'R4',
        type: 'question',
        question: "Je suis ce que tu veux être, mais je ne suis pas ce que tu es. Je change selon tes rêves. Qui suis-je ?",
        answer: "L'identité",
        explanation: "Notre identité évolue avec nos aspirations et nos expériences de vie.",
        category: 'Liberté',
        difficulty: 'medium'
      },
      {
        id: 'R5',
        type: 'question',
        question: "Je te donne des ailes mais je peux aussi te couper les ailes. Je suis ton meilleur ami et ton pire ennemi. Qui suis-je ?",
        answer: "La technologie",
        explanation: "La technologie peut nous libérer ou nous asservir selon comment nous l'utilisons.",
        category: 'Liberté',
        difficulty: 'medium'
      }
    ],
    'hard': [
      {
        id: 'R6',
        type: 'question',
        question: "Je suis la prison que tu construis toi-même, mais je suis aussi la clé de ta libération. Qui suis-je ?",
        answer: "La peur",
        explanation: "La peur peut nous paralyser, mais la surmonter nous libère.",
        category: 'Liberté',
        difficulty: 'hard'
      }
    ]
  },
  'Cœur': {
    'easy': [
      {
        id: 'R7',
        type: 'question',
        question: "Je grandis quand tu me donnes, je diminue quand tu me gardes. Qui suis-je ?",
        answer: "L'amour",
        explanation: "L'amour se multiplie quand on le partage et s'étiole quand on le garde égoïstement.",
        category: 'Cœur',
        difficulty: 'easy'
      },
      {
        id: 'R8',
        type: 'question',
        question: "Je suis invisible mais je peux briser les cœurs. Je suis partout mais personne ne me voit. Qui suis-je ?",
        answer: "La tristesse",
        explanation: "La tristesse peut être invisible mais avoir un impact profond sur les relations.",
        category: 'Cœur',
        difficulty: 'easy'
      }
    ],
    'medium': [
      {
        id: 'R9',
        type: 'question',
        question: "Je suis ce qui te relie aux autres, mais je peux aussi te séparer. Je suis fort et fragile à la fois. Qui suis-je ?",
        answer: "Le lien",
        explanation: "Les liens humains peuvent unir ou diviser selon comment ils sont entretenus.",
        category: 'Cœur',
        difficulty: 'medium'
      }
    ],
    'hard': [
      {
        id: 'R10',
        type: 'question',
        question: "Je suis ce que tu ressens mais que tu ne peux pas toucher. Je peux te guérir ou te blesser. Qui suis-je ?",
        answer: "L'émotion",
        explanation: "Les émotions sont intangibles mais ont un pouvoir immense sur notre bien-être.",
        category: 'Cœur',
        difficulty: 'hard'
      }
    ]
  },
  'Règles': {
    'easy': [
      {
        id: 'R11',
        type: 'question',
        question: "Je protège mais je peux aussi enfermer. Je guide mais je peux aussi limiter. Qui suis-je ?",
        answer: "La règle",
        explanation: "Les règles peuvent protéger ou contraindre selon leur application.",
        category: 'Règles',
        difficulty: 'easy'
      },
      {
        id: 'R12',
        type: 'question',
        question: "Je suis ce qui te dit ce qui est bien ou mal, mais je peux changer selon les époques. Qui suis-je ?",
        answer: "La morale",
        explanation: "La morale évolue avec la société et les valeurs de chaque époque.",
        category: 'Règles',
        difficulty: 'easy'
      }
    ],
    'medium': [
      {
        id: 'R13',
        type: 'question',
        question: "Je suis ce qui maintient l'ordre, mais je peux aussi créer le chaos. Qui suis-je ?",
        answer: "L'autorité",
        explanation: "L'autorité peut maintenir l'ordre ou créer des désordres selon son usage.",
        category: 'Règles',
        difficulty: 'medium'
      }
    ],
    'hard': [
      {
        id: 'R14',
        type: 'question',
        question: "Je suis ce qui te dit comment vivre, mais je peux aussi t'empêcher de vivre. Qui suis-je ?",
        answer: "La tradition",
        explanation: "Les traditions peuvent guider mais aussi contraindre l'évolution personnelle.",
        category: 'Règles',
        difficulty: 'hard'
      }
    ]
  },
  'Sécurité': {
    'easy': [
      {
        id: 'R15',
        type: 'question',
        question: "Je te protège mais je peux aussi te rendre vulnérable. Je suis ton bouclier et ta faiblesse. Qui suis-je ?",
        answer: "La confiance",
        explanation: "La confiance peut protéger mais aussi rendre vulnérable si elle est mal placée.",
        category: 'Sécurité',
        difficulty: 'easy'
      },
      {
        id: 'R16',
        type: 'question',
        question: "Je suis ce qui te rassure, mais je peux aussi te faire peur. Qui suis-je ?",
        answer: "L'inconnu",
        explanation: "L'inconnu peut être rassurant (nouveauté) ou effrayant (incertitude).",
        category: 'Sécurité',
        difficulty: 'easy'
      }
    ],
    'medium': [
      {
        id: 'R17',
        type: 'question',
        question: "Je suis ce qui te protège, mais je peux aussi te trahir. Je suis partout mais invisible. Qui suis-je ?",
        answer: "L'information",
        explanation: "L'information peut protéger mais aussi trahir selon son usage et sa source.",
        category: 'Sécurité',
        difficulty: 'medium'
      }
    ],
    'hard': [
      {
        id: 'R18',
        type: 'question',
        question: "Je suis ce qui te sécurise, mais je peux aussi te mettre en danger. Je suis ton allié et ton ennemi. Qui suis-je ?",
        answer: "Le secret",
        explanation: "Les secrets peuvent protéger mais aussi mettre en danger selon leur nature.",
        category: 'Sécurité',
        difficulty: 'hard'
      }
    ]
  }
};

// Énigmes de type "défi créatif"
export const CREATIVE_RIDDLES = {
  'Liberté': [
    {
      id: 'CR1',
      type: 'creative',
      challenge: "Invente un nouveau mot pour décrire la liberté dans le monde numérique",
      category: 'Liberté',
      difficulty: 'easy'
    },
    {
      id: 'CR2',
      type: 'creative',
      challenge: "Crée une métaphore pour expliquer la liberté à un enfant de 5 ans",
      category: 'Liberté',
      difficulty: 'medium'
    }
  ],
  'Cœur': [
    {
      id: 'CR3',
      type: 'creative',
      challenge: "Invente un geste pour exprimer l'amour sans utiliser de mots",
      category: 'Cœur',
      difficulty: 'easy'
    },
    {
      id: 'CR4',
      type: 'creative',
      challenge: "Crée une chanson de 30 secondes sur la famille",
      category: 'Cœur',
      difficulty: 'medium'
    }
  ],
  'Règles': [
    {
      id: 'CR5',
      type: 'creative',
      challenge: "Invente une règle familiale qui rend tout le monde heureux",
      category: 'Règles',
      difficulty: 'easy'
    },
    {
      id: 'CR6',
      type: 'creative',
      challenge: "Crée un système de récompenses équitable pour toute la famille",
      category: 'Règles',
      difficulty: 'medium'
    }
  ],
  'Sécurité': [
    {
      id: 'CR7',
      type: 'creative',
      challenge: "Invente un mot de passe créatif et sûr pour la famille",
      category: 'Sécurité',
      difficulty: 'easy'
    },
    {
      id: 'CR8',
      type: 'creative',
      challenge: "Crée un plan de sécurité numérique pour la famille",
      category: 'Sécurité',
      difficulty: 'medium'
    }
  ]
};

// Énigmes de type "défi logique"
export const LOGIC_RIDDLES = {
  'Liberté': [
    {
      id: 'LR1',
      type: 'logic',
      problem: "Si la liberté c'est faire ce qu'on veut, et que faire ce qu'on veut c'est parfois se faire du mal, alors la liberté peut-elle être dangereuse ?",
      category: 'Liberté',
      difficulty: 'medium'
    }
  ],
  'Cœur': [
    {
      id: 'LR2',
      type: 'logic',
      problem: "Si aimer quelqu'un c'est vouloir son bonheur, et que son bonheur c'est parfois être loin de nous, alors aimer c'est parfois laisser partir ?",
      category: 'Cœur',
      difficulty: 'medium'
    }
  ],
  'Règles': [
    {
      id: 'LR3',
      type: 'logic',
      problem: "Si les règles protègent mais limitent, et que la liberté permet mais expose, alors comment trouver l'équilibre ?",
      category: 'Règles',
      difficulty: 'medium'
    }
  ],
  'Sécurité': [
    {
      id: 'LR4',
      type: 'logic',
      problem: "Si être trop sécurisé c'est ne rien vivre, et que vivre c'est prendre des risques, alors la sécurité peut-elle être un piège ?",
      category: 'Sécurité',
      difficulty: 'medium'
    }
  ]
};

// Fonction pour obtenir une énigme aléatoire selon la catégorie et la difficulté
export function getRandomRiddle(category, difficulty = 'medium', type = 'all') {
  let riddles = [];
  
  if (type === 'all' || type === 'question') {
    const categoryRiddles = RIDDLES_DATABASE[category]?.[difficulty] || [];
    riddles = [...riddles, ...categoryRiddles];
  }
  
  if (type === 'all' || type === 'creative') {
    const creativeRiddles = CREATIVE_RIDDLES[category] || [];
    riddles = [...riddles, ...creativeRiddles];
  }
  
  if (type === 'all' || type === 'logic') {
    const logicRiddles = LOGIC_RIDDLES[category] || [];
    riddles = [...riddles, ...logicRiddles];
  }
  
  if (riddles.length === 0) {
    return null;
  }
  
  return riddles[Math.floor(Math.random() * riddles.length)];
}

// Fonction pour obtenir toutes les énigmes d'une catégorie
export function getAllRiddles(category) {
  const categoryRiddles = RIDDLES_DATABASE[category];
  if (!categoryRiddles) return [];
  
  return [
    ...categoryRiddles.easy,
    ...categoryRiddles.medium,
    ...categoryRiddles.hard
  ];
}

// Fonction pour obtenir le nombre total d'énigmes
export function getTotalRiddlesCount() {
  let total = 0;
  Object.values(RIDDLES_DATABASE).forEach(category => {
    Object.values(category).forEach(difficulty => {
      total += difficulty.length;
    });
  });
  return total;
}

// Fonction pour vérifier une réponse d'énigme
export function checkRiddleAnswer(riddle, answer) {
  if (!riddle || !answer) return false;
  
  if (riddle.type === 'question') {
    // Pour les énigmes à réponse, on accepte plusieurs variations
    const correctAnswer = riddle.answer.toLowerCase().trim();
    const userAnswer = answer.toLowerCase().trim();
    
    // Vérification exacte
    if (userAnswer === correctAnswer) return true;
    
    // Vérification avec des mots-clés
    const keywords = correctAnswer.split(' ').filter(word => word.length > 2);
    const userKeywords = userAnswer.split(' ').filter(word => word.length > 2);
    
    // Si au moins 70% des mots-clés correspondent
    const matchCount = keywords.filter(keyword => 
      userKeywords.some(userKeyword => userKeyword.includes(keyword) || keyword.includes(userKeyword))
    ).length;
    
    return matchCount >= Math.ceil(keywords.length * 0.7);
  }
  
  // Pour les défis créatifs et logiques, on accepte toute réponse
  return true;
}