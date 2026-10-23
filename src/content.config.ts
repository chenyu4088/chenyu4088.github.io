import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    pluginName: z.string(),
    slug: z.string(),
    version: z.string(),
    license: z.string(),
    cores: z.string(),
    summary: z.string(),
  }),
});

export const collections = { docs };
