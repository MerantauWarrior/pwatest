var cacheName = 'sgPWA-1';
var filesToCache = [
  '/pwatest/',
  '/pwatest/index.html',
  '/pwatest/js/jquery-3.3.1.min.js',
  '/pwatest/js/custom.js',
  '/pwatest/css/style.css',
  '/pwatest/css/media.css',
  '/pwatest/fonts/Firasansextralightitalic.ttf',
  '/pwatest/fonts/Firasansregular.ttf',
  '/pwatest/fonts/MuseoSansCyrl.otf',
  '/pwatest/fonts/MuseoSansCyrl_0.otf',
  '/pwatest/fonts/MuseoSansCyrl_1.otf',
  '/pwatest/fonts/MuseoSansCyrl_4.otf',
  '/pwatest/img/activity-icon.png',
  '/pwatest/img/box-back.png',
  '/pwatest/img/calendar-header.png',
  '/pwatest/img/calendar-week.png',
  '/pwatest/img/clock-icon.png',
  '/pwatest/img/clock-recent.png',
  '/pwatest/img/dish-1.png',
  '/pwatest/img/dish-2.png',
  '/pwatest/img/dish-3.png',
  '/pwatest/img/dish-4.png',
  '/pwatest/img/dish-5.png',
  '/pwatest/img/events-icon.png',
  '/pwatest/img/medications-icon.png',
  '/pwatest/img/menu-icon.png',
  '/pwatest/img/menu-separator.png',
  '/pwatest/img/minibox-clock-icon.png',
  '/pwatest/img/nurse.png',
  '/pwatest/img/pills-status-active.png',
  '/pwatest/img/remindings-1.png',
  '/pwatest/img/remindings-2.png',
  '/pwatest/img/remindings-3.png',
  '/pwatest/img/remindings-icon.png',
  '/pwatest/img/things.png',
  '/pwatest/img/things-1.png',
  '/pwatest/img/things-2.png',
  '/pwatest/img/things-3.png',
  '/pwatest/img/things-4.png',
  '/pwatest/img/things-5.png',
  '/pwatest/img/things-6.png',
  '/pwatest/img/tomorrow-arrow.png',
  '/pwatest/img/weather-sunny.png',
  '/pwatest/img/week-next.png',
  '/pwatest/img/week-prev.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});