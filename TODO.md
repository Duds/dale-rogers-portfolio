# Portfolio TODO List

## Completed Items ✓

- [x] Standardize package manager (npm)
- [x] Fix Node adapter configuration
- [x] Resolve content collection naming issues
- [x] Add Australian English spell checking
- [x] Create LESSONS_LEARNED.md
- [x] Document package manager decision
- [x] Document adapter configuration decision
- [x] Add more technical decisions as they arise
- [x] Document system architecture
- [x] Include component relationships
- [x] API integrations
- [x] Data flow diagrams
- [x] Update with npm-specific instructions
- [x] Add content collection guidelines
- [x] Add adapter troubleshooting section
- [x] Keep updated with all environment variables
- [x] Include descriptions for each variable
- [x] Document any required third-party credentials
- [x] Track significant changes
- [x] Link to relevant issue/PR numbers
- [x] Include migration notes if needed
- [x] Component files: PascalCase (e.g., `ContactForm.astro`)
- [x] Utility files: camelCase (e.g., `emailUtils.ts`)
- [x] Documentation: UPPERCASE.md
- [x] Document email sending functions
- [x] Document content collection utilities
- [x] Document more utility functions
- [x] Implement commit message guidelines

## Analytics Setup

- [ ] Deploy Umami Analytics (Low Priority - Postponed until deployment)
  - [ ] Deploy separately from main site for better maintainability
  - [ ] Options: Vercel, Railway, or existing hosting
  - [ ] Need: PostgreSQL database (consider Neon or Supabase)
  - [ ] Add script tag to Astro site after deployment
  - [ ] Document deployment details in DEPLOYMENT.md

## Documentation Improvements

For better AI context and collaboration, maintain these documentation files:

### DECISIONS.md

- [x] Document package manager decision
- [x] Document adapter configuration decision
- [x] Add more technical decisions as they arise

### ARCHITECTURE.md

- [x] Document system architecture
- [x] Include component relationships
- [x] API integrations
- [x] Data flow diagrams

### DEVELOPMENT.md

- [x] Update with npm-specific instructions
- [x] Add content collection guidelines
- [x] Add adapter troubleshooting section
- [x] Add testing procedures (Manual testing for now)

### .env.example

- [x] Keep updated with all environment variables
- [x] Include descriptions for each variable
- [x] Document any required third-party credentials

### CHANGELOG.md

- [x] Track significant changes
- [x] Link to relevant issue/PR numbers
- [x] Include migration notes if needed

## Best Practices for AI Context

1. Use consistent file naming:

   - [x] Component files: PascalCase (e.g., `ContactForm.astro`)
   - [x] Utility files: camelCase (e.g., `emailUtils.ts`)
   - [x] Documentation: UPPERCASE.md

2. Add JSDoc comments for important functions:

   - [x] Document email sending functions
   - [x] Document content collection utilities
   - [x] Document more utility functions

3. Create README files in major directories:

   - [x] `/src/components/README.md`
   - [x] `/src/layouts/README.md`
   - [x] `/src/pages/README.md`

4. Use conventional commits:
   - [x] Implement commit message guidelines
   - [ ] Add commit message validation

## Current Development Tasks

- [ ] Component Theme Improvements
  - [ ] Create theme documentation with color palette and usage guidelines
  - [ ] Add theme toggle functionality
  - [ ] Implement theme preview in Colophon page
  - [ ] Create theme migration guide for future updates
- [ ] Accessibility Enhancements
  - [ ] Add ARIA labels to all interactive elements
  - [ ] Implement keyboard navigation for mobile menu
  - [ ] Add skip-to-content link
  - [ ] Test with screen readers
- [ ] Performance Optimization
  - [ ] Audit CSS custom property usage
  - [ ] Consider extracting common styles to utility classes
  - [ ] Implement critical CSS loading

// TODO: Add error handling here
// FIXME: This needs optimization
// [ ] Implement this feature
