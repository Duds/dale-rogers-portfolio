# Lessons Learned

This document captures important lessons learned during development to prevent future issues and improve development practices.

## 🎯 Component Organization

### Component Structure Requirements

**Lesson**: Components must follow strict directory structure and include all required files.

**What We Learned**:

- Each component needs its own directory with proper organization
- TypeScript types must be defined before use
- CSS files must be imported in the correct order
- Documentation must be in Australian English

**Best Practice**:

```typescript
// Always define props interface first
interface Props {
  /** Description of the prop */
  prop: string;
}

// Then use the props
const { prop } = Astro.props;
```

## 🔧 Development Standards

### TypeScript Best Practices

**Lesson**: Proper TypeScript configuration prevents many runtime errors.

**What We Learned**:

- Use strict type checking mode
- Define complete component interfaces before use
- Avoid `any` types
- Use type guards for conditional logic

**Best Practice**:

```typescript
// Good: Complete interface definition
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

// Bad: Using props without interface
const { variant } = Astro.props; // ❌ No type safety
```

## 🎨 Theme System

### SVG Theming and Hover States

**Lesson**: SVG color control requires explicit styling approaches.

**What We Learned**:

- Using `currentColor` alone is not reliable for SVG hover states
- Explicit color declarations with `!important` ensure proper specificity
- Separate hover rules for light and dark modes are necessary
- Keep SVG markup simple and avoid unnecessary nesting

**Best Practice**:

```css
/* Most reliable approach for SVG color control */
.theme-toggle svg {
  color: black !important;
  fill: black !important;
}

.dark .theme-toggle svg {
  color: white !important;
  fill: white !important;
}
```

## 🚫 PostCSS and Tailwind CSS v4

### Configuration Integration is Critical

**Lesson**: Tailwind CSS v4 Vite plugin must be configured inside Astro config, not in separate Vite config.

**What We Learned**:

- **Separate `vite.config.ts` causes `@apply` directive failures**
- **Plugin must be in `astro.config.mjs` for proper integration**
- PostCSS is not needed and causes dependency conflicts
- CSS import order matters for Tailwind CSS v4

**Root Cause**:
When migrating from React to Astro components, the Tailwind CSS configuration was moved to a separate `vite.config.ts` file. This prevented the plugin from properly integrating with Astro's build pipeline, causing `@apply` directives to fail.

**Correct Configuration**:

```typescript
// astro.config.mjs - CORRECT ✅
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwind()],
    // Tailwind CSS v4 processed through Vite plugin for best DX and HMR
  },
});
```

**Incorrect Configuration**:

```typescript
// vite.config.ts - INCORRECT ❌ (causes @apply issues)
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**CSS Import Structure**:

```css
/* Main CSS file - global.css */
@import './generated-tokens.css';
@import 'tailwindcss';
/* Other imports must come after Tailwind import */

/* Component CSS files */
@reference "tailwindcss";

.component {
  @apply bg-white text-black;
}
```

**Prevention**:

- Always configure Tailwind CSS Vite plugin inside `astro.config.mjs`
- Never use separate `vite.config.ts` file for Tailwind CSS
- Use `@reference "tailwindcss"` in component CSS files for `@apply` support
- Ensure all `@import` statements come before other CSS directives

**Why This Matters**:

1. **Build Integration**: Plugin must be part of Astro's build pipeline
2. **CSS Processing**: Component CSS files need proper processing order
3. **@apply Support**: `@reference` directives only work with integrated plugin
4. **Performance**: Better integration means faster builds and HMR

## 🧪 Testing

### E2E Testing Strategy

**Lesson**: Playwright E2E tests are more valuable than unit tests for Astro components.

**What We Learned**:

- Astro components are primarily visual and interactive
- E2E tests catch real user experience issues
- Unit tests for Astro components have limited value
- Focus on user workflows and accessibility

**Best Practice**:

```typescript
// Test user interactions, not component internals
test('Button component renders and is clickable', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button');
  await expect(button).toBeVisible();
  await button.click();
});
```

## 📚 Documentation

### Keeping Documentation Current

**Lesson**: Documentation must be updated with every code change.

**What We Learned**:

- Outdated documentation causes confusion
- Rules and standards must evolve with the codebase
- Troubleshooting guides prevent repeated issues
- Clear examples prevent configuration mistakes

**Best Practice**:

- Update documentation as part of every commit
- Include examples of correct vs. incorrect usage
- Document troubleshooting steps for common issues
- Keep rules and standards current

## 🚀 Performance

### Build Optimization

**Lesson**: Proper tool integration provides better performance than manual optimization.

**What We Learned**:

- Tailwind CSS v4 with Vite plugin is faster than PostCSS
- Astro integration provides better build pipeline
- Fewer configuration files mean faster builds
- Native HMR improves development experience

**Best Practice**:

- Use integrated tools over separate configurations
- Minimize build configuration complexity
- Leverage framework-native optimizations
- Test build performance regularly

## 🔍 Debugging

### Systematic Problem Solving

**Lesson**: Methodical debugging prevents repeated issues.

**What We Learned**:

- Start with health checks and known solutions
- Document solutions for future reference
- Create rules to prevent common mistakes
- Use version control to understand what changed

**Best Practice**:

1. Run health checks first
2. Check recent changes and migrations
3. Compare with working configurations
4. Document the solution and create prevention rules

## 📋 Checklist for Future Changes

### Before Making Changes

- [ ] Check current working configuration
- [ ] Understand integration requirements
- [ ] Test configuration changes incrementally
- [ ] Update documentation and rules
- [ ] Create troubleshooting guides for new issues

### After Making Changes

- [ ] Verify all functionality works
- [ ] Test build and development processes
- [ ] Update relevant documentation
- [ ] Create or update prevention rules
- [ ] Document lessons learned

---

**Remember**: These lessons prevent future issues and improve development practices. Always document new lessons and update existing ones as the codebase evolves.
