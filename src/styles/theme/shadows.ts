/**
 * Shadow tokens migrated from global.css
 * @file shadows.ts
 * @description Box shadow tokens for design system (Australian English spelling)
 */

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // --shadow-sm
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // --shadow-md
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // --shadow-lg
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", // --shadow-xl
} as const;

export type ShadowToken = keyof typeof shadows;
