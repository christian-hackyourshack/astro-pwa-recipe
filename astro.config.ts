import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-pwa-recipe.vercel.app/",
  base: "/",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [mdx()],
});
