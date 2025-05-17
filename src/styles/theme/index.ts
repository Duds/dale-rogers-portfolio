/**
 * Design System Token Index
 *
 * This file aggregates and exports all design tokens for the project.
 * Tokens are defined in TypeScript for type safety and single source of truth.
 *
 * Exports:
 * - colours, spacing, typography, transitions, shadows, radius, zIndex
 * - Aggregated theme object for easy import
 *
 * Australian English spelling is used throughout.
 */

export * from "./colors.js";
export * from "./spacing.js";
export * from "./typography.js";
export * from "./transitions.js";
export * from "./shadows.js";
export * from "./radius.js";
export * from "./zIndex.js";

import { colors } from "./colors.js";
import { spacing } from "./spacing.js";
import { fontFamily, fontSize } from "./typography.js";
import {
  transitionProperty,
  transitionTimingFunction,
  transitionDuration,
  transitionDurationTokens,
} from "./transitions.js";
import { shadows } from "./shadows.js";
import { radius } from "./radius.js";
import { zIndex } from "./zIndex.js";

/**
 * Aggregated theme object for design system tokens
 */
export const theme = {
  colors,
  spacing,
  fontFamily,
  fontSize,
  transitionProperty,
  transitionTimingFunction,
  transitionDuration,
  transitionDurationTokens,
  shadows,
  radius,
  zIndex,
} as const;

export type Theme = typeof theme;
