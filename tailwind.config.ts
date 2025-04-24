import type { Config } from "tailwindcss";
import { theme } from "./src/styles/theme/index.js";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...theme.colors,
        background: "#FFFFFF",
        "card-purple": "#F3F0FF",
        "card-black": "#111111",
        "card-green": "#ECFDF5",
        "card-orange": "#FFF7ED",
        primary: {
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        "primary-purple": "#8B5CF6",
        "primary-black": "#111111",
        "primary-green": "#10B981",
        "primary-orange": "#F97316",
        "section-alt": "#F9FAFB",
      },
      spacing: theme.spacing,
      fontFamily: {
        sans: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Fraunces", "serif"],
        body: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        display: ["Fraunces", "serif"],
        mono: ["monospace"],
      },
      fontWeight: theme.fontWeight,
      lineHeight: theme.lineHeight,
      letterSpacing: theme.letterSpacing,
      transitionProperty: theme.transitionProperty,
      transitionTimingFunction: theme.transitionTimingFunction,
      transitionDuration: theme.transitionDuration,
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        // Dark mode shadows
        "dark-sm": "0 1px 2px 0 rgb(255 255 255 / 0.15)",
        "dark-DEFAULT":
          "0 1px 3px 0 rgb(255 255 255 / 0.2), 0 1px 2px -1px rgb(255 255 255 / 0.2)",
        "dark-md":
          "0 4px 6px -1px rgb(255 255 255 / 0.2), 0 2px 4px -2px rgb(255 255 255 / 0.2)",
        "dark-lg":
          "0 10px 15px -3px rgb(255 255 255 / 0.2), 0 4px 6px -4px rgb(255 255 255 / 0.2)",
        "dark-xl":
          "0 20px 25px -5px rgb(255 255 255 / 0.2), 0 8px 10px -6px rgb(255 255 255 / 0.2)",
        "dark-2xl": "0 25px 50px -12px rgb(255 255 255 / 0.35)",
        "dark-inner": "inset 0 2px 4px 0 rgb(255 255 255 / 0.15)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [
    function ({ addBase, addUtilities, theme }) {
      // Define custom utility classes
      const customUtilities = {
        ".font-heading": {
          fontFamily: '"Fraunces", serif',
        },
        ".font-body": {
          fontFamily: '"DM Sans", system-ui, -apple-system, sans-serif',
        },
        ".font-display": {
          fontFamily: '"Fraunces", serif',
        },
        ".bg-background": {
          backgroundColor: theme("colors.background"),
        },
        ".bg-section-alt": {
          backgroundColor: theme("colors.section-alt"),
        },
        ".bg-card-purple": {
          backgroundColor: theme("colors.card-purple"),
        },
        ".bg-card-black": {
          backgroundColor: theme("colors.card-black"),
        },
        ".bg-card-green": {
          backgroundColor: theme("colors.card-green"),
        },
        ".bg-card-orange": {
          backgroundColor: theme("colors.card-orange"),
        },
        ".bg-primary-purple": {
          backgroundColor: theme("colors.primary-purple"),
        },
        ".bg-primary-black": {
          backgroundColor: theme("colors.primary-black"),
        },
        ".bg-primary-green": {
          backgroundColor: theme("colors.primary-green"),
        },
        ".bg-primary-orange": {
          backgroundColor: theme("colors.primary-orange"),
        },
        ".rounded-pill": {
          borderRadius: "9999px",
        },
        ".shadow-soft": {
          boxShadow: theme("boxShadow.soft"),
        },
      };

      addUtilities(customUtilities);
    },
  ],
};

export default config;
