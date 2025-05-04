# Search Documentation

## Related Documentation

- [Architecture](../ARCHITECTURE.md) - System architecture and design
- [Development Guide](../DEVELOPMENT.md) - Development setup and workflow
- [Components](./COMPONENTS.md) - Component library details
- [Testing](./TESTING.md) - Testing strategies and implementation
- [Content Management](./CONTENT.md) - Content collections
- [Documentation Index](./README.md) - Complete documentation list

## Overview

The search feature provides a way for users to find content across the site including articles, case studies, services, and scratch posts. The implementation focuses on simplicity and performance.

## Core Features

- **Text-based search**: Find content based on text matching in titles, descriptions, and tags
- **Natural language processing**: Basic support for question-based queries
- **Category filtering**: Filter results by content type (Articles, Case Studies, Services, Scratch)
- **Tag filtering**: Filter results by content tags
- **Reading time display**: See estimated reading time for each result
- **Sorting options**: Sort results by relevance, date, or title
- **Pagination**: Navigate through search results with simple pagination

## Implementation Details

### Search Architecture

1. **Frontend**: The search page (search.astro) provides the UI for search input, filters, and displaying results
2. **API**: A dedicated search endpoint (api/search.ts) processes search requests and returns results
3. **Utils**: Core search functionality is in searchUtils.ts

### Search Flow

1. User enters a search query and optional filters
2. The query is sent to the server via the API endpoint
3. The search utility performs text matching across content collections
4. Results are filtered, sorted, and paginated
5. The UI displays the formatted results

### Performance Optimizations

- **Basic caching**: Results are cached for 5 minutes to avoid redundant processing
- **Efficient filtering**: Category and tag filtering happens after the initial query
- **Simple data model**: Only essential data is returned in search results

## API Reference

### Search Endpoint

`GET /api/search`

#### Parameters

| Parameter | Description                                     | Default    |
| --------- | ----------------------------------------------- | ---------- |
| q         | Search query (min 2 characters)                 | (required) |
| category  | Filter by category (can be multiple)            | (all)      |
| tag       | Filter by tag (can be multiple)                 | (all)      |
| page      | Page number                                     | 1          |
| pageSize  | Results per page                                | 12         |
| sort      | Sort option (relevance, newest, oldest, az, za) | relevance  |

#### Response

```json
{
  "results": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "category": "Articles",
      "url": "/articles/article-slug",
      "date": "2023-01-01",
      "tags": ["Design", "UX"],
      "readingTime": 5,
      "complexity": "intermediate",
      "coverImage": "/path/to/image.jpg"
    }
  ],
  "totalResults": 42,
  "totalPages": 4,
  "page": 1
}
```

### Search Utils API

The `searchUtils` object provides these core functions:

- `search(query: string)`: Performs search across all content collections
- `isNaturalLanguageQuery(query: string)`: Detects if a query is a natural language question
- `processNaturalLanguageQuery(query: string)`: Extracts key terms from a question
- `calculateReadingTime(content: string)`: Estimates reading time in minutes

## Future Improvements

Potential areas for enhancement:

1. **Improved search relevance**: Enhanced scoring for more accurate results
2. **Faceted search**: More comprehensive filtering options
3. **Search analytics**: Track popular searches and success rates
4. **Advanced caching**: More sophisticated caching strategies

## File Structure

```
src/
├── components/
│   └── features/
│       └── search/
│           ├── types.ts         # Search result types
│           └── utils/
│               └── searchUtils.ts  # Core search functionality
├── pages/
│   ├── api/
│   │   └── search.ts            # Search API endpoint
│   └── search.astro             # Search page
```

## AI-Enhanced Search

To enable AI-powered search capabilities with natural language understanding, you'll need to:

1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Create a `.env` file in your project root with the following:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Enable AI search by adding `ai=true` parameter to your search URL:
   ```
   /search?q=how%20do%20I%20implement%20dark%20mode&ai=true
   ```

The AI-enhanced search will:

- Understand natural language questions
- Provide concise, tailored answers based on your site content
- Include citations to relevant content
- Suggest related follow-up questions
- Work best with question-based queries

## API Parameters

You can control AI search via the API endpoint:

```
GET /api/search?q=your+query&ai=true
```

The response will include an `aiResult` object:

```json
{
  "results": [...],
  "totalResults": 10,
  "page": 1,
  "totalPages": 1,
  "aiResult": {
    "answer": "Dark mode can be implemented by...",
    "sources": [
      {"url": "/articles/dark-mode", "title": "Implementing Dark Mode"}
    ],
    "relatedQueries": [
      "How do I toggle between light and dark mode?",
      "What are best practices for dark mode design?"
    ]
  }
}
```

## OpenAI Model

The default configuration uses GPT-4o for optimal results. You can modify the model in the `aiSearch.ts` file if needed.
