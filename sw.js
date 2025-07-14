const CACHE_NAME = 'wallet-explorer-v1';
const urlsToCache = [
 'index.html',
 'manifest.json',
 'icon-192.png',
 'icon-512.png'
];

// Install: cache core files
self.addEventListener('install', event => {
 event.waitUntil(
   caches.open(CACHE_NAME)
     .then(cache => cache.addAll(urlsToCache))
 );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
 event.waitUntil(
   caches.keys().then(keys => Promise.all(
     keys.map(key => key !== CACHE_NAME && caches.delete(key))
   ))
 );
});

// Fetch: serve cached assets
self.addEventListener('fetch', event => {
 event.respondWith(
   caches.match(event.request)
     .then(response => response || fetch(event.request))
 );
});
