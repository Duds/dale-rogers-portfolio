import "@testing-library/jest-dom";
import { vi, afterEach, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

// Mock matchMedia for responsive design testing
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock console methods to reduce noise in tests
beforeAll(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

// Mock fetch for API testing
global.fetch = vi.fn();

// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

// Mock window.getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  writable: true,
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(),
  })),
});

// Mock CSS.supports
Object.defineProperty(window, "CSS", {
  writable: true,
  value: {
    supports: vi.fn(),
  },
});

// Mock performance API
Object.defineProperty(window, "performance", {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
  },
});

// Mock URL.createObjectURL
Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: vi.fn(() => "mocked-url"),
});

// Mock URL.revokeObjectURL
Object.defineProperty(URL, "revokeObjectURL", {
  writable: true,
  value: vi.fn(),
});

// Mock navigator
Object.defineProperty(navigator, "userAgent", {
  writable: true,
  value: "Mozilla/5.0 (Test Browser)",
});

Object.defineProperty(navigator, "language", {
  writable: true,
  value: "en-AU",
});

// Mock document.createRange
Object.defineProperty(document, "createRange", {
  writable: true,
  value: vi.fn(() => ({
    setStart: vi.fn(),
    setEnd: vi.fn(),
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  })),
});

// Mock document.getSelection
Object.defineProperty(document, "getSelection", {
  writable: true,
  value: vi.fn(() => ({
    removeAllRanges: vi.fn(),
    addRange: vi.fn(),
  })),
});

// Setup test environment with proper cleanup
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();

  // Reset localStorage and sessionStorage
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();

  sessionStorageMock.getItem.mockClear();
  sessionStorageMock.setItem.mockClear();
  sessionStorageMock.removeItem.mockClear();
  sessionStorageMock.clear.mockClear();

  // Reset fetch mock
  if (global.fetch) {
    (global.fetch as MockedFunction<typeof fetch>).mockClear();
  }
});

afterEach(() => {
  // Clean up DOM after each test
  document.body.innerHTML = "";
  document.head.innerHTML = "";

  // Clear all mocks
  vi.clearAllMocks();

  // Reset IntersectionObserver and ResizeObserver
  if (global.IntersectionObserver) {
    (global.IntersectionObserver as MockedFunction<typeof IntersectionObserver>).mockClear();
  }
  if (global.ResizeObserver) {
    (global.ResizeObserver as MockedFunction<typeof ResizeObserver>).mockClear();
  }

  // Reset requestAnimationFrame
  if (
    global.requestAnimationFrame &&
    typeof (global.requestAnimationFrame as MockedFunction<typeof requestAnimationFrame>).mockClear === "function"
  ) {
    (global.requestAnimationFrame as MockedFunction<typeof requestAnimationFrame>).mockClear();
  }
  if (
    global.cancelAnimationFrame &&
    typeof (global.cancelAnimationFrame as MockedFunction<typeof cancelAnimationFrame>).mockClear === "function"
  ) {
    (global.cancelAnimationFrame as MockedFunction<typeof cancelAnimationFrame>).mockClear();
  }
});

// Global test utilities
declare global {
  interface Vi {
    interface JestAssertion<T = unknown> extends jest.Matchers<void, T> {}
  }
}

export {};
