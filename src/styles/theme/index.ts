export * from "./colors.js";
export * from "./spacing.js";
export * from "./typography.js";
export * from "./transitions.js";

import { colors } from "./colors.js";
import { spacing } from "./spacing.js";
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "./typography.js";
import {
  transitionProperty,
  transitionTimingFunction,
  transitionDuration,
} from "./transitions.js";

export const theme = {
  colors,
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  transitionProperty,
  transitionTimingFunction,
  transitionDuration,
} as const;

export type Theme = typeof theme;
