import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const imageSchema = z.object({
  url: z.string(),
  alt: z.string(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishDate: z.date(),
    heroImage: imageSchema.optional(),
    tags: z.array(z.string()),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    tag: z.string(),
    blurb: z.string(),
    link: z.string(),
    technology_used: z.array(z.string()),
    skills: z.array(z.string()),
    photos: z.array(imageSchema).optional(),
  }),
});

const recommendationCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recommendations' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    relation: z.string(),
    profileImage: imageSchema,
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
  recommendations: recommendationCollection,
};
