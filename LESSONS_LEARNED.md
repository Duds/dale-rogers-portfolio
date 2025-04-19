# Lessons Learned

## Project Setup & Configuration

- When using npm as the preferred package manager, removing alternative lockfiles (like `pnpm-lock.yaml`) prevents VS Code warnings
- Setting `"npm.packageManager": "npm"` in `.vscode/settings.json` explicitly tells VS Code which package manager to use
- When deleting files that are referenced by TypeScript:
  1. Remove all imports referencing the file
  2. Clean up any TypeScript references
  3. Run a full TypeScript check after deletion
  4. Consider using `tsc --build --clean` to clean up TypeScript's build cache
  5. Update any path aliases or module resolution settings if needed

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
   - Background colours need careful consideration for contrast
   - Shadow effects should be adjusted for dark backgrounds
   - Border colours should maintain visibility
   - Test dark mode across all breakpoints

## Layout Pattern Implementation

1. **Standardization Benefits**

   - Consistent implementation across components improves maintainability
   - Global CSS classes reduce code duplication
   - Clear documentation helps with onboarding
   - Easier to update patterns across the site

2. **Implementation Challenges**

   - Need to carefully manage padding and margins
   - Must consider responsive behaviour at all breakpoints
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

## Component Organization

### Component Duplication and Location

1. **Issue Encountered**

   - Multiple copies of the same component (`Services.astro`) found in different locations
   - Inconsistent component placement led to confusion
   - TypeScript errors due to improper typing in duplicated components
   - Dark mode implementation varied between copies

2. **Resolution**

   - Implemented feature-based architecture pattern
   - Moved components to correct feature directories
   - Added proper TypeScript types and interfaces
   - Consolidated styles and dark mode implementation

3. **Best Practices Established**

   - Follow feature-based directory structure
   - Keep components in their respective feature directories
   - Use proper TypeScript typing from the start
   - Document component purpose and location
   - Implement consistent styling patterns

4. **Benefits Observed**
   - Better code organization
   - Improved maintainability
   - Reduced confusion and technical debt
   - Consistent implementation across features
   - Easier to locate and update components

### Prevention Strategies

1. **Code Review Process**

   - Check for component duplicates
   - Verify correct component location
   - Ensure proper TypeScript implementation
   - Validate styling consistency

2. **Development Guidelines**
   - Follow established folder structure
   - Use proper import paths
   - Implement consistent typing
   - Document component locations

## Type Safety in Component Systems

### Icon Type Safety

1. **Issue Encountered**

   - TypeScript errors when using string literals for icon names
   - Lack of type safety in icon usage across components
   - Potential for runtime errors with invalid icon names

2. **Resolution**

   - Implemented strict typing for icon names using TypeScript unions
   - Added proper interfaces for components using icons
   - Used `as const` assertions for icon arrays
   - Updated documentation with type-safe usage examples

3. **Best Practices Established**

   - Define explicit types for component props
   - Use union types for finite sets of options
   - Document available options in component README
   - Implement type guards where necessary

4. **Benefits Observed**
   - Catch icon name errors at compile time
   - Better IDE support with autocompletion
   - Reduced runtime errors
   - Improved maintainability

### Prevention Strategies

1. **Development Process**

   - Create interfaces before implementing components
   - Use TypeScript's strict mode
   - Document type constraints
   - Add type safety examples to component docs

2. **Code Review Checklist**
   - Verify proper type definitions
   - Check for type assertions
   - Ensure documentation matches types
   - Test with TypeScript strict mode

## Documentation and Type Safety

### JSDoc Implementation

1. **Early Documentation Benefits**

   - Writing JSDoc comments during initial component creation saves time
   - Comprehensive interface documentation improves team collaboration
   - Examples in documentation help prevent misuse
   - Clear property descriptions reduce confusion

2. **Best Practices Established**

   - Document all interface properties with clear descriptions
   - Include usage examples in component documentation
   - Add type constraints and validation rules
   - Document accessibility considerations
   - Include Australian English spelling in documentation

3. **Prevention Strategies**

   - Set up ESLint rules for JSDoc enforcement
   - Include JSDoc review in code review process
   - Maintain documentation style guide
   - Regular documentation audits

### Component Evolution Patterns

1. **Interface Management**

   - Start with minimal viable interface
   - Document interface changes in changelog
   - Use TypeScript strict mode for type safety
   - Plan for future property additions

2. **Prop Evolution**

   - Consider backwards compatibility
   - Document breaking changes clearly
   - Use optional properties for new features
   - Implement proper default values

3. **Migration Strategies**

   - Create migration guides for breaking changes
   - Use TypeScript to catch usage errors
   - Provide codemods for automated updates
   - Document upgrade paths

### Australian Localisation

1. **Content Considerations**

   - Use Australian English spelling consistently
   - Follow Australian date formats (DD/MM/YYYY)
   - Implement Australian time zones
   - Use metric measurements

2. **Documentation Standards**

   - Maintain Australian English in comments
   - Use Australian terminology
   - Document regional considerations
   - Include Australian examples

3. **Best Practices**

   - Set up spell checking for Australian English
   - Document regional variations
   - Consider international accessibility
   - Test with Australian users

### Component Lifecycle Management

1. **Initial Implementation**

   - Start with comprehensive interface documentation
   - Include usage examples
   - Document accessibility features
   - Plan for extensibility

2. **Maintenance Phase**

   - Track interface changes
   - Document bug fixes
   - Monitor performance
   - Update examples

3. **Evolution Strategy**

   - Plan breaking changes carefully
   - Maintain backwards compatibility
   - Document upgrade paths
   - Consider performance impact

4. **Deprecation Process**
   - Announce deprecations early
   - Provide migration guides
   - Support transition period
   - Document alternatives

## Rules for Future Development

1. **Documentation First**

   - Write JSDoc comments before implementation
   - Include usage examples
   - Document accessibility features
   - Maintain Australian English standards

2. **Interface Design**

   - Start with minimal viable interface
   - Plan for extensibility
   - Document breaking changes
   - Consider backwards compatibility

3. **Code Quality**

   - Use TypeScript strict mode
   - Implement proper error handling
   - Add comprehensive tests
   - Monitor performance

4. **Accessibility**

   - Document ARIA attributes
   - Test with screen readers
   - Maintain keyboard navigation
   - Consider regional requirements

5. **Maintenance**
   - Regular documentation updates
   - Performance monitoring
   - Accessibility audits
   - Code quality reviews
