import { z, defineCollection } from 'astro:content';

const imageSchema = z.object({
  url: z.string(),
  alt: z.string(),
});

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishDate: z.date(),
    heroImage: imageSchema.optional(),
    tags: z.array(z.string()),
  }),
});

const projectCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    link: z.string(),
    technology_used: z.array(z.string()),
    skills: z.array(z.string()),
    photos: z.array(imageSchema).optional(),
  }),
});

const recommendationCollection = defineCollection({
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
