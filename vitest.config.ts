import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: [
      "./src/components/features/search/__tests__/setup.ts",
      "./src/pages/scratch/through-the-windows/__tests__/setup.ts",
    ],
    globals: true,
    include: [
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "src/pages/scratch/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "src/**/*.{js,ts,jsx,tsx}",
        "src/pages/scratch/**/*.{js,ts,jsx,tsx}",
      ],
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.astro",
        "src/pages/scratch/**/*.d.ts",
        "src/pages/scratch/**/*.astro",
      ],
    },
  },
});
