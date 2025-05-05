# UI Components

This directory contains reusable UI components that form the building blocks of our application.

## Component Guidelines

- Components should be atomic and reusable
- Follow the established theming system
- Include proper TypeScript types
- Implement accessibility features
- Include proper documentation

## Components List

- `Button.astro`: Reusable button component with variants
- `Card.astro`: Card component for content containers
- `Icon.astro`: Icon component with SVG support and type-safe icon names
- `ThemeToggle.astro`: Theme toggle component for dark/light mode

## Theme System

### ThemeToggle Component

The `ThemeToggle` component provides a user interface for switching between light and dark themes. It follows these key principles:

1. **User Preference Detection**

   ```typescript
   const prefersDark = window.matchMedia(
     "(prefers-color-scheme: dark)",
   ).matches;
   const currentTheme =
     localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
   ```

2. **Persistence**

   - Theme choice is stored in localStorage
   - Persists across page reloads and sessions
   - Falls back to system preference if no stored choice

3. **Implementation**

   ```astro
   ---
   import Icon from "./Icon.astro";
   ---

   <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
     <Icon name="sun" class="theme-icon-light w-6 h-6" />
     <Icon name="moon" class="theme-icon-dark w-6 h-6" />
   </button>
   ```

4. **Styling**
   ```css
   .theme-icon-light {
     @apply block dark:hidden;
   }
   .theme-icon-dark {
     @apply hidden dark:block;
   }
   ```

### Usage in Components

1. **Dark Mode Classes**

   - Use the `dark:` prefix for dark mode styles
   - Example: `class="text-gray-900 dark:text-white"`

2. **Theme Variables**

   ```css
   :root {
     --text-primary: #000000;
     --bg-primary: #ffffff;
   }

   :root[class~="dark"] {
     --text-primary: #ffffff;
     --bg-primary: #000000;
   }
   ```

3. **Best Practices**
   - Always provide both light and dark variants
   - Use semantic colour variables
   - Test components in both themes
   - Consider contrast ratios

### Integration Guide

1. **Adding Theme Toggle**

   ```astro
   ---
   import ThemeToggle from "@/components/ui/ThemeToggle.astro";
   ---

   <ThemeToggle />
   ```

2. **Theme-Aware Components**

   ```astro
   <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
     <!-- Component content -->
   </div>
   ```

3. **Dynamic Themes**
   - Theme changes are applied immediately
   - No page reload required
   - Smooth transitions with CSS

### Accessibility

1. **ARIA Support**

   - Proper `aria-label` for toggle button
   - Keyboard navigation support
   - Focus states preserved in both themes

2. **Contrast Requirements**

   - All text meets WCAG 2.1 contrast requirements
   - Interactive elements clearly visible
   - Icons maintain clarity in both themes

3. **Reduced Motion**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .theme-toggle {
       transition: none;
     }
   }
   ```

### Testing

1. **Theme Switching**

   - Test initial load behaviour
   - Verify theme persistence
   - Check system preference detection

2. **Visual Testing**

   - Component appearance in both themes
   - Transition animations
   - Icon visibility

3. **Accessibility Testing**
   - Screen reader compatibility
   - Keyboard navigation
   - Focus management

## Icon Usage Guidelines

### Type Safety

The `Icon` component uses TypeScript to ensure type safety for icon names. Available icons are:

- `linkedin`, `github`, `mail` - Social icons
- `strategy`, `research`, `blueprint`, `codesign`, `evaluation` - Service icons
- `instagram` - Social media
- `sun`, `moon` - Theme toggle

### Best Practices

1. **Type Safety**

   - Always use the correct icon name from the available options
   - Use `as const` assertions when defining icon arrays/objects
   - Define interfaces for components that use icons

2. **Implementation Examples**

   ```typescript
   // Single icon usage
   <Icon name="github" />;

   // Array of icons with type safety
   const socialLinks = [
     {
       name: "Instagram",
       icon: "instagram" as const,
     },
   ];

   // Interface for components using icons
   interface FeatureCard {
     title: string;
     icon: "strategy" | "research" | "blueprint" | "codesign" | "evaluation";
   }
   ```

3. **Adding New Icons**
   - Add the icon name to the Props interface in `Icon.astro`
   - Add the corresponding SVG in the component
   - Update this documentation
   - Update any relevant TypeScript interfaces

### Performance

- Icons are inlined SVGs for optimal performance
- No external icon libraries required
- Minimal bundle size impact

### Accessibility

- Icons include proper ARIA labels
- Decorative icons should use `aria-hidden="true"`
- Interactive icons should have proper focus states

## Usage

Import UI components as needed:

```astro
---
import Button from '@/components/ui/Button.astro';
---

<Button variant="primary">Click Me</Button>
```

## Testing and Accessibility Requirements

All UI components must:

- Be fully accessible (ARIA roles, keyboard navigation, colour contrast)
- Support both light and dark mode theming
- Use Australian English spelling and date/currency formats
- Be responsive and mobile-friendly
- Have unit tests for rendering and accessibility

### Contributor Checklist

- [ ] Component is documented with usage and props
- [ ] Accessibility features are implemented and documented
- [ ] Theming (light/dark) is supported and tested
- [ ] Australian standards are followed (spelling, date, currency)
- [ ] Unit tests cover rendering and error states
- [ ] Responsive design is verified

### Example Accessibility Implementation

```astro
---
// Example for CalloutBox
---
<div role="status" aria-live="polite" class="callout-box">
  <slot />
</div>
```

## Contributing

When adding new UI components:

1. Follow the established naming conventions
2. Add proper documentation
3. Include usage examples
4. Add necessary tests

## Shadow System

The shadow system provides consistent, accessible, and performant shadows across the application. It supports both light and dark modes, with smooth transitions and respect for user motion preferences.

### Usage

Import the shadow utilities:

```astro
import "@/styles/shadows.css";
```

Available classes:

- `shadow-soft`: Base soft shadow
- `shadow-soft-hover`: Interactive shadow that changes on hover

### Features

- **Dark Mode Support**: Shadows automatically adjust for dark mode
- **Motion Preferences**: Transitions are disabled for users who prefer reduced motion
- **Performance**: Uses CSS custom properties for efficient theme switching
- **Accessibility**: Maintains sufficient contrast in both light and dark modes

### Example

```astro
<div class="shadow-soft">
  <!-- Content with base shadow -->
</div>

<button class="shadow-soft-hover">
  <!-- Interactive element with hover effect -->
</button>
```

### Best Practices

1. Use `shadow-soft` for static elements that need depth
2. Apply `shadow-soft-hover` to interactive elements
3. Ensure sufficient contrast between the element and its background
4. Test shadows in both light and dark modes
