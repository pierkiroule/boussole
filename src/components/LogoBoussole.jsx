import React, { useMemo } from 'react';

const STEP_TO_ANGLE = {
  N: 0,
  E: 90,
  S: 180,
  O: 270,
};

const STEP_TO_COLOR = {
  N: '#2563eb', // blue-600
  E: '#16a34a', // green-600
  S: '#ea580c', // orange-600
  O: '#7c3aed', // purple-600
};

export default function LogoBoussole({ activeStep }) {
  const angle = useMemo(() => {
    if (!activeStep || !STEP_TO_ANGLE[activeStep]) return 0;
    return STEP_TO_ANGLE[activeStep];
  }, [activeStep]);

  const color = useMemo(() => STEP_TO_COLOR[activeStep] || '#0ea5e9', [activeStep]);

  const needleStyle = {
    transform: `rotate(${angle}deg)`,
    transformOrigin: '120px 120px',
    transition: 'transform 1s ease-in-out',
  };

  return (
    <div className="glass rounded-2xl p-5">
      <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boussole">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <circle cx="120" cy="120" r="110" fill="url(#glow)" />
        <circle cx="120" cy="120" r="108" fill="none" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="120" cy="120" r="96" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 6" />

        {/* Cardinal labels */}
        <g fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="16" fill="#334155" textAnchor="middle" dominantBaseline="middle">
          <text x="120" y="28">N</text>
          <text x="212" y="124">E</text>
          <text x="120" y="216">S</text>
          <text x="28" y="124">O</text>
        </g>

        {/* Tick marks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angleDeg = (i * 6) * (Math.PI / 180);
          const inner = i % 5 === 0 ? 86 : 92;
          const outer = 100;
          const x1 = 120 + inner * Math.cos(angleDeg);
          const y1 = 120 + inner * Math.sin(angleDeg);
          const x2 = 120 + outer * Math.cos(angleDeg);
          const y2 = 120 + outer * Math.sin(angleDeg);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth={i % 5 === 0 ? 2 : 1} />;
        })}

        {/* Needle (Mikado style) */}
        <g style={needleStyle}>
          {/* Shadow */}
          <g opacity="0.2" transform="translate(2,2)">
            <polygon points="120,40 128,120 120,200 112,120" fill="#000" />
          </g>
          <polygon points="120,40 128,120 120,200 112,120" fill={color} />
          {/* Center cap */}
          <circle cx="120" cy="120" r="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="120" cy="120" r="3" fill={color} />
        </g>
      </svg>
    </div>
  );
}

