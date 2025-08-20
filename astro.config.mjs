import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";

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
    // Tailwind CSS v4 via Vite plugin - no PostCSS needed
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
    plugins: [tailwind()],
    envPrefix: ["SMTP_", "EMAIL_"],
    // Tailwind CSS v4 processed through Vite plugin for best DX and HMR
  },
});
