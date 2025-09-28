import React, { useState } from 'react';

const TUTORIAL_STEPS = [
  {
    id: 1,
    title: "Bienvenue dans La Famille Déboussolée !",
    content: "Ce jeu vous aide à retrouver l'équilibre numérique en famille. Vous allez découvrir comment gérer les écrans ensemble.",
    icon: "🧭",
    action: "Commencer"
  },
  {
    id: 2,
    title: "La Boussole Magique",
    content: "Cette boussole a 4 cadrans colorés : Nord (bleu), Est (vert), Sud (orange), Ouest (violet). Chaque cadran a un effet différent !",
    icon: "🧭",
    action: "Suivant"
  },
  {
    id: 3,
    title: "Les 4 Cadrans",
    content: "• Nord ✨ : Trésor (3 points max + jackpot possible)\n• Est 🤝 : Cadeau (transfert de points entre joueurs)\n• Sud 🎭 : Gage (50% chance de réussir)\n• Ouest 😵 : Perdu (passe son tour)",
    icon: "🎯",
    action: "Suivant"
  },
  {
    id: 4,
    title: "Les 4 Valeurs Familiales",
    content: "• Liberté : Autonomie et choix personnels\n• Cœur : Émotions et relations\n• Règles : Structure et limites\n• Sécurité : Protection et bien-être",
    icon: "💎",
    action: "Suivant"
  },
  {
    id: 5,
    title: "La Ronde des Décisions",
    content: "Quand l'aiguille tombe entre deux cadrans, vous tirez une situation réaliste. Le joueur actif choisit, les autres votent secrètement !",
    icon: "🗳️",
    action: "Suivant"
  },
  {
    id: 6,
    title: "Système de Résonance",
    content: "Si le choix du joueur actif correspond à la majorité des votes, c'est une résonance ! +2 points +1 étoile familiale.",
    icon: "✨",
    action: "Suivant"
  },
  {
    id: 7,
    title: "Victoire",
    content: "Deux façons de gagner :\n• Victoire individuelle : 12 points\n• Victoire collective : 5 étoiles familiales",
    icon: "🏆",
    action: "Suivant"
  },
  {
    id: 8,
    title: "Conseils pour Bien Jouer",
    content: "• Écoutez-vous vraiment\n• Respectez les choix de chacun\n• Profitez du moment ensemble\n• Apprenez les uns des autres",
    icon: "💡",
    action: "Terminer"
  }
];

export default function Tutorial({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  const currentStepData = TUTORIAL_STEPS[currentStep];
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modal: {
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      position: 'relative'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      background: '#e2e8f0',
      borderRadius: '2px',
      marginBottom: '24px',
      overflow: 'hidden'
    },
    progressFill: {
      width: `${progress}%`,
      height: '100%',
      background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
      transition: 'width 0.3s ease'
    },
    stepIndicator: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '16px'
    },
    icon: {
      fontSize: '48px',
      textAlign: 'center',
      marginBottom: '16px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b',
      textAlign: 'center',
      marginBottom: '16px'
    },
    content: {
      fontSize: '16px',
      color: '#475569',
      lineHeight: '1.6',
      marginBottom: '24px',
      whiteSpace: 'pre-line'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    secondaryButton: {
      background: 'transparent',
      color: '#64748b',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    skipButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'transparent',
      border: 'none',
      color: '#94a3b8',
      fontSize: '12px',
      cursor: 'pointer',
      padding: '8px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.skipButton} onClick={handleSkip}>
          Passer
        </button>
        
        <div style={styles.progressBar}>
          <div style={styles.progressFill}></div>
        </div>
        
        <div style={styles.stepIndicator}>
          Étape {currentStep + 1} sur {TUTORIAL_STEPS.length}
        </div>
        
        <div style={styles.icon}>
          {currentStepData.icon}
        </div>
        
        <div style={styles.title}>
          {currentStepData.title}
        </div>
        
        <div style={styles.content}>
          {currentStepData.content}
        </div>
        
        <div style={styles.buttonGroup}>
          <button style={styles.primaryButton} onClick={handleNext}>
            {currentStepData.action}
          </button>
        </div>
      </div>
    </div>
  );
}