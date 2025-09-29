import React, { useState, useEffect } from 'react';

// Base de données des situations
const SITUATIONS = [
  {
    id: 1,
    situation: "Le Wi-Fou a ensorcelé le WiFi familial : il ralentit dès qu'on regarde une vidéo. Léo veut Netflix pendant que sa sœur fait ses devoirs.",
    options: [
      "Léo continue Netflix, il a le droit de se détendre",
      "Léo éteint Netflix pour laisser sa sœur travailler",
      "Léo propose un planning : Netflix après les devoirs"
    ],
    values: ["Liberté", "Cœur", "Règles"]
  },
  {
    id: 2,
    situation: "À table, chaque membre de la famille a son smartphone en main. Personne ne se parle.",
    options: [
      "Continuer comme ça, chacun fait ce qu'il veut",
      "Poser les téléphones et discuter ensemble",
      "Instaurer une règle 'zéro téléphone à table'"
    ],
    values: ["Liberté", "Cœur", "Règles"]
  },
  {
    id: 3,
    situation: "Emma veut garder ses comptes privés, mais ses parents insistent pour connaître ses mots de passe 'pour sa sécurité'.",
    options: [
      "Emma refuse, c'est sa vie privée",
      "Emma explique pourquoi elle a besoin de privacité",
      "Emma propose un compromis : mots de passe partagés mais avec limites"
    ],
    values: ["Liberté", "Cœur", "Règles"]
  },
  {
    id: 4,
    situation: "Tom reçoit des messages d'inconnus très mignons qui proposent des 'aventures magiques'. Il se souvient des conseils de sécurité de ses parents.",
    options: [
      "Tom répond, ils ont l'air trop mignons pour être méchants",
      "Tom explique aux inconnus qu'il ne peut pas répondre",
      "Tom bloque les inconnus et en parle à ses parents"
    ],
    values: ["Liberté", "Cœur", "Sécurité"]
  },
  {
    id: 5,
    situation: "Les parents fixent une limite de 2h d'écran par jour. Les ados trouvent ça injuste.",
    options: [
      "Respecter la règle même si ça frustre",
      "Proposer une négociation : plus le week-end, moins la semaine",
      "Accepter la limite car ça protège la santé"
    ],
    values: ["Règles", "Liberté", "Sécurité"]
  },
  {
    id: 6,
    situation: "Sarah apprend que son meilleur ami a des problèmes familiaux. Il semble très triste.",
    options: [
      "Sarah ne s'en mêle pas, c'est sa vie privée",
      "Sarah lui propose son soutien et l'écoute",
      "Sarah en parle à un adulte de confiance"
    ],
    values: ["Liberté", "Cœur", "Règles"]
  },
  {
    id: 7,
    situation: "Le Wi-Fou a créé des règles numériques qui se contredisent ! 'Partage tes mots de passe' vs 'Garde tes secrets'.",
    options: [
      "Chacun choisit les règles qui lui conviennent le mieux",
      "La famille discute pour comprendre l'intention derrière chaque règle",
      "La famille établit un système de priorités entre les règles"
    ],
    values: ["Liberté", "Cœur", "Règles"]
  },
  {
    id: 8,
    situation: "Alex découvre qu'un adulte essaie de la manipuler en ligne avec des messages très mignons.",
    options: [
      "Alex essaie de comprendre ses intentions",
      "Alex bloque immédiatement et en parle à un adulte",
      "Alex gère seule la situation"
    ],
    values: ["Cœur", "Sécurité", "Liberté"]
  },
  {
    id: 9,
    situation: "Lucas et sa sœur se disputent pour l'utilisation de la console. Ils sont tous les deux en colère.",
    options: [
      "Chacun joue quand il veut, pas de règles",
      "Ils se réconcilient et jouent ensemble",
      "Ils établissent un planning équitable"
    ],
    values: ["Liberté", "Cœur", "Règles"]
  },
  {
    id: 10,
    situation: "Le Wi-Fou a ensorcelé tous les appareils : ils crient 'DANGER !' pour tout et n'importe quoi !",
    options: [
      "La famille ignore toutes les alertes, elles sont trop nombreuses",
      "La famille essaie de comprendre pourquoi les appareils sont si anxieux",
      "La famille établit un système de priorités pour les alertes"
    ],
    values: ["Liberté", "Cœur", "Règles"]
  }
];

const VALUES = ["Liberté", "Cœur", "Règles", "Sécurité"];

