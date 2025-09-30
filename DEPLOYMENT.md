# Les Gardiens de l'Esprit Familial

Jeu éducatif coopératif pour protéger la famille contre les dangers numériques.

## 🚀 Déploiement sur Vercel

### Configuration automatique
Le projet est configuré pour fonctionner automatiquement avec Vercel. Les fichiers suivants sont déjà configurés :

- `vercel.json` : Configuration de routage pour SPA
- `.vercel/project.json` : Configuration du build
- `vite.config.js` : Configuration Vite optimisée pour la production

### Déploiement
1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement que c'est un projet Vite
3. Le build se lancera automatiquement avec `npm run build`
4. L'application sera disponible sur votre domaine Vercel

### Résolution des problèmes

Si vous rencontrez un écran blanc :
1. Vérifiez que le build se termine sans erreur
2. Assurez-vous que les fichiers sont dans le dossier `dist/`
3. Vérifiez la console du navigateur pour les erreurs JavaScript

### Commandes locales
```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 🛠️ Technologies utilisées
- React 18
- Vite
- Tailwind CSS
- PWA (Progressive Web App)