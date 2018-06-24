var cacheName = 'sgPWA-1';
var filesToCache = [
  '/',
  '/index.html',
  '/js/jquery-3.3.1.min.js',
  '/js/custom.js',
  '/css/style.css',
  '/css/media.css',
  '/fonts/Firasansextralightitalic.ttf',
  '/fonts/Firasansregular.ttf',
  '/fonts/MuseoSansCyrl.otf',
  '/fonts/MuseoSansCyrl_0.otf',
  '/fonts/MuseoSansCyrl_1.otf',
  '/fonts/MuseoSansCyrl_4.otf',
  '/img/activity-icon.png',
  '/img/box-back.png',
  '/img/calendar-header.png',
  '/img/calendar-week.png',
  '/img/clock-icon.png',
  '/img/clock-recent.png',
  '/img/dish-1.png',
  '/img/dish-2.png',
  '/img/dish-3.png',
  '/img/dish-4.png',
  '/img/dish-5.png',
  '/img/events-icon.png',
  '/img/medications-icon.png',
  '/img/menu-icon.png',
  '/img/menu-separator.png',
  '/img/minibox-clock-icon.png',
  '/img/nurse.png',
  '/img/pills-status-active.png',
  '/img/remindings-1.png',
  '/img/remindings-2.png',
  '/img/remindings-3.png',
  '/img/remindings-icon.png',
  '/img/things.png',
  '/img/things-1.png',
  '/img/things-2.png',
  '/img/things-3.png',
  '/img/things-4.png',
  '/img/things-5.png',
  '/img/things-6.png',
  '/img/tomorrow-arrow.png',
  '/img/weather-sunny.png',
  '/img/week-next.png',
  '/img/week-prev.png'
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