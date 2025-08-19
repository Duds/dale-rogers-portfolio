/**
 * Professional Shadow System - Inspired by Index Ventures
 * 
 * A sophisticated shadow system designed for professional interfaces
 * with subtle depth and modern aesthetics.
 */

export const shadows = {
  // Subtle shadows - For professional interfaces
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  
  // Professional shadows - For cards and elevated elements
  card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "card-hover": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  
  // Button shadows - For interactive elements
  button: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "button-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  
  // Modal and overlay shadows
  modal: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  overlay: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  
  // Focus shadows - For accessibility
  focus: "0 0 0 3px rgb(59 130 246 / 0.5)",
  "focus-error": "0 0 0 3px rgb(220 38 38 / 0.5)",
  "focus-success": "0 0 0 3px rgb(16 185 129 / 0.5)",
  
  // Inner shadows - For inset elements
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// Type exports for TypeScript
export type ShadowToken = keyof typeof shadows;
