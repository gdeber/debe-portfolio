import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_CATEGORIES } from '../project-categories';

const projectsCollection = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().nonnegative(),
    category: z.enum(PROJECT_CATEGORIES),
    description: z.string(),
    website: z.string().url().optional(),
    tags: z.array(z.string()),
    date: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};