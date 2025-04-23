import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

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
    tailwind(),
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
