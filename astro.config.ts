import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import manifest from "./webmanifest.json";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-pwa-recipe.vercel.app/",
  base: "/",
  output: "server",
  adapter: vercel(),
  // adapter: node({
  //   mode: "standalone",
  // }),
  integrations: [
    mdx(),
    AstroPWA({
      mode: "production",
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      manifest,
    }),
  ],
});
