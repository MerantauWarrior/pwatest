var dataCacheName = 'sgData-v1';
var cacheName = 'sgPWA-final-1';
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

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
