/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#F27D72',
                secondary: '#F9F4EF',
                accent: '#4A3F55',
                text: {
                    DEFAULT: '#2E2E2E',
                    secondary: '#7D7D7D',
                },
                border: '#E0E0E0',
                background: '#FFFFFF',
            },
            fontFamily: {
                display: ['DM Serif Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                button: '0.5rem',   // 8px
                card: '0.75rem',    // 12px
            },
            boxShadow: {
                card: '0 4px 6px rgba(0,0,0,0.1)',
            },
        },
    },
    plugins: [],
} 