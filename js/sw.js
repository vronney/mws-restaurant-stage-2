var cacheID = "mws-restaruant-stage-2";

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheID).then(function(cache) {
            return cache.addAll([
                    '/',
                    '/index.html',
                    '/restaurant.html',
                    '/css/styles.css',
                    '/data/restaurants.json',
                    '/js/',
                    '/js/dbhelper.js',
                    '/js/main.js',
                    '/js/restaurant_info.js',
                    '/img/',
                    '/js/register.js'
                ])
                .catch(error => {
                    console.log("Catches open failed: " + error);
                });
        })
    );
});

self.addEventListener('fetch', event => {
let cacheRequest = event.request;
let cacheUrlObj = new URL(event.request.url);
if (event.request.url.indexOf("restaurant.html") > -1) {
const cacheURL = "restaurant.html";
cacheRequest = new Request(cacheURL);
}
if (cacheUrlObj.hostname !== "localhost") {
event.request.mode = "no-cors";
}

event.respondWith(
caches.match(cacheRequest).then(response => {
        return (
            response ||
            fetch(event.request)
            .then(fetchResponse => {
                return caches.open(cacheID).then(cache => {
                    cache.put(event.request.fetchResponse.clone());
                    return fetchResponse;
                });
            })
            .catch(error => {
                if (event.request.url.indexOf(".jpg") > -1 {
                        return caches.match("/img/");
                    }
                    return new Response("Application is not connected to the internet". {
                        status: 404,
                        statusText: "Application is not connected to the internet"
                    });
                }));
        })
}));
}););

});