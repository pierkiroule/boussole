import React, { useState } from 'react';

const FAMILY_PROFILES = {
  'young': { label: 'Famille avec jeunes enfants (4-8 ans)', icon: '👶', color: '#fef3c7' },
  'mixed': { label: 'Famille mixte (6-12 ans)', icon: '👨‍👩‍👧‍👦', color: '#dbeafe' },
  'teen': { label: 'Famille avec ados (12-18 ans)', icon: '👨‍👩‍👦‍👦', color: '#fce7f3' },
  'adult': { label: 'Famille adulte (18+ ans)', icon: '👨‍👩‍👧‍👧', color: '#ecfdf5' }
};

const PLATEAU_OPTIONS = {
  'rapide': { label: 'Plateau Rapide', description: '20 cases, idéal pour débuter', duration: '10-15 min', icon: '⚡' },
  'classique': { label: 'Plateau Classique', description: '63 cases, jeu de l\'Oie traditionnel', duration: '30-45 min', icon: '🎯' },
  'expert': { label: 'Plateau Expert', description: '100 cases, défis avancés', duration: '1h+', icon: '🧠' },
  'personnalise': { label: 'Plateau Personnalisé', description: 'Nombre de cases au choix', duration: 'variable', icon: '⚙️' }
};

const GAME_MODES = {
  'quick': { label: 'Partie Rapide', description: '5 tours, idéal pour débuter', duration: '10-15 min', icon: '⚡' },
  'classic': { label: 'Partie Classique', description: '10 tours, expérience complète', duration: '20-30 min', icon: '🎯' },
  'expert': { label: 'Mode Expert', description: 'Défis avancés et situations complexes', duration: '30-45 min', icon: '🧠' }
};

const DIFFICULTY_LEVELS = {
  'easy': { label: 'Facile', description: 'Questions simples, situations claires', icon: '🟢' },
  'medium': { label: 'Moyen', description: 'Défis équilibrés pour tous', icon: '🟡' },
  'hard': { label: 'Difficile', description: 'Situations complexes, réflexion approfondie', icon: '🔴' }
};

