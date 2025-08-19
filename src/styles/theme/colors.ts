/**
 * Professional Color Palette - Semantic Design System
 *
 * A sophisticated, modern color system designed for professional portfolios
 * and business applications. Uses semantic naming conventions that allow
 * easy refactoring by updating core values without changing component code.
 */

export const colors = {
  // Core semantic colors - These can be refactored without changing component code
  primary: {
    main: "#1F2937", // Deep charcoal - professional, trustworthy
    light: "#374151", // Lighter variant
    dark: "#111827", // Darker variant
    contrast: "#FFFFFF", // Text/icon color on primary backgrounds
  },
  
  secondary: {
    main: "#3B82F6", // Professional blue - reliable, corporate
    light: "#60A5FA", // Lighter variant
    dark: "#1D4ED8", // Darker variant
    contrast: "#FFFFFF", // Text/icon color on secondary backgrounds
  },
  
  accent: {
    main: "#10B981", // Growth/success color
    light: "#34D399", // Lighter variant
    dark: "#047857", // Darker variant
    contrast: "#FFFFFF", // Text/icon color on accent backgrounds
  },

  // Background and surface colors
  background: {
    primary: "#FAFAFA", // Main background
    secondary: "#FFFFFF", // Secondary background
    tertiary: "#F3F4F6", // Tertiary background
    elevated: "#FFFFFF", // Elevated surfaces (cards, modals)
    overlay: "rgba(0, 0, 0, 0.5)", // Overlay backgrounds
  },

  // Text colors with semantic meaning
  text: {
    primary: "#111827", // Main text color
    secondary: "#4B5563", // Secondary text
    tertiary: "#6B7280", // Tertiary text
    disabled: "#9CA3AF", // Disabled text
    inverse: "#FFFFFF", // Text on dark backgrounds
    muted: "#9CA3AF", // Muted text
  },

  // Border and divider colors
  border: {
    primary: "#E5E7EB", // Main borders
    secondary: "#D1D5DB", // Secondary borders
    tertiary: "#F3F4F6", // Tertiary borders
    focus: "#3B82F6", // Focus state borders
    error: "#DC2626", // Error state borders
  },

  // Semantic state colors
  state: {
    success: "#059669", // Success states
    warning: "#D97706", // Warning states
    error: "#DC2626", // Error states
    info: "#3B82F6", // Information states
  },

  // Interactive element colors
  interactive: {
    hover: "#F3F4F6", // Hover state backgrounds
    active: "#E5E7EB", // Active state backgrounds
    selected: "#DBEAFE", // Selected state backgrounds
    focus: "#FEF3C7", // Focus state backgrounds
  },

  // Shadow and depth colors
  shadow: {
    light: "rgba(0, 0, 0, 0.05)",
    medium: "rgba(0, 0, 0, 0.1)",
    heavy: "rgba(0, 0, 0, 0.2)",
    colored: "rgba(59, 130, 246, 0.1)", // Blue-tinted shadow
  },

  // Brand accent colors (can be easily refactored)
  brand: {
    highlight: "#8B5CF6", // Can be changed from purple to any color
    subtle: "#F3F4F6", // Subtle brand accent
    emphasis: "#1F2937", // Brand emphasis color
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
  background: {
    primary: "#111827", // Dark main background
    secondary: "#1F2937", // Dark secondary background
    tertiary: "#374151", // Dark tertiary background
    elevated: "#1F2937", // Dark elevated surfaces
    overlay: "rgba(0, 0, 0, 0.7)", // Dark overlay backgrounds
  },

  text: {
    primary: "#FFFFFF", // Dark theme main text
    secondary: "#D1D5DB", // Dark theme secondary text
    tertiary: "#9CA3AF", // Dark theme tertiary text
    disabled: "#6B7280", // Dark theme disabled text
    inverse: "#111827", // Dark theme text on light backgrounds
    muted: "#6B7280", // Dark theme muted text
  },

  border: {
    primary: "#374151", // Dark theme main borders
    secondary: "#4B5563", // Dark theme secondary borders
    tertiary: "#1F2937", // Dark theme tertiary borders
    focus: "#60A5FA", // Dark theme focus borders
    error: "#F87171", // Dark theme error borders
  },

  interactive: {
    hover: "#374151", // Dark theme hover states
    active: "#4B5563", // Dark theme active states
    selected: "#1E40AF", // Dark theme selected states
    focus: "#92400E", // Dark theme focus states
  },

  shadow: {
    light: "rgba(0, 0, 0, 0.3)",
    medium: "rgba(0, 0, 0, 0.5)",
    heavy: "rgba(0, 0, 0, 0.7)",
    colored: "rgba(139, 92, 246, 0.2)", // Purple-tinted shadow for dark theme
  },
} as const;

// Type exports for TypeScript
export type ColorToken = keyof typeof colors;
export type DarkColorToken = keyof typeof darkColors;
export type ColorScale = keyof typeof colors.primary;

// Helper function to get color with dark theme support
export const getColor = (colorPath: string, isDark: boolean = false): string => {
  const path = colorPath.split('.');
  const colorObj = isDark ? darkColors : colors;
  
  let current: any = colorObj;
  for (const key of path) {
    if (current[key] === undefined) {
      console.warn(`Color path "${colorPath}" not found in ${isDark ? 'dark' : 'light'} theme`);
      return '#000000'; // Fallback
    }
    current = current[key];
  }
  
  return current;
};

// CSS custom property generator
export const generateCSSVariables = (isDark: boolean = false): Record<string, string> => {
  const colorObj = isDark ? darkColors : colors;
  const variables: Record<string, string> = {};
  
  const flattenColors = (obj: any, prefix: string = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'string') {
        variables[`--color-${fullKey}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        flattenColors(value, fullKey);
      }
    }
  };
  
  flattenColors(colorObj);
  return variables;
};
