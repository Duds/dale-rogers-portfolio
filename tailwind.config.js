/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
