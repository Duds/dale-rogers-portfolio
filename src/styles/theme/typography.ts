/**
 * Professional Typography System - Inspired by Index Ventures
 * 
 * A sophisticated typography system designed for professional portfolios
 * and business applications. Features clean, readable fonts with
 * professional hierarchy and spacing.
 */

export const fontFamily = {
  // Primary heading font - Professional and authoritative
  heading: [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ].join(","),

  // Body font - Clean and highly readable
  body: [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ].join(","),

  // Monospace font - For code and technical content
  mono: [
    "JetBrains Mono",
    "Fira Code",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ].join(","),

  // Display font - For large, impactful text
  display: [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ].join(","),
} as const;

export const fontSize = {
  // Base sizes - Professional and readable
  xs: "0.75rem",      // 12px - Small labels, captions
  sm: "0.875rem",     // 14px - Body small, metadata
  base: "1rem",       // 16px - Body text, default
  lg: "1.125rem",     // 18px - Body large, emphasis
  xl: "1.25rem",      // 20px - Subheadings
  "2xl": "1.5rem",    // 24px - Section headings
  "3xl": "1.875rem",  // 30px - Page headings
  "4xl": "2.25rem",   // 36px - Large headings
  "5xl": "3rem",      // 48px - Hero headings
  "6xl": "3.75rem",   // 60px - Display headings
  "7xl": "4.5rem",    // 72px - Large display
  "8xl": "6rem",      // 96px - Extra large display
  "9xl": "8rem",      // 128px - Massive display
} as const;

export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

// Type exports for TypeScript
export type FontFamilyToken = keyof typeof fontFamily;
export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
export type LineHeightToken = keyof typeof lineHeight;
export type LetterSpacingToken = keyof typeof letterSpacing;