export default function HomeScreen({ onStartGame, onShowTutorial, onShowRules }) {
  const [selectedProfile, setSelectedProfile] = useState('mixed');
  const [selectedPlateau, setSelectedPlateau] = useState('classique');
  const [selectedMode, setSelectedMode] = useState('classic');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [playerCount, setPlayerCount] = useState(4);
  const [familyName, setFamilyName] = useState('');
  const [customCases, setCustomCases] = useState(63);

  const handleStartGame = () => {
    const gameConfig = {
      profile: selectedProfile,
      plateauType: selectedPlateau,
      customCases: customCases,
      mode: selectedMode,
      difficulty: selectedDifficulty,
      playerCount,
      familyName: familyName || `Famille ${selectedProfile}`
    };
    onStartGame(gameConfig);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1e293b',
      textAlign: 'center',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#64748b',
      textAlign: 'center',
      marginBottom: '32px'
    },
    section: {
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    profileGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '12px',
      marginBottom: '16px'
    },
    profileCard: (isSelected, color) => ({
      padding: '16px',
      borderRadius: '12px',
      border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
      background: isSelected ? color : '#f8fafc',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center'
    }),
    profileIcon: {
      fontSize: '24px',
      marginBottom: '8px'
    },
    profileLabel: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#475569'
    },
    modeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '12px'
    },
    modeCard: (isSelected) => ({
      padding: '16px',
      borderRadius: '12px',
      border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
      background: isSelected ? '#eff6ff' : '#f8fafc',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center'
    }),
    modeIcon: {
      fontSize: '20px',
      marginBottom: '8px'
    },
    modeTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '4px'
    },
    modeDescription: {
      fontSize: '12px',
      color: '#64748b',
      marginBottom: '4px'
    },
    modeDuration: {
      fontSize: '11px',
      color: '#94a3b8',
      fontStyle: 'italic'
    },
    difficultyGrid: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center'
    },
    difficultyButton: (isSelected) => ({
      padding: '12px 16px',
      borderRadius: '8px',
      border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
      background: isSelected ? '#eff6ff' : '#f8fafc',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      minWidth: '100px'
    }),
    playerCountContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      justifyContent: 'center'
    },
    playerCountButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '2px solid #e2e8f0',
      background: '#f8fafc',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: '600',
      color: '#475569'
    },
    playerCountDisplay: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b',
      minWidth: '60px',
      textAlign: 'center'
    },
    familyNameInput: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
      fontSize: '16px',
      background: '#f8fafc',
      marginBottom: '16px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      marginTop: '24px'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    },
    secondaryButton: {
      background: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
      borderRadius: '12px',
      padding: '14px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    helpButtons: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      marginTop: '16px'
    },
    helpButton: {
      background: 'transparent',
      color: '#64748b',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '8px 16px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>
          <span>🧭</span>
          La Famille Déboussolée
        </div>
        <div style={styles.subtitle}>
          Un jeu pour retrouver l'équilibre numérique en famille
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>👨‍👩‍👧‍👦</span>
            Profil de votre famille
          </div>
          <div style={styles.profileGrid}>
            {Object.entries(FAMILY_PROFILES).map(([key, profile]) => (
              <div
                key={key}
                style={styles.profileCard(selectedProfile === key, profile.color)}
                onClick={() => setSelectedProfile(key)}
              >
                <div style={styles.profileIcon}>{profile.icon}</div>
                <div style={styles.profileLabel}>{profile.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>🎯</span>
            Plateau de jeu
          </div>
          <div style={styles.modeGrid}>
            {Object.entries(PLATEAU_OPTIONS).map(([key, plateau]) => (
              <div
                key={key}
                style={styles.modeCard(selectedPlateau === key)}
                onClick={() => setSelectedPlateau(key)}
              >
                <div style={styles.modeIcon}>{plateau.icon}</div>
                <div style={styles.modeTitle}>{plateau.label}</div>
                <div style={styles.modeDescription}>{plateau.description}</div>
                <div style={styles.modeDuration}>{plateau.duration}</div>
              </div>
            ))}
          </div>
          {selectedPlateau === 'personnalise' && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <input
                type="number"
                value={customCases}
                onChange={(e) => setCustomCases(Math.max(10, Math.min(200, parseInt(e.target.value) || 63)))}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  fontSize: '14px',
                  width: '100px',
                  textAlign: 'center'
                }}
                min="10"
                max="200"
              />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Nombre de cases (10-200)
              </div>
            </div>
          )}
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>🎮</span>
            Mode de jeu
          </div>
          <div style={styles.modeGrid}>
            {Object.entries(GAME_MODES).map(([key, mode]) => (
              <div
                key={key}
                style={styles.modeCard(selectedMode === key)}
                onClick={() => setSelectedMode(key)}
              >
                <div style={styles.modeIcon}>{mode.icon}</div>
                <div style={styles.modeTitle}>{mode.label}</div>
                <div style={styles.modeDescription}>{mode.description}</div>
                <div style={styles.modeDuration}>{mode.duration}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>⚖️</span>
            Difficulté
          </div>
          <div style={styles.difficultyGrid}>
            {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
              <div
                key={key}
                style={styles.difficultyButton(selectedDifficulty === key)}
                onClick={() => setSelectedDifficulty(key)}
              >
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>{level.icon}</div>
                <div style={{ fontSize: '12px', fontWeight: '600' }}>{level.label}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>{level.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>👥</span>
            Nombre de joueurs
          </div>
          <div style={styles.playerCountContainer}>
            <button
              style={styles.playerCountButton}
              onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
            >
              −
            </button>
            <div style={styles.playerCountDisplay}>{playerCount}</div>
            <button
              style={styles.playerCountButton}
              onClick={() => setPlayerCount(Math.min(15, playerCount + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>🏠</span>
            Nom de votre famille (optionnel)
          </div>
          <input
            type="text"
            placeholder="Ex: Famille Martin"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            style={styles.familyNameInput}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.primaryButton} onClick={handleStartGame}>
            🚀 Commencer la partie
          </button>
        </div>

        <div style={styles.helpButtons}>
          <button style={styles.helpButton} onClick={onShowTutorial}>
            📖 Tutoriel
          </button>
          <button style={styles.helpButton} onClick={onShowRules}>
            📋 Règles du jeu
          </button>
        </div>
      </div>
    </div>
  );
}