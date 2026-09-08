const CACHE_NAME = 'administra-v2';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/splash.html',
    '/dashboard.html',
    '/grupos.html',
    '/alumnos.html',
    '/gastos.html',
    '/reportes.html',
    '/extra-notas.html',
    '/configuracion.html',
    '/acerca.html',
    '/offline.html',
    '/manifest.json',
    '/css/styles.css',
    '/js/app.js',
    '/js/layout.js',
    '/js/offline-manager.js',
    '/js/splash.js',
    '/assets/icon.png',
    '/assets/logo.png'
];

const CDN_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('[SW] Cacheando assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(function() {
                return caches.open(CACHE_NAME + '-cdn');
            })
            .then(function(cdnCache) {
                console.log('[SW] Cacheando CDN...');
                return cdnCache.addAll(CDN_ASSETS);
            })
            .then(function() {
                console.log('[SW] Assets cacheados');
                return self.skipWaiting();
            })
            .catch(function(error) {
                console.error('[SW] Error en instalación:', error);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME && !cacheName.startsWith(CACHE_NAME + '-cdn')) {
                        console.log('[SW] Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(function() {
            console.log('[SW] Service Worker activado');
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
    var request = event.request;
    var url = new URL(request.url);

    if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then(function(response) {
                    var responseClone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(function() {
                    return caches.match(request)
                        .then(function(cachedResponse) {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            return caches.match('/offline.html');
                        });
                })
        );
        return;
    }

    if (request.url.includes('/css/') || 
        request.url.includes('/js/') || 
        request.url.includes('/assets/') ||
        request.url.includes('font-awesome') ||
        request.url.includes('html2canvas') ||
        request.url.includes('jspdf')) {
        
        event.respondWith(
            caches.match(request)
                .then(function(cachedResponse) {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request)
                        .then(function(response) {
                            var responseClone = response.clone();
                            caches.open(CACHE_NAME).then(function(cache) {
                                cache.put(request, responseClone);
                            });
                            return response;
                        });
                })
        );
        return;
    }

    event.respondWith(
        fetch(request)
            .catch(function() {
                return caches.match(request);
            })
    );
});

self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});