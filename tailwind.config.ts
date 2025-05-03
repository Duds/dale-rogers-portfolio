import type { Config } from "tailwindcss";
import { colors } from "./src/styles/theme/colors";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: colors.neutral.background,
        white: colors.neutral.white,
        black: colors.neutral.black,
        grey: { ...colors.grey },
        success: { ...colors.success },
        warning: { ...colors.warning },
        error: { ...colors.error },
        primary: {
          light: colors.primary.light,
          DEFAULT: colors.primary.DEFAULT,
          dark: colors.primary.dark,
        },
        secondary: {
          green: colors.secondary.green,
          orange: colors.secondary.orange,
          black: colors.secondary.black,
        },
        "primary-purple": colors.primary.DEFAULT, // legacy utility
        "primary-black": colors.secondary.black,
        "primary-green": colors.secondary.green,
        "primary-orange": colors.secondary.orange,
        "card-purple": colors.neutral.cardPurple,
        "card-green": colors.neutral.cardGreen,
        "card-orange": colors.neutral.cardOrange,
        "card-black": colors.neutral.cardBlack,
        "section-alt": colors.neutral.background,
      },
      spacing: {}, // (optional: later hook into your spacing.ts if you want)
      fontFamily: {
        sans: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Fraunces", "serif"],
        body: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        display: ["Fraunces", "serif"],
        mono: ["monospace"],
      },
      fontWeight: {}, // (ready for future hook-in from typography.ts)
      lineHeight: {},
      letterSpacing: {},
      transitionProperty: {},
      transitionTimingFunction: {},
      transitionDuration: {},
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
    function ({ addUtilities, theme }) {
      const customUtilities = {
        ".font-heading": {
          fontFamily: theme("fontFamily.heading"),
        },
        ".font-body": {
          fontFamily: theme("fontFamily.body"),
        },
        ".font-display": {
          fontFamily: theme("fontFamily.display"),
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
          borderRadius: theme("borderRadius.pill"),
        },
        ".shadow-soft": {
          boxShadow: theme("boxShadow.soft"),
        },
        ".hover-lift-shadow": {
          "@apply shadow-md transition-all duration-300 ease-in-out": {},
          "&:hover": {
            "@apply shadow-lg -translate-y-0.5": {},
          },
        },
      };

      addUtilities(customUtilities);
    },
    typography(),
  ],
};

export default config;
