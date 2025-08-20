import { vi } from "vitest";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
});

// Properly type the global objects
global.document = dom.window.document;
(global as { window: typeof dom.window }).window = dom.window;
global.navigator = dom.window.navigator as Navigator;

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
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.className = props.class || "";
      svg.style.width = `${props.size || 24}px`;
      svg.style.height = `${props.size || 24}px`;
      svg.setAttribute("aria-hidden", "true");
      
      // Add a simple path to represent the icon
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5");
      svg.appendChild(path);
      
      return svg;
    },
  },
}));
