# Migration Plan

## Phase 1: Design System Restructure

### 1. Theme System Migration

- [x] Create theme token directory structure
  ```
  src/styles/theme/
  ├── colors.ts
  ├── shadows.ts
  ├── spacing.ts
  ├── typography.ts
  ├── transitions.ts
  └── index.ts
  ```
- [x] Move all design tokens from global.css and tokens.css
- [x] Update Tailwind configuration to use theme tokens
- [x] Remove duplicate token definitions

### 2. Component Style Migration

- [ ] Create component-specific style files
  ```
  src/styles/components/
  ├── button.css
  ├── card.css
  ├── tag.css
  └── index.css
  ```
- [ ] Move component styles from global.css
- [ ] Update components to use new style structure
- [ ] Add TypeScript types for component props
- [ ] Add usage examples for new theme tokens in components and documentation

### 3. Landing Page Priority Updates

- [x] Refactor Hero component
- [ ] Refactor Values section
- [ ] Refactor CaseStudies section
- [ ] Refactor Contact section
- [ ] Update layout components

## Phase 2: Technical Debt Resolution

### Documentation

- [ ] Create comprehensive theme documentation
- [ ] Update component documentation
- [ ] Add usage examples
- [ ] Document dark mode implementation
- [x] Expand THEME.md or create a dedicated "Design Tokens" section, including migration rationale, usage patterns, and troubleshooting

### Testing

- [ ] Add theme unit tests
- [ ] Add component visual regression tests
- [ ] Add accessibility tests
- [ ] Add dark mode tests
- [ ] Add tests to ensure consistency between TypeScript token values and generated CSS variables

### Performance

- [ ] Audit CSS bundle size
- [x] Optimise theme token usage
- [ ] Implement CSS variable fallbacks
- [ ] Add performance monitoring
- [ ] Profile build process for token generation and Tailwind integration

### Accessibility

- [ ] Audit color contrast
- [ ] Verify dark mode accessibility
- [ ] Add ARIA attributes
- [ ] Test with screen readers

### Security

- [ ] Audit token generation script for injection and path traversal risks
- [ ] Validate and sanitise all script inputs and outputs

## Technical Debt Items

### High Priority

1. Inconsistent token usage across components
2. Mixed usage of CSS variables and Tailwind classes
3. Duplicate style definitions
4. Missing type definitions
5. Incomplete dark mode support

### Medium Priority

1. Lack of comprehensive documentation
2. Missing component tests
3. Inconsistent shadow implementation
4. Unoptimized CSS bundle

### Low Priority

1. Missing animation tokens
2. Incomplete theme documentation
3. Legacy class names
4. Unused CSS variables

## Timeline

### Week 1

- Set up new theme structure
- Migrate landing page components
- Create initial documentation

### Week 2

- Migrate remaining components
- Add tests
- Update documentation

### Week 3

- Performance optimization
- Accessibility improvements
- Final testing and documentation

## Guidelines for Future Development

1. **Theme Token Usage**

   - Always use theme tokens from `src/styles/theme`
   - No direct color/spacing values in components
   - Document any new tokens

2. **Component Styles**

   - Component-specific styles in dedicated files
   - Use Tailwind classes with theme tokens
   - Document style variations

3. **Testing Requirements**

   - Visual regression tests for components
   - Accessibility tests
   - Dark mode tests
   - Performance benchmarks

4. **Documentation**
   - Update theme documentation
   - Add component usage examples
   - Document breaking changes
   - Maintain changelog
