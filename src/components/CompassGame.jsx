import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getRandomQuestion } from '../data/questions.js';
import { getRandomSituation } from '../data/situations.js';
import { getRandomGage, getAgeGroupFromProfile } from '../data/gages.js';
import { getRandomRiddle, checkRiddleAnswer } from '../data/riddles.js';

/**
 * La Famille Déboussolée — Mini‑jeu de boussole
 *
 * Spécificités clés:
 * - Boussole SVG en 4 cadrans colorés (N/E/S/O)
 * - Aiguille animée: ≥3 tours complets, décélération, puis 2–3 oscillations
 * - Résultat et effets spéciaux (Nord = 3 points, 1/3 jackpot)
 * - Gestion de tours, joueurs et score simplifiés
 * - Sans librairie externe: React + CSS inline + setTimeout
 */

const QUADRANTS = [
  { id: 'N', label: 'Trésor ✨ (max points)', angle: 0, color: '#bfdbfe' }, // bleu clair
  { id: 'E', label: 'Cadeau 🤝 (partage)', angle: 90, color: '#bbf7d0' }, // vert clair
  { id: 'S', label: 'Gage 🎭 (mime/geste)', angle: 180, color: '#fed7aa' }, // orange clair
  { id: 'O', label: 'Perdu 😵 (passe ton tour)', angle: 270, color: '#e9d5ff' }, // violet clair
];

const ID_TO_LABEL = QUADRANTS.reduce((acc, q) => {
  acc[q.id] = q.label;
  return acc;
}, {});

// Configuration des plateaux
const PLATEAU_CONFIGS = {
  'rapide': { 
    cases: 20, 
    duree: '10-15 min', 
    icon: '⚡',
    moves: { N: 4, E: 3, S: 2, O: 1 },
    specialCases: [6, 12, 19] // Cases spéciales
  },
  'classique': { 
    cases: 63, 
    duree: '30-45 min', 
    icon: '🎯',
    moves: { N: 6, E: 5, S: 4, O: 3 },
    specialCases: [6, 12, 19, 26, 31, 36, 42, 48, 53, 58] // Cases spéciales du jeu de l'Oie
  },
  'expert': { 
    cases: 100, 
    duree: '1h+', 
    icon: '🧠',
    moves: { N: 8, E: 6, S: 4, O: 2 },
    specialCases: [6, 12, 19, 26, 31, 36, 42, 48, 53, 58, 65, 72, 79, 86, 93] // Plus de cases spéciales
  },
  'personnalise': { 
    cases: 'custom', 
    duree: 'variable', 
    icon: '⚙️',
    moves: { N: 4, E: 3, S: 2, O: 1 },
    specialCases: []
  }
};

const DEFAULT_PLATEAU = 'classique';
const DEFAULT_MAX_TURNS = 10;
const MAX_TURNS = DEFAULT_MAX_TURNS; // Alias pour compatibilité
const DEFAULT_WIN_SCORE = 12; // Seuil de victoire individuel
const DEFAULT_FAMILY_STARS_TARGET = 5; // Étoiles familiales pour victoire d'équipe
const FAMILY_STARS_TARGET = DEFAULT_FAMILY_STARS_TARGET; // Alias pour compatibilité
const DEFAULT_TIME_LIMIT = 30; // Durée en minutes
const CATEGORIES = ['Liberté', 'Cœur', 'Règles', 'Sécurité'];
const ZERO_VALUES = { 'Liberté': 0, 'Cœur': 0, 'Règles': 0, 'Sécurité': 0 };

// Cases spéciales du jeu de l'Oie
const SPECIAL_CASES = {
  6: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  12: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  19: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  26: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  31: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  36: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  42: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  48: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  53: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  58: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' },
  
  // Cases spéciales additionnelles
  9: { type: 'pont', name: 'Pont', description: 'Tu traverses le pont ! Va à la case 12 !', action: 'teleport', target: 12 },
  18: { type: 'hotel', name: 'Hôtel', description: 'Tu passes la nuit à l\'hôtel ! Passe ton prochain tour !', action: 'skip_turn' },
  27: { type: 'prison', name: 'Prison', description: 'Tu es en prison ! Reste ici 2 tours !', action: 'prison', duration: 2 },
  45: { type: 'labyrinthe', name: 'Labyrinthe', description: 'Tu es perdu ! Retourne à la case 30 !', action: 'teleport', target: 30 },
  52: { type: 'mort', name: 'Mort', description: 'Tu meurs ! Retourne au début !', action: 'teleport', target: 1 },
  59: { type: 'oie', name: 'Oie', description: 'Tu tombes sur une oie ! Relance la boussole !', action: 'relancer' }
};
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 15;
const PLAYERS_STORAGE_KEY = 'compass-game.players.v1';
const DEFAULT_PLAYER_PREFIX = 'Joueur';

// Banque de questions (exemples fournis)
const QUESTIONS = {
  'Liberté': [
    "Tu veux garder ton smartphone la nuit. Qu’en penses-tu ?",
    'Un ami t’envoie un message tard. Tu réponds ou tu attends demain ?',
  ],
  'Cœur': [
    'Que ressens-tu si tes parents te demandent de poser ton smartphone au dîner ?',
    'Ton meilleur ami ne te répond pas. Comment réagis-tu ?',
  ],
  'Règles': [
    'Tes parents fixent une limite de 2h d’écran. Est-ce juste selon toi ?',
    'En classe, tu reçois une notification. Que fais-tu ?',
  ],
  'Sécurité': [
    'Quel risque si tu donnes ton mot de passe à un copain ?',
    'On te demande une photo gênante en ligne. Que fais-tu ?',
  ],
};

