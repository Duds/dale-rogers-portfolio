import type { CollectionEntry } from "astro:content";
import { vi } from "vitest";

const mockRenderResult = {
  Content: () => null,
  headings: [],
  remarkPluginFrontmatter: {},
};

export const mockArticles: CollectionEntry<"articles">[] = [
  {
    id: "test-article-1",
    slug: "test-article-1",
    data: {
      title: "Test Article 1",
      description: "This is a test article description",
      pubDate: new Date(),
      author: "Test Author",
      featured: false,
      tags: ["test", "article"],
      draft: false,
    },
    body: "",
    collection: "articles",
    render: async () => mockRenderResult,
  },
  {
    id: "test-article-2",
    slug: "test-article-2",
    data: {
      title: "Another Test Article",
      description: "This is another test article description",
      pubDate: new Date(),
      author: "Test Author",
      featured: false,
      tags: ["test", "article"],
      draft: false,
    },
    body: "",
    collection: "articles",
    render: async () => ({ Content: () => null }),
  },
];

export const mockCaseStudies: CollectionEntry<"case-studies">[] = [
  {
    id: "test-case-study-1",
    slug: "test-case-study-1",
    data: {
      title: "Test Case Study 1",
      description: "This is a test case study description",
      pubDate: new Date(),
      author: "Test Author",
      featured: false,
      tags: ["test", "case-study"],
      client: "Test Client",
      industry: "Technology",
      duration: "6 months",
      challenge: "Test challenge",
      solution: "Test solution",
      results: "Test results",
      image: {
        src: "/test-image.jpg",
        alt: "Test image",
      },
    },
    body: "",
    collection: "case-studies",
    render: async () => ({ Content: () => null }),
  },
];

export const mockGetCollection = vi
  .fn()
  .mockImplementation((collection: string) => {
    switch (collection) {
      case "articles":
        return Promise.resolve(mockArticles);
      case "case-studies":
        return Promise.resolve(mockCaseStudies);
      default:
        return Promise.resolve([]);
    }
  });
