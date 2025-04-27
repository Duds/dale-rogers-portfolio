import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSearch } from "../hooks/useSearch.js";

// Mock the searchUtils module
vi.mock("../utils/searchUtils", () => ({
  searchUtils: {
    search: vi.fn().mockImplementation(async (query: string) => {
      // Add a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (query === "error") {
        throw new Error("Search failed");
      }
      return [
        {
          title: "Test Article 1",
          description: "This is a test article description",
          category: "Articles",
          url: "/articles/test-article-1",
        },
        {
          title: "Test Case Study 1",
          description: "This is a test case study description",
          category: "Case Studies",
          url: "/case-studies/test-case-study-1",
        },
      ];
    }),
  },
}));

describe("Search Functionality", () => {
  let mockInput: HTMLInputElement;
  let mockResultsContainer: HTMLDivElement;

  beforeEach(() => {
    // Create mock DOM elements
    mockInput = document.createElement("input");
    mockResultsContainer = document.createElement("div");
    document.body.appendChild(mockInput);
    document.body.appendChild(mockResultsContainer);

    // Reset mocks
    vi.clearAllMocks();
  });

  it("should not search with query less than 2 characters", async () => {
    const { handleSearch } = useSearch(mockInput, mockResultsContainer);
    mockInput.value = "a";
    const event = new Event("input");
    Object.defineProperty(event, "target", { value: mockInput });
    await handleSearch(event);
    expect(mockResultsContainer.classList.contains("hidden")).toBe(true);
  });

  it("should show loading state while searching", async () => {
    const { handleSearch } = useSearch(mockInput, mockResultsContainer);
    mockInput.value = "test";
    const event = new Event("input");
    Object.defineProperty(event, "target", { value: mockInput });

    // Start the search but don't await it yet
    const searchPromise = handleSearch(event);

    // Check loading state immediately
    expect(mockResultsContainer.innerHTML).toContain("Searching...");

    // Now wait for the search to complete
    await searchPromise;
  });

  it("should display results when found", async () => {
    const { handleSearch } = useSearch(mockInput, mockResultsContainer);
    mockInput.value = "test";
    const event = new Event("input");
    Object.defineProperty(event, "target", { value: mockInput });
    await handleSearch(event);

    expect(mockResultsContainer.innerHTML).toContain("Test Article 1");
    expect(mockResultsContainer.innerHTML).toContain(
      "This is a test article description"
    );
    expect(mockResultsContainer.innerHTML).toContain("Test Case Study 1");
  });

  it("should display error message when search fails", async () => {
    const { handleSearch } = useSearch(mockInput, mockResultsContainer);
    mockInput.value = "error";
    const event = new Event("input");
    Object.defineProperty(event, "target", { value: mockInput });
    await handleSearch(event);

    expect(mockResultsContainer.innerHTML).toContain(
      "An error occurred while searching"
    );
  });

  it("should handle keyboard navigation", () => {
    const { handleKeyDown } = useSearch(mockInput, mockResultsContainer);
    const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });

    // Test Escape key
    handleKeyDown(escapeEvent);
    expect(mockResultsContainer.classList.contains("hidden")).toBe(true);

    // Test Enter key
    const mockFirstResult = document.createElement("a");
    mockResultsContainer.appendChild(mockFirstResult);
    const clickSpy = vi.spyOn(mockFirstResult, "click");
    handleKeyDown(enterEvent);
    expect(clickSpy).toHaveBeenCalled();
  });
});
