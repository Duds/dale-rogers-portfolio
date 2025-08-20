// Image Caching Service Worker
const CACHE_NAME = 'image-cache-v1';
const IMAGE_CACHE_NAME = 'image-cache-v1';

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Image cache service worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Image cache service worker installed');
        return cache;
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Image cache service worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - handle image requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle image requests
  if (!request.destination || request.destination !== 'image') {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle Unsplash images with optimization
  if (url.hostname === 'images.unsplash.com') {
    event.respondWith(handleUnsplashImage(request));
    return;
  }

  // Handle other images with cache-first strategy
  event.respondWith(handleImageRequest(request));
});

// Handle Unsplash images with optimization
async function handleUnsplashImage(request) {
  const url = new URL(request.url);
  
  // Add optimization parameters if missing
  if (!url.searchParams.has('q')) {
    url.searchParams.set('q', '80');
  }
  if (!url.searchParams.has('auto')) {
    url.searchParams.set('auto', 'format');
  }
  if (!url.searchParams.has('fit')) {
    url.searchParams.set('fit', 'crop');
  }

  const optimizedUrl = url.toString();
  
  try {
    // Try to get from cache first
    const cachedResponse = await caches.match(optimizedUrl);
    if (cachedResponse) {
      console.log('Serving Unsplash image from cache:', optimizedUrl);
      return cachedResponse;
    }

    // Fetch from network and cache
    const response = await fetch(optimizedUrl);
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE_NAME);
      await cache.put(optimizedUrl, response.clone());
      console.log('Cached new Unsplash image:', optimizedUrl);
    }
    
    return response;
  } catch (error) {
    console.error('Failed to handle Unsplash image:', error);
    
    // Fallback to original request
    try {
      return await fetch(request);
    } catch (fallbackError) {
      console.error('Fallback fetch also failed:', fallbackError);
      throw fallbackError;
    }
  }
}

// Handle regular image requests with cache-first strategy
async function handleImageRequest(request) {
  try {
    // Try to get from cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('Serving image from cache:', request.url);
      return cachedResponse;
    }

    // Fetch from network and cache
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE_NAME);
      await cache.put(request, response.clone());
      console.log('Cached new image:', request.url);
    }
    
    return response;
  } catch (error) {
    console.error('Failed to handle image request:', error);
    throw error;
  }
}

// Background sync for preloading images
self.addEventListener('sync', (event) => {
  if (event.tag === 'preload-images') {
    console.log('Background sync: preloading images');
    event.waitUntil(preloadImages());
  }
});

// Preload critical images
async function preloadImages() {
  const criticalImages = [
    // Add critical image URLs here
    // Example: 'https://images.unsplash.com/photo-123...'
  ];

  const cache = await caches.open(IMAGE_CACHE_NAME);
  
  for (const imageUrl of criticalImages) {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        await cache.put(imageUrl, response);
        console.log('Preloaded image:', imageUrl);
      }
    } catch (error) {
      console.error('Failed to preload image:', imageUrl, error);
    }
  }
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('Clearing image cache...');
    event.waitUntil(
      caches.delete(IMAGE_CACHE_NAME)
        .then(() => {
          console.log('Image cache cleared');
          event.ports[0].postMessage({ success: true });
        })
        .catch(error => {
          console.error('Failed to clear cache:', error);
          event.ports[0].postMessage({ success: false, error: error.message });
        })
    );
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    event.waitUntil(
      caches.open(IMAGE_CACHE_NAME)
        .then(cache => cache.keys())
        .then(requests => {
          const urls = requests.map(req => req.url);
          event.ports[0].postMessage({ 
            success: true, 
            cacheSize: urls.length,
            urls: urls 
          });
        })
        .catch(error => {
          console.error('Failed to get cache info:', error);
          event.ports[0].postMessage({ success: false, error: error.message });
        })
    );
  }
});

// Periodic cache cleanup
setInterval(async () => {
  try {
    const cache = await caches.open(IMAGE_CACHE_NAME);
    const requests = await cache.keys();
    
    // Keep only the most recent 100 images
    if (requests.length > 100) {
      const sortedRequests = requests.sort((a, b) => {
        // Sort by last accessed time (if available)
        return 0; // Placeholder for actual sorting logic
      });
      
      const toDelete = sortedRequests.slice(0, requests.length - 100);
      for (const request of toDelete) {
        await cache.delete(request);
      }
      
      console.log(`Cleaned up ${toDelete.length} old cached images`);
    }
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}, 24 * 60 * 60 * 1000); // Run every 24 hours
