export const transitions = {
  // Timing functions
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
  
  // Durations
  fast: "150ms",
  normal: "300ms", 
  slow: "500ms",
  
  // Common transitions
  colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
  transform: "transform",
  shadow: "box-shadow",
  all: "all",
} as const;

export type TransitionToken = keyof typeof transitions;
