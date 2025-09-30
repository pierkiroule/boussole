// Chapitres de l'épopée "Le Wifou"

export const CHAPTERS = {
  CHAPTER_1: {
    id: 'chapter_1',
    title: 'La Première Invasion',
    subtitle: 'L\'éveil des Gardiens',
    description: 'Le Wifou, cyber-fantôme maléfique, a découvert la connexion internet de la famille De Boussolée et commence par des attaques sournoises.',
    objective: 'Apprendre les bases des boucliers de défense et découvrir les premiers pièges du Wifou',
    intro: `Il était une fois la paisible famille De Boussolée... jusqu'au jour où le Wifou, cyber-fantôme maléfique, a découvert leur connexion internet. 

Ce cyber-fantôme a commencé par des attaques sournoises, testant la résistance de chaque membre de la famille De Boussolée. Les Gardiens doivent apprendre à se protéger et à s'unir contre cette menace naissante.

🌅 Premier objectif : Comprendre les pouvoirs de vos boucliers magiques et résister aux premières tentations numériques.`,
    attacks: [1, 2, 3, 4], // IDs des attaques de ce chapitre
    color: '#3B82F6',
    emoji: '🌅'
  },
  
  CHAPTER_2: {
    id: 'chapter_2',
    title: 'L\'Escalade',
    subtitle: 'Le Wifou se renforce',
    description: 'Les Gardiens ont résisté aux premières attaques, mais le Wifou n\'a pas dit son dernier mot. Il a étudié leurs défenses et développé de nouvelles stratégies plus sophistiquées.',
    objective: 'Comprendre les motivations du Wifou et développer des stratégies avancées',
    intro: `Les Gardiens ont résisté aux premières attaques, mais le Wifou n'a pas dit son dernier mot. 

Il a étudié leurs défenses et développé de nouvelles stratégies plus sophistiquées. La bataille s'intensifie... Le Wifou révèle progressivement ses vraies motivations : posséder la famille De Boussolée.

⚔️ Deuxième objectif : Renforcer l'immunité familiale et comprendre les mécanismes de manipulation numérique.`,
    attacks: [5, 6, 7, 8],
    color: '#EF4444',
    emoji: '⚔️'
  },
  
  CHAPTER_3: {
    id: 'chapter_3',
    title: 'Le Combat Final',
    subtitle: 'Face à face avec le Wifou',
    description: 'Le Wifou révèle sa vraie nature : il veut posséder complètement la famille De Boussolée pour la transformer en esclaves numériques. Mais les Gardiens sont maintenant prêts.',
    objective: 'Affronter le boss final et utiliser toutes les compétences acquises',
    intro: `Le Wifou révèle sa vraie nature : il veut posséder complètement la famille De Boussolée pour la transformer en esclaves numériques. 

Mais les Gardiens sont maintenant prêts. Ils ont appris, ils ont grandi, ils ont découvert leurs véritables pouvoirs. Le combat final commence...

👑 Objectif final : Chasser le Wifou, libérer la famille De Boussolée et restaurer l'harmonie entre technologie et famille.`,
    attacks: [9, 10, 11, 12],
    color: '#7C3AED',
    emoji: '👑'
  },
  
  EPILOGUE: {
    id: 'epilogue',
    title: 'La Famille Immunisée',
    subtitle: 'Victoire et sagesse acquise',
    description: 'Grâce à leur courage et à leur sagesse, les Gardiens ont chassé le Wifou. La famille De Boussolée est libérée et l'harmonie est restaurée.',
    objective: 'Célébrer la victoire et récapituler les leçons apprises',
    intro: `Grâce à leur courage et à leur sagesse, les Gardiens ont chassé le Wifou. 

La famille De Boussolée a restauré l'harmonie entre technologie et famille. Ils sont maintenant immunisés, sages, et prêts à protéger leur esprit familial pour toujours.

✨ L'histoire continue... Vous avez libéré la famille De Boussolée !`,
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