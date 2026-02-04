const CACHE_NAME = "weather-pwa-v1";
const ASSETS = [
  "/",
  "/manifest.json",
  "/assets/main.js",
  "/assets/main.css",
  // add any other assets from dist
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
