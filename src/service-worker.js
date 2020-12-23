/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing/registerRoute';
import { CacheFirst } from 'workbox-strategies/CacheFirst';
import { CacheableResponsePlugin } from 'workbox-cacheable-response/CacheableResponsePlugin';

// eslint-disable-next-line
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/normalize\/8\.0\.1\/normalize\.min\.css/,
  new CacheFirst({
    cacheName: 'normalize',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
