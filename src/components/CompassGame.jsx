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
const WIN_SCORE = 12; // Seuil de victoire
const CATEGORIES = ['Liberté', 'Cœur', 'Règles', 'Sécurité'];

export default function CompassGame() {
  // Angle absolu en degrés (peut croître au‑delà de 360 pour animer correctement)
  const [currentAngleDeg, setCurrentAngleDeg] = useState(0);
  // Durée de transition dynamique (ms) pour chaque étape d'animation
  const [transitionMs, setTransitionMs] = useState(800);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultText, setResultText] = useState('');
  const [jackpotHit, setJackpotHit] = useState(false);
  const [finalQuadrant, setFinalQuadrant] = useState(null); // 'N' | 'E' | 'S' | 'O' | null
  const [currentCategory, setCurrentCategory] = useState('');
  const [winnerIndex, setWinnerIndex] = useState(null);

  // Gestion joueurs
  const [players, setPlayers] = useState([
    { name: 'Joueur 1', score: 0 },
    { name: 'Joueur 2', score: 0 },
    { name: 'Joueur 3', score: 0 },
    { name: 'Joueur 4', score: 0 },
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

  // Catégorie initiale pour le tour 1
  useEffect(() => {
    setCurrentCategory(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]);
  }, []);

  // Détermine le quadrant à partir d'un angle normalisé [0, 360)
  const getQuadrantFromAngle = (angleDeg) => {
    const a = ((angleDeg % 360) + 360) % 360;
    if (a >= 315 || a < 45) return 'N';
    if (a >= 45 && a < 135) return 'E';
    if (a >= 135 && a < 225) return 'S';
    return 'O';
  };

  const randomCategory = () => CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  // Lance l'animation complète de l'aiguille et calcule le résultat
  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResultText('');
    setJackpotHit(false);
    setFinalQuadrant(null);

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

        // Dernière étape: calcul du résultat + score + passage au joueur suivant
        if (idx === steps.length - 1) {
          const norm = ((step.angle % 360) + 360) % 360;
          const finalQ = getQuadrantFromAngle(norm);
          setFinalQuadrant(finalQ);

          // Calcul des points
          const update = computeAndApplyScoring(finalQ, willJackpot);
          setResultText(update.message);

          // Passage au tour suivant si la partie continue
          setIsSpinning(false);
          if (!update.hasWinner && turn < MAX_TURNS) {
            setTurn((t) => t + 1);
            setActivePlayerIndex((i) => (i + 1) % players.length);
            setCurrentCategory(randomCategory());
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
      color: '#0f172a',
      marginTop: '4px',
    },
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
  }), [isSpinning]);

  // Style de l'aiguille (groupe) -> on anime la rotation + easing
  const needleStyle = useMemo(() => ({
    transform: `rotate(${currentAngleDeg}deg)`,
    transformOrigin: '120px 120px',
    transition: `transform ${transitionMs}ms cubic-bezier(0.2, 0.7, 0.1, 1)`
  }), [currentAngleDeg, transitionMs]);

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

  const gameOver = turn > MAX_TURNS || winnerIndex !== null;

  return (
    <div style={styles.container}>
      <div style={styles.title}>La Famille Déboussolée</div>
      <div style={styles.turnInfo}>
        {gameOver ? (winnerIndex !== null ? `Victoire: ${players[winnerIndex].name}` : 'Partie terminée') : `Tour ${turn}/${MAX_TURNS} — Joueur actif: ${players[activePlayerIndex].name}`}
      </div>
      {!gameOver && (
        <div style={styles.category}>Question: {currentCategory}</div>
      )}

      <div style={styles.svgWrap}>{renderCompass()}</div>

      <button type="button" onClick={handleSpin} disabled={isSpinning || gameOver} style={styles.button}>
        {isSpinning ? 'Lancer…' : gameOver ? (winnerIndex !== null ? `Victoire: ${players[winnerIndex].name}` : 'Partie terminée') : 'Lancer'}
      </button>

      <div style={styles.result}>{resultText}</div>

      <div style={styles.scoreboard}>
        {players.map((p, idx) => (
          <div key={p.name} style={{ ...styles.row, background: idx % 2 ? 'rgba(148,163,184,0.06)' : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {idx === activePlayerIndex && !gameOver ? <span style={styles.activeDot} /> : <span style={{ width: 8, height: 8, marginRight: 10 }} />}
              <strong style={{ color: '#0f172a' }}>{p.name}</strong>
            </div>
            <div style={{ fontWeight: 700, color: '#111827' }}>{p.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

