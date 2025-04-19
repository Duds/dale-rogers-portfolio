import { defineCollection, z } from "astro:content";

/**
 * @fileoverview Content collection configuration for the portfolio site.
 * Defines schemas for various content types.
 */

const variant = z.enum(["purple", "black", "green", "orange"]);

const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  variant: variant,
  imageUrl: z.string(),
  icon: z.string(),
});

/**
 * Schema for services collection
 * Expects an array of services in a single file
 */
const servicesCollection = defineCollection({
  type: "data",
  schema: z.array(serviceSchema),
});

const siteSectionSchema = z.object({
  section: z.enum(["hero", "values", "about", "marketing"]),
  content: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    ctaText: z.string().optional(),
    statement: z.string().optional(),
    emoji: z.string().optional(),
    paragraphs: z.array(z.string()).optional(),
    image: z.string().optional(),
    skills: z.array(z.string()).optional(),
    values: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
    logos: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
          alt: z.string(),
        })
      )
      .optional(),
  }),
});

/**
 * Schema for site content collection
 * Now expects an array of sections in a single file
 */
const siteContentCollection = defineCollection({
  type: "data",
  schema: z.array(siteSectionSchema),
});

/**
 * Schema for articles collection
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
 */
export const collections = {
  articles: articlesCollection,
  "case-studies": caseStudiesCollection,
  services: servicesCollection,
  "site-content": siteContentCollection,
};
