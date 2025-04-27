import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

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
    // Fetch all content
    const articles = await getCollection("articles");
    const caseStudies = await getCollection("case-studies");

    // Search through content
    const results = [
      ...articles
        .filter((article) => {
          const searchableText =
            `${article.data.title} ${article.data.description}`.toLowerCase();
          return searchableText.includes(query);
        })
        .map((article) => ({
          title: article.data.title,
          description: article.data.description,
          category: "Articles",
          url: `/articles/${article.slug}`,
        })),
      ...caseStudies
        .filter((caseStudy) => {
          const searchableText =
            `${caseStudy.data.title} ${caseStudy.data.description}`.toLowerCase();
          return searchableText.includes(query);
        })
        .map((caseStudy) => ({
          title: caseStudy.data.title,
          description: caseStudy.data.description,
          category: "Case Studies",
          url: `/case-studies/${caseStudy.slug}`,
        })),
    ];

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
