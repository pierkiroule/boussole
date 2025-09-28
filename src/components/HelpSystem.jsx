import React, { useState } from 'react';

const HELP_SECTIONS = {
  'rules': {
    title: 'Règles du Jeu',
    icon: '📋',
    content: `
# Règles de La Famille Déboussolée

## Objectif
Retrouver l'équilibre numérique en famille en gagnant des points et des étoiles familiales.

## Comment Jouer
1. **Configuration** : Choisissez votre profil familial et le nombre de joueurs
2. **Tours** : Chaque joueur lance la boussole à son tour
3. **Résultats** : Suivez les effets du cadran où tombe l'aiguille
4. **Décisions** : Quand l'aiguille tombe entre deux cadrans, tirez une situation

## Les 4 Cadrans
- **Nord ✨** : Trésor (3 points max + jackpot possible)
- **Est 🤝** : Cadeau (transfert de points entre joueurs)
- **Sud 🎭** : Gage (50% chance de réussir)
- **Ouest 😵** : Perdu (passe son tour)

## Système de Résonance
Quand l'aiguille tombe entre deux cadrans :
1. Le joueur actif choisit une réponse (A, B ou C)
2. Les autres joueurs votent secrètement pour une valeur
3. Si le choix correspond à la majorité : +2 points +1 étoile familiale

## Victoire
- **Individuelle** : 12 points
- **Collective** : 5 étoiles familiales
- **Limite** : 10 tours maximum
    `
  },
  'values': {
    title: 'Les 4 Valeurs',
    icon: '💎',
    content: `
# Les 4 Valeurs Familiales

## Liberté 🗽
**Principe** : Autonomie et choix personnels
**Exemples** : Décider de ses horaires, choisir ses activités, avoir son espace privé
**Équilibre** : Liberté responsable, pas d'anarchie

## Cœur ❤️
**Principe** : Émotions et relations
**Exemples** : Écouter les autres, exprimer ses sentiments, prendre soin des proches
**Équilibre** : Empathie sans dépendance émotionnelle

## Règles 📏
**Principe** : Structure et limites
**Exemples** : Respecter les horaires, suivre les consignes, maintenir l'ordre
**Équilibre** : Règles justes et adaptées, pas de rigidité excessive

## Sécurité 🛡️
**Principe** : Protection et bien-être
**Exemples** : Protéger sa vie privée, éviter les dangers, prendre soin de sa santé
**Équilibre** : Prudence sans paranoia
    `
  },
  'tips': {
    title: 'Conseils pour Bien Jouer',
    icon: '💡',
    content: `
# Conseils pour une Partie Réussie

## Avant de Commencer
- **Choisissez un moment calme** : Évitez les heures de stress
- **Expliquez le jeu** : Assurez-vous que tout le monde comprend
- **Soyez patients** : Laissez le temps à chacun de réfléchir

## Pendant le Jeu
- **Écoutez vraiment** : Ne jugez pas les réponses des autres
- **Respectez les choix** : Chaque opinion est valable
- **Profitez du moment** : C'est un jeu, pas un examen
- **Apprenez ensemble** : Découvrez les valeurs de chacun

## Gestion des Conflits
- **Restez calmes** : Les désaccords sont normaux
- **Expliquez vos choix** : Aidez les autres à comprendre
- **Cherchez des compromis** : Trouvez des solutions ensemble
- **Respectez les limites** : Ne forcez personne

## Après le Jeu
- **Discutez des situations** : Partagez vos réflexions
- **Appliquez les leçons** : Utilisez ce que vous avez appris
- **Planifiez la prochaine partie** : Gardez l'élan positif
    `
  },
  'safety': {
    title: 'Sécurité en Ligne',
    icon: '🔒',
    content: `
# Sécurité Numérique Familiale

## Protection des Données
- **Mots de passe forts** : Utilisez des combinaisons complexes
- **Partage limité** : Ne donnez pas vos informations personnelles
- **Paramètres de confidentialité** : Configurez vos comptes correctement

## Reconnaître les Dangers
- **Hameçonnage** : Méfiez-vous des messages suspects
- **Fausses identités** : Vérifiez qui vous parlez vraiment
- **Contenu inapproprié** : Signalez et bloquez ce qui vous dérange

## Bonnes Pratiques
- **Temps d'écran équilibré** : Fixez des limites raisonnables
- **Communication ouverte** : Parlez des problèmes sans jugement
- **Surveillance adaptée** : Contrôlez selon l'âge et la maturité

## En Cas de Problème
- **Parlez-en** : Ne gardez pas les problèmes pour vous
- **Cherchez de l'aide** : Contactez des professionnels si nécessaire
- **Documentez** : Gardez des preuves des incidents
- **Bloquez et signalez** : Utilisez les outils de protection
    `
  }
};

export default function HelpSystem({ isVisible, onClose, section = 'rules' }) {
  if (!isVisible) return null;

  const currentSection = HELP_SECTIONS[section] || HELP_SECTIONS['rules'];

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modal: {
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'transparent',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#94a3b8',
      padding: '8px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px'
    },
    icon: {
      fontSize: '32px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b'
    },
    content: {
      fontSize: '16px',
      color: '#475569',
      lineHeight: '1.6',
      whiteSpace: 'pre-line'
    },
    sectionTabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    tab: (isActive) => ({
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      background: isActive ? '#3b82f6' : '#f1f5f9',
      color: isActive ? 'white' : '#64748b',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    })
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <div style={styles.sectionTabs}>
          {Object.entries(HELP_SECTIONS).map(([key, sectionData]) => (
            <button
              key={key}
              style={styles.tab(section === key)}
              onClick={() => {/* Change section logic would go here */}}
            >
              {sectionData.icon} {sectionData.title}
            </button>
          ))}
        </div>
        
        <div style={styles.header}>
          <span style={styles.icon}>{currentSection.icon}</span>
          <h2 style={styles.title}>{currentSection.title}</h2>
        </div>
        
        <div style={styles.content}>
          {currentSection.content}
        </div>
      </div>
    </div>
  );
}