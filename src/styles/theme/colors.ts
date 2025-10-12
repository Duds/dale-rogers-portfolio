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
  // Service Design Leader Palette - Deep Navy + Warm Rust + Sage Green
  primary: { main: '#0F2851', light: '#1a3a6e', dark: '#0a1d3a', contrast: '#FFFFFF' },
  secondary: { main: '#D97706', light: '#F59E0B', dark: '#B45309', contrast: '#FFFFFF' },
  accent: { main: '#059669', light: '#10B981', dark: '#047857', contrast: '#FFFFFF' },

  background: {
    primary: '#F8FAFC',
    secondary: '#FFFFFF',
    tertiary: '#F1F5F9',
    elevated: '#FFFFFF',
    overlay: 'rgba(15, 40, 81, 0.55)',
  },

  text: {
    primary: '#0F172A',
    secondary: '#334155',
    tertiary: '#475569',
    disabled: '#94A3B8',
    inverse: '#FFFFFF',
    muted: '#64748B',
  },

  border: {
    primary: '#E2E8F0',
    secondary: '#CBD5E1',
    tertiary: '#F1F5F9',
    focus: '#059669',
    error: '#DC2626',
  },

  state: { success: '#059669', warning: '#D97706', error: '#DC2626', info: '#0F2851' },

  interactive: {
    hover: '#F1F5F9',
    active: '#E2E8F0',
    selected: '#ECFDF5',
    focus: '#F8FAFC',
  },

  shadow: {
    light: 'rgba(15, 40, 81, 0.06)',
    medium: 'rgba(15, 40, 81, 0.12)',
    heavy: 'rgba(15, 40, 81, 0.20)',
    colored: 'rgba(15, 40, 81, 0.12)',
  },

  brand: { highlight: '#D97706', subtle: '#FFFBEB', emphasis: '#0F2851' },

  utility: { transparent: 'transparent', current: 'currentColor', inherit: 'inherit' },
} as const;

export const darkColors: DeepReadonly<ColorTree> = {
  // Service Design Leader Dark Mode - Deep Navy maintained for brand consistency
  primary: { main: '#1E3A5F', light: '#2A4A70', dark: '#0F2851', contrast: '#FFFFFF' },
  secondary: { main: '#FB923C', light: '#FDBA74', dark: '#F97316', contrast: '#FFFFFF' },
  accent: { main: '#34D399', light: '#6EE7B7', dark: '#10B981', contrast: '#FFFFFF' },

  background: {
    primary: '#0B1220',
    secondary: '#0F172A',
    tertiary: '#111827',
    elevated: '#0F172A',
    overlay: 'rgba(11, 18, 32, 0.65)',
  },

  text: {
    primary: '#F8FAFC',
    secondary: '#E2E8F0',
    tertiary: '#CBD5E1',
    disabled: '#64748B',
    inverse: '#0B1220',
    muted: '#94A3B8',
  },

  border: {
    primary: '#1F2937',
    secondary: '#273449',
    tertiary: '#0F172A',
    focus: '#34D399',
    error: '#F87171',
  },

  interactive: {
    hover: '#111827',
    active: '#1F2937',
    selected: '#064E3B',
    focus: '#7C2D12',
  },

  shadow: {
    light: 'rgba(0, 0, 0, 0.35)',
    medium: 'rgba(0, 0, 0, 0.55)',
    heavy: 'rgba(0, 0, 0, 0.75)',
    colored: 'rgba(52, 211, 153, 0.25)',
  },

  brand: { highlight: '#FB923C', subtle: '#0B1220', emphasis: '#F8FAFC' },

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
