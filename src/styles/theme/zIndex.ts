/**
 * Z-index tokens migrated from global.css
 * @file zIndex.ts
 * @description Z-index tokens for design system (Australian English spelling)
 */

export const zIndex = {
  0: "0", // --z-0
  10: "10", // --z-10
  20: "20", // --z-20
  30: "30", // --z-30
  40: "40", // --z-40
  50: "50", // --z-50
  auto: "auto", // --z-auto
} as const;

export type ZIndexToken = keyof typeof zIndex;
