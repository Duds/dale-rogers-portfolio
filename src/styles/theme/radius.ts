/**
 * Border radius tokens migrated from global.css
 * @file radius.ts
 * @description Border radius tokens for design system (Australian English spelling)
 */

export const radius = {
  pill: "9999px", // --radius-pill
  lg: "1.5rem", // --radius-lg
  md: "1rem", // --radius-md
  sm: "0.5rem", // --radius-sm
  xl: "0.75rem", // --radius-xl
  "2xl": "1rem", // --radius-2xl
  "3xl": "1.5rem", // --radius-3xl
  full: "9999px", // --radius-full
} as const;

export type RadiusToken = keyof typeof radius;
