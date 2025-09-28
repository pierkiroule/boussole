import React, { useEffect, useMemo, useRef, useState } from 'react';

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

const MAX_TURNS = 10;
const WIN_SCORE = 12; // Seuil de victoire individuel
const FAMILY_STARS_TARGET = 5; // Étoiles familiales pour victoire d'équipe
const CATEGORIES = ['Liberté', 'Cœur', 'Règles', 'Sécurité'];
const ZERO_VALUES = { 'Liberté': 0, 'Cœur': 0, 'Règles': 0, 'Sécurité': 0 };
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

export default function CompassGame() {
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

  // Gestion joueurs
  const [players, setPlayers] = useState([
    { name: 'Joueur 1', score: 0 },
    { name: 'Joueur 2', score: 0 },
  ]);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [turn, setTurn] = useState(1);

  // Références pour nettoyer les timeouts à l'unmount
  const timeoutsRef = useRef([]);

  // Nettoyage des timeouts si le composant est démonté
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

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

  const advanceTurn = () => {
    if (winnerIndex !== null) return;
    if (turn >= MAX_TURNS) return;
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
      const update = computeAndApplyScoring(finalQ, willJackpot);
      setResultText(update.message);
      setIsSpinning(false);
      if (turn < MAX_TURNS) {
        setTurn((t) => t + 1);
        setActivePlayerIndex((i) => (i + 1) % players.length);
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

          // Calcul des points
          const update = computeAndApplyScoring(finalQ, willJackpot);
          setResultText(update.message);

          // Détection de zone frontière -> tirer une situation QCM
          const boundaryCategory = getBoundaryCategoryFromAngle(norm);
          setIsSpinning(false);
          if (boundaryCategory) {
            setCurrentCategory(boundaryCategory);
            const poolDec = DECISIONS[boundaryCategory] || [];
            if (poolDec.length > 0) {
              const item = poolDec[Math.floor(Math.random() * poolDec.length)];
              setDecision({ category: boundaryCategory, item, selected: null });
            }
          } else if (!update.hasWinner && turn < MAX_TURNS) {
            advanceTurn();
          }
        }
      }, delay);
      timeoutsRef.current.push(t);
      delay += step.duration + 30; // petite marge entre étapes
    });
  };

  // Calcul et application des points en fonction du quadrant final
  const computeAndApplyScoring = (quadrantId, jackpot) => {
    // Simulation simple de congruence: 0..2 points de base
    const base = Math.floor(Math.random() * 3); // 0,1,2
    const playerCount = players.length;
    const currentIndex = activePlayerIndex;

    let deltaActive = 0;
    let extraMessage = '';
    const deltas = new Map(); // index -> delta

    if (quadrantId === 'N') {
      // Trésor: max points + bonus jackpot éventuel
      deltaActive = 3 + (jackpot ? 1 : 0);
      deltas.set(currentIndex, deltaActive);
      if (jackpot) extraMessage = ' + 🎉 JACKPOT PILE-POIL NORD 🎉';
    } else if (quadrantId === 'E') {
      // Cadeau: donner une partie de ses points à un autre joueur (transfert)
      const otherCandidates = Array.from({ length: playerCount }, (_, i) => i).filter((i) => i !== currentIndex);
      const otherIndex = otherCandidates[Math.floor(Math.random() * otherCandidates.length)];
      const available = players[currentIndex].score;
      const transfer = Math.min(base, available);
      deltaActive = -transfer;
      if (transfer > 0) {
        deltas.set(currentIndex, -transfer);
        deltas.set(otherIndex, (deltas.get(otherIndex) || 0) + transfer);
        extraMessage = ` (donné ${transfer} à ${players[otherIndex].name})`;
      } else {
        extraMessage = ' (rien à donner)';
      }
    } else if (quadrantId === 'S') {
      // Gage: 50% de chance de réussir et garder les points de base, sinon 0
      const success = Math.random() < 0.5;
      deltaActive = success ? base : 0;
      if (deltaActive !== 0) deltas.set(currentIndex, deltaActive);
      extraMessage = success ? ' (gage réussi ✅)' : ' (gage raté ❌)';
    } else {
      // Ouest: perdu, aucun point
      deltaActive = 0;
    }

    // Calcul du tableau de scores mis à jour en une seule passe
    const nextPlayers = players.map((p, idx) => {
      const d = deltas.get(idx) || 0;
      return { ...p, score: p.score + d };
    });
    setPlayers(nextPlayers);

    const nextWinnerIndex = nextPlayers.findIndex((p) => p.score >= WIN_SCORE);
    setWinnerIndex(nextWinnerIndex !== -1 ? nextWinnerIndex : null);

    const label = ID_TO_LABEL[quadrantId] || '';
    const sign = deltaActive >= 0 ? '+' : '-';
    const absDelta = Math.abs(deltaActive);
    const msg = `${label} → ${sign}${absDelta} point${absDelta > 1 ? 's' : ''}${extraMessage}`;

    return { delta: deltaActive, message: msg, hasWinner: nextWinnerIndex !== -1, winnerIndex: nextWinnerIndex };
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
      return next >= FAMILY_STARS_TARGET;
    });
    // Reset décision
    setDecision(null);
    setDecisionPhase('question');
    setCurrentCategory('');
    if (!teamWin && winnerIndex === null && turn < MAX_TURNS) {
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
  }), [isSpinning]);

  // Style de l'aiguille (groupe) -> on anime la rotation + easing
  const needleStyle = useMemo(() => ({
    transform: `rotate(${currentAngleDeg}deg)`,
    transformOrigin: '120px 120px',
    transition: prefersReducedMotion ? 'none' : `transform ${transitionMs}ms cubic-bezier(0.2, 0.7, 0.1, 1)`
  }), [currentAngleDeg, transitionMs, prefersReducedMotion]);

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

  const gameOver = turn > MAX_TURNS || winnerIndex !== null || teamWin;

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <IconCrown /> La Famille Déboussolée
        </span>
      </div>
      <div style={styles.turnInfo}>
        {gameOver ? (teamWin ? `Victoire collective: ${familyStars}/${FAMILY_STARS_TARGET} étoiles ✨` : (winnerIndex !== null ? `Victoire: ${players[winnerIndex].name}` : 'Partie terminée')) : `Tour ${turn}/${MAX_TURNS} — Joueur actif: ${players[activePlayerIndex].name}`}
      </div>
      <div style={styles.subtitle}>Configurez {MIN_PLAYERS}–{MAX_PLAYERS} joueurs et lancez la boussole. Étoiles familiales: {familyStars}/{FAMILY_STARS_TARGET}</div>

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

      <div style={styles.svgWrap}>{renderCompass()}</div>

      <button type="button" onClick={handleSpin} disabled={isSpinning || gameOver} style={styles.button}>
        <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <IconSpark /> {isSpinning ? 'Lancer…' : gameOver ? (winnerIndex !== null ? `Victoire: ${players[winnerIndex].name}` : 'Partie terminée') : 'Lancer'}
        </span>
      </button>

      <div style={styles.result} aria-live="polite">{resultText}</div>

      <div style={styles.scoreboard}>
        {players.map((p, idx) => (
          <div key={p.name} style={{ ...styles.row, background: idx % 2 ? 'rgba(148,163,184,0.06)' : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {idx === activePlayerIndex && !gameOver ? <span style={styles.activeDot} /> : <span style={{ width: 8, height: 8, marginRight: 10 }} />}
              <strong style={{ color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: 6 }}><IconShield /> {p.name}</strong>
            </div>
            <div style={{ fontWeight: 700, color: '#111827' }}>{p.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

