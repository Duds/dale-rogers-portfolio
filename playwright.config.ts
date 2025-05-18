import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/ui",
  testMatch: /.*\.spec\.ts$/,
  use: {
    baseURL: "http://localhost:4321",
  },
  // Optional: set other options as needed
});
