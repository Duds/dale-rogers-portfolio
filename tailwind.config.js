/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem",
        "10xl": "10rem",
      },
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6", // More saturated primary
          600: "#7c3aed", // Increased contrast
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        secondary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Vibrant secondary
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // Primary palette
        "primary-purple": "#AF8ABF",
        "primary-black": "#10100F",
        "primary-green": "#36A96A",
        "primary-orange": "#FA8A58",
        "primary-yellow": "#EAF205",

        // Semantic colors
        text: "var(--colour-text)",
        background: "var(--colour-bg)",
        accent: "var(--colour-accent)",

        // Card colors with opacity
        card: {
          purple: "rgba(175, 138, 191, 0.15)",
          black: "#10100F",
          green: "rgba(54, 169, 106, 0.15)",
          orange: "rgba(250, 138, 88, 0.15)",
        },

        // UI colors
        button: {
          bg: "var(--colour-button-bg)",
          text: "var(--colour-button-text)",
          hover: "var(--colour-button-hover)",
        },
        section: {
          alt: "var(--colour-section-alt)",
        },
        footer: {
          bg: "var(--colour-footer-bg)",
          text: "var(--colour-footer-text)",
        },
      },
      fontFamily: {
        heading: ["Fraunces", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        pill: "var(--radius-pill)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        "button-hover": "0 4px 14px -2px rgba(139, 92, 246, 0.4)",
        card: "0 8px 30px rgba(139, 92, 246, 0.15)",
      },
    },
  },
  plugins: [],
};