// Situations de la "ronde des décisions" (8 exemples)
const DECISIONS = {
  'Liberté': [
    {
      id: 'S1',
      title: 'Soirée pyjama',
      situation: "Léo veut garder son smartphone sous l’oreiller pour chatter avec ses amis jusqu’à minuit. Ses parents veulent qu’il l’éteigne.",
      choices: [
        { label: 'A', text: 'Léo garde son smartphone, il veut sa liberté.', value: 'Liberté' },
        { label: 'B', text: 'Il accepte de l’éteindre pour rassurer ses parents.', value: 'Sécurité' },
        { label: 'C', text: 'Il propose de négocier : seulement le vendredi soir.', value: 'Règles' },
      ],
    },
    {
      id: 'S2',
      title: 'Weekend (Liberté vs Famille)',
      situation: 'Julie veut passer la matinée sur TikTok, ses parents lui proposent une balade.',
      choices: [
        { label: 'A', text: 'Elle reste sur TikTok.', value: 'Liberté' },
        { label: 'B', text: 'Elle part avec sa famille pour passer du temps ensemble.', value: 'Cœur' },
        { label: 'C', text: 'Elle propose : TikTok 1h, puis la balade.', value: 'Règles' },
      ],
    },
  ],
  'Cœur': [
    {
      id: 'S6',
      title: 'Repas silencieux',
      situation: 'Pendant le dîner, chaque membre de la famille a son smartphone en main. Personne ne se parle.',
      choices: [
        { label: 'A', text: 'Continuer comme ça, chacun fait ce qu’il veut.', value: 'Liberté' },
        { label: 'B', text: 'Poser les téléphones et discuter ensemble.', value: 'Cœur' },
        { label: 'C', text: 'Instaurer une règle “zéro téléphone à table”.', value: 'Règles' },
      ],
    },
    {
      id: 'S7',
      title: 'Ami absent (émotion)',
      situation: 'Emma envoie plein de messages à son amie qui ne répond pas. Elle se sent rejetée.',
      choices: [
        { label: 'A', text: 'Elle continue à écrire jusqu’à obtenir une réponse.', value: 'Liberté' },
        { label: 'B', text: 'Elle patiente, son amie doit être occupée.', value: 'Sécurité' },
        { label: 'C', text: 'Elle parle de son ressenti à ses parents.', value: 'Cœur' },
      ],
    },
  ],
  'Règles': [
    {
      id: 'S11',
      title: 'Durée d’écran',
      situation: 'Les parents annoncent “2h d’écran max par jour”. Les ados trouvent ça injuste.',
      choices: [
        { label: 'A', text: 'Respecter la règle même si ça frustre.', value: 'Règles' },
        { label: 'B', text: 'Proposer une négociation : plus le week-end, moins la semaine.', value: 'Liberté' },
        { label: 'C', text: 'Accepter la limite parce que ça protège la santé.', value: 'Sécurité' },
      ],
    },
    {
      id: 'S13',
      title: 'Contrôle parental',
      situation: 'Les parents vérifient les messages de Jade sans prévenir.',
      choices: [
        { label: 'A', text: 'Jade accepte, ses parents veulent la protéger.', value: 'Sécurité' },
        { label: 'B', text: 'Jade proteste, c’est son espace privé.', value: 'Liberté' },
        { label: 'C', text: 'Jade propose qu’ils en parlent ensemble.', value: 'Règles' },
      ],
    },
  ],
  'Sécurité': [
    {
      id: 'S16',
      title: 'Mot de passe',
      situation: 'Chloé donne son code à sa meilleure amie “par confiance”.',
      choices: [
        { label: 'A', text: 'Elle garde ce geste, c’est normal entre amies.', value: 'Cœur' },
        { label: 'B', text: 'Elle comprend que c’est risqué et change son mot de passe.', value: 'Sécurité' },
        { label: 'C', text: 'Elle décide qu’elle a le droit de partager ce qu’elle veut.', value: 'Liberté' },
      ],
    },
    {
      id: 'S18',
      title: 'Photo gênante',
      situation: 'Un copain demande à Clara une photo qu’elle n’a pas envie d’envoyer.',
      choices: [
        { label: 'A', text: 'Elle l’envoie pour faire plaisir.', value: 'Cœur' },
        { label: 'B', text: 'Elle refuse et bloque le copain.', value: 'Sécurité' },
        { label: 'C', text: 'Elle dit qu’elle fera comme elle veut, personne ne décide à sa place.', value: 'Liberté' },
      ],
    },
  ],
};

// Zones de frontière (entre cadrans) -> catégorie associée
const BOUNDARIES = [
  { angle: 45, category: 'Liberté' },
  { angle: 135, category: 'Cœur' },
  { angle: 225, category: 'Règles' },
  { angle: 315, category: 'Sécurité' },
];
const BOUNDARY_THRESHOLD_DEG = 10; // ±10° autour de la frontière

function angularDistance(a, b) {
  const norm = (x) => ((x % 360) + 360) % 360;
  const da = Math.abs(norm(a) - norm(b));
  return Math.min(da, 360 - da);
}

function getBoundaryCategoryFromAngle(angleDeg) {
  for (const b of BOUNDARIES) {
    if (angularDistance(angleDeg, b.angle) <= BOUNDARY_THRESHOLD_DEG) return b.category;
  }
  return null;
}

