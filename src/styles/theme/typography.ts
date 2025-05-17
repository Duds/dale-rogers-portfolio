export const fontFamily = {
  heading: [
    "Fraunces",
    "ui-serif",
    "Georgia",
    "Cambria",
    "Times New Roman",
    "Times",
    "serif",
  ].join(","),
  body: [
    "DM Sans",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ].join(","),
  sans: [
    "DM Sans",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ].join(","),
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ].join(","),
} as const;

/**
 * Typography scale tokens migrated from global.css
 * @description Font size scale for design system (Australian English spelling)
 */
export const fontSize = {
  xs: "0.75rem", // --text-xs
  sm: "0.875rem", // --text-sm
  base: "1rem", // --text-base
  lg: "1.125rem", // --text-lg
  xl: "1.25rem", // --text-xl
  "2xl": "1.5rem", // --text-2xl
  "3xl": "1.875rem", // --text-3xl
  "4xl": "2.25rem", // --text-4xl
  "5xl": "3rem", // --text-5xl
  "6xl": "3.75rem", // --text-6xl
  "7xl": "4.5rem", // --text-7xl
  "8xl": "6rem", // --text-8xl
  "9xl": "8rem", // --text-9xl
  "10xl": "10rem", // --text-10xl
} as const;

export type FontSizeToken = keyof typeof fontSize;
