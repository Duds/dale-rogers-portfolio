import type { APIRoute } from "astro";
import { searchUtils } from "@/components/features/search/utils/searchUtils.js";
import type { SearchResult } from "@/components/features/search/types.js";

/**
 * Search API endpoint for portfolio content
 * Performs semantic search across articles, case studies, services and scratch posts
 * @route GET /api/search
 */
export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q")?.toLowerCase() || "";

  // Require at least 2 characters for search
  if (query.length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Use semantic search and limit to 10 smart results
    const allResults = await searchUtils.search(query);
    const results: SearchResult[] = allResults.slice(0, 10);

    // If no results, provide apology and smart suggestions
    if (results.length === 0) {
      // Suggest up to 3 semantically interesting items (not just random)
      const fallbackResults = (await searchUtils.search("")).slice(0, 3);
      return new Response(
        JSON.stringify({
          results: [],
          apology:
            "Sorry, we couldn't find any articles or case studies matching your search.",
          suggestions: fallbackResults,
          suggestionMessage: "You might like these instead:",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Search error:",
      error instanceof Error ? error.message : String(error),
    );

    return new Response(
      JSON.stringify({
        error: "Search failed",
        message:
          "Sorry, there was an issue processing your search. Please try again.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