export default function CompassGame({ config, onBackToHome }) {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  // Angle absolu en degrés (peut croître au‑delà de 360 pour animer correctement)
  const [currentAngleDeg, setCurrentAngleDeg] = useState(0);
  // Durée de transition dynamique (ms) pour chaque étape d'animation
  const [transitionMs, setTransitionMs] = useState(800);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultText, setResultText] = useState('');
  const [jackpotHit, setJackpotHit] = useState(false);
  const [finalQuadrant, setFinalQuadrant] = useState(null); // 'N' | 'E' | 'S' | 'O' | null
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [decision, setDecision] = useState(null); // { category, item, selected }
  const [decisionPhase, setDecisionPhase] = useState('question'); // 'question' | 'vote'
  const [votesCount, setVotesCount] = useState({ ...ZERO_VALUES });
  const [familyStars, setFamilyStars] = useState(0);
  const [teamWin, setTeamWin] = useState(false);
  const [riddle, setRiddle] = useState(null); // { category, item, answer, solved }
  const [riddlePhase, setRiddlePhase] = useState('question'); // 'question' | 'answer' | 'result'
  const [riddleAnswer, setRiddleAnswer] = useState('');
  
  // Configuration de la partie
  const [gameConfig, setGameConfig] = useState({
    plateauType: config?.plateauType || DEFAULT_PLATEAU,
    customCases: config?.customCases || 63,
    maxTurns: DEFAULT_MAX_TURNS,
    winScore: DEFAULT_WIN_SCORE,
    familyStarsTarget: DEFAULT_FAMILY_STARS_TARGET,
    timeLimit: DEFAULT_TIME_LIMIT,
    enableTimeLimit: false
  });
  
  // Chronomètre et gestion du temps
  const [gameStartTime, setGameStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [gameEndReason, setGameEndReason] = useState(null); // 'turns' | 'score' | 'time' | 'stars'
  
  // Animation de victoire
  const [victoryAnimation, setVictoryAnimation] = useState(false);
  const [victoryWinner, setVictoryWinner] = useState(null);
  const [tiebreakerMode, setTiebreakerMode] = useState(false);

  // Gestion joueurs - initialisation basée sur la config
  const [players, setPlayers] = useState(() => {
    if (config && config.playerCount) {
      return Array.from({ length: config.playerCount }, (_, i) => ({
        name: `Joueur ${i + 1}`,
        score: 0,
        position: 1, // Position sur le plateau (commence à la case 1)
        skipTurns: 0, // Tours à passer (prison, hôtel)
        prisonTurns: 0 // Tours en prison
      }));
    }
    return [
      { name: 'Joueur 1', score: 0, position: 1, skipTurns: 0, prisonTurns: 0 },
      { name: 'Joueur 2', score: 0, position: 1, skipTurns: 0, prisonTurns: 0 },
    ];
  });
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [turn, setTurn] = useState(1);
  const [lastMove, setLastMove] = useState(null); // Dernier déplacement effectué
  const [specialCaseTriggered, setSpecialCaseTriggered] = useState(null); // Case spéciale déclenchée

  // Références pour nettoyer les timeouts à l'unmount
  const timeoutsRef = useRef([]);

  // Nettoyage des timeouts si le composant est démonté
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // Gestion du chronomètre
  useEffect(() => {
    if (!gameConfig.enableTimeLimit || !gameStartTime) return;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - gameStartTime;
      const remaining = Math.max(0, gameConfig.timeLimit * 60 * 1000 - elapsed);
      setTimeRemaining(remaining);
      
      if (remaining === 0) {
        setGameEndReason('time');
        setVictoryAnimation(true);
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameConfig.enableTimeLimit, gameConfig.timeLimit, gameStartTime]);

  // Détecter automatiquement la fin de partie
  useEffect(() => {
    if (gameStartTime && !victoryAnimation) {
      const shouldEndGame = teamWin || 
                           winnerIndex !== null || 
                           turn > gameConfig.maxTurns || 
                           (gameConfig.enableTimeLimit && timeRemaining === 0);
      
      if (shouldEndGame) {
        handleGameEnd();
      }
    }
  }, [teamWin, winnerIndex, turn, gameConfig.maxTurns, gameConfig.enableTimeLimit, timeRemaining, gameStartTime, victoryAnimation]);

  // Catégorie/question initiales: rien
  useEffect(() => {
    setCurrentCategory('');
    setCurrentQuestion('');
  }, []);

  // Charger les joueurs depuis localStorage (si présent)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PLAYERS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= MIN_PLAYERS && parsed.length <= MAX_PLAYERS) {
        const restored = parsed.map((p, idx) => ({
          name: typeof p.name === 'string' && p.name.trim() ? p.name.trim() : `Joueur ${idx + 1}`,
          score: 0,
        }));
        setPlayers(restored);
        setActivePlayerIndex(0);
        setTurn(1);
        setWinnerIndex(null);
      }
    } catch (_) {
      // ignore
    }
  }, []);

  // Persister les joueurs (noms seulement)
  useEffect(() => {
    try {
      const slim = players.map((p) => ({ name: p.name }));
      window.localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(slim));
    } catch (_) {
      // ignore
    }
  }, [players]);

  // Détermine le quadrant à partir d'un angle normalisé [0, 360)
  const getQuadrantFromAngle = (angleDeg) => {
    const a = ((angleDeg % 360) + 360) % 360;
    if (a >= 315 || a < 45) return 'N';
    if (a >= 45 && a < 135) return 'E';
    if (a >= 135 && a < 225) return 'S';
    return 'O';
  };

  const randomCategory = () => CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  // Fonction pour obtenir un gage adapté à l'âge
  const getAgeAppropriateGage = () => {
    if (!config) return "Gage non disponible.";
    const ageGroup = getAgeGroupFromProfile(config.profile);
    const difficulty = config.difficulty || 'medium';
    return getRandomGage(ageGroup, difficulty);
  };

  const advanceTurn = () => {
    if (winnerIndex !== null || teamWin) return;
    if (turn >= gameConfig.maxTurns) return;
    setTurn((t) => t + 1);
    setActivePlayerIndex((i) => (i + 1) % players.length);
  };

  // Lance l'animation complète de l'aiguille et calcule le résultat
  const handleSpin = () => {
    if (isSpinning) return;
    if (players.length < MIN_PLAYERS) return;

    setIsSpinning(true);
    setResultText('');
    setJackpotHit(false);
    setFinalQuadrant(null);
    setCurrentQuestion('');
    setDecision(null);

    // 1) Choix aléatoire du quadrant final
    const target = QUADRANTS[Math.floor(Math.random() * QUADRANTS.length)];

    // 2) Spécial Nord: 1 chance sur 3 de pile 0°
    const willJackpot = target.id === 'N' && Math.random() < 1 / 3;
    setJackpotHit(willJackpot);

    // 3) Au moins 3 tours complets
    const baseTurns = 3 + Math.floor(Math.random() * 3); // 3..5 tours

    // 4) Angle final absolu
    const current = currentAngleDeg;
    const baseTarget = current + baseTurns * 360 + (willJackpot ? 0 : target.angle);
    const finalTarget = willJackpot ? baseTarget - ((baseTarget % 360 + 360) % 360) : baseTarget;

    // Mode reduced motion: pas d'animation, résultat immédiat
    if (prefersReducedMotion) {
      setTransitionMs(0);
      setCurrentAngleDeg(finalTarget);
      const norm = ((finalTarget % 360) + 360) % 360;
      const finalQ = getQuadrantFromAngle(norm);
      setFinalQuadrant(finalQ);
      const update = computeAndApplyMove(finalQ, willJackpot);
      setResultText(update.message);
      setIsSpinning(false);
      
      // Si c'est une case spéciale qui demande de relancer, ne pas passer au tour suivant
      if (update.shouldRelance) {
        // Le joueur relance automatiquement
        setTimeout(() => {
          handleSpin();
        }, 2000);
      } else if (!update.hasWinner && !teamWin && turn < gameConfig.maxTurns) {
        advanceTurn();
      }
      return;
    }

    // 5) Séquence d'animation: grand spin + 2–3 oscillations
    //    On génère des étapes successives avec durées décroissantes et amplitudes réduites
    const spinDuration = 1400 + baseTurns * 250; // 2150ms à 2650ms env.
    const bounceCount = 2 + Math.floor(Math.random() * 2); // 2 ou 3
    const bounceAmplitude = 12; // degrés initiaux de l'oscillation

    const steps = [];
    // Étape de rotation principale
    steps.push({ angle: finalTarget, duration: spinDuration });
    // Oscillations amorties autour de la cible
    for (let i = 0; i < bounceCount; i += 1) {
      const amp = bounceAmplitude / (i + 1);
      steps.push({ angle: finalTarget + amp, duration: 220 });
      steps.push({ angle: finalTarget - amp * 0.66, duration: 240 });
    }
    // Stabilisation finale
    steps.push({ angle: finalTarget, duration: 260 });

    // Exécution de la séquence via setTimeout chainés
    let delay = 0;
    steps.forEach((step, idx) => {
      const t = setTimeout(() => {
        setTransitionMs(step.duration);
        setCurrentAngleDeg(step.angle);

        // Dernière étape: calcul du résultat + score
        if (idx === steps.length - 1) {
          const norm = ((step.angle % 360) + 360) % 360;
          const finalQ = getQuadrantFromAngle(norm);
          setFinalQuadrant(finalQ);

          // Calcul du déplacement
          const update = computeAndApplyMove(finalQ, willJackpot);
          setResultText(update.message);
          setIsSpinning(false);
          
          // Si c'est une case spéciale qui demande de relancer, ne pas passer au tour suivant
          if (update.shouldRelance) {
            // Le joueur relance automatiquement
            setTimeout(() => {
              handleSpin();
            }, 2000);
          } else if (!update.hasWinner && !teamWin && turn < gameConfig.maxTurns) {
            advanceTurn();
          }
        }
      }, delay);
      timeoutsRef.current.push(t);
      delay += step.duration + 30; // petite marge entre étapes
    });
  };

  // Calcul et application du déplacement en fonction du quadrant final
  const computeAndApplyMove = (quadrantId, jackpot) => {
    const currentIndex = activePlayerIndex;
    const currentPlayer = players[currentIndex];
    const plateauConfig = PLATEAU_CONFIGS[gameConfig.plateauType];
    const maxCases = plateauConfig.cases === 'custom' ? gameConfig.customCases : plateauConfig.cases;
    
    // Déterminer le nombre de cases à avancer
    let moveCount = plateauConfig.moves[quadrantId];
    if (jackpot) {
      moveCount *= 2; // Jackpot = double le déplacement
    }
    
    // Calculer la nouvelle position
    let newPosition = currentPlayer.position + moveCount;
    
    // Vérifier si on dépasse la case finale
    if (newPosition > maxCases) {
      newPosition = maxCases - (newPosition - maxCases); // Reculer du surplus
    }
    
    // Vérifier les cases spéciales
    let specialCase = null;
    let finalPosition = newPosition;
    let specialMessage = '';
    let shouldRelance = false;
    
    if (SPECIAL_CASES[newPosition]) {
      specialCase = SPECIAL_CASES[newPosition];
      specialMessage = specialCase.description;
      
      switch (specialCase.action) {
        case 'relancer':
          shouldRelance = true;
          break;
        case 'teleport':
          finalPosition = specialCase.target;
          specialMessage += ` Tu arrives à la case ${finalPosition} !`;
          break;
        case 'skip_turn':
          // Le joueur passera son prochain tour
          break;
        case 'prison':
          // Le joueur restera en prison
          break;
      }
    }
    
    // Mettre à jour la position du joueur
    const nextPlayers = players.map((p, idx) => {
      if (idx === currentIndex) {
        return {
          ...p,
          position: finalPosition,
          skipTurns: specialCase?.action === 'skip_turn' ? 1 : p.skipTurns,
          prisonTurns: specialCase?.action === 'prison' ? specialCase.duration : p.prisonTurns
        };
      }
      return p;
    });
    setPlayers(nextPlayers);
    
    // Vérifier la victoire
    const winnerIndex = finalPosition >= maxCases ? currentIndex : null;
    setWinnerIndex(winnerIndex);
    
    // Messages
    const label = ID_TO_LABEL[quadrantId] || '';
    const jackpotMsg = jackpot ? ' 🎉 JACKPOT ! ' : '';
    const moveMsg = `+${moveCount} case${moveCount > 1 ? 's' : ''}`;
    const positionMsg = `Case ${currentPlayer.position} → ${finalPosition}`;
    const msg = `${label}${jackpotMsg} → ${moveMsg} → ${positionMsg}${specialMessage ? `\n${specialMessage}` : ''}`;
    
    // Stocker les informations du mouvement
    setLastMove({
      quadrant: quadrantId,
      moveCount,
      fromPosition: currentPlayer.position,
      toPosition: finalPosition,
      specialCase,
      jackpot
    });
    
    if (specialCase) {
      setSpecialCaseTriggered(specialCase);
    }
    
    return { 
      moveCount, 
      message: msg, 
      hasWinner: winnerIndex !== null, 
      winnerIndex,
      shouldRelance,
      specialCase
    };
  };

  // Gestion joueurs: ajout / suppression / renommage
  const canAddPlayer = players.length < MAX_PLAYERS;
  const canRemovePlayer = players.length > MIN_PLAYERS;

  const handleAddPlayer = () => {
    if (!canAddPlayer || isSpinning) return;
    const nextIndex = players.length + 1;
    setPlayers((prev) => [...prev, { name: `Joueur ${nextIndex}`, score: 0 }]);
  };

  const handleRemovePlayer = (index) => {
    if (!canRemovePlayer || isSpinning) return;
    const next = players.filter((_, i) => i !== index);
    if (next.length < MIN_PLAYERS) return;
    setPlayers(next);
    setActivePlayerIndex((idx) => Math.min(idx, next.length - 1));
  };

  const handlePlayerNameChange = (index, name) => {
    const trimmed = name.slice(0, 24);
    setPlayers((prev) => prev.map((p, i) => (i === index ? { ...p, name: trimmed } : p)));
  };

  // QCM – Ronde des décisions
  const handleSelectDecision = (label) => {
    setDecision((prev) => (prev ? { ...prev, selected: label } : prev));
  };

  const handleValidateDecision = () => {
    if (!decision) return;
    // Phase 1 -> passer au vote
    if (decisionPhase === 'question') {
      if (!decision.selected) return;
      setDecisionPhase('vote');
      setVotesCount({ ...ZERO_VALUES });
      return;
    }
    // Phase vote -> calcul majorité
    const selectedChoice = decision.item.choices.find((c) => c.label === decision.selected);
    const activeValue = selectedChoice ? selectedChoice.value : null;
    const entries = Object.entries(votesCount);
    let max = -1;
    let winners = [];
    let total = 0;
    for (const [val, cnt] of entries) {
      total += cnt;
      if (cnt > max) { max = cnt; winners = [val]; } else if (cnt === max) { winners.push(val); }
    }
    let message = '';
    if (max <= 0 || winners.length !== 1) {
      message = ' — Vote: aucune majorité';
    } else {
      const majorityValue = winners[0];
      message = ` — Vote majorité: ${majorityValue}`;
      if (activeValue && activeValue === majorityValue) {
        // Résonance: +2 points au joueur actif et +1 étoile familiale
        setPlayers((prev) => prev.map((p, idx) => idx === activePlayerIndex ? { ...p, score: p.score + 2 } : p));
        setFamilyStars((s) => s + 1);
        message += ' ✅ Résonance (+2 points, +1 étoile)';
      } else {
        message += ' ❌ Pas de résonance';
      }
    }
    setResultText((prev) => `${prev}${message}`);
    // Vérifier victoire d'équipe
    setTeamWin((prevWin) => {
      if (prevWin) return true;
      const next = familyStars + (max > 0 && winners.length === 1 && activeValue === winners[0] ? 1 : 0);
      return next >= gameConfig.familyStarsTarget;
    });
    // Reset décision
    setDecision(null);
    setDecisionPhase('question');
    setCurrentCategory('');
    if (!teamWin && winnerIndex === null && turn < gameConfig.maxTurns) {
      advanceTurn();
    }
  };

  const votesTotal = useMemo(() => Object.values(votesCount).reduce((a, b) => a + b, 0), [votesCount]);
  const votesMax = useMemo(() => Math.max(players.length - 1, 0), [players.length]);
  const remainingVotes = Math.max(votesMax - votesTotal, 0);

  const changeVote = (valueKey, delta) => {
    setVotesCount((prev) => {
      const next = { ...prev };
      const newTotal = Object.values(prev).reduce((a, b) => a + b, 0) + delta;
      if (delta > 0 && newTotal > votesMax) return prev;
      const cur = prev[valueKey] || 0;
      const nextVal = cur + delta;
      if (nextVal < 0) return prev;
      next[valueKey] = nextVal;
      return next;
    });
  };

  // Gestion des énigmes
  const handleRiddleAnswer = () => {
    if (!riddle || !riddleAnswer.trim()) return;
    
    const isCorrect = checkRiddleAnswer(riddle.item, riddleAnswer);
    setRiddle(prev => ({ ...prev, solved: isCorrect }));
    setRiddlePhase('result');
    
    // Bonus pour une énigme résolue
    if (isCorrect) {
      setPlayers((prev) => prev.map((p, idx) => 
        idx === activePlayerIndex ? { ...p, score: p.score + 2 } : p
      ));
      setFamilyStars((s) => s + 1);
      setResultText(prev => `${prev} + 🧩 Énigme résolue (+2 points, +1 étoile)`);
    } else {
      setResultText(prev => `${prev} + 🧩 Énigme non résolue`);
    }
  };

  const handleRiddleNext = () => {
    setRiddle(null);
    setRiddlePhase('question');
    setRiddleAnswer('');
    setCurrentCategory('');
    if (!teamWin && winnerIndex === null && turn < gameConfig.maxTurns) {
      advanceTurn();
    }
  };

  // Fonction pour démarrer une partie
  const startGame = () => {
    setGameStartTime(Date.now());
    setTimeRemaining(gameConfig.timeLimit * 60 * 1000);
    setVictoryAnimation(false);
    setGameEndReason(null);
    setTurn(1);
    setActivePlayerIndex(0);
    setWinnerIndex(null);
    setTeamWin(false);
    setFamilyStars(0);
    setPlayers(prev => prev.map(p => ({ 
      ...p, 
      score: 0, 
      position: 1, 
      skipTurns: 0, 
      prisonTurns: 0 
    })));
    setLastMove(null);
    setSpecialCaseTriggered(null);
  };

  // Fonction pour gérer la fin de partie
  const handleGameEnd = () => {
    if (victoryAnimation) return;
    
    let endReason = 'turns';
    let winner = null;
    
    if (teamWin) {
      endReason = 'stars';
      winner = 'team';
    } else if (winnerIndex !== null) {
      endReason = 'score';
      winner = winnerIndex;
    } else if (turn > gameConfig.maxTurns) {
      endReason = 'turns';
      // Vérifier s'il y a égalité
      const maxScore = Math.max(...players.map(p => p.score));
      const tiedPlayers = players.filter(p => p.score === maxScore);
      if (tiedPlayers.length > 1) {
        setTiebreakerMode(true);
        return;
      }
      winner = players.findIndex(p => p.score === maxScore);
    } else if (gameConfig.enableTimeLimit && timeRemaining === 0) {
      endReason = 'time';
      // En cas de limite de temps, le joueur avec le plus haut score gagne
      const maxScore = Math.max(...players.map(p => p.score));
      const tiedPlayers = players.filter(p => p.score === maxScore);
      if (tiedPlayers.length > 1) {
        setTiebreakerMode(true);
        return;
      }
      winner = players.findIndex(p => p.score === maxScore);
    }
    
    setGameEndReason(endReason);
    setVictoryWinner(winner);
    setVictoryAnimation(true);
  };

  // Fonction pour le départage
  const handleTiebreaker = () => {
    const maxScore = Math.max(...players.map(p => p.score));
    const tiedPlayers = players.filter(p => p.score === maxScore);
    
    // Départage par nombre d'énigmes résolues, puis par étoiles familiales
    const tiebreakerResults = tiedPlayers.map((player, index) => ({
      ...player,
      originalIndex: players.findIndex(p => p.name === player.name),
      tiebreakerScore: Math.random() // Pour l'instant, aléatoire
    }));
    
    tiebreakerResults.sort((a, b) => b.tiebreakerScore - a.tiebreakerScore);
    const winner = tiebreakerResults[0].originalIndex;
    
    setVictoryWinner(winner);
    setTiebreakerMode(false);
  };

  // Styles inline basiques (responsives et simples)
  const styles = useMemo(() => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '16px',
      padding: '16px',
      textAlign: 'center',
      background: 'transparent',
    },
    title: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#2563eb',
      marginTop: '4px',
    },
    subtitle: { fontSize: '12px', color: '#475569' },
    svgWrap: {
      width: 'min(86vw, 360px)',
      height: 'min(86vw, 360px)',
      display: 'grid',
      placeItems: 'center',
      background: 'rgba(255,255,255,0.7)',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
      border: '1px solid rgba(255,255,255,0.7)',
      backdropFilter: 'blur(6px)',
    },
    button: {
      backgroundColor: isSpinning ? '#93c5fd' : '#2563eb',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '10px 16px',
      fontWeight: 700,
      cursor: isSpinning ? 'not-allowed' : 'pointer',
      transition: 'background-color 200ms ease',
      minWidth: '120px',
    },
    result: { fontSize: '14px', color: '#334155', minHeight: '24px' },
    turnInfo: { fontSize: '12px', color: '#475569' },
    category: { fontSize: '13px', color: '#0f172a' },
    questionBox: {
      width: '100%',
      maxWidth: '420px',
      textAlign: 'left',
      background: 'rgba(255,255,255,0.8)',
      border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
      borderRadius: '12px',
      padding: '12px 14px',
      color: '#0f172a',
    },
    questionTitle: { fontWeight: 700, fontSize: '13px', marginBottom: 6 },
    questionText: { fontSize: '14px', lineHeight: 1.45 },
    scoreboard: {
      width: '100%',
      maxWidth: '420px',
      marginTop: '4px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.7)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
      border: '1px solid rgba(255,255,255,0.7)',
      overflow: 'hidden',
    },
    row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px' },
    activeDot: { width: 8, height: 8, borderRadius: 8, background: '#22c55e', marginRight: 10 },
    playersPanel: {
      width: '100%',
      maxWidth: '420px',
      textAlign: 'left',
      background: 'rgba(255,255,255,0.85)',
      border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
      borderRadius: '12px',
      padding: '12px 14px',
      color: '#0f172a',
    },
    input: {
      width: '100%',
      padding: '8px 10px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '14px',
    },
    smallBtn: {
      backgroundColor: '#0ea5e9',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '6px 10px',
      fontWeight: 600,
      cursor: 'pointer',
    },
    qcmBox: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255,255,255,0.9)',
      border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
      borderRadius: '12px',
      padding: '12px 14px',
      textAlign: 'left',
      color: '#0f172a',
    },
    qcmTitle: { fontWeight: 700, fontSize: '14px', marginBottom: 6, color: '#334155' },
    qcmSituation: { fontSize: '14px', marginBottom: 8, color: '#0f172a' },
    qcmChoice: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 10px',
      borderRadius: '8px',
      border: `1px solid ${active ? '#2563eb' : '#cbd5e1'}`,
      background: active ? 'rgba(37,99,235,0.08)' : 'transparent',
      cursor: 'pointer',
    }),
    qcmValidate: {
      marginTop: 10,
      backgroundColor: '#16a34a',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '10px 16px',
      fontWeight: 700,
      cursor: 'pointer',
      minWidth: '140px',
    },
    riddleBox: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255,255,255,0.9)',
      border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
      borderRadius: '12px',
      padding: '12px 14px',
      textAlign: 'left',
      color: '#0f172a',
    },
    riddleTitle: { fontWeight: 700, fontSize: '14px', marginBottom: 6, color: '#334155' },
    riddleQuestion: { fontSize: '14px', marginBottom: 8, color: '#0f172a', fontStyle: 'italic' },
    riddleAnswer: {
      width: '100%',
      padding: '8px 10px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '14px',
      marginBottom: '8px',
    },
    riddleValidate: {
      backgroundColor: '#7c3aed',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '10px 16px',
      fontWeight: 700,
      cursor: 'pointer',
      minWidth: '140px',
    },
    riddleResult: {
      fontSize: '14px',
      marginBottom: '8px',
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
    },
    riddleExplanation: {
      fontSize: '12px',
      color: '#475569',
      fontStyle: 'italic',
      marginBottom: '8px',
    },
    configBox: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255,255,255,0.9)',
      border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
      borderRadius: '12px',
      padding: '12px 14px',
      textAlign: 'left',
      color: '#0f172a',
    },
    configTitle: { fontWeight: 700, fontSize: '14px', marginBottom: 8, color: '#334155' },
    configRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    configLabel: { fontSize: '13px', color: '#0f172a' },
    configInput: {
      width: '60px',
      padding: '4px 6px',
      borderRadius: '4px',
      border: '1px solid #cbd5e1',
      fontSize: '12px',
    },
    configCheckbox: { marginLeft: 8 },
    victoryOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    victoryBox: {
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center',
      color: '#fff',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
      animation: 'victoryPulse 2s ease-in-out infinite',
    },
    victoryTitle: { fontSize: '32px', fontWeight: 900, marginBottom: 16 },
    victorySubtitle: { fontSize: '18px', marginBottom: 20 },
    victoryButton: {
      background: '#fff',
      color: '#f59e0b',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      fontWeight: 700,
      cursor: 'pointer',
      fontSize: '16px',
    },
    timerBox: {
      background: 'rgba(255,255,255,0.9)',
      border: '1px solid rgba(255,255,255,0.7)',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '12px',
      color: '#0f172a',
      fontWeight: 600,
    },
    tiebreakerBox: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255,255,255,0.9)',
      border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
      borderRadius: '12px',
      padding: '12px 14px',
      textAlign: 'center',
      color: '#0f172a',
    },
  }), [isSpinning]);

  // Ajouter les styles CSS pour l'animation de victoire
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes victoryPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes confetti {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
      }
      .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background: #fbbf24;
        animation: confetti 3s linear infinite;
        z-index: 1001;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Style de l'aiguille (groupe) -> on anime la rotation + easing
  const needleStyle = useMemo(() => ({
    transform: `rotate(${currentAngleDeg}deg)`,
    transformOrigin: '120px 120px',
    transition: prefersReducedMotion ? 'none' : `transform ${transitionMs}ms cubic-bezier(0.2, 0.7, 0.1, 1)`
  }), [currentAngleDeg, transitionMs, prefersReducedMotion]);

  // Rendu du plateau de jeu
  const renderPlateau = () => {
    const plateauConfig = PLATEAU_CONFIGS[gameConfig.plateauType];
    const maxCases = plateauConfig.cases === 'custom' ? gameConfig.customCases : plateauConfig.cases;
    const casesPerRow = Math.ceil(Math.sqrt(maxCases));
    
    return (
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'rgba(255,255,255,0.9)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '12px',
          textAlign: 'center',
          color: '#1e293b'
        }}>
          🎯 Plateau de Jeu - {maxCases} cases
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(casesPerRow, 10)}, 1fr)`,
          gap: '4px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {Array.from({ length: maxCases }, (_, i) => {
            const caseNumber = i + 1;
            const isSpecial = SPECIAL_CASES[caseNumber];
            const playersOnCase = players.filter(p => p.position === caseNumber);
            
            return (
              <div
                key={caseNumber}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '6px',
                  border: '2px solid',
                  borderColor: isSpecial ? '#f59e0b' : '#e2e8f0',
                  background: isSpecial ? '#fef3c7' : '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: isSpecial ? '#92400e' : '#475569',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={isSpecial ? `${isSpecial.name}: ${isSpecial.description}` : `Case ${caseNumber}`}
              >
                {caseNumber}
                {playersOnCase.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700'
                  }}>
                    {playersOnCase.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Légende des cases spéciales */}
        <div style={{
          marginTop: '12px',
          fontSize: '12px',
          color: '#64748b'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Cases spéciales :</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#f59e0b' }}>🦆 Oie</span>
            <span style={{ color: '#3b82f6' }}>🌉 Pont</span>
            <span style={{ color: '#8b5cf6' }}>🏨 Hôtel</span>
            <span style={{ color: '#ef4444' }}>🔒 Prison</span>
            <span style={{ color: '#10b981' }}>🌀 Labyrinthe</span>
            <span style={{ color: '#6b7280' }}>💀 Mort</span>
          </div>
        </div>
      </div>
    );
  };

  // Rendu de la boussole SVG avec 4 cadrans + lettres + aiguille
  const renderCompass = () => (
    <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boussole du jeu">
      {/* Cercles de fond */}
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="114" fill="url(#bg)" />
      <circle cx="120" cy="120" r="112" fill="none" stroke="#e2e8f0" strokeWidth="2" />

      {/* Cadrans (quart de cercle) */}
      {renderQuadrants()}

      {/* Marques */}
      <circle cx="120" cy="120" r="96" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 6" />

      {/* Lettres cardinales */}
      <g fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="16" fill="#334155" textAnchor="middle" dominantBaseline="middle">
        <text x="120" y="28">N</text>
        <text x="212" y="124">E</text>
        <text x="120" y="216">S</text>
        <text x="28" y="124">O</text>
      </g>

      {/* Aiguille */}
      <g style={needleStyle}>
        <g opacity="0.2" transform="translate(2,2)">
          <polygon points="120,34 128,120 120,206 112,120" fill="#000" />
        </g>
        <polygon points="120,34 128,120 120,206 112,120" fill="#ef4444" stroke="#111827" strokeWidth="2" />
        <circle cx="120" cy="120" r="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="120" cy="120" r="3" fill="#ef4444" />
      </g>
    </svg>
  );

  // Icônes rétrofuturistes médiévales (inline)
  const IconCrown = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 7l4 3 5-6 5 6 4-3v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
    </svg>
  );
  const IconShield = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
    </svg>
  );
  const IconSpark = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#22d3ee" stroke="#155e75" strokeWidth="1.2" />
    </svg>
  );
  const IconPlus = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 5v14M5 12h14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const IconMinus = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  // Rendu des 4 cadrans en paths (quart de disque)
  function renderQuadrants() {
    const r = 100;
    const cx = 120;
    const cy = 120;

    // Helper pour créer un wedge de 90°: startAngle → endAngle (en degrés)
    const wedge = (startDeg, endDeg, fill) => {
      const rad = (deg) => (deg * Math.PI) / 180;
      const x1 = cx + r * Math.cos(rad(startDeg));
      const y1 = cy + r * Math.sin(rad(startDeg));
      const x2 = cx + r * Math.cos(rad(endDeg));
      const y2 = cy + r * Math.sin(rad(endDeg));
      const largeArcFlag = 0;
      const sweepFlag = 1;
      const d = [
        `M ${cx} ${cy}`,
        `L ${x1} ${y1}`,
        `A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`,
        'Z',
      ].join(' ');
      return <path key={`${startDeg}-${endDeg}`} d={d} fill={fill} stroke="#ffffff" strokeWidth="1" />;
    };

    return (
      <g>
        {wedge(-45, 45, QUADRANTS[0].color)}
        {wedge(45, 135, QUADRANTS[1].color)}
        {wedge(135, 225, QUADRANTS[2].color)}
        {wedge(225, 315, QUADRANTS[3].color)}
      </g>
    );
  }

  const gameOver = turn > gameConfig.maxTurns || winnerIndex !== null || teamWin || (gameConfig.enableTimeLimit && timeRemaining === 0);

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '16px' }}>
        <button
          onClick={onBackToHome}
          style={{
            background: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          ← Retour
        </button>
        <div style={styles.title}>
          <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <IconCrown /> La Famille Déboussolée
          </span>
        </div>
        <div style={{ width: '80px' }}></div> {/* Spacer pour centrer le titre */}
      </div>
      <div style={styles.turnInfo}>
        {gameOver ? (
          teamWin ? `Victoire collective: ${familyStars}/${gameConfig.familyStarsTarget} étoiles ✨` : 
          winnerIndex !== null ? `Victoire: ${players[winnerIndex].name}` : 
          'Partie terminée'
        ) : (
          `Tour ${turn}/${gameConfig.maxTurns} — Joueur actif: ${players[activePlayerIndex].name}`
        )}
      </div>
      <div style={styles.subtitle}>
        Configurez {MIN_PLAYERS}–{MAX_PLAYERS} joueurs et lancez la boussole. 
        Étoiles familiales: {familyStars}/{gameConfig.familyStarsTarget}
        {gameConfig.enableTimeLimit && timeRemaining !== null && (
          <span style={styles.timerBox}>
            ⏰ {Math.floor(timeRemaining / 60000)}:{(Math.floor(timeRemaining / 1000) % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>

      {!gameStartTime && (
        <div style={styles.configBox}>
          <div style={styles.configTitle}>⚙️ Configuration de la partie</div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Plateau:</span>
            <select
              value={gameConfig.plateauType}
              onChange={(e) => setGameConfig(prev => ({ ...prev, plateauType: e.target.value }))}
              style={{ ...styles.configInput, width: '120px' }}
            >
              {Object.entries(PLATEAU_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.icon} {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {gameConfig.plateauType === 'personnalise' && (
            <div style={styles.configRow}>
              <span style={styles.configLabel}>Cases:</span>
              <input
                type="number"
                value={gameConfig.customCases}
                onChange={(e) => setGameConfig(prev => ({ ...prev, customCases: Math.max(10, Math.min(200, parseInt(e.target.value) || 63)) }))}
                style={styles.configInput}
                min="10"
                max="200"
              />
            </div>
          )}
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Tours maximum:</span>
            <input
              type="number"
              value={gameConfig.maxTurns}
              onChange={(e) => setGameConfig(prev => ({ ...prev, maxTurns: Math.max(1, parseInt(e.target.value) || 1) }))}
              style={styles.configInput}
              min="1"
              max="50"
            />
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Score pour gagner:</span>
            <input
              type="number"
              value={gameConfig.winScore}
              onChange={(e) => setGameConfig(prev => ({ ...prev, winScore: Math.max(1, parseInt(e.target.value) || 1) }))}
              style={styles.configInput}
              min="1"
              max="50"
            />
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Étoiles familiales:</span>
            <input
              type="number"
              value={gameConfig.familyStarsTarget}
              onChange={(e) => setGameConfig(prev => ({ ...prev, familyStarsTarget: Math.max(1, parseInt(e.target.value) || 1) }))}
              style={styles.configInput}
              min="1"
              max="20"
            />
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Limite de temps:</span>
            <input
              type="checkbox"
              checked={gameConfig.enableTimeLimit}
              onChange={(e) => setGameConfig(prev => ({ ...prev, enableTimeLimit: e.target.checked }))}
              style={styles.configCheckbox}
            />
          </div>
          {gameConfig.enableTimeLimit && (
            <div style={styles.configRow}>
              <span style={styles.configLabel}>Durée (minutes):</span>
              <input
                type="number"
                value={gameConfig.timeLimit}
                onChange={(e) => setGameConfig(prev => ({ ...prev, timeLimit: Math.max(1, parseInt(e.target.value) || 1) }))}
                style={styles.configInput}
                min="1"
                max="120"
              />
            </div>
          )}
          <button type="button" onClick={startGame} style={styles.button} disabled={players.length < MIN_PLAYERS}>
            🚀 Commencer la partie
          </button>
        </div>
      )}

      <div style={styles.playersPanel} aria-label="Configuration des joueurs">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <strong style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IconShield /> Joueurs ({players.length})
          </strong>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={handleAddPlayer} disabled={!canAddPlayer || isSpinning} style={{ ...styles.smallBtn, backgroundColor: canAddPlayer && !isSpinning ? '#0ea5e9' : '#93c5fd' }} aria-label="Ajouter un joueur">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IconPlus /> Ajouter</span>
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {players.map((p, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="text"
                value={p.name}
                onChange={(e) => handlePlayerNameChange(idx, e.target.value)}
                style={styles.input}
                placeholder={`Joueur ${idx + 1}`}
                disabled={isSpinning}
                aria-label={`Pseudo du joueur ${idx + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemovePlayer(idx)}
                disabled={!canRemovePlayer || isSpinning}
                style={{ ...styles.smallBtn, backgroundColor: canRemovePlayer && !isSpinning ? '#ef4444' : '#fca5a5' }}
                aria-label={`Retirer le joueur ${idx + 1}`}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IconMinus /> Retirer</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {!gameOver && decision && decisionPhase === 'question' && (
        <div style={styles.qcmBox}>
          <div style={styles.qcmTitle}>Ronde des décisions – {decision.category} · {decision.item.title}</div>
          <div style={styles.qcmSituation}>{decision.item.situation}</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {decision.item.choices.map((c) => (
              <div key={c.label} role="button" tabIndex={0} onClick={() => handleSelectDecision(c.label)} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectDecision(c.label); }} style={styles.qcmChoice(decision.selected === c.label)} aria-label={`Choix ${c.label}: ${c.text}`}>
                <strong style={{ minWidth: 18 }}>{c.label}.</strong> <span>{c.text}</span>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleValidateDecision} disabled={!decision.selected} style={styles.qcmValidate}>
            Valider mon choix → Passer au vote
          </button>
        </div>
      )}

      {!gameOver && decision && decisionPhase === 'vote' && (
        <div style={styles.qcmBox}>
          <div style={styles.qcmTitle}>Vote secret – {decision.category}</div>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Les autres joueurs votent pour la valeur qui correspond le mieux.</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {CATEGORIES.map((val) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <strong>{val}</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button type="button" onClick={() => changeVote(val, -1)} disabled={votesCount[val] <= 0} style={{ ...styles.smallBtn, backgroundColor: votesCount[val] > 0 ? '#64748b' : '#cbd5e1' }}>−</button>
                  <span style={{ minWidth: 24, textAlign: 'center' }}>{votesCount[val] || 0}</span>
                  <button type="button" onClick={() => changeVote(val, +1)} disabled={remainingVotes <= 0} style={styles.smallBtn}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>Votes restants: {remainingVotes} / {votesMax}</div>
          <button type="button" onClick={handleValidateDecision} disabled={remainingVotes !== 0} style={{ ...styles.qcmValidate, marginTop: 12 }}>
            Calculer la majorité
          </button>
        </div>
      )}

      {!gameOver && riddle && riddlePhase === 'question' && (
        <div style={styles.riddleBox}>
          <div style={styles.riddleTitle}>🧩 Énigme – {riddle.category}</div>
          <div style={styles.riddleQuestion}>{riddle.item.question || riddle.item.challenge || riddle.item.problem}</div>
          <input
            type="text"
            value={riddleAnswer}
            onChange={(e) => setRiddleAnswer(e.target.value)}
            placeholder="Ta réponse..."
            style={styles.riddleAnswer}
            onKeyDown={(e) => { if (e.key === 'Enter') handleRiddleAnswer(); }}
          />
          <button type="button" onClick={handleRiddleAnswer} disabled={!riddleAnswer.trim()} style={styles.riddleValidate}>
            Valider ma réponse
          </button>
        </div>
      )}

      {!gameOver && riddle && riddlePhase === 'result' && (
        <div style={styles.riddleBox}>
          <div style={styles.riddleTitle}>🧩 Résultat de l'énigme</div>
          <div style={styles.riddleResult}>
            {riddle.solved ? '✅ Correct !' : '❌ Incorrect'}
          </div>
          {riddle.item.explanation && (
            <div style={styles.riddleExplanation}>
              <strong>Explication :</strong> {riddle.item.explanation}
            </div>
          )}
          {riddle.item.answer && !riddle.solved && (
            <div style={styles.riddleExplanation}>
              <strong>Réponse :</strong> {riddle.item.answer}
            </div>
          )}
          <button type="button" onClick={handleRiddleNext} style={styles.riddleValidate}>
            Continuer
          </button>
        </div>
      )}

      {renderPlateau()}
      <div style={styles.svgWrap}>{renderCompass()}</div>

      <button type="button" onClick={handleSpin} disabled={isSpinning || gameOver || !gameStartTime} style={styles.button}>
        <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <IconSpark /> {isSpinning ? 'Lancer…' : gameOver ? (winnerIndex !== null ? `Victoire: ${players[winnerIndex].name}` : 'Partie terminée') : (!gameStartTime ? 'Configurez la partie' : 'Lancer')}
        </span>
      </button>

      <div style={styles.result} aria-live="polite">{resultText}</div>

      <div style={styles.scoreboard}>
        {players.map((p, idx) => (
          <div key={p.name} style={{ ...styles.row, background: idx % 2 ? 'rgba(148,163,184,0.06)' : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {idx === activePlayerIndex && !gameOver ? <span style={styles.activeDot} /> : <span style={{ width: 8, height: 8, marginRight: 10 }} />}
              <strong style={{ color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: 6 }}><IconShield /> {p.name}</strong>
              {p.skipTurns > 0 && <span style={{ fontSize: '10px', color: '#f59e0b' }}>⏸️ {p.skipTurns}</span>}
              {p.prisonTurns > 0 && <span style={{ fontSize: '10px', color: '#ef4444' }}>🔒 {p.prisonTurns}</span>}
            </div>
            <div style={{ fontWeight: 700, color: '#111827' }}>
              Case {p.position}
              {p.position >= (PLATEAU_CONFIGS[gameConfig.plateauType].cases === 'custom' ? gameConfig.customCases : PLATEAU_CONFIGS[gameConfig.plateauType].cases) && (
                <span style={{ color: '#10b981', marginLeft: '8px' }}>🏆</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Animation de victoire */}
      {victoryAnimation && (
        <div style={styles.victoryOverlay}>
          <div style={styles.victoryBox}>
            <div style={styles.victoryTitle}>
              {victoryWinner === 'team' ? '🏆 VICTOIRE COLLECTIVE !' : 
               victoryWinner !== null ? `🏆 ${players[victoryWinner].name} GAGNE !` : 
               '⏰ TEMPS ÉCOULÉ !'}
            </div>
            <div style={styles.victorySubtitle}>
              {victoryWinner === 'team' ? `Félicitations ! Vous avez collecté ${familyStars} étoiles familiales !` :
               victoryWinner !== null ? `Score final: ${players[victoryWinner].score} points` :
               'La partie est terminée par limite de temps'}
            </div>
            <button type="button" onClick={() => {
              setVictoryAnimation(false);
              setVictoryWinner(null);
              setGameStartTime(null);
              setTimeRemaining(null);
              setGameEndReason(null);
            }} style={styles.victoryButton}>
              Nouvelle partie
            </button>
          </div>
        </div>
      )}

      {/* Système de départage */}
      {tiebreakerMode && (
        <div style={styles.tiebreakerBox}>
          <div style={styles.configTitle}>🤝 Égalité détectée !</div>
          <div style={{ marginBottom: 16 }}>
            Plusieurs joueurs ont le même score. Départage en cours...
          </div>
          <button type="button" onClick={handleTiebreaker} style={styles.riddleValidate}>
            Lancer le départage
          </button>
        </div>
      )}
    </div>
  );
}

