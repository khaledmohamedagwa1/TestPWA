const CACHE_NAME = `temp-v3`;
const Dynamic_Cache ="dyanmicCache"
const assets =[
    "/" ,
    "/index.html" ,
    "/css/style.css" ,
    "/js/jquery-3.3.1.min.js" ,
    "/js/popper.min.js" ,
    "https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" ,
    "/css/owl.carousel.min.css",
    "/css/bootstrap.min.css" ,
    "/js/bootstrap.min.js" ,
    "/js/main.js" ,
    "/js/app.js" ,
    "/fonts/icomoon/fonts/icomoon.ttf?10si43" ,
    "images/icons/icon-72x72.png",
    "images/icons/icon-96x96.png",
    "images/icons/icon-128x128.png",
    "images/icons/icon-144x144.png",
    "images/icons/icon-152x152.png",
    "images/icons/icon-512x512.png",
    "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2" ,
    "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2" ,
    "/fallback.html" ,
    "/sw.js" ,
    "/manfiest.json"
]
// Use the install event to pre-cache all initial resources.
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) =>
          cache.addAll(assets),
        ),
    );
});
// to remove the old cache when change ocurred in the service worker 
self.addEventListener("activate", event =>{
    console.log("activated ")
    event.waitUntil(
        caches.keys().then(keys =>{
           return Promise.all(
            keys.filter(key => key != CACHE_NAME)
            .map(key => caches.delete(key))
           );
        })


    )
});
//fetch any request and check if it is in the cache it will return 

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachRes =>{
            return cachRes || fetch(event.request).then(fetchRes =>{
                return caches.open(Dynamic_Cache).then(cache =>{
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                })
            })
        })
    );
});
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request)
//         .then(cachResponse =>{return cachResponse ||fetch(event.request)})
//     );
// });
