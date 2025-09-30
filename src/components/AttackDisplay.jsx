import { useState } from 'react';
import { getAllShields } from '../data/shields';

export default function AttackDisplay({ attack, masterName, masterIndex, players, playerNames, onVotingComplete }) {
  const [phase, setPhase] = useState('master-choice'); // 'master-choice', 'players-vote', 'reveal'
  const [masterChoice, setMasterChoice] = useState(null);
  const [playerVotes, setPlayerVotes] = useState({});
  const [masterExplanation, setMasterExplanation] = useState('');
  const shields = getAllShields();

  const getShieldById = (shieldId) => {
    return shields.find(shield => shield.id === shieldId);
  };

  const handleMasterSelect = (shieldId) => {
    setMasterChoice(shieldId);
  };

  const handleMasterConfirm = () => {
    if (masterChoice && masterExplanation.trim()) {
      setPhase('players-vote');
    }
  };

  const handlePlayerVote = (playerIndex, shieldId) => {
    setPlayerVotes({
      ...playerVotes,
      [playerIndex]: shieldId
    });
  };

  const handleReveal = () => {
    setPhase('reveal');
  };

  const handleContinue = () => {
    // Calculer les points : +1 pour chaque joueur qui a deviné correctement
    const scores = {};
    Object.entries(playerVotes).forEach(([playerIndex, vote]) => {
      const realPlayerIndex = parseInt(playerIndex);
      if (vote === masterChoice) {
        scores[realPlayerIndex] = 1;
      } else {
        scores[realPlayerIndex] = 0;
      }
    });

    onVotingComplete({
      masterChoice,
      masterExplanation,
      playerVotes,
      scores
    });
  };

  const hasAllPlayersVoted = () => {
    return Object.keys(playerVotes).length >= players.length;
  };

  const getPlayerVoteCount = (shieldId) => {
    return Object.values(playerVotes).filter(vote => vote === shieldId).length;
  };

  return (
    <div className="space-y-6">
      {/* Affichage de l'attaque */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-red-800 mb-2">👻 Attaque du Wifou</h2>
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

      {/* PHASE 1 : Choix secret du Maître */}
      {phase === 'master-choice' && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-yellow-900 mb-4 text-center">
            👑 {masterName}, choisissez votre bouclier secret
          </h3>
          <p className="text-yellow-800 mb-6 text-center">
            Les autres joueurs vont essayer de deviner votre choix !
          </p>

          {/* Sélection du bouclier */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {shields.map((shield) => (
              <button
                key={shield.id}
                onClick={() => handleMasterSelect(shield.id)}
                className={`shield-card text-center ${
                  masterChoice === shield.id ? 'selected ring-4 ring-yellow-500' : ''
                }`}
              >
                <div className="text-4xl mb-2">{shield.emoji}</div>
                <div className="font-semibold text-gray-800">{shield.name}</div>
                <div className="text-xs text-gray-600 mt-2">{shield.description}</div>
              </button>
            ))}
          </div>

          {/* Explication */}
          {masterChoice && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-yellow-900 mb-2">
                Expliquez brièvement pourquoi vous avez choisi ce bouclier :
              </label>
              <textarea
                value={masterExplanation}
                onChange={(e) => setMasterExplanation(e.target.value)}
                placeholder="Quelle valeur guide votre choix ?"
                className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent h-24 resize-none"
              />
            </div>
          )}

          {/* Bouton de confirmation */}
          <div className="text-center">
            <button
              onClick={handleMasterConfirm}
              disabled={!masterChoice || !masterExplanation.trim()}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                masterChoice && masterExplanation.trim()
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              ✅ Valider mon choix secret
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2 : Vote des autres joueurs */}
      {phase === 'players-vote' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              🗳️ Devinez le choix de {masterName} !
            </h3>
            <p className="text-blue-800">
              Quel bouclier a-t-il/elle choisi pour protéger la famille Déboussolée ?
            </p>
          </div>

          {/* Affichage des 4 boucliers pour voter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {shields.map((shield) => (
              <div key={shield.id} className="bg-white rounded-lg p-4 border-2 border-gray-200">
                <div className="text-4xl text-center mb-2">{shield.emoji}</div>
                <div className="font-semibold text-gray-800 text-center">{shield.name}</div>
              </div>
            ))}
          </div>

          {/* Vote de chaque joueur */}
          {players.map((playerName, playerIndex) => {
            const hasVoted = playerVotes.hasOwnProperty(playerIndex);
            
            return (
              <div key={playerIndex} className="bg-white rounded-lg p-6 border-2 border-blue-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  🎯 {playerName}, votez !
                </h4>

                {!hasVoted ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {shields.map((shield) => (
                      <button
                        key={shield.id}
                        onClick={() => handlePlayerVote(playerIndex, shield.id)}
                        className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                      >
                        <div className="text-3xl mb-2">{shield.emoji}</div>
                        <div className="font-semibold text-sm text-gray-800">{shield.name}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 bg-green-50 border-2 border-green-400 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      ✅ Vote enregistré : {getShieldById(playerVotes[playerIndex])?.emoji} {getShieldById(playerVotes[playerIndex])?.name}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bouton de révélation */}
          {hasAllPlayersVoted() && (
            <div className="text-center">
              <button
                onClick={handleReveal}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
              >
                🎭 Révéler le choix du Maître !
              </button>
            </div>
          )}

          {/* Progression */}
          <div className="text-center text-white">
            <p>Votes : {Object.keys(playerVotes).length}/{players.length}</p>
          </div>
        </div>
      )}

      {/* PHASE 3 : Révélation et attribution des points */}
      {phase === 'reveal' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border-2 border-purple-400 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-purple-900 mb-6">
              🎭 Révélation !
            </h3>
            
            <div className="bg-white rounded-xl p-6 mb-6">
              <p className="text-gray-700 mb-4 text-lg">
                {masterName} a choisi :
              </p>
              <div className="text-6xl mb-4">{getShieldById(masterChoice)?.emoji}</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                {getShieldById(masterChoice)?.name}
              </h4>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-900 font-medium italic">
                  "{masterExplanation}"
                </p>
              </div>
            </div>

            {/* Résultats des votes */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">📊 Résultats des votes</h4>
              <div className="space-y-3">
                {players.map((playerName, playerIndex) => {
                  const vote = playerVotes[playerIndex];
                  const isCorrect = vote === masterChoice;
                  const votedShield = getShieldById(vote);

                  return (
                    <div key={playerIndex} className={`p-4 rounded-lg border-2 ${
                      isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-800">{playerName}</span>
                          <span className="ml-3 text-lg">{votedShield?.emoji}</span>
                          <span className="ml-2 text-sm text-gray-600">{votedShield?.name}</span>
                        </div>
                        <div className="flex items-center">
                          {isCorrect ? (
                            <>
                              <span className="text-green-700 font-bold mr-2">+1 point</span>
                              <span className="text-2xl">✅</span>
                            </>
                          ) : (
                            <span className="text-2xl">❌</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bouton continuer */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
            >
              ➡️ Tour suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}