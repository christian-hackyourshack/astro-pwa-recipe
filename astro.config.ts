import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import manifest from "./src/pwa/webmanifest.json";
import type { ManifestOptions } from "vite-plugin-pwa";

const adapter =
  process.env.ADAPTER === "node"
    ? node({
        mode: "standalone",
      })
    : vercel();

// https://astro.build/config
export default defineConfig({
  site: "https://astro-pwa-recipe.vercel.app/",
  base: "/",
  output: "hybrid",
  adapter,
  build: {
    format: "file",
  },
  trailingSlash: "ignore",
  integrations: [
    mdx(),
    AstroPWA({
      strategies: "injectManifest",
      srcDir: "src/pwa",
      filename: "sw.ts",
      injectManifest: {
        globPatterns: [
          "_astro/*.{css,js}",
          "**/offline.html",
          "journal.html",
          "journal/*.html",
          "pwa-192x192.png",
        ],
      },
      injectRegister: false,
      manifest: manifest as Partial<ManifestOptions>,
      mode: "production",
      scope: "/",
      includeAssets: ["favicon.svg"],
      registerType: "autoUpdate",
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
});
