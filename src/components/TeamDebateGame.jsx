import React, { useState, useEffect } from 'react';
import { getRandomDebateScenario, getRandomRole, getRole } from '../data/dynamicRoles';

export default function TeamDebateGame() {
  // États principaux
  const [gameState, setGameState] = useState('setup'); // 'setup', 'roleAssignment', 'debate', 'voting', 'results'
  const [players, setPlayers] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [playerRoles, setPlayerRoles] = useState({});
  const [arguments, setArguments] = useState({});
  const [votes, setVotes] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(3);

  // Écran de configuration des joueurs
  const PlayerSetup = () => {
    const [playerName, setPlayerName] = useState('');

    const addPlayer = () => {
      if (playerName.trim() && players.length < 12) {
        const newPlayer = {
          id: Date.now(),
          name: playerName.trim(),
          totalScore: 0,
          roleScores: { wifou: 0, cleaner: 0, family: 0, expert: 0 }
        };
        setPlayers([...players, newPlayer]);
        setPlayerName('');
      }
    };

    const removePlayer = (playerId) => {
      setPlayers(players.filter(p => p.id !== playerId));
    };

    const startGame = () => {
      if (players.length >= 3) {
        setGameState('roleAssignment');
        setCurrentScenario(getRandomDebateScenario());
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              👻🛡️ Débat Numérique Familial
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Tous acteurs du débat sur nos usages numériques !
            </p>
            <p className="text-gray-500">
              Incarnez différents rôles, débattez, et trouvez ensemble les meilleures solutions
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Configuration des joueurs</h2>
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Nom du joueur"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
              />
              <button
                onClick={addPlayer}
                disabled={!playerName.trim() || players.length >= 12}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Joueurs ({players.length}/12)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {players.map((player) => (
                <div key={player.id} className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <span className="font-medium text-lg">{player.name}</span>
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="text-red-600 hover:text-red-800 font-bold text-xl"
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
              disabled={players.length < 3}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg text-xl font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              🚀 Commencer le Débat !
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Minimum 3 joueurs requis pour un débat équilibré
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Écran d'assignation des rôles
  const RoleAssignment = () => {
    const [assignedRoles, setAssignedRoles] = useState({});

    const assignRoles = () => {
      const availableRoles = ['WiFou', 'Cleaner', 'Parent', 'Ado', 'Enfant', 'Expert'];
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      const newRoles = {};

      shuffledPlayers.forEach((player, index) => {
        const role = availableRoles[index % availableRoles.length];
        newRoles[player.id] = role;
      });

      setPlayerRoles(newRoles);
      setAssignedRoles(newRoles);
    };

    const startDebate = () => {
      setGameState('debate');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🎭 Attribution des Rôles
            </h2>
            <p className="text-xl text-gray-600">
              Chaque joueur va incarner un rôle pour débattre de cette situation
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Situation du débat :</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <h4 className="text-xl font-bold text-blue-800 mb-3">{currentScenario.title}</h4>
              <p className="text-gray-700 text-lg mb-4">{currentScenario.situation}</p>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold">
                  🎯 Enjeux : {currentScenario.stakes}
                </p>
              </div>
            </div>
          </div>

          {Object.keys(assignedRoles).length === 0 ? (
            <div className="text-center">
              <button
                onClick={assignRoles}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-blue-700 shadow-lg"
              >
                🎲 Attribuer les Rôles
              </button>
            </div>
          ) : (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Rôles attribués :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.map((player) => {
                  const role = getRole(assignedRoles[player.id]);
                  return (
                    <div key={player.id} className={`${role.color} text-white p-6 rounded-xl shadow-lg`}>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">{role.icon}</span>
                        <div>
                          <h4 className="text-xl font-bold">{role.name}</h4>
                          <p className="text-lg opacity-90">{player.name}</p>
                        </div>
                      </div>
                      <p className="text-sm opacity-80">{role.description}</p>
                      <div className="mt-3">
                        <p className="text-sm font-semibold">Objectif :</p>
                        <p className="text-sm">{role.objective}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {Object.keys(assignedRoles).length > 0 && (
            <div className="text-center">
              <button
                onClick={startDebate}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg text-xl font-semibold hover:from-green-700 hover:to-blue-700 shadow-lg"
              >
                💬 Commencer le Débat !
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Écran de débat - Version simplifiée
  const DebateScreen = () => {
    const [currentSpeaker, setCurrentSpeaker] = useState(null);
    const [speechTime, setSpeechTime] = useState(0);
    const [allSpoken, setAllSpoken] = useState(false);

    const startSpeech = (playerId) => {
      setCurrentSpeaker(playerId);
      setSpeechTime(0);
    };

    const endSpeech = () => {
      setCurrentSpeaker(null);
      setSpeechTime(0);
    };

    const nextPhase = () => {
      setGameState('voting');
    };

    // Vérifier si tous les joueurs ont parlé
    const allPlayersSpoken = Object.keys(arguments).length === players.length;
    const debatePhase = currentSpeaker === null ? 'waiting' : 'speaking';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-purple-600">1</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-purple-600">2</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-gray-300">3</div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              💬 Phase de Débat
            </h2>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-semibold text-lg">
                🎯 Chaque joueur argumente selon son rôle
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Cliquez sur votre carte pour prendre la parole !
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Situation :</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 mb-6">
              <h4 className="text-xl font-bold text-blue-800 mb-3">{currentScenario.title}</h4>
              <p className="text-gray-700 text-lg">{currentScenario.situation}</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="text-lg font-bold text-yellow-800 mb-3">Questions de débat :</h4>
              <ul className="space-y-2">
                {currentScenario.debateQuestions.map((question, index) => (
                  <li key={index} className="text-yellow-700">• {question}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cartes des joueurs simplifiées */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Vos rôles :</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player) => {
                const role = getRole(playerRoles[player.id]);
                const isSpeaking = currentSpeaker === player.id;
                const hasSpoken = arguments[player.id];
                
                return (
                  <div 
                    key={player.id} 
                    className={`${role.color} text-white p-6 rounded-xl shadow-lg transition-all cursor-pointer ${
                      isSpeaking ? 'ring-4 ring-white ring-opacity-50 scale-105' : 
                      hasSpoken ? 'opacity-75' : 'hover:scale-105'
                    }`}
                    onClick={() => !hasSpoken && currentSpeaker === null && startSpeech(player.id)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{role.icon}</div>
                      <h4 className="font-bold text-lg mb-1">{role.name}</h4>
                      <p className="text-sm opacity-90 mb-3">{player.name}</p>
                      
                      {!hasSpoken ? (
                        <div className="text-center">
                          {currentSpeaker === null ? (
                            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                              <span className="text-sm font-semibold">🎤 Cliquez pour parler</span>
                            </div>
                          ) : isSpeaking ? (
                            <div className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg">
                              <span className="text-sm font-bold">🎤 En cours...</span>
                            </div>
                          ) : (
                            <div className="bg-gray-400 px-4 py-2 rounded-lg">
                              <span className="text-sm">⏳ En attente</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="text-green-200 text-sm font-semibold">✅ A parlé</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zone de prise de parole simplifiée */}
          {currentSpeaker && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl border-2 border-purple-300">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold text-purple-800 mb-2">
                    🎤 {players.find(p => p.id === currentSpeaker)?.name} s'exprime
                  </h4>
                  <p className="text-purple-600">
                    Rôle : <span className="font-bold">{getRole(playerRoles[currentSpeaker])?.name}</span>
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg mb-4">
                  <textarea
                    placeholder="Exprimez votre argument selon votre rôle..."
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-lg"
                    onChange={(e) => {
                      setArguments(prev => ({
                        ...prev,
                        [currentSpeaker]: e.target.value
                      }));
                    }}
                    value={arguments[currentSpeaker] || ''}
                  />
                </div>
                
                <div className="text-center">
                  <button
                    onClick={endSpeech}
                    className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                  >
                    ✅ Terminer mon argument
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bouton de passage au vote */}
          {allPlayersSpoken && (
            <div className="text-center">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-green-800 font-semibold text-lg">
                  ✅ Tous les joueurs ont argumenté !
                </p>
              </div>
              <button
                onClick={nextPhase}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl text-xl font-bold hover:from-green-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all"
              >
                🗳️ Passer au Vote !
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Écran de vote simplifié
  const VotingScreen = () => {
    const [hasVoted, setHasVoted] = useState({});
    const [allVoted, setAllVoted] = useState(false);

    const handleVote = (voterId, votedForId) => {
      setVotes(prev => ({
        ...prev,
        [voterId]: votedForId
      }));
      setHasVoted(prev => ({
        ...prev,
        [voterId]: true
      }));
    };

    useEffect(() => {
      if (Object.keys(hasVoted).length === players.length) {
        setAllVoted(true);
      }
    }, [hasVoted, players.length]);

    const calculateResults = () => {
      setShowResults(true);
      setGameState('results');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-green-500">1</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-green-500">2</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-purple-600">3</div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🗳️ Phase de Vote
            </h2>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800 font-semibold text-lg">
                🎯 Votez pour l'argument le plus convaincant !
              </p>
              <p className="text-green-600 text-sm mt-1">
                Chaque joueur vote pour un autre joueur (pas pour soi-même)
              </p>
            </div>
          </div>

          {/* Interface de vote simplifiée */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Qui mérite votre vote ?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((voter) => (
                <div key={voter.id} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <h4 className="font-bold text-lg mb-4 text-center">{voter.name}</h4>
                  
                  {!hasVoted[voter.id] ? (
                    <div className="space-y-3">
                      {players.filter(p => p.id !== voter.id).map((candidate) => {
                        const candidateRole = getRole(playerRoles[candidate.id]);
                        const candidateArgument = arguments[candidate.id];
                        
                        return (
                          <button
                            key={candidate.id}
                            onClick={() => handleVote(voter.id, candidate.id)}
                            className="w-full p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 transition-all text-left"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{candidateRole.icon}</span>
                              <div>
                                <div className="font-bold">{candidate.name}</div>
                                <div className="text-sm text-gray-600">{candidateRole.name}</div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-700 line-clamp-2">
                              {candidateArgument?.substring(0, 100)}...
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                      <p className="text-green-800 font-semibold">
                        ✅ A voté pour : <span className="font-bold">{players.find(p => p.id === votes[voter.id])?.name}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bouton de résultats */}
          {allVoted && (
            <div className="text-center">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-green-800 font-semibold text-lg">
                  ✅ Tous les joueurs ont voté !
                </p>
              </div>
              <button
                onClick={calculateResults}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl text-xl font-bold hover:from-green-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all"
              >
                🎯 Voir les Résultats !
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Écran des résultats
  const ResultsScreen = () => {
    // Calculer les résultats
    const voteCounts = {};
    players.forEach(player => {
      const votedFor = votes[player.id];
      if (votedFor) {
        voteCounts[votedFor] = (voteCounts[votedFor] || 0) + 1;
      }
    });

    const winnerId = Object.keys(voteCounts).reduce((a, b) => 
      voteCounts[a] > voteCounts[b] ? a : b, Object.keys(voteCounts)[0]
    );

    const winner = players.find(p => p.id === winnerId);
    const winnerRole = getRole(playerRoles[winnerId]);

    const nextRound = () => {
      if (round >= maxRounds) {
        // Fin du jeu
        setGameState('finalResults');
        return;
      }

      // Nouveau round
      setRound(round + 1);
      setCurrentScenario(getRandomDebateScenario());
      setPlayerRoles({});
      setArguments({});
      setVotes({});
      setShowResults(false);
      setGameState('roleAssignment');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🏆 Résultats du Débat
            </h2>
            <p className="text-xl text-gray-600">
              Tour {round} terminé !
            </p>
          </div>

          <div className="mb-8">
            <div className={`${winnerRole.color} text-white p-8 rounded-xl shadow-lg text-center`}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">{winnerRole.icon}</span>
                <div>
                  <h3 className="text-3xl font-bold">🏆 Gagnant du débat !</h3>
                  <p className="text-xl">{winner?.name}</p>
                  <p className="text-lg opacity-90">{winnerRole.name}</p>
                </div>
              </div>
              <p className="text-lg opacity-80">{winnerRole.description}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Résultats du vote :</h3>
            <div className="space-y-3">
              {players.map((player) => {
                const role = getRole(playerRoles[player.id]);
                const votes = voteCounts[player.id] || 0;
                
                return (
                  <div key={player.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{role.icon}</span>
                        <div>
                          <span className="font-semibold">{player.name}</span>
                          <span className="text-gray-600 ml-2">({role.name})</span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">{votes} vote{votes > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={nextRound}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-blue-700 shadow-lg"
            >
              {round >= maxRounds ? '🏁 Voir les résultats finaux' : '➡️ Tour suivant'}
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
    case 'roleAssignment':
      return <RoleAssignment />;
    case 'debate':
      return <DebateScreen />;
    case 'voting':
      return <VotingScreen />;
    case 'results':
      return <ResultsScreen />;
    default:
      return <PlayerSetup />;
  }
}