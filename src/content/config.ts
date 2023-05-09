import {z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    publishDate: z.date(),
    heroImage: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()),
    isDraft: z.boolean()
  })
});

const projectCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    link: z.string(),
    technology_used: z.array(z.string()),
    skills: z.array(z.string())
  })
})

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
};
