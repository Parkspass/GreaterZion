/*jshint esversion: 6 */

const staticCacheName = 'site-static-v8'; // Need to change version number ANYTIME we change HTML or CSS files. This is how we get the app to update. The browser needs to detect a change in the service worker.
const assets = [
    '/', // caches all reqeust responses from server
    '/index.html',
    '/app.js',
    '/style.css',
    '/favicon.ico',
    '/icons/arrow_back-24px 1 1.svg',
    '/icons/calendar.svg',
    '/icons/circle 1.svg',
    '/icons/circle 2.svg',
    '/icons/circle 3.svg',
    '/icons/circle 4.svg',
    '/icons/circle 5.svg',
    '/icons/circle 6.svg',
    '/icons/circle 7.svg',
    '/icons/circle 8.svg',
    '/icons/circle 9.svg',
    '/icons/liveImg.svg',
    '/pwaIcons',
    '/Map Photos/Entrances.jpg',
    '/Map Photos/Parking.jpg',
    '/Map Photos/Shuttles.jpg',
    '/Map Photos/Trails.jpg',
    '/fonts/Roboto/Roboto-Regular.ttf',
    '/fonts/Roboto_Slab/static/RobotoSlab-Regular.ttf',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
    'https://unpkg.com/axios/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vue',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js',
    
];

// Install service worker
self.addEventListener('install', evt => {
    // This will cache everything we need to work offline
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("Caching assets...");
            cache.addAll(assets);
        })
    );
});

// Acivate event
self.addEventListener('activate', evt => {
    // This function will delete all the older caches so the app stays up to date
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request); // Returns chache response. If response is not there, it will try to return the event request
        })
    );
    //console.log("Fetch event", evt);
});

/* EXTRA PWA NOTES
- This PWA does not require dynamic caching (strategically only caching pages that the user will use offline)
If you want to do dynamic caching watch video #18 by The Net Ninja on Youtube
- This app also only has one HTML page. If you want a pretty fallback page for the user to see if it can't get the cached page, watch video #19.
- You can also limit cache sizes if you have extensive apps

*/