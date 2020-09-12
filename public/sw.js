self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                console.log('[Service Worker] Precaching App Shell')
                // cache.add('/src/js/app.js/')
                // cache.add('/src/js/feed.js/')
                // cache.add('/src/js/fetch.js/')  
                // cache.add('/src/js/promise.js/')
                // cache.add('/index.html')
                // cache.add('/')
                // cache.add('/src/js/material.min.js/')
                // cache.add('/src/css/app.css')
                // cache.add('/src/css/feed.js/')
                cache.addAll([
                    '/src/js/app.js/',
                    '/src/js/feed.js/',
                    '/src/js/fetch.js/',  
                    '/src/js/promise.js/',
                    '/index.html',
                    '/',
                    '/src/js/material.min.js/',
                    '/src/css/app.css',
                    '/src/css/feed.js/'
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
                    return fetch(event.request);
                }
            })
            
    );
})

