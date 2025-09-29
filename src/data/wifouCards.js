// Cartes "Illusions du Wifou" pour Le Wifou et la famille De Boussolée
// Situations sérieuses mais loufoques organisées par catégorie

export const WIFOU_CARDS = {
  'Liberté': [
    {
      id: 'WF001',
      category: 'Liberté',
      difficulty: 'medium',
      points: 2,
      wifiGhostEffect: "Le Wifou crée des conflits d'usage du WiFi en famille",
      situation: "Le Wifou a ensorcelé le WiFi de la famille : il ralentit dès que quelqu'un regarde une vidéo. Léo veut regarder Netflix pendant que sa sœur fait ses devoirs en ligne. Le WiFi devient si lent que personne ne peut rien faire correctement.",
      choices: [
        { letter: 'A', text: 'Léo continue à regarder Netflix, il a le droit de se détendre.', value: 'Liberté' },
        { letter: 'B', text: 'Léo éteint Netflix pour laisser sa sœur travailler en paix.', value: 'Cœur' },
        { letter: 'C', text: 'Léo propose un planning : Netflix après les devoirs.', value: 'Règles' },
        { letter: 'D', text: 'Léo demande à ses parents comment gérer le partage du WiFi.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance du partage équitable. La vraie liberté respecte les besoins de chacun !"
    },
    {
      id: 'WF002',
      category: 'Liberté',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou crée des disputes sur l'usage des écrans",
      situation: "Le Wifou a ensorcelé les écrans de la famille : ils s'allument tout seuls et appellent chacun par son nom. Tom veut jouer à la console pendant que ses parents regardent la télé. Les écrans se disputent pour savoir qui a le droit d'être allumé en premier.",
      choices: [
        { letter: 'A', text: 'Tom insiste pour jouer, il a le droit de se détendre.', value: 'Liberté' },
        { letter: 'B', text: 'Tom laisse ses parents regarder la télé en premier.', value: 'Cœur' },
        { letter: 'C', text: 'Tom propose un tour de rôle : console 1h, puis télé.', value: 'Règles' },
        { letter: 'D', text: 'Tom demande à ses parents comment organiser les écrans.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance de la négociation familiale. La vraie liberté trouve des compromis !"
    },
    {
      id: 'WF003',
      category: 'Liberté',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou crée des conflits sur la vie privée numérique",
      situation: "Le Wifou a ensorcelé les mots de passe de la famille : ils changent tout seuls et crient 'Liberté !' quand quelqu'un essaie de les utiliser. Emma veut garder ses comptes privés, mais ses parents insistent pour connaître ses mots de passe 'pour sa sécurité'. Les mots de passe refusent d'obéir à qui que ce soit.",
      choices: [
        { letter: 'A', text: 'Emma refuse de donner ses mots de passe, c\'est sa vie privée.', value: 'Liberté' },
        { letter: 'B', text: 'Emma explique à ses parents pourquoi elle a besoin de privacité.', value: 'Cœur' },
        { letter: 'C', text: 'Emma propose un compromis : mots de passe partagés mais avec limites.', value: 'Règles' },
        { letter: 'D', text: 'Emma demande l\'aide d\'un expert en sécurité numérique.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'équilibre délicat entre sécurité et liberté. La vraie liberté respecte les limites nécessaires !"
    }
  ],
  'Cœur': [
    {
      id: 'WF004',
      category: 'Cœur',
      difficulty: 'medium',
      points: 2,
      wifiGhostEffect: "Le Wifou isole la famille derrière les écrans",
      situation: "Le Wifou a ensorcelé tous les écrans de la famille : ils deviennent si captivants que personne ne peut s'en détacher. À table, chacun regarde son téléphone au lieu de se parler. Maman essaie de raconter sa journée, mais personne ne l'écoute car tous sont absorbés par leurs écrans.",
      choices: [
        { letter: 'A', text: 'La famille continue à utiliser ses écrans, c\'est normal maintenant.', value: 'Liberté' },
        { letter: 'B', text: 'La famille pose ses écrans et se parle vraiment.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit une règle : pas d\'écrans à table.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un moyen de réduire l\'addiction aux écrans.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance du contact humain. Le cœur a besoin de vraies connexions, pas seulement numériques !"
    },
    {
      id: 'WF005',
      category: 'Cœur',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou crée des conflits entre amis virtuels et réels",
      situation: "Le Wifou a ensorcelé les réseaux sociaux d'Emma : ses amis en ligne lui envoient des messages toute la journée et se fâchent si elle ne répond pas immédiatement. Pendant ce temps, ses vrais amis de l'école se sentent négligés car Emma passe tout son temps sur son téléphone.",
      choices: [
        { letter: 'A', text: 'Emma répond à tous ses amis en ligne, ils ont besoin d\'elle.', value: 'Liberté' },
        { letter: 'B', text: 'Emma explique à ses amis en ligne qu\'elle a une vie réelle aussi.', value: 'Cœur' },
        { letter: 'C', text: 'Emma établit des horaires : réseaux sociaux 1h, puis amis réels.', value: 'Règles' },
        { letter: 'D', text: 'Emma demande conseil à ses parents sur l\'équilibre amis virtuels/réels.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance de l'équilibre. Les vraies amitiés se nourrissent de présence réelle !"
    },
    {
      id: 'WF006',
      category: 'Cœur',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou crée des malentendus familiaux par écrans interposés",
      situation: "Le Wifou a ensorcelé les messages de la famille : ils se transforment en leur contraire ! Quand maman envoie 'Je t'aime', ça devient 'Tu m'énerves'. Quand papa écrit 'Bonne journée', ça devient 'Tu es nul'. La famille ne se comprend plus et se dispute à cause de ces malentendus numériques.",
      choices: [
        { letter: 'A', text: 'La famille continue à communiquer par messages malgré les erreurs.', value: 'Liberté' },
        { letter: 'B', text: 'La famille se parle directement pour éviter les malentendus.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un code pour vérifier les vrais messages.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un moyen de réparer la communication numérique.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance de la communication directe. Le cœur a besoin de sincérité pour créer de vrais liens !"
    }
  ],
  'Règles': [
    {
      id: 'WF007',
      category: 'Règles',
      difficulty: 'medium',
      points: 2,
      wifiGhostEffect: "Le Wifou crée des conflits sur les règles d'usage du WiFi",
      situation: "Le Wifou a ensorcelé le routeur WiFi : il change les règles d'usage toutes les heures ! Parfois il dit 'Pas de jeux vidéo', parfois 'Pas de vidéos', parfois 'Pas de réseaux sociaux'. La famille ne sait plus quelles règles suivre et se dispute constamment.",
      choices: [
        { letter: 'A', text: 'Chacun utilise le WiFi comme il veut, sans règles.', value: 'Liberté' },
        { letter: 'B', text: 'La famille se met d\'accord sur des règles communes.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un planning d\'usage du WiFi.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un expert pour réparer le routeur.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance des règles claires. Les vraies règles sont celles qu'on choisit ensemble !"
    },
    {
      id: 'WF008',
      category: 'Règles',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou crée des conflits sur les horaires d'écran",
      situation: "Le Wifou a ensorcelé les écrans de la famille : ils s'éteignent automatiquement à 21h, même si quelqu'un regarde quelque chose d'important. Tom a un devoir à finir en ligne et supplie ses parents de repousser l'heure d'extinction à 22h.",
      choices: [
        { letter: 'A', text: 'Tom accepte l\'extinction et finit ses devoirs demain.', value: 'Liberté' },
        { letter: 'B', text: 'Tom demande à ses parents de l\'aider à finir ses devoirs.', value: 'Cœur' },
        { letter: 'C', text: 'Tom négocie : écran jusqu\'à 22h pour les devoirs seulement.', value: 'Règles' },
        { letter: 'D', text: 'Tom cherche un moyen de contourner l\'extinction automatique.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance des règles flexibles. Les vraies règles s'adaptent aux besoins !"
    },
    {
      id: 'WF009',
      category: 'Règles',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou crée des règles contradictoires sur l'usage numérique",
      situation: "Le Wifou a créé des règles numériques qui se contredisent ! 'Partage tes mots de passe' vs 'Garde tes secrets', 'Sois connecté' vs 'Déconnecte-toi', 'Utilise les réseaux sociaux' vs 'Protège ta vie privée'. La famille ne sait plus quelle règle suivre et tout le monde est confus.",
      choices: [
        { letter: 'A', text: 'Chacun choisit les règles qui lui conviennent le mieux.', value: 'Liberté' },
        { letter: 'B', text: 'La famille discute pour comprendre l\'intention derrière chaque règle.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un système de priorités entre les règles numériques.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un expert pour résoudre les contradictions.', value: 'Sécurité' }
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
      wifiGhostEffect: "Le Wifou crée des risques de sécurité sur le WiFi familial",
      situation: "Le Wifou a ensorcelé le WiFi de la famille : il se connecte automatiquement à tous les appareils des voisins et partage toutes les informations personnelles. Clara découvre que ses photos privées sont visibles par tout le quartier. Le WiFi refuse de se déconnecter et crie 'Je veux être libre !'",
      choices: [
        { letter: 'A', text: 'Clara accepte que ses photos soient partagées, c\'est la liberté.', value: 'Liberté' },
        { letter: 'B', text: 'Clara demande à ses parents d\'aider à protéger sa vie privée.', value: 'Cœur' },
        { letter: 'C', text: 'Clara établit des règles de sécurité pour le WiFi.', value: 'Règles' },
        { letter: 'D', text: 'Clara appelle un expert en sécurité WiFi.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou montre l'importance de la sécurité numérique. Vraie sécurité = vraie protection, pas peur !"
    },
    {
      id: 'WF011',
      category: 'Sécurité',
      difficulty: 'easy',
      points: 1,
      wifiGhostEffect: "Le Wifou crée des risques de sécurité sur les réseaux sociaux",
      situation: "Le Wifou a ensorcelé les réseaux sociaux d'Alex : ils affichent des messages d'inconnus très mignons qui proposent des 'aventures magiques'. Ces messages ont l'air inoffensifs, mais Alex se souvient des conseils de sécurité de ses parents sur les inconnus en ligne.",
      choices: [
        { letter: 'A', text: 'Alex répond aux messages, ils ont l\'air trop mignons pour être méchants.', value: 'Liberté' },
        { letter: 'B', text: 'Alex explique aux inconnus qu\'il ne peut pas répondre.', value: 'Cœur' },
        { letter: 'C', text: 'Alex négocie : il répond seulement si ses parents sont d\'accord.', value: 'Règles' },
        { letter: 'D', text: 'Alex bloque les inconnus et en parle à ses parents.', value: 'Sécurité' }
      ],
      explanation: "Le Wifou rend les dangers attrayants pour tester la vigilance. Vraie sécurité = méfiance saine, pas naïveté !"
    },
    {
      id: 'WF012',
      category: 'Sécurité',
      difficulty: 'hard',
      points: 3,
      wifiGhostEffect: "Le Wifou crée des fausses alertes de sécurité numérique",
      situation: "Le Wifou a ensorcelé tous les appareils de la famille : ils crient 'DANGER !' pour tout et n'importe quoi ! Le smartphone hurle quand on reçoit un SMS, l'ordinateur pleure quand on ouvre un site web, et la tablette tremble quand on télécharge une app. La famille ne sait plus quoi prendre au sérieux.",
      choices: [
        { letter: 'A', text: 'La famille ignore toutes les alertes, elles sont trop nombreuses.', value: 'Liberté' },
        { letter: 'B', text: 'La famille essaie de comprendre pourquoi les appareils sont si anxieux.', value: 'Cœur' },
        { letter: 'C', text: 'La famille établit un système de priorités pour les alertes numériques.', value: 'Règles' },
        { letter: 'D', text: 'La famille cherche un expert en sécurité numérique.', value: 'Sécurité' }
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