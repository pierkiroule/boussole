import React, { useState } from 'react';
import { getAllShields } from '../data/shields';

export default function Tutorial({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const shields = getAllShields();

  const steps = [
    {
      title: "🛡️ Bienvenue, Gardiens !",
      content: `Vous êtes les Gardiens de l'Esprit Familial, chargés de protéger votre famille contre le Wi-Fou maléfique.

Le Wi-Fou est un fantôme numérique qui veut posséder l'esprit de votre famille pour la transformer en esclaves des écrans.

Votre mission : Résister à ses attaques en utilisant vos boucliers magiques et votre sagesse collective.`
    },
    {
      title: "🎮 Comment jouer",
      content: `Le jeu se déroule en tours. À chaque tour :

1. Le Maître Gardien (qui change à chaque tour) lit l'attaque du Wi-Fou
2. Les autres Gardiens choisissent un bouclier et expliquent leur parade
3. Le Maître Gardien distribue 3 pts Pharmakon selon la qualité des parades
4. Une énigme de réflexion est proposée pour approfondir la compréhension
5. Le Maître Gardien change et un nouveau tour commence`
    },
    {
      title: "🛡️ Les Boucliers Magiques",
      content: `Vous disposez de 4 boucliers puissants :`,
      shields: true
    },
    {
      title: "💊 Les Points Pharmakon",
      content: `Les points Pharmakon représentent votre sagesse acquise contre le Wi-Fou.

• Le Maître Gardien distribue 3 pts par tour
• Bonus de 1 pt pour une bonne réponse à l'énigme
• Plus vous avez de points, plus vous êtes sage et résistant

Le Gardien avec le plus de points à la fin devient le Grand Gardien de l'Esprit Familial !`
    },
    {
      title: "🤔 Les Énigmes",
      content: `Après chaque vote, une énigme vous aide à réfléchir aux motivations du Wi-Fou.

Ces questions vous permettent de :
• Comprendre les mécanismes de manipulation numérique
• Développer votre esprit critique
• Renforcer votre immunité familiale

Réfléchissez bien : une bonne réponse vous donne un bonus !`
    },
    {
      title: "🏆 Objectif Final",
      content: `Votre objectif est de :

• Résister à toutes les attaques du Wi-Fou
• Comprendre ses mécanismes de manipulation
• Renforcer l'unité familiale
• Développer une immunité numérique durable

Prêt à devenir de vrais Gardiens de l'Esprit Familial ?`
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📚 Tutoriel des Gardiens
          </h1>
          <div className="flex justify-center items-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenu */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {currentStepData.title}
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentStepData.content}
            </p>
          </div>

          {/* Affichage des boucliers pour l'étape 3 */}
          {currentStepData.shields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {shields.map((shield) => (
                <div key={shield.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{shield.emoji}</span>
                    <span className="font-semibold text-gray-800">{shield.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{shield.description}</p>
                  <p className="text-xs text-gray-500">
                    <strong>Pouvoir :</strong> {shield.power}
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Protège contre :</strong> {shield.protectsAgainst}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              currentStep === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            ← Précédent
          </button>
          
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {currentStep === steps.length - 1 ? '🚀 Commencer l\'Aventure' : 'Suivant →'}
          </button>
        </div>
      </div>
    </div>
  );
}