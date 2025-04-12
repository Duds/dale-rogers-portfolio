import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()),
        author: z.string().default('Dale Rogers'),
    }),
});

const caseStudiesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        client: z.string(),
        industry: z.string(),
        duration: z.string(),
        tags: z.array(z.string()),
        challenge: z.string(),
        solution: z.string(),
        results: z.array(z.string()),
        featured: z.boolean().default(false),
    }),
});

export const collections = {
    'articles': articlesCollection,
    'case-studies': caseStudiesCollection,
}; 