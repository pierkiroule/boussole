// Attaques du Wifou - Pack de 12 situations loufoques et éducatives

export const ATTACKS = {
  // 🍽️ REPAS & VIE FAMILIALE
  
  1: {
    id: 1,
    title: 'Le Repas Fantôme',
    chapter: 1,
    category: 'repas',
    description: `Le Wifou ensorcelle la table : chaque assiette diffuse un TikTok en direct !
    
Les fourchettes vibrent au rythme des vidéos, les verres affichent des stories, et même les serviettes projettent des réels. Impossible de manger sans être distrait par les écrans flottants au-dessus de chaque plat.

La famille Déboussolée est tiraillée : doit-elle manger en regardant les écrans, ou résister à la tentation ?`,
    target: 'La table familiale',
    effect: 'Distraction pendant les repas',
    educational: 'Repas en famille, attention et lien social'
  },

  2: {
    id: 2,
    title: 'La Chaise Connectée',
    chapter: 1,
    category: 'repas',
    description: `Au dîner, une chaise envoie un message lumineux : "Pas de place pour toi sans ton smartphone !"
    
Le Wifou a transformé les chaises en portails numériques. Pour s'asseoir, il faut scanner son téléphone. Ceux qui refusent restent debout pendant tout le repas.

La famille Déboussolée hésite : céder au chantage du Wifou, ou manger debout en défendant ses principes ?`,
    target: 'Toute la famille',
    effect: 'Exclusion sociale liée aux écrans',
    educational: 'Pression sociale et conformité numérique'
  },

  3: {
    id: 3,
    title: 'Le Wifou des Selfies',
    chapter: 1,
    category: 'repas',
    description: `Avant de manger, le Wifou impose un selfie obligatoire avec chaque bouchée !
    
Un miroir connecté géant apparaît au-dessus de la table. À chaque fois que quelqu'un veut manger, il doit prendre un selfie, choisir un filtre, écrire une légende et attendre les likes avant de pouvoir avaler sa bouchée.

Le repas devient interminable. La famille Déboussolée a faim... mais le Wifou veut des photos !`,
    target: 'Toute la famille',
    effect: 'Obsession de l\'image et des réseaux sociaux',
    educational: 'Image de soi, performance sociale et partage sur les réseaux'
  },

  // 🌙 SOMMEIL & RYTHME DE VIE

  4: {
    id: 4,
    title: 'La Nuit des Notifications',
    chapter: 2,
    category: 'sommeil',
    description: `Minuit. Le Wifou bombarde la chambre d'alertes fantômes !
    
Les téléphones vibrent sans arrêt avec des messages imaginaires : "URGENT ! Ton ami t'a tagué !", "Nouvelle vidéo de ton Youtubeur préféré !", "Tu as reçu 50 likes !". Mais quand on regarde l'écran... il n'y a rien.

La famille Déboussolée ne peut pas dormir. Le Wifou ricane dans l'ombre : des humains fatigués sont plus faciles à contrôler...`,
    target: 'Toute la famille',
    effect: 'Perturbation du sommeil',
    educational: 'Importance du sommeil et nécessité de déconnexion nocturne'
  },

  5: {
    id: 5,
    title: 'Le Réveil Troll',
    chapter: 2,
    category: 'sommeil',
    description: `Le Wifou règle les alarmes du château pour sonner toutes les 10 minutes !
    
Chaque appareil de la maison devient un réveil détraqué : le smartphone, la tablette, l'ordinateur, la télé, même le frigo ! Ils sonnent en boucle avec des sons différents et des messages absurdes.

La famille Déboussolée ne peut ni dormir, ni se reposer. Le Wifou veut les épuiser pour mieux les manipuler.`,
    target: 'Toute la famille',
    effect: 'Fatigue chronique',
    educational: 'Fatigue, surstimulation numérique et besoin de repos'
  },

  6: {
    id: 6,
    title: 'La Lampe Bleue',
    chapter: 2,
    category: 'sommeil',
    description: `Le Wifou colore toutes les lampes du château en lumière bleue avant de dormir !
    
La lumière bleue des écrans envahit les chambres. Impossible de fermer les yeux : le cerveau croit qu'il fait jour ! Les écrans brillent comme des soleils artificiels, trompant le corps et empêchant le sommeil naturel.

La famille Déboussolée a les yeux grands ouverts à 2h du matin, prisonnière de la lumière bleue du Wifou.`,
    target: 'Toute la famille',
    effect: 'Insomnie induite par la lumière bleue',
    educational: 'Effets de la lumière des écrans sur le sommeil et la mélatonine'
  },

  // 🤳 RÉSEAUX SOCIAUX & IMAGE

  7: {
    id: 7,
    title: 'Le Défi TikTok Royal',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wifou oblige toute la famille à danser devant le miroir connecté… en direct !
    
Un miroir géant s'allume et lance un défi TikTok : "Toute la famille doit danser maintenant, en live devant 10 000 spectateurs !" Le Wifou a déjà lancé la diffusion. Des inconnus du monde entier regardent et commentent en temps réel.

La famille Déboussolée est embarrassée. Danser ou refuser ? Mais si elle refuse, le Wifou menace de diffuser leurs pires moments filmés en secret...`,
    target: 'Toute la famille',
    effect: 'Exposition publique forcée',
    educational: 'Vie privée, exposition publique et pression des réseaux sociaux'
  },

  8: {
    id: 8,
    title: 'Le Filtre Fou',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wifou impose un filtre ridicule sur tous les visages dans le miroir magique !
    
Chaque fois que quelqu'un se regarde dans un miroir, un filtre déforme son visage : oreilles de lapin, nez de cochon, tête de chat, ou pire... une version "parfaite" avec peau lisse, yeux agrandis et sourire forcé.

La famille Déboussolée ne se reconnaît plus. Les vrais visages ont disparu derrière les filtres du Wifou.`,
    target: 'Toute la famille',
    effect: 'Perte d\'identité et image déformée de soi',
    educational: 'Identité numérique, filtres et image de soi authentique'
  },

  9: {
    id: 9,
    title: 'La Story Éternelle',
    chapter: 3,
    category: 'reseaux',
    description: `Le Wifou transforme chaque parole en story visible par tout le royaume !
    
Chaque conversation privée devient publique. Chaque mot prononcé dans la maison apparaît en story Instagram, TikTok et Snapchat, visible par tous. Les secrets, les disputes, les moments gênants... tout est diffusé en direct !

La famille Déboussolée n'ose plus parler. Le Wifou a supprimé la confidentialité.`,
    target: 'Toute la famille',
    effect: 'Perte de la vie privée',
    educational: 'Confidentialité, vie privée et partage d\'informations personnelles'
  },

  // 🔒 SÉCURITÉ & RÈGLES

  10: {
    id: 10,
    title: 'Le Coffre-Fort Piraté',
    chapter: 4,
    category: 'securite',
    description: `Le Wifou a mélangé tous les mots de passe du château et les a peints sur les murs !
    
Les mots de passe secrets sont maintenant visibles partout : sur les portes, les fenêtres, même sur les vêtements ! Le mot de passe de Papa pour la banque, celui de Maman pour les réseaux sociaux, celui des enfants pour les jeux...

La famille Déboussolée est vulnérable. N'importe qui peut entrer dans leurs comptes. Le Wifou ricane : "Qui protège ses secrets maintenant ?"`,
    target: 'Toute la famille',
    effect: 'Perte de sécurité des comptes',
    educational: 'Sécurité des comptes, secret des mots de passe et protection des données'
  },

  11: {
    id: 11,
    title: 'La Clé USB Maléfique',
    chapter: 4,
    category: 'securite',
    description: `Le Wifou distribue des clés magiques infectées à tous les habitants du château !
    
Des clés USB mystérieuses apparaissent partout dans la maison, avec des étiquettes alléchantes : "Photos de vacances", "Jeu gratuit", "Cadeau surprise !". Mais ces clés sont piégées ! Celui qui les branche dans son ordinateur libère un virus du Wifou.

La famille Déboussolée est tentée... Faut-il brancher ces clés mystérieuses ?`,
    target: 'Toute la famille',
    effect: 'Risque de virus et malware',
    educational: 'Prudence face aux fichiers inconnus et sensibilisation aux virus'
  },

  12: {
    id: 12,
    title: 'Le Contrat Piégé',
    chapter: 4,
    category: 'securite',
    description: `Le Wifou fait signer à tout le monde un contrat numérique sans le lire !
    
Une application magique apparaît : "Acceptez pour continuer !" Le bouton est gros et brillant. Les conditions d'utilisation font 247 pages en petits caractères. Tout le monde clique sur "Accepter" sans lire.

Trop tard ! Le Wifou a maintenant le droit d'accéder à toutes les photos, contacts, messages, localisation... La famille Déboussolée a vendu ses données sans s'en rendre compte !`,
    target: 'Toute la famille',
    effect: 'Perte du contrôle de ses données personnelles',
    educational: 'Lecture et compréhension des conditions d\'utilisation et protection des données'
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