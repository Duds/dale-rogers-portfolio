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
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ].join(','),

  // Body font - Clean and highly readable
  body: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ].join(','),

  // Monospace font - For code and technical content
  mono: [
    'JetBrains Mono',
    'Fira Code',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ].join(','),

  // Display font - For large, impactful text
  display: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ].join(','),
} as const;

export const fontSize = {
  // Base sizes - Professional and readable
  xs: '0.75rem', // 12px - Small labels, captions
  sm: '0.875rem', // 14px - Body small, metadata
  base: '1rem', // 16px - Body text, default
  lg: '1.125rem', // 18px - Body large, emphasis
  xl: '1.25rem', // 20px - Subheadings
  '2xl': '1.5rem', // 24px - Section headings
  '3xl': '1.875rem', // 30px - Page headings
  '4xl': '2.25rem', // 36px - Large headings
  '5xl': '3rem', // 48px - Hero headings
  '6xl': '3.75rem', // 60px - Display headings
  '7xl': '4.5rem', // 72px - Large display
  '8xl': '6rem', // 96px - Extra large display
  '9xl': '8rem', // 128px - Massive display
} as const;

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// ===== CONSISTENCY CLASSES =====
// These extend the existing token system with semantic utility classes

export const consistencyClasses = {
  // Heading hierarchy - Consistent font weights and sizes
  heading: {
    primary: 'text-5xl md:text-6xl lg:text-7xl mb-6 font-display',
    secondary: 'text-3xl md:text-4xl mb-6 font-display',
    tertiary: 'text-2xl mb-4 font-display',
    quaternary: 'text-xl mb-3 font-display',
  },

  // Body text - Consistent color and sizing
  body: {
    large: 'text-xl md:text-2xl mb-8 font-body',
    medium: 'text-lg mb-6 font-body',
    standard: 'text-base mb-4 font-body',
    small: 'text-sm mb-3 font-body',
  },

  // Layout - Consistent spacing and structure
  layout: {
    pageMain: 'pt-32 md:pt-40 pb-16 md:pb-24',
    pageSection: 'mb-24',
    pageSectionSmall: 'mb-16',
    pageSectionLarge: 'mb-32',
    contentNarrow: 'max-w-3xl mx-auto',
    contentStandard: 'max-w-4xl mx-auto',
    contentWide: 'max-w-6xl mx-auto',
  },

  // Components - Consistent styling patterns
  component: {
    card: 'rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-300',
    section: 'rounded-3xl p-8 md:p-12',
    button: 'inline-block px-8 py-4 rounded-full font-semibold transition-colors',
    link: 'hover:underline transition-colors duration-200',
  },

  // Grids - Consistent layout patterns
  grid: {
    two: 'grid md:grid-cols-2 gap-8',
    three: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
    four: 'grid md:grid-cols-2 lg:grid-cols-4 gap-6',
  },

  // Spacing - Consistent margin patterns
  spacing: {
    xs: 'mb-4',
    sm: 'mb-6',
    md: 'mb-8',
    lg: 'mb-12',
    xl: 'mb-16',
    '2xl': 'mb-24',
  },
} as const;

// Type exports for TypeScript
export type FontFamilyToken = keyof typeof fontFamily;
export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
export type LineHeightToken = keyof typeof lineHeight;
export type LetterSpacingToken = keyof typeof letterSpacing;

export type ConsistencyClass = keyof typeof consistencyClasses;
export type HeadingClass = keyof typeof consistencyClasses.heading;
export type BodyClass = keyof typeof consistencyClasses.body;
export type LayoutClass = keyof typeof consistencyClasses.layout;
export type ComponentClass = keyof typeof consistencyClasses.component;
export type GridClass = keyof typeof consistencyClasses.grid;
export type SpacingClass = keyof typeof consistencyClasses.spacing;
