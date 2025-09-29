import React, { useState, useEffect } from 'react';
import { TouchGestureManager } from '../utils/touchGestureManager';
import { HapticManager } from '../utils/hapticManager';

export default function TouchGestures({ onClose }) {
  const [gestures, setGestures] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);

  useEffect(() => {
    setGestures(TouchGestureManager.getGesturesList());
    setIsEnabled(TouchGestureManager.isEnabled);
    setHapticEnabled(HapticManager.isEnabled);
  }, []);

  const handleToggleGestures = () => {
    const newState = TouchGestureManager.toggle();
    setIsEnabled(newState);
  };

  const handleToggleHaptic = () => {
    const newState = HapticManager.toggle();
    setHapticEnabled(newState);
  };

  const getGestureIcon = (gesture) => {
    const icons = {
      swipeLeft: '👈',
      swipeRight: '👉',
      swipeUp: '👆',
      swipeDown: '👇',
      longPress: '👆⏱️',
      doubleTap: '👆👆'
    };
    return icons[gesture] || '👆';
  };

  const getGestureDescription = (gesture) => {
    const descriptions = {
      swipeLeft: 'Navigation précédente',
      swipeRight: 'Navigation suivante',
      swipeUp: 'Ouvrir les statistiques',
      swipeDown: 'Ouvrir le tutoriel',
      longPress: 'Menu contextuel',
      doubleTap: 'Valider/Action rapide'
    };
    return descriptions[gesture] || 'Action personnalisée';
  };

  const testHaptic = (pattern) => {
    HapticManager.vibrate(pattern);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📱 Gestes Tactiles</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleGestures}
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
            💡 <strong>Astuce :</strong> Les gestes tactiles permettent une navigation plus fluide sur mobile. 
            Utilisez les swipes pour naviguer rapidement dans le jeu.
          </p>
        </div>

        {/* Contrôles Haptiques */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">📳 Feedback Haptique</h3>
            <button
              onClick={handleToggleHaptic}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                hapticEnabled 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              {hapticEnabled ? '✅ Activé' : '❌ Désactivé'}
            </button>
          </div>
          
          {HapticManager.isSupported() ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => testHaptic('light')}
                className="bg-white rounded-lg p-3 border text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">💫</div>
                <div className="text-sm font-medium">Léger</div>
              </button>
              <button
                onClick={() => testHaptic('medium')}
                className="bg-white rounded-lg p-3 border text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-medium">Moyen</div>
              </button>
              <button
                onClick={() => testHaptic('heavy')}
                className="bg-white rounded-lg p-3 border text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">💥</div>
                <div className="text-sm font-medium">Fort</div>
              </button>
              <button
                onClick={() => testHaptic('success')}
                className="bg-white rounded-lg p-3 border text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">🎉</div>
                <div className="text-sm font-medium">Succès</div>
              </button>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              ⚠️ Le feedback haptique n'est pas supporté sur cet appareil.
            </p>
          )}
        </div>

        {/* Gestes Disponibles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">👆 Gestes Disponibles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gestures.map((gesture, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{getGestureIcon(gesture.gesture)}</span>
                    <div>
                      <div className="font-semibold text-gray-800 capitalize">
                        {gesture.gesture.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {getGestureDescription(gesture.gesture)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guide d'Utilisation */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">📖 Guide d'Utilisation</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• <strong>Swipe gauche/droite</strong> : Navigation entre les étapes</li>
            <li>• <strong>Swipe haut</strong> : Ouvrir les statistiques</li>
            <li>• <strong>Swipe bas</strong> : Ouvrir le tutoriel</li>
            <li>• <strong>Appui long</strong> : Menu contextuel rapide</li>
            <li>• <strong>Double tap</strong> : Valider l'action en cours</li>
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