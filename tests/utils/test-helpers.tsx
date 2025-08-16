import { vi } from 'vitest';
import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test wrapper component for providers
export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Render with providers
export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: TestWrapper, ...options });
};

// Mock utilities
export const mockConsole = () => {
  const originalConsole = { ...console };

  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
};

export const mockFetch = (response: any, status = 200) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status < 400,
    status,
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
  });
};

export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
    },
    writable: true,
  });
};

export const mockSessionStorage = () => {
  const store: Record<string, string> = {};

  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
    },
    writable: true,
  });
};

export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

export const mockIntersectionObserver = () => {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};

export const mockResizeObserver = () => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};

export const mockRequestAnimationFrame = () => {
  const mockRAF = vi.fn((cb) => setTimeout(cb, 0));
  const mockCAF = vi.fn();

  global.requestAnimationFrame = mockRAF;
  global.cancelAnimationFrame = mockCAF;

  return { mockRAF, mockCAF };
};

// Test data factories
export const testData = {
  users: {
    create: (overrides = {}) => ({
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.jpg',
      ...overrides,
    }),

    createMany: (count: number, overrides = {}) =>
      Array.from({ length: count }, (_, i) =>
        testData.users.create({ id: `user-${i + 1}`, ...overrides })
      ),
  },

  posts: {
    create: (overrides = {}) => ({
      id: 'post-1',
      title: 'Test Post',
      content: 'This is a test post content.',
      authorId: 'user-1',
      publishedAt: new Date().toISOString(),
      ...overrides,
    }),

    createMany: (count: number, overrides = {}) =>
      Array.from({ length: count }, (_, i) =>
        testData.posts.create({ id: `post-${i + 1}`, ...overrides })
      ),
  },

  comments: {
    create: (overrides = {}) => ({
      id: 'comment-1',
      content: 'This is a test comment.',
      authorId: 'user-1',
      postId: 'post-1',
      createdAt: new Date().toISOString(),
      ...overrides,
    }),

    createMany: (count: number, overrides = {}) =>
      Array.from({ length: count }, (_, i) =>
        testData.comments.create({ id: `comment-${i + 1}`, ...overrides })
      ),
  },
};

// Event creators
export const createEvent = {
  click: (element: Element) => new MouseEvent('click', { bubbles: true }),
  change: (element: Element, value: string) => new Event('change', { bubbles: true }),
  input: (element: Element, value: string) => new Event('input', { bubbles: true }),
  submit: (element: Element) => new Event('submit', { bubbles: true }),
  keydown: (key: string, options = {}) => new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    ...options,
  }),
  keyup: (key: string, options = {}) => new KeyboardEvent('keyup', {
    key,
    bubbles: true,
    ...options,
  }),
};

// Wait utilities
export const waitFor = (condition: () => boolean, timeout = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(check, 10);
      }
    };

    check();
  });
};

// Accessibility helpers
export const accessibilityHelpers = {
  hasRole: (element: Element, role: string) => element.getAttribute('role') === role,

  hasLabel: (element: Element, label: string) => {
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    const title = element.getAttribute('title');

    return ariaLabel === label || title === label || ariaLabelledBy === label;
  },

  hasRequiredAttributes: (element: Element, attributes: string[]) => {
    return attributes.every(attr => element.hasAttribute(attr));
  },

  isKeyboardAccessible: (element: Element) => {
    return element.tabIndex >= 0 ||
           element.tagName === 'BUTTON' ||
           element.tagName === 'A';
  },

  hasFocusManagement: (element: Element) => {
    return element.hasAttribute('tabindex') ||
           element.tagName === 'BUTTON' ||
           element.tagName === 'A' ||
           element.tagName === 'INPUT';
  },
};

// Performance helpers
export const performanceHelpers = {
  measureTime: async (fn: () => Promise<any> | any) => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();

    return { result, time: end - start };
  },

  isPerformanceAcceptable: (time: number, threshold = 100) => {
    return time <= threshold;
  },
};

// Cleanup helpers
export const cleanupHelpers = {
  clearMocks: () => {
    vi.clearAllMocks();
  },

  resetMocks: () => {
    vi.resetAllMocks();
  },

  restoreMocks: () => {
    vi.restoreAllMocks();
  },

  clearDOM: () => {
    document.body.innerHTML = '';
  },
};

// Global test utilities
declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  }
}

export {};
