/**
 * tokens.ts
 * Safer colour tokens with strict typing, guarded lookups, and CSS var helpers.
 * Brighter Modern Palette – Blue / Aqua / Coral (light + dark).
 */

// ---------- Types & utilities ----------

type Primitive = string | number | boolean | null | undefined;

type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : { readonly [K in keyof T]: DeepReadonly<T[K]> };

// Narrow type for a colour tree: arbitrary nested objects with string leaves.
interface ColorTree {
  [key: string]: string | ColorTree;
}

// Kebab helper for CSS variable keys
const toKebab = (s: string) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

// Shallow hex/rgb(a) guard (keeps your rgba overlays valid)
const isCssColor = (v: string) =>
  /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) ||
  /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i.test(v);

// Runtime validator (optional): ensures all leaves are strings that look like colours
export const validateColorTree = (tree: ColorTree, prefix = 'root'): string[] => {
  const errors: string[] = [];
  for (const [k, v] of Object.entries(tree)) {
    const path = `${prefix}.${k}`;
    if (typeof v === 'string') {
      if (!isCssColor(v)) errors.push(`Invalid CSS colour at ${path}: "${v}"`);
    } else if (v && typeof v === 'object') {
      errors.push(...validateColorTree(v as ColorTree, path));
    } else {
      errors.push(`Non-string value at ${path}`);
    }
  }
  return errors;
};

// Deep get with safe fallback
const deepGet = (obj: ColorTree, path: string): unknown => {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

// ---------- Tokens (same shape) ----------

export const colors: DeepReadonly<ColorTree> = {
  // Springboards-Inspired Palette - Dark First with Vibrant Accents
  primary: { main: '#0A0B0D', light: '#111214', dark: '#000000', contrast: '#FFFFFF' },
  secondary: { main: '#00D9FF', light: '#33E3FF', dark: '#00A8CC', contrast: '#000000' },
  accent: { main: '#FF6B35', light: '#FF8A5B', dark: '#E54D1F', contrast: '#FFFFFF' },

  background: {
    primary: '#0A0B0D',
    secondary: '#111214',
    tertiary: '#1A1B1F',
    elevated: '#1E1F23',
    overlay: 'rgba(10, 11, 13, 0.85)',
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#E5E7EB',
    tertiary: '#9CA3AF',
    disabled: '#6B7280',
    inverse: '#0A0B0D',
    muted: '#D1D5DB',
  },

  border: {
    primary: '#1F2937',
    secondary: '#374151',
    tertiary: '#111214',
    focus: '#00D9FF',
    error: '#EF4444',
  },

  state: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#00D9FF' },

  interactive: {
    hover: '#1A1B1F',
    active: '#1E1F23',
    selected: '#1A3A4A',
    focus: '#111214',
  },

  shadow: {
    light: 'rgba(0, 0, 0, 0.15)',
    medium: 'rgba(0, 0, 0, 0.25)',
    heavy: 'rgba(0, 0, 0, 0.40)',
    colored: 'rgba(0, 217, 255, 0.20)',
  },

  brand: { highlight: '#00D9FF', subtle: '#0A1A20', emphasis: '#FFFFFF' },

  utility: { transparent: 'transparent', current: 'currentColor', inherit: 'inherit' },
} as const;

export const darkColors: DeepReadonly<ColorTree> = {
  // Light Mode (Alternative) - Clean and Minimal
  primary: { main: '#F8FAFC', light: '#FFFFFF', dark: '#E5E7EB', contrast: '#0A0B0D' },
  secondary: { main: '#0891B2', light: '#06B6D4', dark: '#0E7490', contrast: '#FFFFFF' },
  accent: { main: '#EA580C', light: '#F97316', dark: '#C2410C', contrast: '#FFFFFF' },

  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    elevated: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.90)',
  },

  text: {
    primary: '#111827',
    secondary: '#374151',
    tertiary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
    muted: '#4B5563',
  },

  border: {
    primary: '#E5E7EB',
    secondary: '#D1D5DB',
    tertiary: '#F3F4F6',
    focus: '#0891B2',
    error: '#DC2626',
  },

  interactive: {
    hover: '#F3F4F6',
    active: '#E5E7EB',
    selected: '#E0F2FE',
    focus: '#F9FAFB',
  },

  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.10)',
    heavy: 'rgba(0, 0, 0, 0.20)',
    colored: 'rgba(8, 145, 178, 0.15)',
  },

  brand: { highlight: '#0891B2', subtle: '#F0FDFA', emphasis: '#111827' },

  utility: { transparent: 'transparent', current: 'currentColor', inherit: 'inherit' },
} as const;

// ---------- Public types (kept compatible) ----------

export type ColorToken = keyof typeof colors;
export type DarkColorToken = keyof typeof darkColors;
export type ColorScale = keyof (typeof colors)['primary'];

// ---------- Safer getters & generators ----------

/**
 * getColor: guarded lookup with configurable fallback.
 * - path form: "section.key" (e.g., "primary.main")
 * - returns a valid CSS colour string or the fallback.
 */
export const getColor = (
  colorPath: string,
  isDark: boolean = false,
  fallback: string = '#000000'
): string => {
  const tree = (isDark ? darkColors : colors) as ColorTree;
  const value = deepGet(tree, colorPath);
  if (typeof value === 'string') return value;
  console.warn(`Color path "${colorPath}" not found in ${isDark ? 'dark' : 'light'} theme`);
  return fallback;
};

/**
 * generateCSSVariables: flattens the tree into --color-... CSS variables.
 * Keeps your previous naming scheme: `--color-section-key`.
 */
export const generateCSSVariables = (isDark: boolean = false): Record<string, string> => {
  const tree = (isDark ? darkColors : colors) as ColorTree;
  const vars: Record<string, string> = {};

  const walk = (node: ColorTree, path: string[] = []) => {
    for (const [k, v] of Object.entries(node)) {
      const next = [...path, toKebab(k)];
      if (typeof v === 'string') {
        vars[`--color-${next.join('-')}`] = v;
      } else if (v && typeof v === 'object') {
        walk(v as ColorTree, next);
      }
    }
  };

  walk(tree);
  return vars;
};

/**
 * applyThemeVariables: writes CSS vars to the DOM (idempotent).
 * Call on theme toggle. Targets a root element (default: document.documentElement).
 */
export const applyThemeVariables = (
  isDark: boolean = false,
  root: HTMLElement | Document = document.documentElement
) => {
  const el = (root as Document).documentElement ?? (root as HTMLElement);
  const vars = generateCSSVariables(isDark);
  for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
};

/**
 * diffColorKeys: optional guard to compare two trees for key drift.
 * Useful in CI to ensure no accidental renaming.
 */
export const diffColorKeys = (a: ColorTree, b: ColorTree, prefix = 'root'): string[] => {
  const missing: string[] = [];
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    const pa = a[k];
    const pb = b[k];
    const here = `${prefix}.${k}`;
    if (pa === undefined) missing.push(`Missing in A: ${here}`);
    if (pb === undefined) missing.push(`Missing in B: ${here}`);
    if (pa && pb && typeof pa === 'object' && typeof pb === 'object') {
      missing.push(...diffColorKeys(pa as ColorTree, pb as ColorTree, here));
    }
  }
  return missing;
};

// ---------- Example usage (kept minimal) ----------
// applyThemeVariables(false); // light
// applyThemeVariables(true);  // dark
// getColor("primary.main");   // "#2563EB"
