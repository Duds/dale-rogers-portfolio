import type { APIRoute } from "astro";
import { searchUtils } from "@/components/features/search/utils/searchUtils";

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q")?.toLowerCase() || "";

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
    const results = allResults.slice(0, 10);

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
        }
      );
    }

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return new Response(JSON.stringify({ error: "Search failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
