import { getCollection } from "astro:content";

interface SearchResult {
  title: string;
  description: string;
  category: string;
  url: string;
}

// This is a placeholder for the actual search implementation
// You'll need to replace this with your actual search logic
export const searchUtils = {
  async search(query: string): Promise<SearchResult[]> {
    const searchQuery = query.toLowerCase();

    // Get all articles and case studies
    const [articles, caseStudies] = await Promise.all([
      getCollection("articles"),
      getCollection("case-studies"),
    ]);

    // Filter and map articles
    const articleResults = articles
      .filter((article) => {
        const searchableText = `
          ${article.data.title.toLowerCase()}
          ${article.data.description.toLowerCase()}
          ${article.data.tags.join(" ").toLowerCase()}
        `;
        return searchableText.includes(searchQuery);
      })
      .map((article) => ({
        title: article.data.title,
        description: article.data.description,
        category: "Articles",
        url: `/articles/${article.slug}`,
      }));

    // Filter and map case studies
    const caseStudyResults = caseStudies
      .filter((caseStudy) => {
        const searchableText = `
          ${caseStudy.data.title.toLowerCase()}
          ${caseStudy.data.description.toLowerCase()}
          ${caseStudy.data.tags.join(" ").toLowerCase()}
          ${caseStudy.data.client.toLowerCase()}
          ${caseStudy.data.industry.toLowerCase()}
          ${caseStudy.data.challenge.toLowerCase()}
          ${caseStudy.data.solution.toLowerCase()}
        `;
        return searchableText.includes(searchQuery);
      })
      .map((caseStudy) => ({
        title: caseStudy.data.title,
        description: caseStudy.data.description,
        category: "Case Studies",
        url: `/case-studies/${caseStudy.slug}`,
      }));

    // Combine and sort results
    const results = [...articleResults, ...caseStudyResults].sort((a, b) => {
      // Sort by exact title match first
      const aTitleMatch = a.title.toLowerCase() === searchQuery;
      const bTitleMatch = b.title.toLowerCase() === searchQuery;
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;

      // Then sort by title start match
      const aTitleStarts = a.title.toLowerCase().startsWith(searchQuery);
      const bTitleStarts = b.title.toLowerCase().startsWith(searchQuery);
      if (aTitleStarts && !bTitleStarts) return -1;
      if (!aTitleStarts && bTitleStarts) return 1;

      // Finally sort by description match
      const aDescMatch = a.description.toLowerCase().includes(searchQuery);
      const bDescMatch = b.description.toLowerCase().includes(searchQuery);
      if (aDescMatch && !bDescMatch) return -1;
      if (!aDescMatch && bDescMatch) return 1;

      return 0;
    });

    return results;
  },
};
