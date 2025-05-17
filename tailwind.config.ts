import type { Config } from "tailwindcss";
import { colors } from "./src/styles/theme/colors";
import { spacing } from "./src/styles/theme/spacing";
import { shadows } from "./src/styles/theme/shadows";
import { fontSize } from "./src/styles/theme/typography";
import { radius } from "./src/styles/theme/radius";
import { transitionDurationTokens } from "./src/styles/theme/transitions";
import { zIndex } from "./src/styles/theme/zIndex";
import typography from "@tailwindcss/typography";

// Map design token CSS variables into Tailwind theme
const cssVars = {
  colors: {
    text: "var(--color-text)",
    background: "var(--color-background)",
    accent: "var(--color-accent)",
  },
  spacing: {
    0: "var(--space-0)",
    1: "var(--space-1)",
    2: "var(--space-2)",
    3: "var(--space-3)",
    4: "var(--space-4)",
    5: "var(--space-5)",
    6: "var(--space-6)",
    7: "var(--space-7)",
    8: "var(--space-8)",
    9: "var(--space-9)",
    10: "var(--space-10)",
    11: "var(--space-11)",
    12: "var(--space-12)",
    14: "var(--space-14)",
    16: "var(--space-16)",
    20: "var(--space-20)",
    24: "var(--space-24)",
    28: "var(--space-28)",
    32: "var(--space-32)",
    36: "var(--space-36)",
    40: "var(--space-40)",
    44: "var(--space-44)",
    48: "var(--space-48)",
    52: "var(--space-52)",
    56: "var(--space-56)",
    60: "var(--space-60)",
    64: "var(--space-64)",
    72: "var(--space-72)",
    80: "var(--space-80)",
    96: "var(--space-96)",
    px: "var(--space-px)",
    "0.5": "var(--space-0.5)",
    "1.5": "var(--space-1.5)",
    "2.5": "var(--space-2.5)",
    "3.5": "var(--space-3.5)",
  },
  fontSize: {
    xs: "var(--text-xs)",
    sm: "var(--text-sm)",
    base: "var(--text-base)",
    lg: "var(--text-lg)",
    xl: "var(--text-xl)",
    "2xl": "var(--text-2xl)",
    "3xl": "var(--text-3xl)",
    "4xl": "var(--text-4xl)",
    "5xl": "var(--text-5xl)",
    "6xl": "var(--text-6xl)",
    "7xl": "var(--text-7xl)",
    "8xl": "var(--text-8xl)",
    "9xl": "var(--text-9xl)",
    "10xl": "var(--text-10xl)",
  },
  borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
    "3xl": "var(--radius-3xl)",
    pill: "var(--radius-pill)",
    full: "var(--radius-full)",
  },
  transitionDuration: {
    fast: "var(--transition-fast)",
    normal: "var(--transition-normal)",
    slow: "var(--transition-slow)",
  },
  boxShadow: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    xl: "var(--shadow-xl)",
  },
  zIndex: {
    0: "var(--z-0)",
    10: "var(--z-10)",
    20: "var(--z-20)",
    30: "var(--z-30)",
    40: "var(--z-40)",
    50: "var(--z-50)",
    auto: "var(--z-auto)",
  },
};

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Static design system colours
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
        card: {
          purple: colors.neutral.cardPurple,
          green: colors.neutral.cardGreen,
          orange: colors.neutral.cardOrange,
          black: colors.neutral.cardBlack,
        },
        // CSS var backed colours (semantic)
        ...cssVars.colors,
      },
      spacing: {
        ...spacing,
        ...cssVars.spacing,
      },
      fontSize: {
        ...fontSize,
        ...cssVars.fontSize,
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Fraunces", "serif"],
        body: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        display: ["Fraunces", "serif"],
        mono: ["monospace"],
      },
      borderRadius: {
        ...radius,
        ...cssVars.borderRadius,
      },
      fontWeight: {}, // (ready for future hook-in from typography.ts)
      lineHeight: {},
      letterSpacing: {},
      transitionProperty: {},
      transitionTimingFunction: {},
      transitionDuration: {
        ...transitionDurationTokens,
        ...cssVars.transitionDuration,
      },
      boxShadow: {
        ...shadows,
        ...cssVars.boxShadow,
        // fallback defaults
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
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
      zIndex: {
        ...zIndex,
        ...cssVars.zIndex,
      },
      scale: {
        "102": "1.02",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const customUtilities: Record<string, any> = {
        // Typography utilities
        ".font-heading": { fontFamily: theme("fontFamily.heading") },
        ".font-body": { fontFamily: theme("fontFamily.body") },
        ".font-display": { fontFamily: theme("fontFamily.display") },
        // Additional custom utilities
        ".hover-lift-shadow": {
          "@apply shadow-md transition-all duration-300 ease-in-out": {},
          "&:hover": { "@apply shadow-lg -translate-y-0.5": {} },
        },
      };
      // Auto-generate semantic color utilities from CSS-var tokens
      const cssColorVars = cssVars.colors;
      Object.entries(cssColorVars).forEach(([name, value]) => {
        // Background and text
        customUtilities[`.bg-${name}`] = { backgroundColor: value };
        customUtilities[`.text-${name}`] = { color: value };
        // Border
        customUtilities[`.border-${name}`] = { borderColor: value };
        // Ring (if using ring utilities)
        customUtilities[`.ring-${name}`] = { ringColor: value };
      });
      // Auto-generate spacing utilities from CSS-var spacing tokens
      const cssSpacingVars = cssVars.spacing;
      Object.entries(cssSpacingVars).forEach(([key, value]) => {
        const escKey = key.replace(".", "\\.");
        customUtilities[`.p-${escKey}`] = { padding: value };
        customUtilities[`.px-${escKey}`] = {
          paddingLeft: value,
          paddingRight: value,
        };
        customUtilities[`.py-${escKey}`] = {
          paddingTop: value,
          paddingBottom: value,
        };
        customUtilities[`.pt-${escKey}`] = { paddingTop: value };
        customUtilities[`.pr-${escKey}`] = { paddingRight: value };
        customUtilities[`.pb-${escKey}`] = { paddingBottom: value };
        customUtilities[`.pl-${escKey}`] = { paddingLeft: value };
        customUtilities[`.m-${escKey}`] = { margin: value };
        customUtilities[`.mx-${escKey}`] = {
          marginLeft: value,
          marginRight: value,
        };
        customUtilities[`.my-${escKey}`] = {
          marginTop: value,
          marginBottom: value,
        };
        customUtilities[`.mt-${escKey}`] = { marginTop: value };
        customUtilities[`.mr-${escKey}`] = { marginRight: value };
        customUtilities[`.mb-${escKey}`] = { marginBottom: value };
        customUtilities[`.ml-${escKey}`] = { marginLeft: value };
        // Width and height utilities
        customUtilities[`.w-${escKey}`] = { width: value };
        customUtilities[`.h-${escKey}`] = { height: value };
      });
      addUtilities(customUtilities, {
        variants: ["responsive", "hover", "dark"],
      });
    },
    typography(),
  ],
};

export default config;
