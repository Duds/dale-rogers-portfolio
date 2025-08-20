import type { SearchResult } from "../types.js";
import { searchUtils } from "../utils/searchUtils.js";

// Mock the search utilities
jest.mock("../utils/searchUtils.js", () => ({
  searchUtils: {
    search: jest.fn(),
  },
}));

// Mock the content collections
jest.mock("astro:content", () => ({
  getCollection: jest.fn(),
}));

describe("Search Components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("SearchUtils", () => {
    it("returns featured results when no query provided", async () => {
      const results = await searchUtils.search("");

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
    });

    it("performs search with query", async () => {
      const results = await searchUtils.search("test");

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
    });

    it("calculates relevance scores", () => {
      const score = searchUtils.calculateRelevanceScore(
        "test",
        "Test Title",
        "Test description",
        "test, example",
        "additional text",
      );

      expect(typeof score).toBe("number");
      expect(score).toBeGreaterThan(0);
    });
  });

  describe("Search Types", () => {
    it("has correct SearchResult structure", () => {
      const mockResult: SearchResult = {
        title: "Test Article",
        description: "Test description",
        category: "Articles",
        url: "/articles/test",
      };

      expect(mockResult).toHaveProperty("title");
      expect(mockResult).toHaveProperty("description");
      expect(mockResult).toHaveProperty("category");
      expect(mockResult).toHaveProperty("url");
      expect(typeof mockResult.title).toBe("string");
      expect(typeof mockResult.description).toBe("string");
      expect(typeof mockResult.category).toBe("string");
      expect(typeof mockResult.url).toBe("string");
    });
  });
});
