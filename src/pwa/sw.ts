/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

import { cacheNames, clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, getCacheKeyForURL, precacheAndRoute } from "workbox-precaching";
import { imageCache, pageCache, staticResourceCache } from "workbox-recipes";
import { setCatchHandler, setDefaultHandler } from "workbox-routing";
import { NetworkOnly } from "workbox-strategies";

cleanupOutdatedCaches();
/**
 * Precache all assets from VitePWA config in astro.config.ts.
 *
 * self.__WB_MANIFEST references all files globbed through
 * injectManifest.globPatterns these assets will be served cache-first
 * (see https://developer.chrome.com/docs/workbox/modules/workbox-precaching#how_workbox-precaching_works for details)
 */
precacheAndRoute(self.__WB_MANIFEST);

/**
 * Use workbox recipes to cache pages, static resources and images
 */
pageCache({ warmCache: ["/", "/catalog/"] });
staticResourceCache();
imageCache();

/**
 * Define a catch handler for offline pages
 *
 * For documents (especially SSR), this handler looks for the closest offline
 * page in the site tree.
 */
setCatchHandler(async (options) => {
  const { destination, url } = options.request;

  if (destination === "document") {
    const cache = await caches.open(cacheNames.precache);
    // TODO: Naive implementation works only when hosted on root path
    const path = url.split("/");
    while (path.length >= 3) {
      const offlineUrl = path.join("/") + "/offline.html";
      const cacheKey = getCacheKeyForURL(offlineUrl);
      console.log({ path, offlineUrl, cacheKey });
      if (cacheKey) {
        const offlinePage = await cache.match(cacheKey);
        if (offlinePage) {
          return offlinePage;
        }
      }
      path.pop();
    }
  }
  return Response.error();
});

// QUESTION: Isn't this the default anyways?
setDefaultHandler(new NetworkOnly());

/**
 * Forcefully update all clients immediately (also in other browser tabs)
 */
self.skipWaiting();
clientsClaim();
