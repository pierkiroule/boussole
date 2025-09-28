import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getRandomWifouCard } from '../data/wifouCards.js';

/**
 * Le Wifou et la famille De Boussolée — Jeu de cartes avec boussole
 *
 * Spécificités clés:
 * - Boussole SVG en 4 cadrans colorés (N/E/S/O)
 * - Aiguille animée: ≥3 tours complets, décélération, puis 2–3 oscillations
 * - Cartes "Illusions du Wifou" par catégorie
 * - Système de vote et discussion familiale
 * - Sans librairie externe: React + CSS inline + setTimeout
 */

const QUADRANTS = [
  { id: 'N', label: 'Liberté 🦅', angle: 0, color: '#bfdbfe' }, // bleu clair
  { id: 'E', label: 'Cœur ❤️', angle: 90, color: '#bbf7d0' }, // vert clair
  { id: 'S', label: 'Règles ⚖️', angle: 180, color: '#fed7aa' }, // orange clair
  { id: 'O', label: 'Sécurité 🛡️', angle: 270, color: '#e9d5ff' }, // violet clair
];

const ID_TO_LABEL = QUADRANTS.reduce((acc, q) => {
  acc[q.id] = q.label;
  return acc;
}, {});

// Configuration du jeu simplifié
const MAX_ILLUSIONS = 10; // Nombre d'illusions à vaincre pour gagner
const CATEGORIES = ['Liberté', 'Cœur', 'Règles', 'Sécurité'];
const ZERO_VALUES = { 'Liberté': 0, 'Cœur': 0, 'Règles': 0, 'Sécurité': 0 };

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 6;
const PLAYERS_STORAGE_KEY = 'wifou-game.players.v1';
const DEFAULT_PLAYER_PREFIX = 'Joueur';

// Mapping des directions de la boussole vers les catégories
const COMPASS_TO_CATEGORY = {
  'N': 'Liberté',
  'E': 'Cœur', 
  'S': 'Règles',
  'O': 'Sécurité'
};

