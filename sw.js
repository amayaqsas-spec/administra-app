// sw.js - Service Worker para Administra PWA
const CACHE_NAME = 'administra-v3';
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
    '/assets/logo.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
    // Si la petición es hacia Supabase, no interferir y dejar que pase directo a la red
    if (event.request.url.includes('supabase.co')) {
        return;
    }

    // Para archivos estáticos: Estrategia Cache First
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            }).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            })
    );
});