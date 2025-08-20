import { getCollection } from "astro:content";
import type { SearchResult, SearchableContent } from "../types.js";

// This utility provides search functionality for the site
export const searchUtils = {
  async search(query: string): Promise<SearchResult[]> {
    const searchQuery = query.toLowerCase().trim();

    // Get all articles, case studies, services, and scratch posts
    const [articles, caseStudies, services, scratchPosts] = await Promise.all([
      getCollection("articles"),
      getCollection("case-studies"),
      getCollection("services"),
      getCollection("scratch"),
    ]);

    // If no query, return a selection of popular/featured content
    if (!searchQuery) {
      const featuredResults: SearchResult[] = [
        ...articles.slice(0, 2).map((article: SearchableContent) => ({
          title: article.data.title,
          description: article.data.description,
          category: "Articles",
          url: `/articles/${article.slug}`,
        })),
        ...caseStudies.slice(0, 2).map((caseStudy: SearchableContent) => ({
          title: caseStudy.data.title,
          description: caseStudy.data.description,
          category: "Case Studies",
          url: `/case-studies/${caseStudy.slug}`,
        })),
        ...services.slice(0, 2).map((service: SearchableContent) => ({
          title: service.data.title,
          description: service.data.description,
          category: "Services",
          url: `/services/${service.slug}`,
        })),
        ...scratchPosts.slice(0, 2).map((scratch: SearchableContent) => ({
          title: scratch.data.title,
          description: scratch.data.description,
          category: "Scratch",
          url: `/scratch/${scratch.slug}`,
        })),
      ];
      return featuredResults;
    }

    // Calculate search scores for all content
    const scoredArticles = articles.map((article: SearchableContent) => {
      const score = this.calculateRelevanceScore(
        searchQuery,
        article.data.title,
        article.data.description,
        article.data.tags?.join(" ") || "",
      );

      return {
        item: article,
        score,
        result: {
          title: article.data.title,
          description: article.data.description,
          category: "Articles",
          url: `/articles/${article.slug}`,
        },
      };
    });

    const scoredCaseStudies = caseStudies.map(
      (caseStudy: SearchableContent) => {
        const score = this.calculateRelevanceScore(
          searchQuery,
          caseStudy.data.title,
          caseStudy.data.description,
          caseStudy.data.tags?.join(" ") || "",
          caseStudy.data.client || "",
        );

        return {
          item: caseStudy,
          score,
          result: {
            title: caseStudy.data.title,
            description: caseStudy.data.description,
            category: "Case Studies",
            url: `/case-studies/${caseStudy.slug}`,
          },
        };
      },
    );

    const scoredServices = services.map((service: SearchableContent) => {
      const score = this.calculateRelevanceScore(
        searchQuery,
        service.data.title,
        service.data.description,
        service.data.tags?.join(" ") || "",
      );
      return {
        item: service,
        score,
        result: {
          title: service.data.title,
          description: service.data.description,
          category: "Services",
          url: `/services/${service.slug}`,
        },
      };
    });

    const scoredScratchPosts = scratchPosts.map(
      (scratch: SearchableContent) => {
        const score = this.calculateRelevanceScore(
          searchQuery,
          scratch.data.title,
          scratch.data.description,
          scratch.data.tags?.join(" ") || "",
        );
        return {
          item: scratch,
          score,
          result: {
            title: scratch.data.title,
            description: scratch.data.description,
            category: "Scratch",
            url: `/scratch/${scratch.slug}`,
          },
        };
      },
    );

    // Combine and sort all scored results
    const allScoredResults = [
      ...scoredArticles,
      ...scoredCaseStudies,
      ...scoredServices,
      ...scoredScratchPosts,
    ];

    // Sort by relevance score (highest first) and return top results
    const sortedResults = allScoredResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((scored) => scored.result);

    return sortedResults;
  },

  calculateRelevanceScore(
    query: string,
    title: string,
    description: string,
    tags: string,
    additionalText: string = "",
  ): number {
    let score = 0;
    const searchText =
      `${title} ${description} ${tags} ${additionalText}`.toLowerCase();
    const queryWords = query.toLowerCase().split(" ");

    // Exact matches get highest scores
    if (searchText.includes(query.toLowerCase())) {
      score += 100;
    }

    // Title matches get high scores
    if (title.toLowerCase().includes(query.toLowerCase())) {
      score += 50;
    }

    // Word-by-word scoring
    queryWords.forEach((word) => {
      if (word.length < 2) return; // Skip very short words

      if (title.toLowerCase().includes(word)) {
        score += 30;
      }
      if (description.toLowerCase().includes(word)) {
        score += 20;
      }
      if (tags.toLowerCase().includes(word)) {
        score += 25;
      }
      if (additionalText.toLowerCase().includes(word)) {
        score += 15;
      }
    });

    return score;
  },
};
