import { defineCollection, z, type CollectionEntry } from "astro:content";

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});
export const collections = { recipes };

export type Recipe = CollectionEntry<"recipes">;
