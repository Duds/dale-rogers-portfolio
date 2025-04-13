import { defineCollection, z } from "astro:content";

/**
 * @fileoverview Content collection configuration for the portfolio site.
 * Defines schemas for articles and case studies collections.
 */

/**
 * Schema for articles collection
 * @type {import('astro:content').CollectionConfig}
 */
const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    author: z.string().default("Dale Rogers"),
  }),
});

/**
 * Schema for case studies collection
 * @type {import('astro:content').CollectionConfig}
 */
const caseStudiesCollection = defineCollection({
  type: "content",
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

/**
 * Exported collections configuration
 * @type {Record<string, import('astro:content').CollectionConfig>}
 */
export const collections = {
  articles: articlesCollection,
  "case-studies": caseStudiesCollection,
};
