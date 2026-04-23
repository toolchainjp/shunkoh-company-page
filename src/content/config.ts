import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['お知らせ', 'コラム', 'メディア掲載']),
    excerpt: z.string(),
  }),
});

export const collections = { news };
