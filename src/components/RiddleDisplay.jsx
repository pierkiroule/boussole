import React, { useState } from 'react';
import { getRandomRiddle, checkRiddleAnswer } from '../data/riddles';

export default function RiddleDisplay({ onRiddleComplete }) {
  const [riddle, setRiddle] = useState(() => getRandomRiddle());
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const answerResult = checkRiddleAnswer(riddle.id, selectedAnswer);
    setResult(answerResult);
    setShowResult(true);
  };

  const handleNextRiddle = () => {
    const newRiddle = getRandomRiddle();
    setRiddle(newRiddle);
    setSelectedAnswer(null);
    setShowResult(false);
    setResult(null);
  };

  const handleComplete = () => {
    onRiddleComplete(result?.isCorrect || false);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🤔 Énigme de Réflexion</h2>
        <p className="text-gray-600">Réfléchissez aux motivations du Wi-Fou...</p>
      </div>

      {/* Question */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">{riddle.question}</h3>
        
        {/* Réponses */}
        <div className="space-y-3">
          {riddle.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedAnswer === index
                  ? showResult
                    ? result?.isCorrect && index === riddle.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : result?.isCorrect === false && index === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : index === riddle.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && !showResult && '✓'}
                  {showResult && index === riddle.correctAnswer && '✓'}
                  {showResult && !result?.isCorrect && index === selectedAnswer && '✗'}
                </div>
                <span className="text-gray-700">{answer.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bouton de soumission */}
      {!showResult && (
        <div className="text-center mb-6">
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
              selectedAnswer !== null
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedAnswer !== null ? '✅ Valider ma Réponse' : '❌ Choisissez une réponse'}
          </button>
        </div>
      )}

      {/* Résultat */}
      {showResult && (
        <div className="space-y-6">
          <div className={`border-2 rounded-lg p-6 text-center ${
            result?.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
          }`}>
            <div className="text-4xl mb-4">
              {result?.isCorrect ? '🎉' : '💭'}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              result?.isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {result?.isCorrect ? 'Excellente réflexion !' : 'Réflexion intéressante...'}
            </h3>
            <p className={`text-lg ${
              result?.isCorrect ? 'text-green-700' : 'text-red-700'
            }`}>
              {result?.explanation}
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleNextRiddle}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🔄 Autre Énigme
            </button>
            <button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              ✅ Continuer l'Aventure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}