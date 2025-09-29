import React, { useState, useEffect } from 'react';
import { KeyboardManager } from '../utils/keyboardManager';

export default function KeyboardShortcuts({ onClose }) {
  const [shortcuts, setShortcuts] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setShortcuts(KeyboardManager.getShortcutsList());
    setIsEnabled(KeyboardManager.isEnabled);
  }, []);

  const handleToggleShortcuts = () => {
    const newState = KeyboardManager.toggle();
    setIsEnabled(newState);
  };

  const getCategoryIcon = (key) => {
    if (key.startsWith('F')) return '🎮';
    if (key.match(/[1-4]/)) return '🛡️';
    if (key.includes('Arrow')) return '🧭';
    if (key === 'Space' || key === 'Enter') return '✅';
    if (key === 'Escape') return '❌';
    return '⌨️';
  };

  const getCategoryName = (key) => {
    if (key.startsWith('F')) return 'Fonctions';
    if (key.match(/[1-4]/)) return 'Boucliers';
    if (key.includes('Arrow')) return 'Navigation';
    if (key === 'Space' || key === 'Enter') return 'Actions';
    if (key === 'Escape') return 'Fermeture';
    return 'Général';
  };

  const groupedShortcuts = shortcuts.reduce((groups, shortcut) => {
    const category = getCategoryName(shortcut.key);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(shortcut);
    return groups;
  }, {});

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">⌨️ Raccourcis Clavier</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleShortcuts}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEnabled 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              {isEnabled ? '✅ Activés' : '❌ Désactivés'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            💡 <strong>Astuce :</strong> Les raccourcis clavier améliorent l'accessibilité et permettent une navigation plus rapide. 
            Ils sont automatiquement désactivés quand vous tapez dans un champ de texte.
          </p>
        </div>

        {/* Raccourcis par catégorie */}
        <div className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">{getCategoryIcon(categoryShortcuts[0].key)}</span>
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border">
                    <div className="flex items-center">
                      <kbd className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm font-mono mr-3">
                        {shortcut.key}
                      </kbd>
                      <span className="text-gray-700 text-sm">
                        {shortcut.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Guide d'utilisation */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">📖 Guide d'Utilisation</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• <kbd className="bg-yellow-200 px-1 rounded">1-4</kbd> : Sélectionner rapidement un bouclier</li>
            <li>• <kbd className="bg-yellow-200 px-1 rounded">Espace</kbd> : Continuer ou valider l'action en cours</li>
            <li>• <kbd className="bg-yellow-200 px-1 rounded">Entrée</kbd> : Soumettre un formulaire</li>
            <li>• <kbd className="bg-yellow-200 px-1 rounded">Échap</kbd> : Fermer les fenêtres ouvertes</li>
            <li>• <kbd className="bg-yellow-200 px-1 rounded">F1</kbd> : Ouvrir le tutoriel</li>
            <li>• <kbd className="bg-yellow-200 px-1 rounded">F2</kbd> : Ouvrir les statistiques</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 pt-6 border-t">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            ✅ Fermer
          </button>
        </div>
      </div>
    </div>
  );
}