export default function CompassGame({ config, onBackToHome }) {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // États de la boussole
  const [currentAngleDeg, setCurrentAngleDeg] = useState(0);
  const [transitionMs, setTransitionMs] = useState(800);
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalQuadrant, setFinalQuadrant] = useState(null);

  // États du jeu
  const [currentCard, setCurrentCard] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [votesCount, setVotesCount] = useState({ ...ZERO_VALUES });
  const [familySpirit, setFamilySpirit] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [victoryAnimation, setVictoryAnimation] = useState(false);

  // États des joueurs
  const [players, setPlayers] = useState(() => {
    if (config && config.playerCount) {
      return Array.from({ length: config.playerCount }, (_, i) => ({
        name: `Joueur ${i + 1}`,
        score: 0
      }));
    }
    return [
      { name: 'Joueur 1', score: 0 },
      { name: 'Joueur 2', score: 0 },
    ];
  });
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [turn, setTurn] = useState(1);

  // Références pour nettoyer les timeouts
  const timeoutsRef = useRef([]);

  // Nettoyage des timeouts si le composant est démonté
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // Charger les joueurs depuis localStorage
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
      }
    } catch (_) {
      // ignore
    }
  }, []);

  // Persister les joueurs
  useEffect(() => {
    try {
      const slim = players.map((p) => ({ name: p.name }));
      window.localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(slim));
    } catch (_) {
      // ignore
    }
  }, [players]);

  // Vérifier la victoire
  useEffect(() => {
    if (familySpirit >= MAX_ILLUSIONS && !gameOver) {
      setGameOver(true);
      setVictoryAnimation(true);
    }
  }, [familySpirit, gameOver]);

  // Détermine le quadrant à partir d'un angle normalisé [0, 360)
  const getQuadrantFromAngle = (angleDeg) => {
    const a = ((angleDeg % 360) + 360) % 360;
    if (a >= 315 || a < 45) return 'N';
    if (a >= 45 && a < 135) return 'E';
    if (a >= 135 && a < 225) return 'S';
    return 'O';
  };

  const advanceTurn = () => {
    if (gameOver) return;
    setTurn((t) => t + 1);
    setActivePlayerIndex((i) => (i + 1) % players.length);
  };

  // Lance l'animation de la boussole et tire une carte
  const handleSpin = () => {
    if (isSpinning || gameOver) return;
    if (players.length < MIN_PLAYERS) return;

    setIsSpinning(true);
    setCurrentCard(null);
    setSelectedChoice(null);
    setVotesCount({ ...ZERO_VALUES });

    // 1) Choix aléatoire du quadrant final
    const target = QUADRANTS[Math.floor(Math.random() * QUADRANTS.length)];

    // 2) Au moins 3 tours complets
    const baseTurns = 3 + Math.floor(Math.random() * 3); // 3..5 tours

    // 3) Angle final absolu
    const current = currentAngleDeg;
    const finalTarget = current + baseTurns * 360 + target.angle;

    // Mode reduced motion: pas d'animation, résultat immédiat
    if (prefersReducedMotion) {
      setTransitionMs(0);
      setCurrentAngleDeg(finalTarget);
      const norm = ((finalTarget % 360) + 360) % 360;
      const finalQ = getQuadrantFromAngle(norm);
      setFinalQuadrant(finalQ);
      
      // Tirer une carte de la catégorie correspondante
      const category = COMPASS_TO_CATEGORY[finalQ];
      const card = getRandomWifouCard(category);
      setCurrentCard(card);
      setIsSpinning(false);
      return;
    }

    // 4) Séquence d'animation: grand spin + 2–3 oscillations
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

        // Dernière étape: calcul du résultat + tirage de carte
        if (idx === steps.length - 1) {
          const norm = ((step.angle % 360) + 360) % 360;
          const finalQ = getQuadrantFromAngle(norm);
          setFinalQuadrant(finalQ);

          // Tirer une carte de la catégorie correspondante
          const category = COMPASS_TO_CATEGORY[finalQ];
          const card = getRandomWifouCard(category);
          setCurrentCard(card);
          setIsSpinning(false);
        }
      }, delay);
      timeoutsRef.current.push(t);
      delay += step.duration + 30; // petite marge entre étapes
    });
  };

  // Gestion des choix et votes
  const handleSelectChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const handleVote = (category, delta) => {
    setVotesCount((prev) => {
      const next = { ...prev };
      const newTotal = Object.values(prev).reduce((a, b) => a + b, 0) + delta;
      const maxVotes = players.length - 1; // Tous sauf le joueur actif
      if (delta > 0 && newTotal > maxVotes) return prev;
      const cur = prev[category] || 0;
      const nextVal = cur + delta;
      if (nextVal < 0) return prev;
      next[category] = nextVal;
      return next;
    });
  };

  const handleValidateVote = () => {
    if (!currentCard || !selectedChoice) return;

    // Calculer la majorité
    const entries = Object.entries(votesCount);
    let max = -1;
    let winners = [];
    let total = 0;
    for (const [val, cnt] of entries) {
      total += cnt;
      if (cnt > max) { max = cnt; winners = [val]; } else if (cnt === max) { winners.push(val); }
    }

    // Vérifier si le choix du joueur correspond à la majorité
    const isMajority = max > 0 && winners.length === 1 && selectedChoice.value === winners[0];
    
    if (isMajority) {
      // Illusion vaincue !
      setFamilySpirit(prev => prev + 1);
      setPlayers(prev => prev.map((p, idx) => 
        idx === activePlayerIndex ? { ...p, score: p.score + currentCard.points } : p
      ));
    }

    // Passer au tour suivant
    advanceTurn();
    setCurrentCard(null);
    setSelectedChoice(null);
    setVotesCount({ ...ZERO_VALUES });
  };

  const votesTotal = useMemo(() => Object.values(votesCount).reduce((a, b) => a + b, 0), [votesCount]);
  const votesMax = useMemo(() => Math.max(players.length - 1, 0), [players.length]);
  const remainingVotes = Math.max(votesMax - votesTotal, 0);

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

  // Fonction pour démarrer une nouvelle partie
  const startNewGame = () => {
    setFamilySpirit(0);
    setGameOver(false);
    setVictoryAnimation(false);
    setTurn(1);
    setActivePlayerIndex(0);
    setCurrentCard(null);
    setSelectedChoice(null);
    setVotesCount({ ...ZERO_VALUES });
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
  };

  // Styles simplifiés pour le nouveau jeu
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
    turnInfo: { fontSize: '12px', color: '#475569' },
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
    cardBox: {
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
    cardTitle: { fontWeight: 700, fontSize: '14px', marginBottom: 6, color: '#334155' },
    cardSituation: { fontSize: '14px', marginBottom: 8, color: '#0f172a' },
    cardChoice: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 10px',
      borderRadius: '8px',
      border: `1px solid ${active ? '#2563eb' : '#cbd5e1'}`,
      background: active ? 'rgba(37,99,235,0.08)' : 'transparent',
      cursor: 'pointer',
      marginBottom: '8px',
    }),
    voteBox: {
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
    voteRow: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: '8px' 
    },
    validateBtn: {
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
  }), [isSpinning]);

  // Ajouter les styles CSS pour l'animation de victoire
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes victoryPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
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
            👻 Le Wifou et la famille De Boussolée
          </span>
        </div>
        <div style={{ width: '80px' }}></div> {/* Spacer pour centrer le titre */}
      </div>
      
      <div style={styles.turnInfo}>
        {gameOver ? (
          `🏆 Victoire ! Le Wifou est chassé !`
        ) : (
          `Tour ${turn} — Joueur actif: ${players[activePlayerIndex].name}`
        )}
      </div>
      
      <div style={styles.subtitle}>
        👻 Le Wifou parasite votre Esprit de Famille !<br/>
        🧭 Utilisez la Boussole Magique pour retrouver le Nord<br/>
        Illusions vaincues: {familySpirit}/{MAX_ILLUSIONS}
      </div>

      <div style={styles.playersPanel} aria-label="Configuration des joueurs">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <strong style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            👥 Joueurs ({players.length})
          </strong>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={handleAddPlayer} disabled={!canAddPlayer || isSpinning} style={{ ...styles.smallBtn, backgroundColor: canAddPlayer && !isSpinning ? '#0ea5e9' : '#93c5fd' }} aria-label="Ajouter un joueur">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>+ Ajouter</span>
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
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>- Retirer</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Affichage de la carte actuelle */}
      {!gameOver && currentCard && (
        <div style={styles.cardBox}>
          <div style={styles.cardTitle}>
            👻 Illusion du Wifou détectée – {currentCard.category}
          </div>
          <div style={{ fontSize: '12px', color: '#f59e0b', marginBottom: '8px' }}>
            Effet: {currentCard.wifiGhostEffect}
          </div>
          <div style={styles.cardSituation}>{currentCard.situation}</div>
          
          {!selectedChoice ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {currentCard.choices.map((choice) => (
                <div 
                  key={choice.letter} 
                  role="button" 
                  tabIndex={0} 
                  onClick={() => handleSelectChoice(choice)} 
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSelectChoice(choice); }} 
                  style={styles.cardChoice(false)} 
                  aria-label={`Choix ${choice.letter}: ${choice.text}`}
                >
                  <strong style={{ minWidth: 18 }}>{choice.letter}.</strong> 
                  <span>{choice.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.voteBox}>
              <div style={styles.cardTitle}>🗳️ Vote secret – {currentCard.category}</div>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>
                Les autres joueurs votent pour la valeur qui correspond le mieux.
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {CATEGORIES.map((val) => (
                  <div key={val} style={styles.voteRow}>
                    <strong>{val}</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button type="button" onClick={() => handleVote(val, -1)} disabled={votesCount[val] <= 0} style={{ ...styles.smallBtn, backgroundColor: votesCount[val] > 0 ? '#64748b' : '#cbd5e1' }}>−</button>
                      <span style={{ minWidth: 24, textAlign: 'center' }}>{votesCount[val] || 0}</span>
                      <button type="button" onClick={() => handleVote(val, +1)} disabled={remainingVotes <= 0} style={styles.smallBtn}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>
                Votes restants: {remainingVotes} / {votesMax}
              </div>
              <button type="button" onClick={handleValidateVote} disabled={remainingVotes !== 0} style={styles.validateBtn}>
                Calculer la majorité
              </button>
            </div>
          )}
        </div>
      )}

      {/* Boussole */}
      <div style={styles.svgWrap}>{renderCompass()}</div>

      {/* Bouton de lancement */}
      <button type="button" onClick={handleSpin} disabled={isSpinning || gameOver} style={styles.button}>
        <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          🧭 {isSpinning ? 'Lancer…' : gameOver ? 'Le Wifou est chassé !' : 'Lancer la Boussole'}
        </span>
      </button>

      {/* Scoreboard simplifié */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        marginTop: '4px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.7)',
        boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
        border: '1px solid rgba(255,255,255,0.7)',
        overflow: 'hidden',
      }}>
        {players.map((p, idx) => (
          <div key={p.name} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '10px 14px',
            background: idx % 2 ? 'rgba(148,163,184,0.06)' : 'transparent'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {idx === activePlayerIndex && !gameOver ? 
                <span style={{ width: 8, height: 8, borderRadius: 8, background: '#22c55e', marginRight: 10 }} /> : 
                <span style={{ width: 8, height: 8, marginRight: 10 }} />
              }
              <strong style={{ color: '#0f172a' }}>{p.name}</strong>
            </div>
            <div style={{ fontWeight: 700, color: '#111827' }}>
              {p.score} points
            </div>
          </div>
        ))}
      </div>

      {/* Animation de victoire */}
      {victoryAnimation && (
        <div style={styles.victoryOverlay}>
          <div style={styles.victoryBox}>
            <div style={styles.victoryTitle}>
              🏆 LE WIFOU EST CHASSÉ !
            </div>
            <div style={styles.victorySubtitle}>
              Félicitations ! Vous avez vaincu toutes les illusions du Wifou !<br/>
              L'Esprit de Famille est restauré avec {familySpirit} illusions vaincues.
            </div>
            <button type="button" onClick={startNewGame} style={styles.victoryButton}>
              Nouvelle partie
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

