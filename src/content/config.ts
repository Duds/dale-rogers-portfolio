import { defineCollection, z } from "astro:content";

/**
 * @fileoverview Content collection configuration for the portfolio site.
 * Defines schemas for various content types.
 */

const siteSectionSchema = z.object({
  section: z.enum([
    "hero",
    "values",
    "about",
    "marketing",
    "services-text",
    "partners",
  ]),
  content: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    ctaText: z.string().optional(),
    statement: z.string().optional(),
    emoji: z.string().optional(),
    paragraphs: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageUrl: z.string().optional(),
    buttonText: z.string().optional(),
    buttonLink: z.string().optional(),
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
          website: z.string().optional(),
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

// Base schema for common fields
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  author: z.string(),
  featured: z.boolean().optional().default(false),
  coverImage: z.string().optional(),
  tags: z.array(z.string()),
});

// Schema for case studies
const caseStudySchema = baseSchema.extend({
  client: z.string(),
  industry: z.string(),
  duration: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.union([z.string(), z.array(z.string())]),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
});

// Schema for articles
const articleSchema = baseSchema.extend({
  draft: z.boolean().optional().default(false),
});

// Schema for scratch posts (drafts/works in progress)
const scratchSchema = baseSchema.extend({
  status: z
    .enum(["draft", "in-progress", "abandoned", "complete"])
    .default("draft"),
  originalContent: z.string().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  files: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        content: z.string(),
      })
    )
    .optional(),
});

// Schema for service detail pages
const serviceDetailSchema = baseSchema.extend({
  serviceType: z.string(),
  coverImage: z.string(),
  icon: z.string().optional(),
  benefits: z
    .array(
      z.object({
        text: z.string(),
        icon: z.string(),
      })
    )
    .optional(),
  process: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  examples: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        link: z.string().optional(),
      })
    )
    .optional(),
  relatedCaseStudies: z.array(z.string()).optional(),
});

/**
 * Exported collections configuration
 */
export const collections = {
  "case-studies": defineCollection({
    type: "content",
    schema: caseStudySchema,
  }),
  articles: defineCollection({
    type: "content",
    schema: articleSchema,
  }),
  scratch: defineCollection({
    type: "content",
    schema: scratchSchema,
  }),
  services: defineCollection({
    type: "content",
    schema: serviceDetailSchema,
  }),
  "site-content": siteContentCollection,
};
