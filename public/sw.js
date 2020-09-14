self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([
                    '/src/js/app.js/',
                    '/src/js/feed.js/',
                    '/src/js/fetch.js/',  
                    '/src/js/promise.js/',
                    '/index.html',
                    '/',
                    '/src/js/material.min.js/',
                    '/src/css/app.css',
                    '/src/css/feed.js/',
                    '/src/images/main-image.jpg/',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ])
            })
        );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    //console.log('[Service Worker] Fetching something ....', event);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function(res) {
                            caches.open('dynamic')
                                .then(function(cache) {
                                    cache.put(event.request.url, res.clone())
                                    return res;
                                })
                        });
                }
            })
            
    );
})

