/**
 * Professional Design System Token Index - Semantic Design System
 *
 * A sophisticated design system designed for professional portfolios
 * and business applications. Features semantic colors, typography,
 * spacing, and modern aesthetics with dark theme support.
 */

import { colors, darkColors } from "./colors.js";
import { spacing } from "./spacing.js";
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "./typography.js";
import { transitions } from "./transitions.js";
import { shadows } from "./shadows.js";
import { radius } from "./radius.js";
import { zIndex } from "./zIndex.js";

export const theme = {
  colors,
  darkColors,
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  transitions,
  shadows,
  radius,
  zIndex,
} as const;

// Re-export individual token modules
export { colors, darkColors } from "./colors.js";
export { spacing } from "./spacing.js";
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "./typography.js";
export { transitions } from "./transitions.js";
export { shadows } from "./shadows.js";
export { radius } from "./radius.js";
export { zIndex } from "./zIndex.js";

// Type exports
export type Theme = typeof theme;
export type { ColorToken, DarkColorToken, ColorScale } from "./colors.js";
