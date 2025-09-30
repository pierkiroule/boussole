// Base complète de 100 situations réalistes pour la famille Déboussolée
// Chaque situation raconte un épisode de leur vie sous l'influence du Wi-Fou

export const FAMILY_ATTACKS = {
  // 🍽️ REPAS & VIE FAMILIALE (1-15)
  
  1: {
    id: 1,
    title: 'Le Repas TikTok',
    chapter: 1,
    category: 'repas',
    description: `Au dîner, le Wi-Fou ensorcelle la table de la famille Déboussolée : chaque assiette diffuse un TikTok en direct ! Léa, 14 ans, ne peut plus manger sans regarder son écran. Papa Déboussolé essaie de parler mais personne ne l'écoute.`,
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
    title: 'La Chaise Connectée',
    chapter: 1,
    category: 'repas',
    description: `Le Wi-Fou a transformé les chaises de la famille Déboussolée en portails numériques ! Pour s'asseoir, il faut scanner son téléphone. Maman Déboussolée refuse et reste debout pendant tout le repas. Les enfants hésitent entre céder au chantage ou défendre leurs principes.`,
    target: 'Toute la famille',
    effect: 'Exclusion sociale liée aux écrans',
    educational: 'Pression sociale et conformité numérique',
    shieldResponses: {
      security: "Je range mon téléphone pour éviter les problèmes.",
      heart: "Je propose qu'on mange ensemble sans écran.",
      liberty: "Je choisis de garder mon téléphone, même si c'est risqué.",
      respect: "On suit la règle : pas de téléphone en cours."
    }
  },

  3: {
    id: 3,
    title: 'Le Selfie Obligatoire',
    chapter: 1,
    category: 'repas',
    description: `Le Wi-Fou impose un selfie obligatoire avec chaque bouchée ! Un miroir connecté géant apparaît au-dessus de la table des Déboussolée. À chaque fois que quelqu'un veut manger, il doit prendre un selfie, choisir un filtre, écrire une légende et attendre les likes. Le repas devient interminable.`,
    target: 'Toute la famille',
    effect: 'Obsession de l\'image et des réseaux sociaux',
    educational: 'Image de soi, performance sociale et partage sur les réseaux',
    shieldResponses: {
      security: "Je refuse de prendre des selfies pour protéger ma vie privée.",
      heart: "Je propose un selfie de famille pour rigoler ensemble.",
      liberty: "Je choisis de prendre des selfies, c'est mon choix.",
      respect: "On établit : pas de selfies pendant les repas."
    }
  },

  4: {
    id: 4,
    title: 'Le Menu Numérique',
    chapter: 1,
    category: 'repas',
    description: `Le Wi-Fou a remplacé tous les plats de la famille Déboussolée par des QR codes ! Impossible de manger sans scanner chaque aliment. Léa scanne son steak qui devient une vidéo TikTok. Tom, 12 ans, scanne ses légumes qui se transforment en jeu mobile.`,
    target: 'La table familiale',
    effect: 'Transformation des repas en expérience numérique',
    educational: 'Présence et appréciation de la nourriture',
    shieldResponses: {
      security: "Je refuse de scanner pour protéger ma santé.",
      heart: "Je propose qu'on cuisine ensemble sans QR codes.",
      liberty: "Je scanne mes plats, c'est mon choix.",
      respect: "On décide : repas sans technologie."
    }
  },

  5: {
    id: 5,
    title: 'Le Livestream du Dîner',
    chapter: 1,
    category: 'repas',
    description: `Le Wi-Fou force la famille Déboussolée à diffuser son dîner en live sur toutes les plateformes ! Des milliers d'inconnus regardent et commentent leurs conversations privées. Papa Déboussolé est gêné, Maman Déboussolée veut arrêter, mais les enfants trouvent ça "cool".`,
    target: 'Toute la famille',
    effect: 'Exposition publique forcée de la vie privée',
    educational: 'Vie privée et limites de partage',
    shieldResponses: {
      security: "Je coupe la diffusion pour protéger notre intimité.",
      heart: "Je propose de diffuser seulement avec nos proches.",
      liberty: "Je continue le live, c'est mon choix.",
      respect: "On établit : pas de diffusion sans accord de tous."
    }
  },

  // 🌙 SOMMEIL & RYTHME DE VIE (6-20)

  6: {
    id: 6,
    title: 'La Nuit des Notifications',
    chapter: 2,
    category: 'sommeil',
    description: `Minuit. Le Wi-Fou bombarde la chambre de Léa d'alertes fantômes ! Son téléphone vibre sans arrêt avec des messages imaginaires : "URGENT ! Ton ami t'a tagué !", "Nouvelle vidéo de ton Youtubeur préféré !". Mais quand elle regarde l'écran... il n'y a rien. Elle ne peut pas dormir.`,
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

  7: {
    id: 7,
    title: 'Le Réveil Troll',
    chapter: 2,
    category: 'sommeil',
    description: `Le Wi-Fou règle tous les appareils de la maison Déboussolée pour sonner toutes les 10 minutes ! Le smartphone, la tablette, l'ordinateur, la télé, même le frigo ! Ils sonnent en boucle avec des sons différents. La famille ne peut ni dormir, ni se reposer.`,
    target: 'Toute la famille',
    effect: 'Fatigue chronique',
    educational: 'Fatigue, surstimulation numérique et besoin de repos',
    shieldResponses: {
      security: "Je coupe tous les appareils pour protéger notre sommeil.",
      heart: "Je propose qu'on se réveille ensemble naturellement.",
      liberty: "Je garde mes alarmes, c'est mon choix.",
      respect: "On fixe une heure de réveil commune."
    }
  },

  8: {
    id: 8,
    title: 'La Lampe Bleue',
    chapter: 2,
    category: 'sommeil',
    description: `Le Wi-Fou colore toutes les lampes de la maison Déboussolée en lumière bleue avant de dormir ! La lumière bleue des écrans envahit les chambres. Impossible de fermer les yeux : le cerveau croit qu'il fait jour ! Tom a les yeux grands ouverts à 2h du matin.`,
    target: 'Toute la famille',
    effect: 'Insomnie induite par la lumière bleue',
    educational: 'Effets de la lumière des écrans sur le sommeil',
    shieldResponses: {
      security: "J'éteins tous les écrans pour protéger notre sommeil.",
      heart: "On lit ensemble avant de dormir.",
      liberty: "Je garde mes écrans allumés, c'est mon choix.",
      respect: "On établit : pas d'écrans 1h avant le coucher."
    }
  },

  9: {
    id: 9,
    title: 'Le Sommeil Connecté',
    chapter: 2,
    category: 'sommeil',
    description: `Le Wi-Fou a connecté le lit de Léa à Internet ! Son matelas diffuse des notifications, son oreiller vibre pour chaque message, et son drap affiche des publicités. Impossible de dormir sans être bombardée d'informations numériques.`,
    target: 'Toute la famille',
    effect: 'Surstimulation nocturne',
    educational: 'Nécessité de déconnexion pour le sommeil',
    shieldResponses: {
      security: "Je débranche le lit pour protéger mon sommeil.",
      heart: "On crée un rituel de coucher sans technologie.",
      liberty: "Je garde le lit connecté, c'est mon choix.",
      respect: "On décide : chambre sans technologie."
    }
  },

  10: {
    id: 10,
    title: 'Le Cauchemar Numérique',
    chapter: 2,
    category: 'sommeil',
    description: `Le Wi-Fou transforme les rêves de Tom en cauchemars numériques ! Il rêve qu'il est piégé dans un jeu vidéo, que ses données personnelles sont volées, que ses amis virtuels l'abandonnent. Il se réveille en sueur, terrifié par ces visions technologiques.`,
    target: 'Toute la famille',
    effect: 'Anxiété et troubles du sommeil',
    educational: 'Impact psychologique de la surconsommation numérique',
    shieldResponses: {
      security: "Je limite l'exposition aux écrans avant le coucher.",
      heart: "On parle de ses peurs et on le rassure.",
      liberty: "Je laisse Tom gérer ses rêves, c'est son choix.",
      respect: "On établit : pas d'écrans 2h avant le coucher."
    }
  },

  // 📱 RÉSEAUX SOCIAUX & IMAGE (11-25)

  11: {
    id: 11,
    title: 'Le Défi TikTok Royal',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wi-Fou oblige toute la famille Déboussolée à danser devant le miroir connecté en direct ! Un miroir géant s'allume et lance un défi TikTok : "Toute la famille doit danser maintenant, en live devant 10 000 spectateurs !" Des inconnus du monde entier regardent et commentent.`,
    target: 'Toute la famille',
    effect: 'Exposition publique forcée',
    educational: 'Vie privée, exposition publique et pression des réseaux sociaux',
    shieldResponses: {
      security: "Je coupe la diffusion pour protéger notre intimité.",
      heart: "Je propose une danse privée en famille.",
      liberty: "Je danse en live, c'est mon choix.",
      respect: "On établit : pas de diffusion sans accord de tous."
    }
  },

  12: {
    id: 12,
    title: 'Le Filtre Fou',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wi-Fou impose un filtre ridicule sur tous les visages de la famille Déboussolée dans le miroir magique ! Chaque fois que quelqu'un se regarde, un filtre déforme son visage : oreilles de lapin, nez de cochon, ou pire... une version "parfaite" avec peau lisse et yeux agrandis.`,
    target: 'Toute la famille',
    effect: 'Perte d\'identité et image déformée de soi',
    educational: 'Identité numérique, filtres et image de soi authentique',
    shieldResponses: {
      security: "Je casse le miroir pour protéger notre image.",
      heart: "On se regarde dans un vrai miroir ensemble.",
      liberty: "Je garde les filtres, c'est mon choix.",
      respect: "On établit : pas de filtres trompeurs."
    }
  },

  13: {
    id: 13,
    title: 'La Story Éternelle',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wi-Fou transforme chaque parole de la famille Déboussolée en story visible par tout le royaume ! Chaque conversation privée devient publique. Chaque mot prononcé dans la maison apparaît en story Instagram, TikTok et Snapchat. Les secrets, les disputes, tout est diffusé en direct !`,
    target: 'Toute la famille',
    effect: 'Perte de la vie privée',
    educational: 'Confidentialité, vie privée et partage d\'informations personnelles',
    shieldResponses: {
      security: "Je coupe tous les réseaux pour protéger notre intimité.",
      heart: "On parle en chuchotant pour éviter la diffusion.",
      liberty: "Je continue à parler, c'est mon choix.",
      respect: "On établit : pas de réseaux sociaux à la maison."
    }
  },

  14: {
    id: 14,
    title: 'L\'Influenceur Forcé',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wi-Fou transforme Léa en influenceuse malgré elle ! Elle doit poster 50 stories par jour, répondre à tous les commentaires, et promouvoir des produits qu'elle n'aime pas. Elle devient esclave de ses followers et perd sa personnalité authentique.`,
    target: 'Toute la famille',
    effect: 'Perte d\'authenticité et pression sociale',
    educational: 'Authenticité vs performance sociale',
    shieldResponses: {
      security: "Je supprime le compte pour protéger Léa.",
      heart: "On aide Léa à retrouver sa vraie personnalité.",
      liberty: "Je laisse Léa gérer son compte, c'est son choix.",
      respect: "On établit : pas de pression pour être populaire."
    }
  },

  15: {
    id: 15,
    title: 'Le Like Obsessionnel',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wi-Fou rend la famille Déboussolée obsédée par les likes ! Chaque membre vérifie ses notifications toutes les 5 minutes. Tom pleure quand il n'a que 3 likes sur sa photo. Maman Déboussolée panique si personne ne réagit à ses posts.`,
    target: 'Toute la famille',
    effect: 'Dépendance à la validation sociale',
    educational: 'Estime de soi et indépendance de l\'opinion des autres',
    shieldResponses: {
      security: "Je supprime les comptes pour protéger notre estime.",
      heart: "On se valorise mutuellement sans réseaux sociaux.",
      liberty: "Je garde mes comptes, c'est mon choix.",
      respect: "On établit : pas de vérification compulsive des likes."
    }
  }
};