import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './src/**/*.{css,scss}'],
  theme: {
    extend: {
      // Theme extensions can go here
    },
  },
  plugins: [],
} satisfies Config;
