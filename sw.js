// sw.js - Service Worker para Administra PWA
const CACHE_NAME = 'administra-v2';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/splash.html',
    '/login.html',
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
    '/js/supabase.js',
    '/assets/logo.png',
    '/assets/escuela.png'
];

// URLs de CDN
const CDN_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
    'https://unpkg.com/lucide@latest'
];

// Instalación
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Cacheando assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                return caches.open(CACHE_NAME + '-cdn');
            })
            .then((cdnCache) => {
                console.log('[SW] Cacheando CDN...');
                return cdnCache.addAll(CDN_ASSETS);
            })
            .then(() => {
                console.log('[SW] Assets cacheados');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Error en instalación:', error);
            })
    );
});

// Activación
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && !cacheName.startsWith(CACHE_NAME + '-cdn')) {
                        console.log('[SW] Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('[SW] Service Worker activado');
            return self.clients.claim();
        })
    );
});

// Fetch
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // HTML - Network First
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            return caches.match('/offline.html');
                        });
                })
        );
        return;
    }

    // Assets - Cache First
    if (request.url.includes('/css/') || 
        request.url.includes('/js/') || 
        request.url.includes('/assets/') ||
        request.url.includes('font-awesome') ||
        request.url.includes('html2canvas') ||
        request.url.includes('jspdf') ||
        request.url.includes('supabase') ||
        request.url.includes('lucide')) {
        
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request)
                        .then((response) => {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, responseClone);
                            });
                            return response;
                        });
                })
        );
        return;
    }

    // Default - Network First
    event.respondWith(
        fetch(request)
            .catch(() => {
                return caches.match(request);
            })
    );
});

// Mensajes
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});