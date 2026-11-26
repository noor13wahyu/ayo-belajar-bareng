// Menyimpan aplikasi di hape supaya tetap jalan tanpa internet.
const VERSI = 'abb-2026-11-26-a59167';
const BERKAS = ['./', './manifest.webmanifest', './ikon-192.png', './ikon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(VERSI).then(c => c.addAll(BERKAS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n.startsWith('abb-') && n !== VERSI).map(n => caches.delete(n)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  const cari = e.request.mode === 'navigate' ? caches.match('./') : caches.match(e.request, { ignoreSearch: true });
  e.respondWith(cari.then(r => r || fetch(e.request)));
});
