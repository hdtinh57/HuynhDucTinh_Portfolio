// Service Worker for Portfolio
const CACHE_NAME = 'portfolio-v1.0.1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css?v=1.0.1',
    '/script.js?v=1.0.1',
    '/portfolio-assets/images/profile/your-photo.png?v=1.0.1',
    '/portfolio-assets/images/profile/your-photo-about.jpg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Always try network first for fresh content
                return fetch(event.request)
                    .then(fetchResponse => {
                        // Update cache with fresh content
                        const responseClone = fetchResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseClone);
                            });
                        return fetchResponse;
                    })
                    .catch(() => {
                        // Fallback to cache if network fails
                        return response;
                    });
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
