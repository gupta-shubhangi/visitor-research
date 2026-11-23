// Visitor Tracker offline support.
// The app page opens instantly from the saved copy (even on slow or captive museum Wi-Fi), and a fresh copy is
// fetched in the background when there is a connection, so an update shows up the next time the app is opened.
const CACHE = 'visitor-tracker-v4';
const CORE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).catch(() => {}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
function withTimeout(p, ms) { return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]); }
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (sameOrigin && req.mode === 'navigate') {
    const update = fetch(req, { cache: 'no-store' }).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); } return res; });
    e.waitUntil(update.then(() => {}, () => {}));
    e.respondWith(caches.match('./index.html').then(cached => cached || withTimeout(update, 8000)).catch(() => caches.match('./')));
  } else if (sameOrigin && /\.(png|json)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); if (res.ok) caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
  } else if (isFont) {
    e.respondWith(caches.match(req).then(r => r || withTimeout(fetch(req), 4000).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
  }
});
