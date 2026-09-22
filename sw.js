const CACHE = 'zahvat-rynka-46f54420e0';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './pesochnica/', './pesochnica/index.html', './pesochnica/manifest.webmanifest', './pesochnica/icon-180.png', './pesochnica/icon-192.png', './pesochnica/icon-512.png'];
// предзагрузка мимо HTTP-кеша браузера: иначе в новую версию кеша может попасть старая страница
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).catch(() => caches.match('./index.html'))));
});
