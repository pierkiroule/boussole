// Énigmes de réflexion sur les motivations du Wi-Fou

export const RIDDLES = {
  1: {
    id: 1,
    question: "D'après toi, pourquoi le Wi-Fou veut-il te rendre accro à ce jeu vidéo ?",
    answers: [
      {
        text: "Pour que je dépense tout mon argent de poche",
        explanation: "Partiellement correct, mais ce n'est pas la seule motivation..."
      },
      {
        text: "Pour que je néglige mes vraies relations",
        explanation: "Exact ! Le Wi-Fou veut isoler pour mieux contrôler."
      },
      {
        text: "Pour que je devienne dépendant et vulnérable",
        explanation: "Parfait ! La dépendance rend manipulable."
      },
      {
        text: "Pour que je perde ma capacité de réflexion",
        explanation: "Excellent ! Sans réflexion, on ne peut plus résister."
      }
    ],
    correctAnswer: 2,
    difficulty: 'medium'
  },

  2: {
    id: 2,
    question: "Quelle est la vraie motivation derrière cette 'offre limitée' ?",
    answers: [
      {
        text: "Vraiment nous faire une bonne affaire",
        explanation: "Non, c'est pour créer l'urgence et nous faire acheter sans réfléchir."
      },
      {
        text: "Nous faire sentir qu'on va rater quelque chose",
        explanation: "Exact ! C'est la 'peur de manquer' (FOMO)."
      },
      {
        text: "Nous faire dépenser plus qu'on ne devrait",
        explanation: "Correct ! L'objectif est de nous faire acheter compulsivement."
      },
      {
        text: "Nous rendre dépendants des achats en ligne",
        explanation: "Parfait ! L'objectif final est la dépendance."
      }
    ],
    correctAnswer: 3,
    difficulty: 'easy'
  },

  3: {
    id: 3,
    question: "Comment cette technologie peut-elle nous diviser ?",
    answers: [
      {
        text: "En créant des bulles d'informations différentes",
        explanation: "Exact ! Chacun voit un monde différent."
      },
      {
        text: "En nous rendant accros à des contenus différents",
        explanation: "Correct ! On n'a plus les mêmes centres d'intérêt."
      },
      {
        text: "En nous isolant chacun dans nos écrans",
        explanation: "Parfait ! L'isolement brise l'unité familiale."
      },
      {
        text: "En créant des conflits sur l'usage du temps",
        explanation: "Très juste ! Les disputes sur les écrans divisent."
      }
    ],
    correctAnswer: 2,
    difficulty: 'medium'
  },

  4: {
    id: 4,
    question: "Quel est le prix caché de cette 'gratuité' ?",
    answers: [
      {
        text: "Nos données personnelles",
        explanation: "Exact ! Nous sommes le produit, pas le client."
      },
      {
        text: "Notre attention et notre temps",
        explanation: "Correct ! Notre attention est monétisée."
      },
      {
        text: "Notre liberté de choix",
        explanation: "Parfait ! On devient esclave de l'algorithme."
      },
      {
        text: "Nos vraies relations humaines",
        explanation: "Excellent ! On sacrifie le réel pour le virtuel."
      }
    ],
    correctAnswer: 2,
    difficulty: 'hard'
  },

  5: {
    id: 5,
    question: "Pourquoi le Wi-Fou nous montre-t-il des images 'parfaites' d'autres familles ?",
    answers: [
      {
        text: "Pour nous inspirer à devenir meilleurs",
        explanation: "Non, c'est pour nous faire sentir inadéquats."
      },
      {
        text: "Pour nous faire acheter plus de produits",
        explanation: "Partiellement, mais ce n'est pas le but principal."
      },
      {
        text: "Pour détruire notre estime de nous-mêmes",
        explanation: "Exact ! Une personne avec une faible estime est plus manipulable."
      },
      {
        text: "Pour nous faire comparer et être jaloux",
        explanation: "Parfait ! La jalousie crée le malheur et la dépendance."
      }
    ],
    correctAnswer: 3,
    difficulty: 'hard'
  },

  6: {
    id: 6,
    question: "Que se passe-t-il quand on cherche constamment l'approbation des autres ?",
    answers: [
      {
        text: "On devient plus populaire",
        explanation: "Non, on devient esclave de l'opinion des autres."
      },
      {
        text: "On perd notre authenticité",
        explanation: "Exact ! On joue un rôle au lieu d'être soi-même."
      },
      {
        text: "On devient anxieux et stressé",
        explanation: "Correct ! La peur du jugement crée de l'anxiété."
      },
      {
        text: "On oublie ce qui est vraiment important",
        explanation: "Parfait ! On perd de vue nos vraies valeurs."
      }
    ],
    correctAnswer: 1,
    difficulty: 'medium'
  }
};

// Fonction pour obtenir une énigme par ID
export function getRiddleById(id) {
  return RIDDLES[id];
}

// Fonction pour obtenir une énigme aléatoire
export function getRandomRiddle() {
  const riddles = Object.values(RIDDLES);
  return riddles[Math.floor(Math.random() * riddles.length)];
}

// Fonction pour obtenir toutes les énigmes d'un niveau de difficulté
export function getRiddlesByDifficulty(difficulty) {
  return Object.values(RIDDLES).filter(riddle => riddle.difficulty === difficulty);
}

// Fonction pour vérifier une réponse
export function checkRiddleAnswer(riddleId, answerIndex) {
  const riddle = getRiddleById(riddleId);
  if (!riddle) return false;
  
  return {
    isCorrect: answerIndex === riddle.correctAnswer,
    correctAnswer: riddle.correctAnswer,
    explanation: riddle.answers[answerIndex]?.explanation || "Réponse invalide"
  };
}