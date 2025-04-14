# Lessons Learned

## Project Setup & Configuration

- When using npm as the preferred package manager, removing alternative lockfiles (like `pnpm-lock.yaml`) prevents VS Code warnings
- Setting `"npm.packageManager": "npm"` in `.vscode/settings.json` explicitly tells VS Code which package manager to use

## Astro Specifics

- Content collection names in `getCollection()` calls must exactly match how they're exported in `src/content/config.ts` (e.g., `"case-studies"` not `"caseStudies"`)
- The Node adapter must be configured using the `adapter` property in `astro.config.mjs`, not just in the `integrations` array
- TypeScript errors with content collections can be bypassed using `as any` type assertions when needed
- Dynamic routes using `getStaticPaths()` will be server-rendered by default when using SSR mode

## TypeScript

- Create interfaces for content collection entries to improve type safety and editor support
- Use type assertions strategically to overcome TypeScript constraints when working with dynamic content

## Development Workflow

- Always run a build after making significant changes to content collections or server-side code
- Australian English spell checking can be enabled through the Code Spell Checker extension with `"cSpell.language": "en,en-AU"` in settings

## Build Process

- The warning about `getStaticPaths()` being ignored in dynamic pages is normal in server output mode - these pages will be rendered on-demand rather than pre-generated

## Design System

### Component Theming

1. **Centralized Theme Configuration**

   - Moving theme variables to a central location improves maintainability
   - Using CSS custom properties provides flexibility
   - Component-specific theme variables enhance modularity
   - Clear naming conventions are crucial

2. **Responsive Typography**

   - Clamp() function is powerful for fluid typography
   - Viewport units need careful consideration
   - Breaking points should align with content
   - Type scale needs testing across devices

3. **Layout Patterns**
   - Full-width designs need careful spacing
   - Edge-to-edge layouts enhance visual impact
   - Container constraints can limit design
   - Consistent spacing systems are important

## LogoSalad Component Implementation

1. **Grid Layout**

   - CSS Grid provides better control than Flexbox for logo arrangements
   - Responsive column counts need careful testing across breakpoints
   - Gap spacing should be proportional to logo sizes
   - Grid areas help maintain consistent spacing

2. **Performance Optimization**

   - Lazy loading significantly improves initial page load
   - `fetchpriority="low"` helps prioritize critical content
   - Image dimensions should be specified to prevent layout shifts
   - Consider using WebP format for better compression

3. **Accessibility**

   - Descriptive alt text is crucial for screen readers
   - ARIA labels should be specific to each logo
   - Hover states need sufficient contrast
   - Focus indicators should be visible and consistent

4. **Dark Mode**
   - Background colors need careful consideration for contrast
   - Shadow effects should be adjusted for dark backgrounds
   - Border colors should maintain visibility
   - Test dark mode across all breakpoints

## Layout Pattern Implementation

1. **Standardization Benefits**

   - Consistent implementation across components improves maintainability
   - Global CSS classes reduce code duplication
   - Clear documentation helps with onboarding
   - Easier to update patterns across the site

2. **Implementation Challenges**

   - Need to carefully manage padding and margins
   - Must consider responsive behavior at all breakpoints
   - Content width constraints require careful planning
   - Full-width elements need special consideration

3. **Best Practices**

   - Use semantic HTML structure
   - Maintain consistent spacing
   - Consider accessibility in layout decisions
   - Test across all breakpoints
   - Document pattern usage

4. **Future Considerations**
   - Plan for additional layout variants
   - Consider component-specific overrides
   - Monitor performance impact
   - Gather feedback on usability

## Future Considerations

### Scalability

1. **Theme System**

   - Plan for theme expansion
   - Consider dark mode implementation
   - Document theme structure
   - Maintain consistent patterns

2. **Component Library**
   - Build reusable components
   - Document usage patterns
   - Consider edge cases
   - Test across contexts

### Maintenance

1. **Documentation**

   - Keep documentation current
   - Use automated tools
   - Maintain clear structure
   - Document decisions

2. **Code Quality**
   - Follow consistent patterns
   - Use type safety
   - Consider performance
   - Test thoroughly
