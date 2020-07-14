/*jshint esversion: 6 */

const staticCacheName = 'site-static-v1'; // Need to change version number ANYTIME we change HTML or CSS files. This is how we get the app to update. The browser needs to detect a change in the service worker.
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
    '/icons/entrance_grey.svg',
    '/icons/entrance_green.svg',
    '/icons/entrance_yellow.svg',
    '/icons/entrance_pink.svg',
    '/icons/parking_grey.svg',
    '/icons/parking_green.svg',
    '/icons/parking_yellow.svg',
    '/icons/parking_pink.svg',
    '/icons/parking_low 1.svg',
    '/icons/parking_low 2.svg',
    '/icons/parking_low 3.svg',
    '/icons/parking_low 4.svg',
    '/pwaIcons',
    '/Map Photos/Entrances.jpg',
    '/Map Photos/Parking.jpg',
    '/Map Photos/Shuttles.jpg',
    '/Map Photos/Trails.jpg',
    "/trail\ photos/pa'rus/parus-trail-1.jpg",
    "/trail photos/pa'rus-map.jpg",
    'icons/toilets.svg',
    'icons/dog.svg',
    'icons/bike.svg',
    'icons/horse.svg',
    'icons/permit.svg',
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


// Tims Version Below:

// const version = '0.0.70'; // Need to change version number ANYTIME we change HTML or CSS files. This is how we get the app to update. The browser needs to detect a change in the service worker.
// const appCache = 'trailwaze$'; // Unique across origin
// const versionedCache = appCache+'('+version+')'; // Unique across versions
// const sharedCache = appCache+"(shared)";
// const staticCache = versionedCache+'-static';
// const localCache = versionedCache+'-local';
// const mapCache = versionedCache+'-map';

// const assets = [
//     '/', // caches all reqeust responses from server
//     '/index.html',
//     '/app.js',
//     '/style.css',
//     '/favicon.ico',
//     '/icons/arrow_back-24px 1 1.svg',
//     '/icons/calendar.svg',
//     '/icons/circle 1.svg',
//     '/icons/circle 2.svg',
//     '/icons/circle 3.svg',
//     '/icons/circle 4.svg',
//     '/icons/circle 5.svg',
//     '/icons/circle 6.svg',
//     '/icons/circle 7.svg',
//     '/icons/circle 8.svg',
//     '/icons/circle 9.svg',
//     '/icons/liveImg.svg',
//     '/pwaIcons',
//     '/Map Photos/Entrances.jpg',
//     '/Map Photos/Parking.jpg',
//     '/Map Photos/Shuttles.jpg',
//     '/Map Photos/Trails.jpg',
//     '/fonts/Roboto/Roboto-Regular.ttf',
//     '/fonts/Roboto_Slab/static/RobotoSlab-Regular.ttf',
// ];

// const foreignFilesToCache = [
//     'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
//     'https://unpkg.com/axios/dist/axios.min.js',
//     'https://cdn.jsdelivr.net/npm/vue',
//     'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js',
// ];

// function addAllFast(list,name,init) {
//     const requests=[];
//     for (let file of list){
//       requests.push(fetch(file,init)
//         .then((response)=>{
//             if(response){
//                 return response;
//             }else{
//                 return Error();
//             }
//         }));
//     }
//     return Promise.all(requests).then(()=>
//       caches.open(name)).then(cache=>{
//         let updates=[];
//         for (let request of requests){
//           request.then(response=>{
//             updates.push(cache.put(response.url,response));
//           });
//         }
//         return Promise.all(updates);
//       });
//   }
  

// // Install service worker
// self.addEventListener('install', evt => {
//     // This will cache everything we need to work offline
//     evt.waitUntil(
//         addAllFast(filesToCache,staticCache,{headers:{'Cache-Control': 'no-cache'}})
//             .then(()=>addAllFast(foreignFilesToCache,staticCache,{mode:"cors",credentials: 'same-origin',headers:{'Cache-Control': 'no-cache'}}))
//             .then(()=>self.skipWaiting()
//         )
//     );
// });

// // Acivate event
// self.addEventListener('activate', evt => {
//     // This function will delete all the older caches so the app stays up to date
//     console.log("Running new service worker "+versionedCache);
//     return evt.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.filter(cacheName => {
//                     return (cacheName.startsWith(appCache)&&!(cacheName.startsWith(versionedCache)||cacheName.startsWith(sharedCache)));
//                 }).map(function(cacheName) {
//                     return caches.delete(cacheName);
//                 })
//             ).then(()=>self.clients.claim());
//         })
//     );
// });

// // Fetch Event
// self.addEventListener('fetch', evt => {
//     evt.respondWith(
//         caches.match(evt.request).then(cacheRes => {
//             return cacheRes || fetch(evt.request); // Returns chache response. If response is not there, it will try to return the event request
//         })
//     );
//     //console.log("Fetch event", evt);
// });

// self.addEventListener('fetch', evt => {
//     if (evt.request.method.toUpperCase()==="GET"){
//       evt.respondWith(
//         caches.match(evt.request).then(function (response) {
//           return response || fetch(evt.request).then(function(response) {
//             const url=new URL(evt.request.url);
//             const copy=response.clone();
//             // if (url.host.endsWith("tile.openstreetmap.org")){
//             //   let attempt = ()=>caches.open(mapCache).then((cache)=>{
//             //     cache.keys().then((arr)=>{
//             //       if (arr.length<100){
//             //         return cache.put(evt.request,copy);
//             //       } else{
//             //         return cache.delete(arr[0]).then(()=>{return attempt();})
//             //       }
//             //     })
//             //   });
//             //   attempt()
//             // } else if (url.host===location.host){
//             //   caches.open(localCache).then((cache)=>{
//             //     cache.put(evt.request,copy);
//             //   });
//             // }
//             return response;
//           });
//         })
//       );
//     }
// });

// function update(request) {
//     return caches.open(cacheName).then(function (cache) {
//       return fetch(request).then(function (response) {
//         return cache.put(request, response.clone()).then(function () {
//           return response;
//         });
//       });
//     });
// }