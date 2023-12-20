import { defineCollection, z, type CollectionEntry } from "astro:content";

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categories: z.array(z.string()).optional(),
  }),
});
export type Recipe = CollectionEntry<"recipes">;

const categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
  }),
});
export type Category = CollectionEntry<"categories">;

export const collections = { recipes, categories };
