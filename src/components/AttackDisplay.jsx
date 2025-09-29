import React, { useState } from 'react';
import { getAllShields } from '../data/shields';

export default function AttackDisplay({ attack, masterName, players, onParadesSubmitted }) {
  const [parades, setParades] = useState({});
  const [submittedCount, setSubmittedCount] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentParade, setCurrentParade] = useState('');
  const [currentShieldId, setCurrentShieldId] = useState('');
  const shields = getAllShields();

  const handleParadeSubmit = (playerIndex, parade, shieldId) => {
    const newParades = {
      ...parades,
      [playerIndex]: { parade, shieldId, playerName: players[playerIndex] }
    };
    setParades(newParades);
    setSubmittedCount(submittedCount + 1);

    // Si tous les joueurs ont soumis leur parade
    if (submittedCount + 1 >= players.length) {
      onParadesSubmitted(newParades);
    } else {
      // Passer au joueur suivant
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setCurrentParade('');
      setCurrentShieldId('');
    }
  };

  const handleSubmitCurrentParade = () => {
    if (currentParade.trim() && currentShieldId) {
      handleParadeSubmit(currentPlayerIndex, currentParade.trim(), currentShieldId);
    }
  };

  const getShieldById = (shieldId) => {
    return shields.find(shield => shield.id === shieldId);
  };

  const getCurrentPlayerName = () => {
    return players[currentPlayerIndex] || '';
  };

  const canSubmit = currentParade.trim() && currentShieldId;

  return (
    <div className="space-y-6">
      {/* Affichage de l'attaque */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-red-800 mb-2">👻 Attaque du Wi-Fou</h2>
          <h3 className="text-xl text-red-700">{attack.title}</h3>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {attack.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-red-100 rounded p-3">
            <strong className="text-red-800">Cible :</strong> {attack.target}
          </div>
          <div className="bg-red-100 rounded p-3">
            <strong className="text-red-800">Effet :</strong> {attack.effect}
          </div>
        </div>
      </div>

      {/* Instructions pour le Maître */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">👑 Instructions pour {masterName}</h3>
        <p className="text-yellow-700 text-sm">
          Vous êtes le Maître Gardien de ce tour. Écoutez les parades des autres Gardiens et préparez-vous à distribuer vos 3 pts Pharmakon selon la qualité de leurs explications.
        </p>
      </div>

      {/* Interface de soumission de parade */}
      {submittedCount < players.length && (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🛡️ Parade de {getCurrentPlayerName()}
          </h3>
          
          {/* Sélection du bouclier */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choisissez votre bouclier de défense :
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {shields.map((shield) => (
                <button
                  key={shield.id}
                  onClick={() => setCurrentShieldId(shield.id)}
                  className={`shield-card text-left ${
                    currentShieldId === shield.id ? 'selected' : ''
                  }`}
                >
                  <div className="text-2xl mb-2">{shield.emoji}</div>
                  <div className="font-semibold text-gray-800 text-sm">{shield.name}</div>
                  <div className="text-xs text-gray-600">{shield.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description de la parade */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expliquez comment vous utilisez ce bouclier pour défendre la famille :
            </label>
            <textarea
              value={currentParade}
              onChange={(e) => setCurrentParade(e.target.value)}
              placeholder="Décrivez votre stratégie de défense..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
            />
          </div>

          {/* Bouton de soumission */}
          <div className="text-center">
            <button
              onClick={handleSubmitCurrentParade}
              disabled={!canSubmit}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                canSubmit ? 'btn-success' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canSubmit ? '✅ Soumettre ma Parade' : '❌ Complétez votre parade'}
            </button>
          </div>
        </div>
      )}

      {/* Parades soumises */}
      {Object.keys(parades).length > 0 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🛡️ Parades des Gardiens</h3>
          <div className="space-y-4">
            {Object.entries(parades).map(([playerIndex, paradeData]) => {
              const shield = getShieldById(paradeData.shieldId);
              return (
                <div key={playerIndex} className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-800">{paradeData.playerName}</span>
                    <span className="ml-2 text-lg">{shield.emoji}</span>
                    <span className="ml-2 text-sm text-gray-600">{shield.name}</span>
                  </div>
                  <p className="text-gray-700">{paradeData.parade}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progression */}
      <div className="text-center text-white">
        <p>Parades soumises : {submittedCount}/{players.length}</p>
        {submittedCount < players.length && (
          <p className="text-sm opacity-80">En attente des autres Gardiens...</p>
        )}
      </div>
    </div>
  );
}