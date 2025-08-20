/**
 * Z-index tokens migrated from global.css
 * @file zIndex.ts
 * @description Z-index tokens for design system (Australian English spelling)
 */

export const zIndex = {
  base: "0",
  dropdown: "10",
  sticky: "20",
  overlay: "30",
  modal: "40",
  tooltip: "50",
} as const;

export type ZIndexToken = keyof typeof zIndex;
