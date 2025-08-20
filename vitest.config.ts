import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup/vitest.setup.ts"],
    include: [
      "tests/**/*.{test,spec}.{js,ts,tsx}",
      "src/**/*.{test,spec}.{js,ts,tsx}",
    ],
    exclude: [
      "tests/e2e/**/*",
      "tests/**/*.spec.ts", // Exclude Playwright tests
      "**/*.spec.ts", // Exclude all Playwright tests
      "tests/ui/*.test.tsx", // Exclude React tests for Astro components
      "src/pages/scratch/**/__tests__/**", // Exclude problematic scratch tests
      "src/components/features/search/__tests__/**", // Exclude search tests with astro:content
      "node_modules/**",
      "dist/**",
      ".next/**",
      "coverage/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "tests/**/*",
        "**/*.spec.ts",
        "**/*.spec.js",
        "node_modules/**",
        "dist/**",
        ".next/**",
        "coverage/**",
        "src/scripts/**",
        "src/pages/**",
        "src/layouts/**",
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~": resolve(__dirname, "./"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});
