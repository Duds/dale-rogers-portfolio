import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { types } from "../types.js";
import { SearchInput } from "../SearchInput.astro";
import { SearchResults } from "../SearchResults.astro";
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

  describe("SearchInput", () => {
    it("renders search input field", () => {
      render(<SearchInput />);
      const searchInput = screen.getByPlaceholderText(/search/i);
      expect(searchInput).toBeInTheDocument();
    });

    it("handles input changes", () => {
      render(<SearchInput />);
      const searchInput = screen.getByPlaceholderText(/search/i);

      fireEvent.change(searchInput, { target: { value: "test query" } });
      expect(searchInput).toHaveValue("test query");
    });

    it("triggers search on submit", async () => {
      (searchUtils.search as jest.Mock).mockResolvedValue([
        {
          title: "Test Article",
          description: "Test description",
          category: "Articles",
          url: "/articles/test",
        },
      ]);

      render(<SearchInput />);
      const searchInput = screen.getByPlaceholderText(/search/i);
      const form = searchInput.closest("form");

      fireEvent.change(searchInput, { target: { value: "test" } });
      fireEvent.submit(form!);

      await waitFor(() => {
        expect(searchUtils.search).toHaveBeenCalledWith("test");
      });
    });
  });

  describe("SearchResults", () => {
    const mockResults: types.SearchResult[] = [
      {
        title: "Test Article",
        description: "Test description",
        category: "Articles",
        url: "/articles/test",
      },
      {
        title: "Test Case Study",
        description: "Test case study description",
        category: "Case Studies",
        url: "/case-studies/test",
      },
    ];

    it("renders search results", () => {
      render(<SearchResults results={mockResults} />);

      expect(screen.getByText("Test Article")).toBeInTheDocument();
      expect(screen.getByText("Test Case Study")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Case Studies")).toBeInTheDocument();
    });

    it("renders no results message when empty", () => {
      render(<SearchResults results={[]} />);

      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });

    it("renders correct number of results", () => {
      render(<SearchResults results={mockResults} />);

      const resultItems = screen.getAllByRole("link");
      expect(resultItems).toHaveLength(2);
    });
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
});
