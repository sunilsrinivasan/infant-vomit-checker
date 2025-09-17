
const CACHE_NAME = 'vomit-bot-cache-v1';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'vomiting-chatbot.js',
  'style.css',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
