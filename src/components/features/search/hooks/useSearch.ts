import { debounce } from "lodash-es";

interface SearchResult {
  title: string;
  description: string;
  category: string;
  url: string;
}

export const useSearch = (
  input: HTMLInputElement,
  resultsContainer: HTMLDivElement
) => {
  const handleSearch = debounce(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();

    if (query.length < 2) {
      resultsContainer.classList.add("hidden");
      input.setAttribute("aria-expanded", "false");
      return;
    }

    try {
      resultsContainer.innerHTML = `
        <div class="p-4 text-sm text-gray-500 dark:text-gray-400">
          Searching...
        </div>
      `;
      resultsContainer.classList.remove("hidden");
      input.setAttribute("aria-expanded", "true");

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      const results = data.results as SearchResult[];

      if (results.length === 0) {
        resultsContainer.innerHTML = `
          <div class="p-4 text-sm text-gray-500 dark:text-gray-400">
            No matching articles or case studies found.
          </div>
        `;
        return;
      }

      // Group results by category
      const groupedResults = results.reduce(
        (acc, result) => {
          const category = result.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(result);
          return acc;
        },
        {} as Record<string, SearchResult[]>
      );

      // Render results
      resultsContainer.innerHTML = `
        <div class="divide-y divide-gray-100 dark:divide-neutral-800">
          ${Object.entries(groupedResults)
            .map(
              ([category, categoryResults]) => `
                <div class="p-2">
                  <h3 class="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    ${category}
                  </h3>
                  ${categoryResults
                    .map(
                      (result) => `
                        <a
                          href="${result.url}"
                          class="block p-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors duration-150"
                          role="option"
                        >
                          <div class="font-medium text-gray-900 dark:text-gray-100">
                            ${result.title}
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            ${result.description}
                          </div>
                        </a>
                      `
                    )
                    .join("")}
                </div>
              `
            )
            .join("")}
        </div>
      `;
    } catch (error) {
      console.error("Search error:", error);
      resultsContainer.innerHTML = `
        <div class="p-4 text-sm text-red-500 dark:text-red-400">
          An error occurred while searching. Please try again.
        </div>
      `;
    }
  }, 300);

  const handleKeyDown = (event: KeyboardEvent) => {
    const results = resultsContainer.querySelectorAll("a");
    const currentIndex = Array.from(results).findIndex((result) =>
      result.matches(":focus")
    );

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (currentIndex < results.length - 1) {
          const nextResult = results[currentIndex + 1];
          if (nextResult) {
            nextResult.focus();
          }
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (currentIndex > 0) {
          const prevResult = results[currentIndex - 1];
          if (prevResult) {
            prevResult.focus();
          }
        }
        break;
      case "Escape":
        resultsContainer.classList.add("hidden");
        input.setAttribute("aria-expanded", "false");
        input.blur();
        break;
    }
  };

  return { handleSearch, handleKeyDown };
};
