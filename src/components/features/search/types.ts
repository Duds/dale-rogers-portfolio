import type { CollectionEntry } from "astro:content";

export interface SearchResult {
  title: string;
  description: string;
  category: string;
  url: string;
}

export type SearchableContent =
  | CollectionEntry<"articles">
  | CollectionEntry<"case-studies">;

export interface SearchOptions {
  minQueryLength?: number;
  maxResults?: number;
  searchFields?: string[];
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

export interface SearchContext {
  state: SearchState;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
  setError: (error: string | null) => void;
}
