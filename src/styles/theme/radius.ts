/**
 * Professional Border Radius System - Inspired by Index Ventures
 *
 * A refined border radius system designed for professional interfaces
 * with consistent visual harmony and modern aesthetics.
 */

export const radius = {
  // No radius
  none: "0",

  // Subtle radius - For professional interfaces
  sm: "0.125rem", // 2px - Subtle corners
  base: "0.25rem", // 4px - Default radius
  md: "0.375rem", // 6px - Medium radius
  lg: "0.5rem", // 8px - Large radius
  xl: "0.75rem", // 12px - Extra large radius
  "2xl": "1rem", // 16px - Double extra large

  // Special radius values
  "3xl": "1.5rem", // 24px - Triple extra large
  full: "9999px", // Fully rounded (pills, circles)
} as const;

// Type exports for TypeScript
export type RadiusToken = keyof typeof radius;
