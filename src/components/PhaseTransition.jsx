import React, { useState, useEffect } from 'react';

export default function PhaseTransition({ phase, onComplete }) {
  const [isVisible, setIsVisible] = useState(false);

  const phaseMessages = {
    intro: {
      title: '🌅 Nouveau Chapitre',
      message: 'Préparez-vous à découvrir une nouvelle menace du Wi-Fou...',
      color: 'blue'
    },
    attack: {
      title: '⚔️ Attaque en Cours',
      message: 'Le Wi-Fou lance son attaque ! Choisissez vos boucliers...',
      color: 'red'
    },
    voting: {
      title: '👑 Vote du Maître',
      message: 'Le Maître Gardien évalue les parades et distribue les points...',
      color: 'yellow'
    },
    riddle: {
      title: '🤔 Réflexion',
      message: 'Réfléchissez aux motivations du Wi-Fou...',
      color: 'purple'
    }
  };

  const currentPhase = phaseMessages[phase];

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-white rounded-2xl p-8 text-center max-w-md mx-4 transform transition-all duration-300 ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className={`text-6xl mb-4 animate-pulse-custom`}>
          {phase === 'intro' && '🌅'}
          {phase === 'attack' && '⚔️'}
          {phase === 'voting' && '👑'}
          {phase === 'riddle' && '🤔'}
        </div>
        
        <h2 className={`text-2xl font-bold mb-4 ${
          currentPhase.color === 'blue' ? 'text-blue-600' :
          currentPhase.color === 'red' ? 'text-red-600' :
          currentPhase.color === 'yellow' ? 'text-yellow-600' :
          'text-purple-600'
        }`}>
          {currentPhase.title}
        </h2>
        
        <p className="text-gray-600 text-lg">
          {currentPhase.message}
        </p>
        
        <div className="mt-6">
          <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden`}>
            <div className={`h-full bg-gradient-to-r ${
              currentPhase.color === 'blue' ? 'from-blue-500 to-blue-600' :
              currentPhase.color === 'red' ? 'from-red-500 to-red-600' :
              currentPhase.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
              'from-purple-500 to-purple-600'
            } rounded-full animate-pulse`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}