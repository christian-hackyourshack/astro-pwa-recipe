import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import type { ManifestOptions } from "vite-plugin-pwa";
import manifest from "./webmanifest.json";

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
  integrations: [
    mdx(),
    AstroPWA({
      manifest: manifest as Partial<ManifestOptions>,
      mode: "production",
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      workbox: {
        navigateFallback: "/default.offline",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
});
