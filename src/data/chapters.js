// Chapitres de l'épopée "Les Gardiens de l'Esprit Familial"

export const CHAPTERS = {
  CHAPTER_1: {
    id: 'chapter_1',
    title: 'La Première Invasion',
    subtitle: 'L\'éveil des Gardiens',
    description: 'Le Wi-Fou maléfique a découvert votre connexion internet et commence par des attaques sournoises, testant la résistance de chaque membre de la famille.',
    objective: 'Apprendre les bases des boucliers de défense et découvrir les premiers pièges du Wi-Fou',
    intro: `Il était une fois une famille paisible... jusqu'au jour où le Wi-Fou maléfique a découvert leur connexion internet. 

Ce fantôme numérique a commencé par des attaques sournoises, testant la résistance de chaque membre de la famille. Les Gardiens doivent apprendre à se protéger et à s'unir contre cette menace naissante.

🌅 Premier objectif : Comprendre les pouvoirs de vos boucliers magiques et résister aux premières tentations numériques.`,
    attacks: [1, 2, 3, 4], // IDs des attaques de ce chapitre
    color: '#3B82F6',
    emoji: '🌅'
  },
  
  CHAPTER_2: {
    id: 'chapter_2',
    title: 'L\'Escalade',
    subtitle: 'Le Wi-Fou se renforce',
    description: 'Les Gardiens ont résisté aux premières attaques, mais le Wi-Fou n\'a pas dit son dernier mot. Il a étudié leurs défenses et développé de nouvelles stratégies plus sophistiquées.',
    objective: 'Comprendre les motivations du Wi-Fou et développer des stratégies avancées',
    intro: `Les Gardiens ont résisté aux premières attaques, mais le Wi-Fou n'a pas dit son dernier mot. 

Il a étudié leurs défenses et développé de nouvelles stratégies plus sophistiquées. La bataille s'intensifie... Le Wi-Fou révèle progressivement ses vraies motivations et teste la résistance familiale avec des pièges plus subtils.

⚔️ Deuxième objectif : Renforcer l'immunité familiale et comprendre les mécanismes de manipulation numérique.`,
    attacks: [5, 6, 7, 8],
    color: '#EF4444',
    emoji: '⚔️'
  },
  
  CHAPTER_3: {
    id: 'chapter_3',
    title: 'Le Combat Final',
    subtitle: 'Face à face avec le Wi-Fou',
    description: 'Le Wi-Fou révèle sa vraie nature : il veut posséder l\'esprit familial entier pour le transformer en esclaves numériques. Mais les Gardiens sont maintenant prêts.',
    objective: 'Affronter le boss final et utiliser toutes les compétences acquises',
    intro: `Le Wi-Fou révèle sa vraie nature : il veut posséder l'esprit familial entier pour le transformer en esclaves numériques. 

Mais les Gardiens sont maintenant prêts. Ils ont appris, ils ont grandi, ils ont découvert leurs véritables pouvoirs. Le combat final commence...

👑 Objectif final : Libérer définitivement la famille et devenir de vrais Gardiens de l'Esprit Familial.`,
    attacks: [9, 10, 11, 12],
    color: '#7C3AED',
    emoji: '👑'
  },
  
  EPILOGUE: {
    id: 'epilogue',
    title: 'La Famille Immunisée',
    subtitle: 'Victoire et sagesse acquise',
    description: 'Grâce à leur courage et à leur sagesse, les Gardiens ont vaincu le Wi-Fou. Ils sont maintenant immunisés, sages, et prêts à protéger leur esprit familial pour toujours.',
    objective: 'Célébrer la victoire et récapituler les leçons apprises',
    intro: `Grâce à leur courage et à leur sagesse, les Gardiens ont vaincu le Wi-Fou. 

Mais ils savent que d'autres menaces numériques peuvent apparaître. Ils sont maintenant immunisés, sages, et prêts à protéger leur esprit familial pour toujours.

✨ L'histoire continue... Vous êtes maintenant de vrais Gardiens de l'Esprit Familial !`,
    attacks: [],
    color: '#10B981',
    emoji: '✨'
  }
};

// Fonction pour obtenir un chapitre par ID
export function getChapterById(id) {
  return Object.values(CHAPTERS).find(chapter => chapter.id === id);
}

// Fonction pour obtenir tous les chapitres dans l'ordre
export function getAllChapters() {
  return [
    CHAPTERS.CHAPTER_1,
    CHAPTERS.CHAPTER_2,
    CHAPTERS.CHAPTER_3,
    CHAPTERS.EPILOGUE
  ];
}

// Fonction pour obtenir le chapitre suivant
export function getNextChapter(currentChapterId) {
  const chapters = getAllChapters();
  const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapterId);
  return chapters[currentIndex + 1] || null;
}