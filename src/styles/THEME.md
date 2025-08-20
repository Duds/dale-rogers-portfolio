# Theme System Documentation

## Overview

The theme system has been refactored to use semantic naming conventions that allow easy refactoring without changing component code. This system removes specific color names (purple, neutral, emerald, amber) and replaces them with meaningful, semantic tokens.

## Key Principles

1. **Semantic Naming**: Colors are named by their purpose, not their appearance
2. **Easy Refactoring**: Change colors in one place without updating components
3. **Dark Theme Support**: Built-in dark theme color overrides
4. **Consistent Structure**: All colors follow the same naming pattern

## Color Structure

### Core Semantic Colors

```typescript
colors: {
  primary: {
    main: "#1F2937",      // Main brand color
    light: "#374151",     // Lighter variant
    dark: "#111827",      // Darker variant
    contrast: "#FFFFFF",  // Text/icon color on primary backgrounds
  },
  secondary: { /* similar structure */ },
  accent: { /* similar structure */ }
}
```

### Background and Surface Colors

```typescript
background: {
  primary: "#FAFAFA",     // Main background
  secondary: "#FFFFFF",   // Secondary background
  tertiary: "#F3F4F6",   // Tertiary background
  elevated: "#FFFFFF",    // Elevated surfaces (cards, modals)
  overlay: "rgba(0, 0, 0, 0.5)", // Overlay backgrounds
}
```

### Text Colors

```typescript
text: {
  primary: "#111827",     // Main text color
  secondary: "#4B5563",   // Secondary text
  tertiary: "#6B7280",    // Tertiary text
  disabled: "#9CA3AF",    // Disabled text
  inverse: "#FFFFFF",     // Text on dark backgrounds
  muted: "#9CA3AF",      // Muted text
}
```

### Border Colors

```typescript
border: {
  primary: "#E5E7EB",     // Main borders
  secondary: "#D1D5DB",   // Secondary borders
  tertiary: "#F3F4F6",   // Tertiary borders
  focus: "#3B82F6",      // Focus state borders
  error: "#DC2626",       // Error state borders
}
```

### State Colors

```typescript
state: {
  success: "#059669",     // Success states
  warning: "#D97706",     // Warning states
  error: "#DC2626",       // Error states
  info: "#3B82F6",       // Information states
}
```

### Brand Colors (Easily Refactorable)

```typescript
brand: {
  highlight: "#8B5CF6",   // Can be changed from purple to any color
  subtle: "#F3F4F6",      // Subtle brand accent
  emphasis: "#1F2937",    // Brand emphasis color
}
```

## Dark Theme Support

The system automatically provides dark theme variants for all colors:

```typescript
darkColors: {
  background: {
    primary: "#111827",   // Dark main background
    secondary: "#1F2937", // Dark secondary background
    // ... more dark variants
  }
}
```

## Usage in Components

### Before (Old System)

```astro
<div class="bg-purple-600 hover:bg-purple-700 text-white">
  <!-- Content -->
</div>
```

### After (New System)

```astro
<div class="bg-brand-highlight hover:bg-brand-emphasis text-white">
  <!-- Content -->
</div>
```

### CSS Variables

```css
.my-component {
  background-color: var(--color-brand-highlight);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}
```

## Migration Guide

### 1. Replace Specific Color Names

| Old           | New               |
| ------------- | ----------------- |
| `purple-600`  | `brand-highlight` |
| `neutral-900` | `text-primary`    |
| `emerald-600` | `accent-main`     |
| `amber-600`   | `state-warning`   |

### 2. Update Component Variants

```typescript
// Old
variant: "purple" | "neutral" | "emerald" | "amber";

// New
variant: "primary" | "secondary" | "accent" | "brand";
```

### 3. Update CSS Classes

```css
/* Old */
.services-card--purple {
  background-color: #8b5cf6;
}

/* New */
.services-card--brand {
  background-color: var(--color-brand-highlight);
}
```

### 4. Use Semantic Background/Text Classes

```astro
<!-- Old -->
<div class="bg-neutral-900 text-white">

<!-- New -->
<div class="bg-background-primary text-text-inverse">
```

## Helper Functions

### getColor()

```typescript
import { getColor } from "@/styles/theme";

const primaryColor = getColor("primary.main"); // "#1F2937"
const darkPrimaryColor = getColor("primary.main", true); // Dark theme variant
```

### generateCSSVariables()

```typescript
import { generateCSSVariables } from "@/styles/theme";

const lightVars = generateCSSVariables(false); // Light theme
const darkVars = generateCSSVariables(true); // Dark theme
```

## Benefits

1. **Maintainability**: Change colors in one place
2. **Consistency**: All components use the same color system
3. **Accessibility**: Built-in contrast considerations
4. **Flexibility**: Easy to create new color schemes
5. **Dark Theme**: Automatic dark mode support
6. **Documentation**: Clear, semantic naming

## Best Practices

1. **Use Semantic Names**: Choose names that describe purpose, not appearance
2. **Maintain Contrast**: Ensure text remains readable on all backgrounds
3. **Test Both Themes**: Always test light and dark modes
4. **Document Changes**: Update this guide when adding new colors
5. **Use CSS Variables**: Prefer CSS variables over hardcoded values

## Adding New Colors

1. Add to the appropriate category in `colors.ts`
2. Add dark theme variant in `darkColors`
3. Update `generated-tokens.css`
4. Document the new color in this guide
5. Test in both light and dark themes

## Example: Adding a New Brand Color

```typescript
// In colors.ts
brand: {
  highlight: "#8B5CF6",
  subtle: "#F3F4F6",
  emphasis: "#1F2937",
  // New color
  special: "#FF6B6B",
}

// In darkColors.ts
brand: {
  // ... existing colors
  special: "#FF8E8E", // Darker variant
}
```

This system makes it easy to maintain consistent theming across the entire application while allowing for easy refactoring and customization.
