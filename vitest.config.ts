import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/components/features/search/__tests__/setup.ts"],
    globals: true,
  },
});
