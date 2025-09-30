// Service Worker pour le jeu "Les Gardiens de l'Esprit Familial"
// Version dynamique basée sur la date de build
const BUILD_VERSION = '1.0.0-' + new Date().toISOString().split('T')[0];
const CACHE_NAME = `gardiens-esprit-familial-${BUILD_VERSION}`;
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourner la réponse du cache si disponible
        if (response) {
          return response;
        }
        
        // Sinon, faire la requête réseau
        return fetch(event.request).then((response) => {
          // Vérifier si la réponse est valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Cloner la réponse
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notification de mise à jour
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: BUILD_VERSION });
  }
  
  // Message pour forcer la mise à jour
  if (event.data && event.data.type === 'FORCE_UPDATE') {
    self.skipWaiting();
  }
  
  // Message pour vider le localStorage
  if (event.data && event.data.type === 'CLEAR_STORAGE') {
    // Notifier le client pour vider le localStorage
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'CLEAR_STORAGE' });
      });
    });
  }
});