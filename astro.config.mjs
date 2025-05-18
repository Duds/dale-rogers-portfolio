import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark",
        wrap: true,
      },
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    react(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  site: "https://dale-rogers.com",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  vite: {
    envPrefix: ["SMTP_", "EMAIL_"],
  },
});
