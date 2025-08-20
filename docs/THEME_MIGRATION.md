# Theme System Migration Guide

## Overview

The theme system has been completely refactored to remove specific color names (purple, neutral, emerald, amber) and implement a semantic naming convention that allows easy refactoring without changing component code.

## What Changed

### Before (Old System)

- Used specific color names: `purple-600`, `neutral-900`, `emerald-600`, `amber-600`
- Colors were hardcoded throughout components
- Difficult to maintain and refactor
- No systematic dark theme support

### After (New System)

- Semantic naming: `brand-highlight`, `text-primary`, `accent-main`, `state-warning`
- Colors defined in one place (`src/styles/theme/colors.ts`)
- Easy to refactor by updating core theme values
- Built-in dark theme support with automatic overrides

## Key Benefits

1. **Maintainability**: Change colors in one place
2. **Consistency**: All components use the same color system
3. **Accessibility**: Built-in contrast considerations
4. **Flexibility**: Easy to create new color schemes
5. **Dark Theme**: Automatic dark mode support
6. **Documentation**: Clear, semantic naming

## New Color Structure

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

### Brand Colors (Easily Refactorable)

```typescript
brand: {
  highlight: "#8B5CF6",   // Can be changed from purple to any color
  subtle: "#F3F4F6",      // Subtle brand accent
  emphasis: "#1F2937",    // Brand emphasis color
}
```

## Migration Mapping

### Color Name Changes

| Old           | New                   | Purpose              |
| ------------- | --------------------- | -------------------- |
| `purple-600`  | `brand-highlight`     | Brand accent color   |
| `purple-700`  | `brand-emphasis`      | Brand emphasis color |
| `neutral-900` | `text-primary`        | Main text color      |
| `neutral-800` | `text-primary`        | Main text color      |
| `neutral-700` | `text-secondary`      | Secondary text       |
| `neutral-600` | `text-secondary`      | Secondary text       |
| `neutral-500` | `text-tertiary`       | Tertiary text        |
| `neutral-400` | `text-muted`          | Muted text           |
| `neutral-300` | `text-disabled`       | Disabled text        |
| `neutral-200` | `border-primary`      | Main borders         |
| `neutral-100` | `background-tertiary` | Tertiary backgrounds |
| `neutral-50`  | `background-tertiary` | Tertiary backgrounds |
| `emerald-600` | `accent-main`         | Success/accent color |
| `emerald-700` | `accent-dark`         | Dark accent variant  |
| `amber-600`   | `state-warning`       | Warning states       |

### Component Variant Changes

| Old                  | New                    |
| -------------------- | ---------------------- |
| `variant: "purple"`  | `variant: "primary"`   |
| `variant: "neutral"` | `variant: "secondary"` |
| `variant: "emerald"` | `variant: "accent"`    |
| `variant: "amber"`   | `variant: "brand"`     |

## How to Use the New System

### In Astro Components

```astro
<!-- Before -->
<div class="bg-purple-600 hover:bg-purple-700 text-white">

<!-- After -->
<div class="bg-brand-highlight hover:bg-brand-emphasis text-white">
```

### In CSS Files

```css
/* Before */
.services-card--purple {
  background-color: #8b5cf6;
}

/* After */
.services-card--brand {
  background-color: var(--color-brand-highlight);
}
```

### In TypeScript

```typescript
// Before
variant: "purple" | "neutral" | "emerald" | "amber";

// After
variant: "primary" | "secondary" | "accent" | "brand";
```

## Migration Process

### Option 1: Automated Migration (Recommended)

Run the migration script to automatically update all files:

```bash
pnpm run migrate:theme
```

This script will:

- Scan all component and style files
- Replace old color names with new semantic names
- Update component variants
- Update CSS class names
- Provide a summary of all changes

### Option 2: Manual Migration

If you prefer to migrate manually, follow these steps:

1. **Update Component Variants**

   ```typescript
   // Old
   variant: "purple" | "neutral" | "emerald" | "amber";

   // New
   variant: "primary" | "secondary" | "accent" | "brand";
   ```

2. **Update Color Classes**

   ```astro
   <!-- Old -->
   <div class="bg-purple-600 text-neutral-900">

   <!-- New -->
   <div class="bg-brand-highlight text-text-primary">
   ```

