/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { imageCache, pageCache, staticResourceCache } from "workbox-recipes";

cleanupOutdatedCaches();

// Precache all assets from VitePWA config in astro.config.ts
// self.__WB_MANIFEST references all files globbed through workbox.globPatterns
// these assets will be served cache-first (see https://developer.chrome.com/docs/workbox/modules/workbox-precaching#how_workbox-precaching_works for details)
precacheAndRoute(self.__WB_MANIFEST);

pageCache({ warmCache: ["/", "/catalog/"] });
staticResourceCache();
imageCache();

// Forcefully update all clients immediately also in other browser tabs
self.skipWaiting();
clientsClaim();
