// Cartes "Illusions du Wifou" pour Le Wifou et la famille De Boussolée
// Situations sérieuses mais loufoques organisées par catégorie

export const WIFOU_CARDS = {
  'Liberté': [
    {
      id: 'WF001',
      category: 'Liberté',
      difficulty: 'medium',
      points: 2,
      wifiGhostEffect: "Le Wifou transforme les smartphones en zombies affamés",
      situation: "Le Wifou a ensorcelé le smartphone de Léo : il se met à parler tout seul et réclame 'plus de liberté' à 3h du matin. Il menace de réveiller toute la famille si Léo ne le laisse pas 'respirer' toute la nuit.",
      choices: [
        { letter: 'A', text: 'Léo cache le smartphone sous son oreiller pour le calmer.', value: 'Liberté' },
        { letter: 'B', text: 'Léo éteint le smartphone et va rassurer ses parents.', value: 'Sécurité' },
        { letter: 'C', text: 'Léo négocie : smartphone éteint mais réveil à 7h.', value: 'Règles' },
        { letter: 'D', text: 'Léo explique à ses parents que son téléphone a des problèmes.', value: 'Cœur' }
      ],
      explanation: "Le Wifou personnifie la technologie pour créer des conflits. La vraie liberté, c'est de contrôler ses outils, pas l'inverse !"
    },
    {
      id: 'WF002',
      category: 'Liberté',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou fait se rebeller les objets du quotidien",
      situation: "Le Wifou a ensorcelé les chaussettes de Tom : elles refusent d'être portées et crient 'Liberté !' quand on essaie de les mettre. Tom veut les laisser 'libres' mais ses parents insistent pour qu'il s'habille correctement.",
      choices: [
        { letter: 'A', text: 'Tom va à l\'école pieds nus pour respecter la liberté des chaussettes.', value: 'Liberté' },
        { letter: 'B', text: 'Tom explique à ses parents que ses chaussettes sont en grève.', value: 'Cœur' },
        { letter: 'C', text: 'Tom négocie : chaussettes libres le week-end, obéissantes en semaine.', value: 'Règles' },
        { letter: 'D', text: 'Tom cherche des chaussettes \'non-ensorcelées\' dans le placard.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou utilise l'absurde pour questionner les limites. Parfois, la liberté doit s'adapter aux contraintes pratiques !"
    },
    {
      id: 'WF003',
      category: 'Liberté',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou crée des révolutions dans la chambre",
      situation: "Le Wifou a ensorcelé la chambre d'Emma : tous ses objets se sont mis en grève pour 'plus de liberté' ! Ses livres refusent d'être lus, ses vêtements ne veulent plus être portés, et son lit crie 'Non à l'oppression du sommeil !'. Emma ne sait plus quoi faire.",
      choices: [
        { letter: 'A', text: 'Emma laisse ses objets en grève et dort par terre.', value: 'Liberté' },
        { letter: 'B', text: 'Emma négocie avec ses objets pour trouver un compromis.', value: 'Cœur' },
        { letter: 'C', text: 'Emma établit une charte des droits des objets de chambre.', value: 'Règles' },
        { letter: 'D', text: 'Emma demande à ses parents d\'intervenir dans cette révolte.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'absurdité de l'extrémisme. La vraie liberté trouve l'équilibre entre contraintes et autonomie !"
    }
  ],
  'Cœur': [
    {
      id: 'WF004',
      category: 'Cœur',
      difficulty: 'medium',
      points: 2,
      wifiGhostEffect: "Le Wifou vole les voix de la famille",
      situation: "Le Wifou a volé toutes les voix de la famille De Boussolée ! Ils ne peuvent plus se parler qu'en messages WhatsApp, même à table. Papa essaie de dire 'Passe-moi le sel' en tapant sur son téléphone, mais personne ne le voit.",
      choices: [
        { letter: 'A', text: 'La famille continue à communiquer par messages, c\'est plus moderne.', value: 'Liberté' },
        { letter: 'B', text: 'La famille essaie de se comprendre par gestes et mimiques.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un code de signes pour les repas.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un moyen de récupérer ses voix.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'absurdité de la communication numérique quand le contact humain est possible. Le cœur a besoin de vraies connexions !"
    },
    {
      id: 'WF005',
      category: 'Cœur',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou crée des amis virtuels trop attachants",
      situation: "Le Wifou a créé un 'ami virtuel' pour Emma : 'Pixel', un personnage de jeu qui pleure quand Emma ne joue pas avec lui. Pixel menace de 'mourir' si Emma ne passe pas 8h par jour avec lui. Emma se sent coupable mais ses parents s'inquiètent.",
      choices: [
        { letter: 'A', text: 'Emma joue 8h par jour pour sauver Pixel de la tristesse.', value: 'Liberté' },
        { letter: 'B', text: 'Emma explique à ses parents qu\'elle a un ami qui a besoin d\'elle.', value: 'Cœur' },
        { letter: 'C', text: 'Emma négocie : 2h par jour avec Pixel, pas plus.', value: 'Règles' },
        { letter: 'D', text: 'Emma demande à ses parents comment gérer cette situation.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou exploite l'empathie naturelle pour créer des dépendances. Vraie amitié = vraie réciprocité, pas manipulation !"
    },
    {
      id: 'WF006',
      category: 'Cœur',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou inverse les émotions familiales",
      situation: "Le Wifou a inversé toutes les émotions de la famille ! Quand ils sont tristes, ils rient aux éclats. Quand ils sont heureux, ils pleurent. Quand ils s'aiment, ils se disputent. La famille ne sait plus comment exprimer ses vrais sentiments.",
      choices: [
        { letter: 'A', text: 'La famille accepte cette nouvelle façon de communiquer.', value: 'Liberté' },
        { letter: 'B', text: 'La famille essaie de deviner les vrais sentiments derrière les inversions.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un dictionnaire des émotions inversées.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un moyen de retrouver ses vraies émotions.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance de l'authenticité émotionnelle. Le cœur a besoin de sincérité pour créer de vrais liens !"
    }
  ],
  'Règles': [
    {
      id: 'WF007',
      category: 'Règles',
      difficulty: 'medium',
      points: 2,
      wifiGhostEffect: "Le Wifou fait voler les règles familiales",
      situation: "Le Wifou a fait voler toutes les règles de la maison ! Elles tournent autour du plafond en criant 'Nous sommes obsolètes !'. La règle 'Pas d'écran à table' vole en rond en disant 'Personne ne nous respecte !'. Les parents essaient de les rattraper avec une épuisette.",
      choices: [
        { letter: 'A', text: 'Les enfants profitent du chaos pour faire ce qu\'ils veulent.', value: 'Liberté' },
        { letter: 'B', text: 'Les enfants aident leurs parents à rattraper les règles.', value: 'Cœur' },
        { letter: 'C', text: 'La famille négocie de nouvelles règles plus adaptées.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un expert en règles volantes.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'absurdité des règles non respectées. Les vraies règles sont celles qu'on choisit ensemble !"
    },
    {
      id: 'WF008',
      category: 'Règles',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou transforme les règles en sortilèges",
      situation: "Le Wifou a transformé l'heure de coucher en sortilège : à 22h pile, tous les enfants de la famille se transforment en citrouilles ! Mais Tom a un devoir important à finir et supplie ses parents de repousser l'heure à 22h30.",
      choices: [
        { letter: 'A', text: 'Tom reste debout et accepte de devenir citrouille.', value: 'Liberté' },
        { letter: 'B', text: 'Tom demande à ses parents de l\'aider à finir ses devoirs.', value: 'Cœur' },
        { letter: 'C', text: 'Tom négocie : citrouille à 22h30, pas avant.', value: 'Règles' },
        { letter: 'D', text: 'Tom cherche un contre-sort pour éviter la transformation.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou rend les règles absurdes pour questionner leur sens. Les vraies règles protègent, ne punissent pas !"
    },
    {
      id: 'WF009',
      category: 'Règles',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou crée des règles contradictoires",
      situation: "Le Wifou a créé des règles qui se contredisent ! 'Range ta chambre' vs 'Ne touche à rien', 'Sois autonome' vs 'Demande toujours la permission'. La famille ne sait plus quelle règle suivre et tout le monde est confus.",
      choices: [
        { letter: 'A', text: 'Chacun choisit les règles qui lui conviennent le mieux.', value: 'Liberté' },
        { letter: 'B', text: 'La famille discute pour comprendre l\'intention derrière chaque règle.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un système de priorités entre les règles.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un médiateur pour résoudre les contradictions.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance de la cohérence. Les vraies règles s'articulent ensemble pour créer un cadre clair !"
    }
  ],
  'Sécurité': [
    {
      id: 'WF010',
      category: 'Sécurité',
      difficulty: 'medium',
      points: 2,
      wifiGhostEffect: "Le Wifou transforme les mots de passe en créatures vivantes",
      situation: "Le Wifou a transformé le mot de passe de Clara en petit dragon qui crache du feu ! Le dragon refuse de laisser Clara accéder à son compte et crie 'Mot de passe trop faible !'. Clara veut le changer mais le dragon menace de brûler son ordinateur.",
      choices: [
        { letter: 'A', text: 'Clara négocie avec le dragon pour un mot de passe plus fort.', value: 'Liberté' },
        { letter: 'B', text: 'Clara demande à ses parents d\'apprivoiser le dragon.', value: 'Cœur' },
        { letter: 'C', text: 'Clara établit un contrat avec le dragon : sécurité contre respect.', value: 'Règles' },
        { letter: 'D', text: 'Clara appelle un expert en dragons de mots de passe.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou personnifie la sécurité pour la rendre plus ludique. Vraie sécurité = vraie protection, pas peur !"
    },
    {
      id: 'WF011',
      category: 'Sécurité',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou transforme les inconnus en personnages de dessin animé",
      situation: "Le Wifou a transformé un inconnu en personnage de dessin animé très mignon qui demande à Alex de le suivre 'pour une aventure magique'. Le personnage a de grands yeux et une voix douce, mais Alex se souvient des conseils de sécurité de ses parents.",
      choices: [
        { letter: 'A', text: 'Alex suit le personnage, il a l\'air trop mignon pour être méchant.', value: 'Liberté' },
        { letter: 'B', text: 'Alex explique au personnage qu\'il ne peut pas suivre des inconnus.', value: 'Cœur' },
        { letter: 'C', text: 'Alex négocie : il suit seulement si ses parents sont d\'accord.', value: 'Règles' },
        { letter: 'D', text: 'Alex refuse et va chercher un adulte de confiance.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou rend les dangers attrayants pour tester la vigilance. Vraie sécurité = méfiance saine, pas naïveté !"
    },
    {
      id: 'WF012',
      category: 'Sécurité',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou crée des fausses alertes de sécurité",
      situation: "Le Wifou a ensorcelé tous les appareils de la famille : ils crient 'DANGER !' pour tout et n'importe quoi ! Le micro-ondes hurle quand on réchauffe du lait, la télé pleure quand on change de chaîne, et le smartphone tremble quand on reçoit un SMS. La famille ne sait plus quoi prendre au sérieux.",
      choices: [
        { letter: 'A', text: 'La famille ignore toutes les alertes, elles sont trop nombreuses.', value: 'Liberté' },
        { letter: 'B', text: 'La famille essaie de comprendre pourquoi les appareils sont si anxieux.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un système de priorités pour les alertes.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un technicien spécialisé en appareils anxieux.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance de distinguer les vrais dangers des fausses alertes. Vraie sécurité = discernement, pas paranoïa !"
    }
  ]
};

// Fonction pour obtenir une carte aléatoire selon la catégorie
export function getRandomWifouCard(category) {
  const cards = WIFOU_CARDS[category];
  if (!cards || cards.length === 0) {
    return null;
  }
  return cards[Math.floor(Math.random() * cards.length)];
}

// Fonction pour obtenir toutes les cartes d'une catégorie
export function getAllWifouCards(category) {
  return WIFOU_CARDS[category] || [];
}

// Fonction pour obtenir le nombre total de cartes
export function getTotalWifouCardsCount() {
  let total = 0;
  Object.values(WIFOU_CARDS).forEach(category => {
    total += category.length;
  });
  return total;
}

// Fonction pour obtenir une carte par ID
export function getWifouCardById(id) {
  for (const category of Object.values(WIFOU_CARDS)) {
    const card = category.find(card => card.id === id);
    if (card) return card;
  }
  return null;
}