3. **Update CSS Variables**

   ```css
   /* Old */
   .card {
     background-color: #8b5cf6;
   }

   /* New */
   .card {
     background-color: var(--color-brand-highlight);
   }
   ```

## Helper Functions

### getColor()

Get a color value with dark theme support:

```typescript
import { getColor } from "@/styles/theme";

const primaryColor = getColor("primary.main"); // "#1F2937"
const darkPrimaryColor = getColor("primary.main", true); // Dark theme variant
```

### generateCSSVariables()

Generate CSS custom properties for a theme:

```typescript
import { generateCSSVariables } from "@/styles/theme";

const lightVars = generateCSSVariables(false); // Light theme
const darkVars = generateCSSVariables(true); // Dark theme
```

## Dark Theme Support

The new system automatically provides dark theme variants for all colors. The CSS variables automatically switch when the `.dark` class is applied:

```css
:root {
  --color-background-primary: #fafafa;
  --color-text-primary: #111827;
}

.dark {
  --color-background-primary: #111827;
  --color-text-primary: #ffffff;
}
```

## Testing Your Migration

After migration, test your components:

1. **Light Theme**: Verify colors look correct
2. **Dark Theme**: Toggle dark mode and verify contrast
3. **Hover States**: Check interactive elements
4. **Focus States**: Ensure accessibility is maintained
5. **Responsive**: Test on different screen sizes

## Common Issues and Solutions

### Issue: Colors not updating

**Solution**: Make sure you're using the new semantic class names or CSS variables.

### Issue: Dark theme not working

**Solution**: Verify the `.dark` class is being applied to the document root.

### Issue: Component variants not working

**Solution**: Update your component's variant prop types to use the new names.

### Issue: CSS variables not defined

**Solution**: Ensure `generated-tokens.css` is imported in your global styles.

## Best Practices

1. **Use Semantic Names**: Choose names that describe purpose, not appearance
2. **Maintain Contrast**: Ensure text remains readable on all backgrounds
3. **Test Both Themes**: Always test light and dark modes
4. **Document Changes**: Update component documentation when adding new colors
5. **Use CSS Variables**: Prefer CSS variables over hardcoded values

## Adding New Colors

To add a new color to the system:

1. **Add to colors.ts**

   ```typescript
   brand: {
     highlight: "#8B5CF6",
     subtle: "#F3F4F6",
     emphasis: "#1F2937",
     // New color
     special: "#FF6B6B",
   }
   ```

2. **Add to darkColors.ts**

   ```typescript
   brand: {
     // ... existing colors
     special: "#FF8E8E", // Darker variant
   }
   ```

3. **Update generated-tokens.css**

   ```css
   :root {
     --color-brand-special: #ff6b6b;
   }

   .dark {
     --color-brand-special: #ff8e8e;
   }
   ```

4. **Document the new color** in this guide

## Support and Questions

If you encounter issues during migration:

1. Check the console for error messages
2. Verify all imports are correct
3. Ensure CSS files are properly imported
4. Test with a simple component first
5. Review the migration script output

## Next Steps

After completing the migration:

1. **Review Changes**: Go through the updated files to ensure accuracy
2. **Test Components**: Verify all components work in both themes
3. **Update Documentation**: Update any component documentation
4. **Run Tests**: Ensure all tests pass
5. **Commit Changes**: Use a descriptive commit message

## Example Migration

Here's a complete example of migrating a service card component:

### Before

```astro
---
interface Service {
  variant: "purple" | "neutral" | "emerald" | "amber";
}

const variantStyles = {
  purple: "bg-purple-600 hover:bg-purple-700",
  neutral: "bg-neutral-900 hover:bg-neutral-800",
  emerald: "bg-emerald-600 hover:bg-emerald-700",
  amber: "bg-amber-600 hover:bg-amber-700",
};
---
```

### After

```astro
---
interface Service {
  variant: "primary" | "secondary" | "accent" | "brand";
}

const variantStyles = {
  primary: "bg-primary-main hover:bg-primary-dark",
  secondary: "bg-secondary-main hover:bg-secondary-dark",
  accent: "bg-accent-main hover:bg-accent-dark",
  brand: "bg-brand-highlight hover:bg-brand-emphasis",
};
---
```

This migration makes the codebase more maintainable and allows for easy theming changes in the future.