export default function WiFouGame() {
  // États principaux
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'results'
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentSituation, setCurrentSituation] = useState(null);
  const [masterChoice, setMasterChoice] = useState(null);
  const [masterValue, setMasterValue] = useState(null);
  const [votes, setVotes] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(0);

  // Écran de configuration des joueurs
  const PlayerSetup = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerCount, setPlayerCount] = useState(2);

    const addPlayer = () => {
      if (playerName.trim() && players.length < 30) {
        const newPlayer = {
          name: playerName.trim(),
          score: 0,
          values: { liberte: 0, coeur: 0, regles: 0, securite: 0 }
        };
        setPlayers([...players, newPlayer]);
        setPlayerName('');
      }
    };

    const removePlayer = (index) => {
      setPlayers(players.filter((_, i) => i !== index));
    };

    const startGame = () => {
      if (players.length >= 2) {
        setMaxRounds(players.length); // Un tour par joueur
        setGameState('playing');
        setCurrentSituation(SITUATIONS[Math.floor(Math.random() * SITUATIONS.length)]);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              👻 Les Wi-Fou Déboussolés
            </h1>
            <p className="text-gray-600">
              Un jeu familial pour retrouver l'équilibre numérique
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Configuration des joueurs</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Nom du joueur"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
              />
              <button
                onClick={addPlayer}
                disabled={!playerName.trim() || players.length >= 30}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Joueurs ({players.length}/30)
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {players.map((player, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">{player.name}</span>
                  <button
                    onClick={() => removePlayer(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              disabled={players.length < 2}
              className="px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 Commencer le jeu
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Minimum 2 joueurs requis
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Écran de jeu principal - Version simplifiée
  const GameScreen = () => {
    const currentPlayer = players[currentPlayerIndex];
    const gamePhase = masterChoice === null ? 'choice' : masterValue === null ? 'value' : 'voting';

    const handleMasterChoice = (choiceIndex) => {
      setMasterChoice(choiceIndex);
    };

    const handleMasterValue = (value) => {
      setMasterValue(value);
      // Mettre à jour les valeurs du joueur maître
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].values[value.toLowerCase()]++;
      setPlayers(updatedPlayers);
    };

    const handleVote = (playerIndex, choiceIndex) => {
      setVotes({ ...votes, [playerIndex]: choiceIndex });
    };

    // Vérifier si tous les autres joueurs ont voté
    const otherPlayersVoted = Object.keys(votes).length === players.length - 1;

    const calculateResults = () => {
      const updatedPlayers = [...players];
      
      // Compter les votes pour chaque option
      const voteCounts = [0, 0, 0];
      Object.values(votes).forEach(vote => {
        if (vote !== null) voteCounts[vote]++;
      });

      // Attribuer les points
      voteCounts.forEach((count, choiceIndex) => {
        if (choiceIndex === masterChoice) {
          // Points pour le maître
          updatedPlayers[currentPlayerIndex].score += count;
          
          // Points pour les joueurs qui ont deviné
          Object.entries(votes).forEach(([playerIndex, vote]) => {
            if (vote === masterChoice) {
              updatedPlayers[parseInt(playerIndex)].score += 1;
            }
          });
        }
      });

      setPlayers(updatedPlayers);
      setShowResults(true);
    };

    const nextRound = () => {
      if (round >= maxRounds) {
        setGameState('results');
        return;
      }

      // Réinitialiser pour le tour suivant
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      setMasterChoice(null);
      setMasterValue(null);
      setVotes({});
      setShowResults(false);
      setRound(round + 1);
      setCurrentSituation(SITUATIONS[Math.floor(Math.random() * SITUATIONS.length)]);
    };

    if (showResults) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                🎯 Résultats du tour {round}
              </h2>
              <p className="text-gray-600">
                Maître Wi-Fou : <span className="font-semibold">{currentPlayer.name}</span>
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Situation :</h3>
              <p className="text-gray-700 mb-4">{currentSituation.situation}</p>
              
              <div className="space-y-3">
                {currentSituation.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      index === masterChoice
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                      {index === masterChoice && (
                        <span className="ml-auto text-green-600 font-bold">✓ Choix du Maître</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Valeur choisie :</h3>
              <div className="text-center">
                <span className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-lg text-xl font-semibold">
                  {masterValue}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Points attribués :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.map((player, index) => {
                  const playerVote = votes[index];
                  const guessedCorrectly = playerVote === masterChoice;
                  const pointsGained = guessedCorrectly ? 1 : 0;
                  
                  return (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{player.name}</span>
                        <span className={`font-bold ${guessedCorrectly ? 'text-green-600' : 'text-gray-500'}`}>
                          {guessedCorrectly ? '+1 point' : '0 point'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        A voté pour l'option {String.fromCharCode(65 + playerVote)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={nextRound}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700"
              >
                {round >= maxRounds ? '🏆 Voir les résultats finaux' : '➡️ Tour suivant'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
          {/* Header avec progression claire */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                gamePhase === 'choice' ? 'bg-purple-600' : 'bg-green-500'
              }`}>1</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                gamePhase === 'value' ? 'bg-purple-600' : gamePhase === 'voting' ? 'bg-green-500' : 'bg-gray-300'
              }`}>2</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                gamePhase === 'voting' ? 'bg-purple-600' : 'bg-gray-300'
              }`}>3</div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              👻 Tour {round} - {currentPlayer.name}
            </h2>
            
            {/* Instructions contextuelles selon la phase */}
            <div className="mt-4 p-4 rounded-lg border-2">
              {gamePhase === 'choice' && (
                <div className="bg-purple-50 border-purple-200">
                  <p className="text-purple-800 font-semibold text-lg">
                    🎯 Étape 1 : Choisissez votre solution préférée
                  </p>
                  <p className="text-purple-600 text-sm mt-1">
                    Les autres joueurs devront deviner votre choix !
                  </p>
                </div>
              )}
              {gamePhase === 'value' && (
                <div className="bg-blue-50 border-blue-200">
                  <p className="text-blue-800 font-semibold text-lg">
                    🎯 Étape 2 : Choisissez la valeur qui motive votre choix
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    Cela aide les autres à mieux vous comprendre !
                  </p>
                </div>
              )}
              {gamePhase === 'voting' && (
                <div className="bg-green-50 border-green-200">
                  <p className="text-green-800 font-semibold text-lg">
                    🎯 Étape 3 : Les autres joueurs devinent votre choix
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Attendez que tous aient voté pour voir les résultats !
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Situation - toujours visible */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">📖 Situation :</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{currentSituation.situation}</p>
            </div>
          </div>

          {/* Phase 1 : Choix de la solution */}
          {gamePhase === 'choice' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center">Choisissez votre solution :</h3>
              <div className="space-y-3">
                {currentSituation.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMasterChoice(index)}
                    className={`w-full p-6 rounded-xl border-3 text-left transition-all transform hover:scale-105 ${
                      masterChoice === index
                        ? 'border-purple-500 bg-purple-100 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        masterChoice === index ? 'bg-purple-600' : 'bg-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg">{option}</span>
                      {masterChoice === index && (
                        <div className="ml-auto text-purple-600 font-bold">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase 2 : Choix de la valeur */}
          {gamePhase === 'value' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center">Quelle valeur motive votre choix ?</h3>
              <div className="grid grid-cols-2 gap-4">
                {VALUES.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleMasterValue(value)}
                    className={`p-6 rounded-xl border-3 transition-all transform hover:scale-105 ${
                      masterValue === value
                        ? 'border-blue-500 bg-blue-100 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">
                        {value === 'Liberté' && '🦅'}
                        {value === 'Cœur' && '❤️'}
                        {value === 'Règles' && '⚖️'}
                        {value === 'Sécurité' && '🛡️'}
                      </div>
                      <div className="font-bold text-lg">{value}</div>
                      {masterValue === value && (
                        <div className="mt-2 text-blue-600 font-bold">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase 3 : Vote simplifié */}
          {gamePhase === 'voting' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center">Les autres joueurs devinent votre choix :</h3>
              
              {/* Affichage du choix du maître pour référence */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
                <p className="text-purple-800 font-semibold text-center">
                  🎯 {currentPlayer.name} a choisi : <span className="text-purple-600">"{currentSituation.options[masterChoice]}"</span>
                </p>
                <p className="text-purple-600 text-center mt-1">
                  Valeur : <span className="font-bold">{masterValue}</span>
                </p>
              </div>

              {/* Interface de vote simplifiée */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.map((player, index) => {
                  if (index === currentPlayerIndex) return null;
                  
                  const hasVoted = votes[index] !== undefined;
                  
                  return (
                    <div key={index} className={`p-4 rounded-xl border-2 transition-all ${
                      hasVoted ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <h4 className="font-bold mb-3 flex items-center gap-2 text-lg">
                        {player.name}
                        {hasVoted && <span className="text-green-600 text-xl">✓</span>}
                      </h4>
                      
                      {!hasVoted ? (
                        <div className="space-y-2">
                          {currentSituation.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleVote(index, optionIndex)}
                              className="w-full p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 transition-all text-left"
                            >
                              <span className="font-bold mr-2 text-green-600">{String.fromCharCode(65 + optionIndex)}.</span>
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-green-100 p-3 rounded-lg">
                          <p className="text-green-800 font-semibold">
                            A voté pour : <span className="font-bold">"{currentSituation.options[votes[index]]}"</span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bouton de résultats - seulement en phase de vote */}
          {gamePhase === 'voting' && (
            <div className="text-center">
              {otherPlayersVoted ? (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-green-800 font-semibold text-lg">
                      ✅ Tous les joueurs ont voté !
                    </p>
                  </div>
                  <button
                    onClick={calculateResults}
                    className="px-8 py-4 bg-green-600 text-white rounded-xl text-xl font-bold hover:bg-green-700 shadow-lg transform hover:scale-105 transition-all"
                  >
                    🎯 Voir les résultats !
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 font-semibold text-lg">
                    ⏳ En attente... ({Object.keys(votes).length}/{players.length - 1} joueurs ont voté)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Écran des résultats finaux
  const ResultsScreen = () => {
    // Calculer les statistiques globales
    const totalValues = players.reduce((acc, player) => {
      acc.liberte += player.values.liberte;
      acc.coeur += player.values.coeur;
      acc.regles += player.values.regles;
      acc.securite += player.values.securite;
      return acc;
    }, { liberte: 0, coeur: 0, regles: 0, securite: 0 });

    const totalValueCount = Object.values(totalValues).reduce((a, b) => a + b, 0);
    
    const valuePercentages = {
      liberte: totalValueCount > 0 ? Math.round((totalValues.liberte / totalValueCount) * 100) : 0,
      coeur: totalValueCount > 0 ? Math.round((totalValues.coeur / totalValueCount) * 100) : 0,
      regles: totalValueCount > 0 ? Math.round((totalValues.regles / totalValueCount) * 100) : 0,
      securite: totalValueCount > 0 ? Math.round((totalValues.securite / totalValueCount) * 100) : 0
    };

    const dominantValue = Object.entries(valuePercentages).reduce((a, b) => 
      valuePercentages[a[0]] > valuePercentages[b[0]] ? a : b
    );

    // Trier les joueurs par score
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    const restartGame = () => {
      setGameState('setup');
      setPlayers([]);
      setCurrentPlayerIndex(0);
      setCurrentSituation(null);
      setMasterChoice(null);
      setMasterValue(null);
      setVotes({});
      setShowResults(false);
      setRound(1);
      setMaxRounds(0);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🏆 Résultats Finaux
            </h1>
            <p className="text-gray-600">
              Les Wi-Fou ont été apprivoisés !
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Classement des joueurs :</h2>
            <div className="space-y-3">
              {sortedPlayers.map((player, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `#${index + 1}`}
                      </span>
                      <span className="font-semibold text-lg">{player.name}</span>
                    </div>
                    <span className="text-xl font-bold text-purple-600">{player.score} points</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Valeurs : Liberté {player.values.liberte}, Cœur {player.values.coeur}, 
                    Règles {player.values.regles}, Sécurité {player.values.securite}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Statistiques globales :</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {VALUES.map((value) => {
                const key = value.toLowerCase();
                return (
                  <div key={value} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">
                      {value === 'Liberté' && '🦅'}
                      {value === 'Cœur' && '❤️'}
                      {value === 'Règles' && '⚖️'}
                      {value === 'Sécurité' && '🛡️'}
                    </div>
                    <div className="font-semibold">{value}</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {valuePercentages[key]}%
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <p className="text-lg">
                <span className="font-semibold">Valeur dominante :</span>{' '}
                <span className="text-purple-600 font-bold">
                  {dominantValue[0].charAt(0).toUpperCase() + dominantValue[0].slice(1)} ({dominantValue[1]}%)
                </span>
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={restartGame}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700"
            >
              🔄 Nouvelle partie
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Rendu principal
  switch (gameState) {
    case 'setup':
      return <PlayerSetup />;
    case 'playing':
      return <GameScreen />;
    case 'results':
      return <ResultsScreen />;
    default:
      return <PlayerSetup />;
  }
}