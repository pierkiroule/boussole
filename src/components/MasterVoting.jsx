import { useState } from 'react';
import { getShieldById } from '../data/shields';
import { GAME_CONFIG } from '../data/gameConfig';

export default function MasterVoting({ attack, parades, onVote }) {
  const [scores, setScores] = useState({});
  const [totalDistributed, setTotalDistributed] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);

  const maxPoints = GAME_CONFIG.SCORING.PHARMAKON_POINTS_PER_TURN;

  const handleScoreChange = (playerIndex, score) => {
    const newScores = { ...scores };
    newScores[playerIndex] = Math.max(0, Math.min(maxPoints, parseInt(score) || 0));
    setScores(newScores);

    // Calculer le total distribué
    const total = Object.values(newScores).reduce((sum, score) => sum + score, 0);
    setTotalDistributed(total);
    setCanSubmit(total === maxPoints);
  };

  const handleSubmitVote = () => {
    if (canSubmit) {
      onVote(scores);
    }
  };

  const getShield = (shieldId) => {
    return getShieldById(shieldId);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">👑 Vote du Maître Gardien</h2>
        <p className="text-gray-600">Distribuez vos {maxPoints} pts Pharmakon selon la qualité des parades</p>
      </div>

      {/* Informations sur l'attaque */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">⚔️ Attaque : {attack.title}</h3>
        <p className="text-sm text-gray-600">{attack.effect}</p>
      </div>

      {/* Parades à évaluer */}
      <div className="space-y-4 mb-6">
        {Object.entries(parades).map(([playerIndex, paradeData]) => {
          const shield = getShield(paradeData.shieldId);
          const currentScore = scores[playerIndex] || 0;
          
          return (
            <div key={playerIndex} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800 mr-3">{paradeData.playerName}</span>
                  <span className="text-lg mr-2">{shield.emoji}</span>
                  <span className="text-sm text-gray-600">{shield.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleScoreChange(playerIndex, currentScore - 1)}
                    disabled={currentScore <= 0}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={currentScore}
                    onChange={(e) => handleScoreChange(playerIndex, e.target.value)}
                    className="w-16 text-center border rounded px-2 py-1"
                    min="0"
                    max={maxPoints}
                  />
                  <button
                    onClick={() => handleScoreChange(playerIndex, currentScore + 1)}
                    disabled={currentScore >= maxPoints || totalDistributed >= maxPoints}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-gray-700 italic">"{paradeData.parade}"</p>
            </div>
          );
        })}
      </div>

      {/* Résumé de la distribution */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-blue-800">Total distribué :</span>
          <span className={`font-bold text-lg ${
            totalDistributed === maxPoints ? 'text-green-600' : 'text-red-600'
          }`}>
            {totalDistributed}/{maxPoints} pts Pharmakon
          </span>
        </div>
        {totalDistributed !== maxPoints && (
          <p className="text-red-600 text-sm mt-2">
            ⚠️ Vous devez distribuer exactement {maxPoints} points pour continuer
          </p>
        )}
      </div>

      {/* Bouton de soumission */}
      <div className="text-center">
        <button
          onClick={handleSubmitVote}
          disabled={!canSubmit}
          className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
            canSubmit
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canSubmit ? '✅ Valider la Distribution' : '❌ Distribution Incomplète'}
        </button>
      </div>
    </div>
  );
}