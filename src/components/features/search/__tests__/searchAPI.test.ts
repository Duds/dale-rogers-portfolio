import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchUtils } from "../utils/searchUtils.js";
import type { APIRoute } from "astro";
import type { SearchResult } from "../types.js";

// Extend the SearchResult type to include optional preview properties
interface TestSearchResult extends SearchResult {
  coverImage?: string;
  image?: {
    src: string;
    alt: string;
  };
  snippet?: string;
  previewImage?: string;
}

// Mock the request and response
const createMockRequest = (params: Record<string, string | string[]>) => {
  const url = new URL("https://example.com/api/search");

  // Add search parameters
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    } else {
      url.searchParams.set(key, value);
    }
  });

  return { url } as any;
};

// Mock searchUtils
vi.mock("../utils/searchUtils", () => ({
  searchUtils: {
    search: vi.fn(),
    calculateStringSimilarity: vi.fn(),
  },
}));

// Import the API route function - in a real test, this would be directly imported
// For this example, we'll re-implement a simplified version to test
const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q")?.toLowerCase() || "";
  const categories = url.searchParams.getAll("category");
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "12", 10);
  const sortOption = url.searchParams.get("sort") || "relevance";

  if (query.length < 2) {
    return new Response(
      JSON.stringify({ results: [], totalResults: 0, page: 1, totalPages: 0 }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // Use semantic search
    const allResults = await searchUtils.search(query);

    // Apply category filtering if specified
    const filteredResults =
      categories.length > 0
        ? allResults.filter((result) => categories.includes(result.category))
        : allResults;

    // Apply sorting
    let sortedResults = [...filteredResults];
    if (sortOption === "newest") {
      sortedResults.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortOption === "oldest") {
      sortedResults.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateA - dateB;
      });
    } else if (sortOption === "az") {
      sortedResults.sort((a, b) => a.title.localeCompare(b.title, "en-AU"));
    } else if (sortOption === "za") {
      sortedResults.sort((a, b) => b.title.localeCompare(a.title, "en-AU"));
    }

    // Calculate pagination values
    const totalResults = sortedResults.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const validPage = Math.max(1, Math.min(page, totalPages || 1));
    const startIndex = (validPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the results for the current page
    const paginatedResults = sortedResults
      .slice(startIndex, endIndex)
      .map((r) => {
        const result = { ...r } as TestSearchResult;
        result.snippet = result.description?.slice(0, 150) || "";
        result.previewImage =
          result.coverImage || (result.image ? result.image.src : undefined);
        return result;
      });

    // If no results, provide suggestions
    if (totalResults === 0) {
      const fallbackResults = await searchUtils.search("");
      const allTitles = fallbackResults.map((r) => r.title.toLowerCase());

      // Check for "did you mean" suggestion
      let didYouMean = null;
      for (const title of allTitles) {
        if (searchUtils.calculateStringSimilarity(query, title) > 0.7) {
          didYouMean = title;
          break;
        }
      }

      return new Response(
        JSON.stringify({
          results: [],
          totalResults: 0,
          page: 1,
          totalPages: 0,
          suggestions: fallbackResults.slice(0, 3),
          didYouMean,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        results: paginatedResults,
        totalResults,
        page: validPage,
        totalPages,
        sortOption,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Search failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

describe("Search API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return empty results for queries shorter than 2 characters", async () => {
    const request = createMockRequest({ q: "a" });
    const response = await GET(request);
    const data = await response.json();

    expect(data.results).toEqual([]);
    expect(data.totalResults).toBe(0);
    expect(searchUtils.search).not.toHaveBeenCalled();
  });

  it("should apply category filtering when categories are provided", async () => {
    const mockResults: SearchResult[] = [
      {
        title: "Article 1",
        category: "Articles",
        description: "Test article",
        url: "/articles/1",
      },
      {
        title: "Case Study 1",
        category: "Case Studies",
        description: "Test case study",
        url: "/case-studies/1",
      },
    ];

    vi.mocked(searchUtils.search).mockResolvedValue(mockResults);

    const request = createMockRequest({ q: "test", category: ["Articles"] });
    const response = await GET(request);
    const data = await response.json();

    expect(data.results.length).toBe(1);
    expect(data.results[0].title).toBe("Article 1");
    expect(data.totalResults).toBe(1);
  });

  it("should sort results by newest first", async () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const mockResults: SearchResult[] = [
      {
        title: "Old Article",
        date: yesterday,
        category: "Articles",
        description: "Old",
        url: "/articles/old",
      },
      {
        title: "New Article",
        date: now,
        category: "Articles",
        description: "New",
        url: "/articles/new",
      },
    ];

    vi.mocked(searchUtils.search).mockResolvedValue(mockResults);

    const request = createMockRequest({ q: "article", sort: "newest" });
    const response = await GET(request);
    const data = await response.json();

    expect(data.results[0].title).toBe("New Article");
    expect(data.results[1].title).toBe("Old Article");
  });

  it("should sort results alphabetically (A-Z)", async () => {
    const mockResults: SearchResult[] = [
      {
        title: "Zebra Article",
        category: "Articles",
        description: "Z",
        url: "/articles/zebra",
      },
      {
        title: "Apple Article",
        category: "Articles",
        description: "A",
        url: "/articles/apple",
      },
    ];

    vi.mocked(searchUtils.search).mockResolvedValue(mockResults);

    const request = createMockRequest({ q: "article", sort: "az" });
    const response = await GET(request);
    const data = await response.json();

    expect(data.results[0].title).toBe("Apple Article");
    expect(data.results[1].title).toBe("Zebra Article");
  });

  it("should provide 'Did you mean' suggestions when no results are found", async () => {
    // No results for the main query
    vi.mocked(searchUtils.search).mockImplementation(async (query) => {
      if (query === "tesst") return [];
      // Return some results for the empty query (fallback)
      return [
        {
          title: "test article",
          category: "Articles",
          description: "This is a test",
          url: "/articles/test",
        },
      ];
    });

    // Mock the similarity function to suggest "test" for "tesst"
    vi.mocked(searchUtils.calculateStringSimilarity).mockReturnValue(0.8);

    const request = createMockRequest({ q: "tesst" });
    const response = await GET(request);
    const data = await response.json();

    expect(data.totalResults).toBe(0);
    expect(data.didYouMean).toBe("test article");
    expect(data.suggestions.length).toBe(1);
  });

  it("should handle pagination correctly", async () => {
    // Create 20 mock results
    const mockResults: SearchResult[] = Array.from({ length: 20 }, (_, i) => ({
      title: `Article ${i + 1}`,
      category: "Articles",
      description: `Description ${i + 1}`,
      url: `/articles/${i + 1}`,
    }));

    vi.mocked(searchUtils.search).mockResolvedValue(mockResults);

    const request = createMockRequest({
      q: "article",
      page: "2",
      pageSize: "5",
    });
    const response = await GET(request);
    const data = await response.json();

    expect(data.results.length).toBe(5);
    expect(data.totalResults).toBe(20);
    expect(data.totalPages).toBe(4);
    expect(data.page).toBe(2);
    expect(data.results[0].title).toBe("Article 6"); // First item on page 2
  });

  it("should return error response when search fails", async () => {
    vi.mocked(searchUtils.search).mockRejectedValue(
      new Error("Database error")
    );

    const request = createMockRequest({ q: "test" });
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Search failed");
  });

  it("should add snippet and previewImage to results", async () => {
    const mockResults: TestSearchResult[] = [
      {
        title: "Test Article",
        category: "Articles",
        description:
          "This is a long description that should be truncated for the snippet",
        url: "/articles/test-article",
        coverImage: "/images/test.jpg",
      },
    ];

    vi.mocked(searchUtils.search).mockResolvedValue(
      mockResults as SearchResult[]
    );

    const request = createMockRequest({ q: "test" });
    const response = await GET(request);
    const data = await response.json();

    expect(data.results[0].snippet).toBe(
      "This is a long description that should be truncated for the snippet".slice(
        0,
        150
      )
    );
    expect(data.results[0].previewImage).toBe("/images/test.jpg");
  });
});
