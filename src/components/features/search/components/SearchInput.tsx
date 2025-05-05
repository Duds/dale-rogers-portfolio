/**
 * SearchInput component (TypeScript, React-style for Astro)
 * @component SearchInput
 * @description Accessible, fully-typed search input for articles, case studies, services, and scratch posts.
 * @example
 * <SearchInput />
 * @accessibility
 * - ARIA roles: search, combobox, listbox, option
 * - Keyboard navigation: Arrow keys, Escape, Enter
 * - Live region for results
 * - Focus management
 */
import React, { useState, useRef, useEffect } from 'react';
import type { SearchResult } from '../types.js';

const MIN_QUERY_LENGTH = 2;

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Fetch search results
  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Search failed');
        return res.json();
      })
      .then((data) => {
        setResults(data.results || []);
        setError(null);
        setLoading(false);
        setActiveIndex(-1);
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent =
            data.results.length === 0
              ? 'No results found.'
              : `${data.results.length} result${data.results.length === 1 ? '' : 's'} found.`;
        }
      })
      .catch((err) => {
        setError('An error occurred while searching. Please try again.');
        setLoading(false);
        setResults([]);
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = 'An error occurred while searching.';
        }
      });
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < results.length) {
        window.location.href = results[activeIndex].url;
      }
    } else if (e.key === 'Escape') {
      setExpanded(false);
      setActiveIndex(-1);
      setQuery('');
      setResults([]);
      setError(null);
    }
  };

  // Focus management for results
  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll<HTMLAnchorElement>('a[role="option"]');
      if (items && items.length > activeIndex && items[activeIndex]) {
        items[activeIndex].focus();
      }
    }
  }, [activeIndex]);

  // Expand/collapse logic
  const handleExpand = () => setExpanded(true);
  const handleCollapse = () => {
    setExpanded(false);
    setActiveIndex(-1);
    setQuery('');
    setResults([]);
    setError(null);
  };

  // Click outside to collapse
  useEffect(() => {
    if (!expanded) return;
    const handleClick = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node)
      ) {
        handleCollapse();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expanded]);

  return (
    <div className="search-bar-container" role="search" aria-label="Site search">
      <button
        type="button"
        className="search-toggle"
        aria-label="Toggle search"
        tabIndex={0}
        onClick={() => (expanded ? handleCollapse() : handleExpand())}
        aria-expanded={expanded}
      >
        <svg
          className="search-icon"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={11} cy={11} r={8} />
          <line x1={21} y1={21} x2={16.65} y2={16.65} />
        </svg>
      </button>
      <div className={`search-input-container${expanded ? ' expanded' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search articles and case studies..."
          className="search-input"
          aria-label="Search"
          aria-expanded={expanded}
          aria-controls="search-results"
          role="combobox"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setExpanded(true);
          }}
          onFocus={handleExpand}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div
        id="search-results"
        className={`search-results${expanded && (results.length > 0 || loading || error) ? '' : ' hidden'}`}
        role="listbox"
        ref={resultsRef}
        tabIndex={-1}
      >
        {loading && (
          <div className="p-4 text-sm text-gray-500 dark:text-gray-400">Searching...</div>
        )}
        {error && (
          <div className="p-4 text-sm text-red-500 dark:text-red-400">{error}</div>
        )}
        {!loading && !error && results.length === 0 && query.length >= MIN_QUERY_LENGTH && (
          <div className="p-4 text-sm text-gray-500 dark:text-gray-400">No results found.</div>
        )}
        {!loading && !error && results.length > 0 && (
          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {results.map((result, idx) => (
              <a
                key={result.url}
                href={result.url}
                className={`block p-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors duration-150${activeIndex === idx ? ' bg-purple-100 dark:bg-purple-900' : ''}`}
                role="option"
                tabIndex={-1}
                aria-selected={activeIndex === idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={handleCollapse}
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">{result.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{result.description}</div>
              </a>
            ))}
          </div>
        )}
      </div>
      {/* Live region for screen readers */}
      <div ref={liveRegionRef} aria-live="polite" className="sr-only" />
    </div>
  );
}
