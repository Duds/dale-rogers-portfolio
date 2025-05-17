# Project Backlog

_All actionable TODOs are now tracked here. For guidelines, rationale, and completed checklists, see MIGRATION.md, TODO.md, and other docs._

---

## 🟢 High Priority (Foundational/Enabling Work)

### 1. Component Style Migration

- [ ] Create component-specific style files (`button.css`, `card.css`, `tag.css`, `index.css`)
- [ ] Move component styles from `global.css`
- [ ] Update components to use new style structure
- [ ] Add TypeScript types for component props
- [ ] Add usage examples for new theme tokens in components and documentation

### 2. Landing Page & Layout Refactors

- [ ] Refactor Values section
- [ ] Refactor CaseStudies section
- [ ] Refactor Contact section
- [ ] Update layout components

### 3. Testing Infrastructure

- [ ] Add theme unit tests
- [ ] Add component visual regression tests
- [ ] Add accessibility tests
- [ ] Add dark mode tests
- [ ] Add tests to ensure consistency between TypeScript token values and generated CSS variables

### 4. Performance

- [ ] Audit CSS bundle size
- [ ] Implement CSS variable fallbacks
- [ ] Add performance monitoring
- [ ] Profile build process for token generation and Tailwind integration

---

## 🟡 Medium Priority (Quality, Documentation, Accessibility)

### 5. Documentation

- [ ] Create comprehensive theme documentation
- [ ] Update component documentation
- [ ] Add usage examples
- [ ] Document dark mode implementation

### 6. Accessibility

- [ ] Audit colour contrast
- [ ] Verify dark mode accessibility
- [ ] Add ARIA attributes
- [ ] Test with screen readers

### 7. Security

- [ ] Audit token generation script for injection and path traversal risks
- [ ] Validate and sanitise all script inputs and outputs

---

## 🟠 Lower Priority (Technical Debt, Structure, Enhancements)

### 8. Technical Debt Items

- [ ] Inconsistent token usage across components
- [ ] Mixed usage of CSS variables and Tailwind classes
- [ ] Duplicate style definitions
- [ ] Missing type definitions
- [ ] Incomplete dark mode support
- [ ] Lack of comprehensive documentation
- [ ] Missing component tests
- [ ] Inconsistent shadow implementation
- [ ] Unoptimised CSS bundle
- [ ] Missing animation tokens
- [ ] Incomplete theme documentation
- [ ] Legacy class names
- [ ] Unused CSS variables

### 9. Component Theme Improvements

- [ ] Implement theme preview in Colophon page

### 10. Performance Optimisation

- [ ] Implement critical CSS loading

### 11. TypeScript Improvements

- [ ] Create `types` directory with common type definitions
- [ ] Add comprehensive type checking to existing components
- [ ] Set up ESLint with TypeScript-specific rules
- [ ] Create TypeScript best practices documentation

### 12. Project Structure Improvements

- [ ] Reorganise components into feature-based directories
- [ ] Add proper README files for each new directory
- [ ] Update import paths across the project
- [ ] Document new structure in ARCHITECTURE.md

### 13. Component Architecture Improvements

- [ ] Implement Error Boundaries

---

## 🔵 Ongoing/Best Practices

- [ ] Track significant changes (CHANGELOG)
- [ ] Link to relevant issue/PR numbers
- [ ] Include migration notes if needed
- [ ] Use consistent file naming and documentation standards
- [ ] Add JSDoc comments for important functions
- [ ] Create README files in major directories
- [ ] Use conventional commits and add commit message validation
