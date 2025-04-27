import { vi } from "vitest";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
});

// Properly type the global objects
global.document = dom.window.document;
(global as any).window = dom.window;
global.navigator = dom.window.navigator as any;

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Astro components
vi.mock("../../ui/Icon.astro", () => ({
  default: {
    render: (props: { name: string; class?: string; size?: number }) => {
      const img = document.createElement("img");
      img.src = `/icons/${props.name}.svg`;
      img.className = props.class || "";
      img.width = props.size || 24;
      img.height = props.size || 24;
      img.setAttribute("aria-hidden", "true");
      img.alt = "";
      return img;
    },
  },
}));
