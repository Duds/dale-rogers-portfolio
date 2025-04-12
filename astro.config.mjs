import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    site: 'https://dale-rogers.com',
    output: 'server',
    markdown: {
        shikiConfig: {
            theme: 'github-dark',
        },
    },
    vite: {
        envPrefix: ['SMTP_', 'EMAIL_'],
    },
}); 