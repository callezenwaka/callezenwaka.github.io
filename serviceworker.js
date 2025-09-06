// Service Worker for PWA functionality
const CACHE_NAME = 'callezenwaka-v1.0.0';
const STATIC_CACHE_NAME = 'callezenwaka-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'callezenwaka-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/app.css',
    '/app.js',
    '/app.webmanifest',
    '/assets/favicon.ico',
    '/assets/images/callezenwaka.jpg',
    '/assets/images/callis.jpeg',
    '/assets/images/android-chrome-192x192.png',
    '/assets/images/android-chrome-512x512.png',
    '/assets/images/apple-touch-icon.png',
    '/assets/images/favicon-16x16.png',
    '/assets/images/favicon-32x32.png',
    '/assets/script/Store.js',
    '/assets/script/Theme.js',
    '/assets/style/dark.css',
    '/assets/style/light.css',
    '/data/data.json',
    '/data/events.json',
    '/data/projects.json',
    // Add platform icons
    '/assets/images/platforms/facebook.svg',
    '/assets/images/platforms/github.svg',
    '/assets/images/platforms/instagram.svg',
    '/assets/images/platforms/linkedin.svg',
    '/assets/images/platforms/twitter.svg'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Error caching static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    // console.log('Serving from cache:', request.url);
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache dynamic content
                        caches.open(DYNAMIC_CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.log('Network request failed, serving offline fallback:', error);
                        
                        // Return offline fallback for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html')
                                .then(response => {
                                    if (response) {
                                        return response;
                                    }
                                    // If index.html is not cached, return a basic offline page
                                    return new Response(`
                                        <!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <meta charset="UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>Offline - Callis Ezenwaka</title>
                                            <style>
                                                body { 
                                                    font-family: 'Open Sans', sans-serif; 
                                                    margin: 0; 
                                                    padding: 2rem; 
                                                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                                                    min-height: 100vh;
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                }
                                                .offline-content {
                                                    text-align: center;
                                                    color: white;
                                                    max-width: 600px;
                                                    padding: 3rem;
                                                    background: rgba(255, 255, 255, 0.1);
                                                    border-radius: 20px;
                                                    backdrop-filter: blur(10px);
                                                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                                                }
                                                .offline-icon { font-size: 4rem; margin-bottom: 1rem; }
                                                .offline-title { font-size: 2.5rem; margin-bottom: 1rem; }
                                                .offline-message { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
                                                .retry-button {
                                                    padding: 12px 24px;
                                                    background: rgba(255, 255, 255, 0.2);
                                                    color: white;
                                                    border: 2px solid rgba(255, 255, 255, 0.3);
                                                    border-radius: 25px;
                                                    cursor: pointer;
                                                    font-weight: 600;
                                                    font-size: 1rem;
                                                }
                                            </style>
                                        </head>
                                        <body>
                                            <div class="offline-content">
                                                <div class="offline-icon">📡</div>
                                                <h1 class="offline-title">You're Offline</h1>
                                                <p class="offline-message">
                                                    It looks like you're not connected to the internet. 
                                                    Please check your connection and try again.
                                                </p>
                                                <button onclick="window.location.reload()" class="retry-button">
                                                    Try Again
                                                </button>
                                            </div>
                                        </body>
                                        </html>
                                    `, {
                                        headers: { 'Content-Type': 'text/html' }
                                    });
                                });
                        }
                        
                        // Return offline fallback for other requests
                        return new Response('Offline content not available', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Handle background sync (if supported)
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        // Add background sync logic here if needed
    }
});

// Handle push notifications (if needed in future)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/images/android-chrome-192x192.png',
            badge: '/assets/images/favicon-32x32.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log('Service Worker script loaded');