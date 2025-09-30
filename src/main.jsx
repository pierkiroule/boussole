import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { VersionManager } from './utils/versionManager.js';

// Initialiser le gestionnaire de version avant de rendre l'app
VersionManager.init();

createRoot(document.getElementById('root')).render(
  <App />
);

