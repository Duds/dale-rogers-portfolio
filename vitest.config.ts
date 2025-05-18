import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: [
      "./src/components/features/search/__tests__/setup.ts",
      // "./src/pages/scratch/through-the-windows/__tests__/setup.ts",
    ],
    globals: true,
    include: [
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      // "src/pages/scratch/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    exclude: [
      "src/pages/scratch/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "src/**/*.{js,ts,jsx,tsx}",
        // "src/pages/scratch/**/*.{js,ts,jsx,tsx}",
      ],
      exclude: ["src/**/*.d.ts", "src/**/*.astro", "src/pages/scratch/**"],
    },
  },
});
