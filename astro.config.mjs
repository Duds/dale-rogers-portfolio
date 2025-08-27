import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      site: 'https://dale-rogers.com.au',
    }),
  ],
  output: 'static',
  site: 'https://dale-rogers.com.au',
  vite: {
    plugins: [tailwind()],
    // Tailwind CSS v4 processed through Vite plugin for best DX and HMR
    define: {
      // Pass through build-time environment variables
      'import.meta.env.ASTRO_COMMIT_HASH': JSON.stringify(process.env.ASTRO_COMMIT_HASH || 'local'),
      'import.meta.env.ASTRO_BRANCH': JSON.stringify(process.env.ASTRO_BRANCH || 'dev'),
      'import.meta.env.ASTRO_ENVIRONMENT': JSON.stringify(process.env.ASTRO_ENVIRONMENT || 'development'),
    },
  },
});
