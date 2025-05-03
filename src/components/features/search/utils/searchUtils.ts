import { getCollection } from "astro:content";
import type { SearchResult } from "../types.js";

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
        ...articles.slice(0, 2).map((article) => ({
          title: article.data.title,
          description: article.data.description,
          category: "Articles",
          url: `/articles/${article.slug}`,
        })),
        ...caseStudies.slice(0, 2).map((caseStudy) => ({
          title: caseStudy.data.title,
          description: caseStudy.data.description,
          category: "Case Studies",
          url: `/case-studies/${caseStudy.slug}`,
        })),
        ...services.slice(0, 2).map((service) => ({
          title: service.data.title,
          description: service.data.description,
          category: "Services",
          url: `/services/${service.slug}`,
        })),
        ...scratchPosts.slice(0, 2).map((scratch) => ({
          title: scratch.data.title,
          description: scratch.data.description,
          category: "Scratch",
          url: `/scratch/${scratch.slug}`,
        })),
      ];
      return featuredResults;
    }

    // Calculate search scores for all content
    const scoredArticles = articles.map((article) => {
      const score = this.calculateRelevanceScore(
        searchQuery,
        article.data.title,
        article.data.description,
        article.data.tags?.join(" ") || ""
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

    const scoredCaseStudies = caseStudies.map((caseStudy) => {
      const score = this.calculateRelevanceScore(
        searchQuery,
        caseStudy.data.title,
        caseStudy.data.description,
        caseStudy.data.tags?.join(" ") || "",
        caseStudy.data.client || ""
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
    });

    const scoredServices = services.map((service) => {
      const score = this.calculateRelevanceScore(
        searchQuery,
        service.data.title,
        service.data.description,
        service.data.tags?.join(" ") || ""
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

    const scoredScratch = scratchPosts.map((scratch) => {
      const score = this.calculateRelevanceScore(
        searchQuery,
        scratch.data.title,
        scratch.data.description,
        scratch.data.tags?.join(" ") || ""
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
    });

    // Combine all content and sort by score
    const allScoredContent = [
      ...scoredArticles,
      ...scoredCaseStudies,
      ...scoredServices,
      ...scoredScratch,
    ]
      .filter((item) => item.score > 0) // Only include relevant results
      .sort((a, b) => b.score - a.score);

    // Extract just the result objects
    const results = allScoredContent.map((item) => item.result);

    return results;
  },

  // Calculate semantic relevance with tolerance for spelling errors
  calculateRelevanceScore(
    query: string,
    title: string,
    description: string,
    tags: string,
    client: string = ""
  ): number {
    let score = 0;
    const normQuery = query.toLowerCase();
    const normTitle = title.toLowerCase();
    const normDesc = description.toLowerCase();
    const normTags = tags.toLowerCase();
    const normClient = client.toLowerCase();

    // Break query into words for more semantic matching
    const queryWords = normQuery.split(/\s+/).filter((word) => word.length > 2);

    // Exact matches score highest
    if (normTitle === normQuery) score += 100;
    if (normTitle.includes(normQuery)) score += 50;
    if (normDesc.includes(normQuery)) score += 30;
    if (normTags.includes(normQuery)) score += 25;
    if (normClient.includes(normQuery)) score += 25;

    // Check for partial word matches with tolerance for typos
    for (const queryWord of queryWords) {
      // Title is most important
      const titleWords = normTitle.split(/\s+/);
      for (const titleWord of titleWords) {
        const similarity = this.calculateStringSimilarity(queryWord, titleWord);
        if (similarity > 0.8)
          score += 20; // Very similar words
        else if (similarity > 0.6) score += 10; // Somewhat similar (possible spelling error)
      }

      // Description searches
      if (this.fuzzyIncludes(normDesc, queryWord, 0.7)) score += 15;

      // Tags and client
      if (this.fuzzyIncludes(normTags, queryWord, 0.8)) score += 12;
      if (this.fuzzyIncludes(normClient, queryWord, 0.8)) score += 12;
    }

    return score;
  },

  // String similarity for fuzzy matching (simpler implementation for TypeScript)
  calculateStringSimilarity(str1: string, str2: string): number {
    // If the strings are equal, return 1
    if (str1 === str2) return 1;

    // If either string is empty, similarity is 0
    if (str1.length === 0 || str2.length === 0) return 0;

    // Count matches
    let matches = 0;

    // Use a sliding window approach to find matching characters
    const len1 = str1.length;
    const len2 = str2.length;
    const maxOffset = Math.floor(Math.max(len1, len2) / 2) - 1;

    const s1Matches: boolean[] = Array(len1).fill(false);
    const s2Matches: boolean[] = Array(len2).fill(false);

    // Find direct character matches
    for (let i = 0; i < len1; i++) {
      const start = Math.max(0, i - maxOffset);
      const end = Math.min(i + maxOffset + 1, len2);

      for (let j = start; j < end; j++) {
        // If this character isn't already matched and equals the other string's character
        if (!s2Matches[j] && str1[i] === str2[j]) {
          s1Matches[i] = true;
          s2Matches[j] = true;
          matches++;
          break;
        }
      }
    }

    // If no matches, return 0
    if (matches === 0) return 0;

    // Count transpositions
    let transpositions = 0;
    let j = 0;

    for (let i = 0; i < len1; i++) {
      if (s1Matches[i]) {
        // Find the next match in s2
        while (!s2Matches[j]) j++;

        // If the characters don't match, it's a transposition
        if (str1[i] !== str2[j]) transpositions++;

        j++;
      }
    }

    // Calculate Jaro similarity
    const m = matches;
    transpositions = Math.floor(transpositions / 2);

    if (m === 0) return 0;

    return (1 / 3) * (m / len1 + m / len2 + (m - transpositions) / m);
  },

  // Check if a string includes a word with fuzzy matching
  fuzzyIncludes(text: string, word: string, threshold: number): boolean {
    const words = text.split(/\s+/);
    for (const w of words) {
      if (this.calculateStringSimilarity(w, word) >= threshold) {
        return true;
      }
    }

    // Also check for the word appearing within longer words
    for (const w of words) {
      if (w.length > word.length) {
        for (let i = 0; i <= w.length - word.length; i++) {
          const segment = w.substring(i, i + word.length);
          if (this.calculateStringSimilarity(segment, word) >= threshold) {
            return true;
          }
        }
      }
    }

    return false;
  },
};
