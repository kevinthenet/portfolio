import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      publishDate: z.date(),
      heroImage: z.object({ image: image(), alt: z.string() }).optional(),
      tags: z.array(z.string()),
    }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subtitle: z.string(),
      tag: z.string(),
      date: z.string().optional(),
      blurb: z.string(),
      link: z.string(),
      technology_used: z.array(z.string()),
      skills: z.array(z.string()),
      photos: z.array(z.object({ image: image(), alt: z.string() })).optional(),
    }),
});

const recommendationCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recommendations' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      relation: z.string(),
      profileImage: z.object({ image: image(), alt: z.string() }),
    }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
  recommendations: recommendationCollection,
};
