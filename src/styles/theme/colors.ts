/**
 * Professional Color Palette - Olive, Blue & Rust Design System
 *
 * A sophisticated, modern color system designed for professional portfolios
 * and business applications. Uses semantic naming conventions that allow
 * easy refactoring by updating core values without changing component code.
 */

export const colors = {
  // Core semantic colors - These can be refactored without changing component code
  primary: {
    main: "#324001", // Deep olive - professional, trustworthy
    light: "#4A5A0A", // Lighter variant
    dark: "#1F2A00", // Darker variant
    contrast: "#FFFFFF", // Text/icon color on primary backgrounds
  },

  secondary: {
    main: "#72CEF2", // Brand blue - reliable, corporate
    light: "#9DDCF5", // Lighter variant
    dark: "#4FB8E8", // Darker variant
    contrast: "#000000", // Text/icon color on secondary backgrounds
  },

  accent: {
    main: "#A6550F", // Rust color - growth/success
    light: "#C66A1A", // Lighter variant
    dark: "#8A4508", // Darker variant
    contrast: "#FFFFFF", // Text/icon color on accent backgrounds
  },

  // Background and surface colors
  background: {
    primary: "#F2F2F2", // Main background
    secondary: "#FFFFFF", // Secondary background
    tertiary: "#E8E8E8", // Tertiary background
    elevated: "#FFFFFF", // Elevated surfaces (cards, modals)
    overlay: "rgba(0, 0, 0, 0.5)", // Overlay backgrounds
  },

  // Text colors with semantic meaning
  text: {
    primary: "#594E45", // Main text color
    secondary: "#6B5F56", // Secondary text
    tertiary: "#7D7066", // Tertiary text
    disabled: "#9A8F87", // Disabled text
    inverse: "#FFFFFF", // Text on dark backgrounds
    muted: "#9A8F87", // Muted text
  },

  // Border and divider colors
  border: {
    primary: "#D1C7C0", // Main borders
    secondary: "#E8E0D9", // Secondary borders
    tertiary: "#F2F2F2", // Tertiary borders
    focus: "#72CEF2", // Focus state borders
    error: "#A6550F", // Error state borders
  },

  // Semantic state colors
  state: {
    success: "#324001", // Success states
    warning: "#A6550F", // Warning states
    error: "#8A4508", // Error states
    info: "#72CEF2", // Information states
  },

  // Interactive element colors
  interactive: {
    hover: "#E8E8E8", // Hover state backgrounds
    active: "#D1C7C0", // Active state backgrounds
    selected: "#E8F4F9", // Selected state backgrounds
    focus: "#F2F2F2", // Focus state backgrounds
  },

  // Shadow and depth colors
  shadow: {
    light: "rgba(0, 0, 0, 0.05)",
    medium: "rgba(0, 0, 0, 0.1)",
    heavy: "rgba(0, 0, 0, 0.2)",
    colored: "rgba(114, 206, 242, 0.1)", // Blue-tinted shadow
  },

  // Brand accent colors (can be easily refactored)
  brand: {
    highlight: "#72CEF2", // Feature accents and decorative lines
    subtle: "#F2F2F2", // Low-key brand background
    emphasis: "#594E45", // Headlines/dividers on light bg
  },

  // Utility colors
  utility: {
    transparent: "transparent",
    current: "currentColor",
    inherit: "inherit",
  },
} as const;

// Dark theme color overrides
export const darkColors = {
  // Core semantic colors - Same as light theme for consistency
  primary: {
    main: "#324001", // Deep olive - professional, trustworthy
    light: "#4A5A0A", // Lighter variant
    dark: "#1F2A00", // Darker variant
    contrast: "#FFFFFF", // Text/icon color on primary backgrounds
  },

  secondary: {
    main: "#72CEF2", // Brand blue - reliable, corporate
    light: "#9DDCF5", // Lighter variant
    dark: "#4FB8E8", // Darker variant
    contrast: "#000000", // Text/icon color on secondary backgrounds
  },

  accent: {
    main: "#A6550F", // Rust color - growth/success
    light: "#C66A1A", // Lighter variant
    dark: "#8A4508", // Darker variant
    contrast: "#FFFFFF", // Text/icon color on accent backgrounds
  },

  background: {
    primary: "#1F2A00", // Dark main background
    secondary: "#324001", // Dark secondary background
    tertiary: "#4A5A0A", // Dark tertiary background
    elevated: "#324001", // Dark elevated surfaces
    overlay: "rgba(0, 0, 0, 0.7)", // Dark overlay backgrounds
  },

  text: {
    primary: "#FFFFFF", // Dark theme main text
    secondary: "#E8E0D9", // Dark theme secondary text
    tertiary: "#D1C7C0", // Dark theme tertiary text
    disabled: "#9A8F87", // Dark theme disabled text
    inverse: "#1F2A00", // Dark theme text on light backgrounds
    muted: "#9A8F87", // Dark theme muted text
  },

  border: {
    primary: "#4A5A0A", // Dark theme main borders
    secondary: "#5A6A1A", // Dark theme secondary borders
    tertiary: "#324001", // Dark theme tertiary borders
    focus: "#72CEF2", // Dark theme focus borders
    error: "#A6550F", // Dark theme error borders
  },

  interactive: {
    hover: "#4A5A0A", // Dark theme hover states
    active: "#5A6A1A", // Dark theme active states
    selected: "#1E3A8A", // Dark theme selected states
    focus: "#92400E", // Dark theme focus states
  },

  shadow: {
    light: "rgba(0, 0, 0, 0.3)",
    medium: "rgba(0, 0, 0, 0.5)",
    heavy: "rgba(0, 0, 0, 0.7)",
    colored: "rgba(114, 206, 242, 0.2)", // Blue-tinted shadow for dark theme
  },
} as const;

// Type exports for TypeScript
export type ColorToken = keyof typeof colors;
export type DarkColorToken = keyof typeof darkColors;
export type ColorScale = keyof typeof colors.primary;

// Helper function to get color with dark theme support
export const getColor = (
  colorPath: string,
  isDark: boolean = false
): string => {
  const path = colorPath.split(".");
  const colorObj = isDark ? darkColors : colors;

  let current: Record<string, unknown> = colorObj;
  for (const key of path) {
    if (current[key] === undefined) {
      console.warn(
        `Color path "${colorPath}" not found in ${isDark ? "dark" : "light"} theme`
      );
      return "#000000"; // Fallback
    }
    current = current[key] as Record<string, unknown>;
  }

  return current as string;
};

// CSS custom property generator
export const generateCSSVariables = (
  isDark: boolean = false
): Record<string, string> => {
  const colorObj = isDark ? darkColors : colors;
  const variables: Record<string, string> = {};

  const flattenColors = (obj: Record<string, unknown>, prefix: string = "") => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === "string") {
        variables[`--color-${fullKey}`] = value;
      } else if (typeof value === "object" && value !== null) {
        flattenColors(value as Record<string, unknown>, fullKey);
      }
    }
  };

  flattenColors(colorObj);
  return variables;
};
