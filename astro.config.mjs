import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  site: "https://dale-rogers.com",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
  vite: {
    envPrefix: ["SMTP_", "EMAIL_"],
  },
});
