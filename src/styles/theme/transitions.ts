export const transitionProperty = {
  none: "none",
  all: "all",
  DEFAULT:
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  colors:
    "color, background-color, border-color, text-decoration-color, fill, stroke",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
} as const;

export const transitionTimingFunction = {
  DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const transitionDuration = {
  DEFAULT: "150ms",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
} as const;

export type TransitionPropertyToken = keyof typeof transitionProperty;
export type TransitionTimingFunctionToken =
  keyof typeof transitionTimingFunction;
export type TransitionDurationToken = keyof typeof transitionDuration;

// Helper type for transition shorthand
export type TransitionShorthand =
  `${TransitionPropertyToken} ${TransitionDurationToken} ${TransitionTimingFunctionToken}`;
