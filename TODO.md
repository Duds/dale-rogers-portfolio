# Portfolio TODO List

## Completed Items ✓

- [ ] Standardize package manager (npm)
- [ ] Fix Node adapter configuration
- [ ] Resolve content collection naming issues
- [ ] Add Australian English spell checking
- [ ] Create LESSONS_LEARNED.md
- [ ] Document package manager decision
- [ ] Document adapter configuration decision
- [ ] Add more technical decisions as they arise
- [ ] Document system architecture
- [ ] Include component relationships
- [ ] API integrations
- [ ] Data flow diagrams
- [ ] Update with npm-specific instructions
- [ ] Add content collection guidelines
- [ ] Add adapter troubleshooting section
- [ ] Keep updated with all environment variables
- [ ] Include descriptions for each variable
- [ ] Document any required third-party credentials
- [ ] Track significant changes
- [ ] Link to relevant issue/PR numbers
- [ ] Include migration notes if needed
- [ ] Component files: PascalCase (e.g., `ContactForm.astro`)
- [ ] Utility files: camelCase (e.g., `emailUtils.ts`)
- [ ] Documentation: UPPERCASE.md
- [ ] Document email sending functions
- [ ] Document content collection utilities
- [ ] Document more utility functions
- [ ] Implement commit message guidelines

## Analytics Setup

- [ ] Deploy Umami Analytics (Low Priority - Postponed until deployment)
  - [ ] Containerise Umami Analytics setup
    - [ ] Create Docker Compose configuration
    - [ ] Set up PostgreSQL container
    - [ ] Configure Umami container
    - [ ] Add environment configuration
  - [ ] Deployment Options
    - [ ] Primary: Deploy to Crazy Domains Linux server
      - [ ] Set up Docker environment
      - [ ] Configure reverse proxy
      - [ ] Set up SSL certificates
    - [ ] Alternative: Azure Container Apps (if chosen)
      - [ ] Configure Azure Container Registry
      - [ ] Set up Azure Database for PostgreSQL
      - [ ] Configure Azure networking
  - [ ] Add script tag to Astro site after deployment
  - [ ] Document deployment details in DEPLOYMENT.md
    - [ ] Add container configuration guide
    - [ ] Document backup procedures
    - [ ] Include monitoring setup
    - [ ] Add troubleshooting steps

## Documentation Improvements

For better AI context and collaboration, maintain these documentation files:

### DECISIONS.md

- [ ] Document package manager decision
- [ ] Document adapter configuration decision
- [ ] Add more technical decisions as they arise

### ARCHITECTURE.md

- [ ] Document system architecture
- [ ] Include component relationships
- [ ] API integrations
- [ ] Data flow diagrams

### DEVELOPMENT.md

- [ ] Update with npm-specific instructions
- [ ] Add content collection guidelines
- [ ] Add adapter troubleshooting section
- [ ] Add testing procedures (Manual testing for now)

### .env.example

- [ ] Keep updated with all environment variables
- [ ] Include descriptions for each variable
- [ ] Document any required third-party credentials

### CHANGELOG.md

- [ ] Track significant changes
- [ ] Link to relevant issue/PR numbers
- [ ] Include migration notes if needed

## Best Practices for AI Context

1. Use consistent file naming:

   - [ ] Component files: PascalCase (e.g., `ContactForm.astro`)
   - [ ] Utility files: camelCase (e.g., `emailUtils.ts`)
   - [ ] Documentation: UPPERCASE.md

2. Add JSDoc comments for important functions:

   - [ ] Document email sending functions
   - [ ] Document content collection utilities
   - [ ] Document more utility functions

3. Create README files in major directories:

   - [ ] `/src/components/README.md`
   - [ ] `/src/layouts/README.md`
   - [ ] `/src/pages/README.md`

4. Use conventional commits:
   - [ ] Implement commit message guidelines
   - [ ] Add commit message validation

## Current Development Tasks

- [ ] CaseStudyCard Component Improvements (Estimated: 1.5-2 hours)

  - [ ] Feature Enhancements (30 minutes)
    - [ ] Add image support
    - [ ] Implement card hover effects
    - [ ] Add read time indicator
    - [ ] Include project status badge
  - [ ] Accessibility Improvements (15 minutes)
    - [ ] Add proper ARIA labels
    - [ ] Enhance keyboard navigation
    - [ ] Implement focus indicators
    - [ ] Test with screen readers
  - [ ] TypeScript Improvements (10 minutes)
    - [ ] Add stricter prop types
    - [ ] Implement type guards
    - [ ] Document type definitions
  - [ ] Testing Implementation (30 minutes)
    - [ ] Create unit tests
    - [ ] Add integration tests
    - [ ] Test edge cases
  - [ ] Documentation Updates (15 minutes)
    - [ ] Add usage examples
    - [ ] Document props API
    - [ ] Include customisation guide

- [ ] Component Theme Improvements
  - [ ] Create theme documentation with colour palette and usage guidelines
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

## TypeScript Improvements

- [ ] Type System Enhancement (Estimated: 4-7 hours)
  - [ ] Create `types` directory with common type definitions (1 hour)
    - [ ] Define shared interfaces
    - [ ] Create utility types
    - [ ] Document type usage patterns
  - [ ] Add comprehensive type checking to existing components (2-3 hours)
    - [ ] Audit current type usage
    - [ ] Add missing type definitions
    - [ ] Implement proper prop types
    - [ ] Remove any usage of `any` type
  - [ ] Set up ESLint with TypeScript-specific rules (1 hour)
    - [ ] Configure @typescript-eslint
    - [ ] Add custom rule set
    - [ ] Implement automated fixing where possible
  - [ ] Create TypeScript best practices documentation (1-2 hours)
    - [ ] Document type definition standards
    - [ ] Add examples of proper type usage
    - [ ] Include troubleshooting guide
    - [ ] Add section on common TypeScript patterns

## Project Structure Improvements

- [ ] Directory Organisation Enhancement (Estimated: 2-3 hours)
  - [ ] Reorganise components into feature-based directories
    - [ ] Create `ui/` for shared UI components
    - [ ] Create `layout/` for layout components
    - [ ] Create `features/` for feature-specific components
  - [ ] Add proper README files for each new directory
  - [ ] Update import paths across the project
  - [ ] Document new structure in ARCHITECTURE.md

## Component Architecture Improvements

- [ ] Component Enhancement (Estimated: 4-5 hours)
  - [ ] Implement Error Boundaries
    - [ ] Create base error boundary component
    - [ ] Add fallback UI components
    - [ ] Implement error logging

## Testing Infrastructure

- [x] Testing Setup and Implementation (Estimated: 8-10 hours)
  - [x] Unit Testing Infrastructure (3-4 hours)
    - [x] Set up Jest/Vitest configuration
    - [x] Create test utilities and helpers
    - [x] Implement component unit tests
    - [x] Add test documentation
  - [x] Integration Testing (3-4 hours)
    - [x] Set up integration test framework
    - [x] Create test scenarios
    - [x] Implement API integration tests
  - [x] E2E Testing (2-3 hours)
    - [x] Set up Playwright or Cypress
    - [x] Create critical path test scenarios
    - [x] Implement automated UI tests

## Enhanced Accessibility Implementation

- [x] Accessibility Improvements (Estimated: 5-6 hours)
  - [x] Core Accessibility Features
    - [x] Implement proper heading hierarchy
    - [x] Add skip links for main content
    - [x] Enhance keyboard navigation
  - [x] ARIA Implementation
    - [x] Add ARIA labels to all interactive elements
    - [x] Implement ARIA landmarks
    - [x] Add descriptive alt text for images
  - [x] Testing and Validation
    - [x] Test with screen readers
    - [x] Validate colour contrast
    - [x] Check keyboard navigation paths

## Performance Optimisation

- [x] Performance Improvements (Estimated: 6-7 hours)
  - [x] Asset Optimisation
    - [x] Implement image optimisation
    - [x] Add lazy loading for below-the-fold content
    - [x] Optimise font loading
  - [x] Caching Strategy
    - [x] Implement proper caching strategies
    - [x] Add service worker for offline support
    - [x] Cache static assets
  - [x] Code Optimisation
    - [x] Implement code splitting
    - [x] Optimise bundle size
    - [x] Remove unused code

## Security Enhancements

- [x] Security Implementation (Estimated: 4-5 hours)
  - [x] Headers and Policies
    - [x] Add Content Security Policy headers
    - [x] Implement CORS policies
    - [x] Add security headers
  - [x] Input/Output Security
    - [x] Implement input sanitisation
    - [x] Add output encoding
    - [x] Validate file uploads
  - [x] Security Documentation
    - [x] Create security.md
    - [x] Document security policies
    - [x] Add security update procedures
  - [x] Automated Security
    - [x] Set up dependency scanning
    - [x] Implement automated security checks
    - [x] Add security update automation

## Documentation Expansion

- [x] Documentation Enhancement (Estimated: 3-4 hours)
  - [x] Component Documentation
    - [x] Create component usage guides
    - [x] Add prop documentation
    - [x] Include example implementations
  - [x] Development Guides
    - [x] Update development workflow documentation
    - [x] Add troubleshooting guides
    - [x] Create contribution guidelines
  - [x] API Documentation
    - [x] Document all API endpoints
    - [x] Add request/response examples
    - [x] Include error handling documentation

## JSDoc Implementation

- [x] Site-wide JSDoc Documentation (Estimated: 4-5 hours)

  - [x] Component Documentation (2 hours)

    - [x] Add comprehensive interface documentation
      ```typescript
      /**
       * Props for the CaseStudyCard component
       * @interface Props
       * @property {string} title - The title of the case study
       * @property {string} description - Detailed description of the case study
       * @property {string} client - Name of the client
       * @property {string} industry - Industry sector of the project
       * @property {string} duration - Project duration (e.g., "3 months")
       * @property {string[]} tags - Array of technology/skill tags
       * @property {string} href - URL to the full case study
       */
      ```
    - [x] Document component functionality and usage
    - [x] Add example usage snippets
    - [x] Document component lifecycle methods
    - [x] Add accessibility notes

  - [x] Utility Functions (1 hour)

    - [x] Document function parameters
    - [x] Add return type documentation
    - [x] Include usage examples
    - [x] Document error handling
    - [x] Add performance considerations

  - [x] Types and Interfaces (30 minutes)

    - [x] Document shared types
    - [x] Add interface descriptions
    - [x] Include property constraints
    - [x] Document generic types

  - [x] Constants and Configuration (30 minutes)

    - [x] Document environment variables
    - [x] Add configuration object documentation
    - [x] Include validation rules
    - [x] Document default values

  - [x] Setup ESLint JSDoc Rules (1 hour)
    - [x] Configure @typescript-eslint/eslint-plugin-tsdoc
    - [x] Set up required JSDoc rules
    - [x] Add automated validation
    - [x] Create documentation style guide

## Australian English Implementation

- [x] Project-wide Australian English Audit (Estimated: 3-4 hours)
  - [x] Content Review (1 hour)
    - [x] Check all content for American spellings
    - [x] Update documentation terminology
    - [x] Review error messages
    - [x] Audit component text
  - [x] Code Review (1 hour)
    - [x] Check variable names
    - [x] Review function names
    - [x] Audit comments
    - [x] Check string literals
  - [x] Documentation Update (1 hour)
    - [x] Update README files
    - [x] Review API documentation
    - [x] Check component documentation
    - [x] Update contribution guidelines
  - [x] Testing (30 minutes)
    - [x] Test date formats
    - [x] Verify time formats
    - [x] Check currency displays
    - [x] Test localisation features

## Component Organization Cleanup

- [x] Component Migration (Estimated: 2-3 hours)
  - [x] Audit Current Structure (30 minutes)
    - [x] List all components
    - [x] Identify current locations
    - [x] Document dependencies
    - [x] Note usage patterns
  - [x] Migration Plan (30 minutes)
    - [x] Create component map
    - [x] Plan migration order
    - [x] Document breaking changes
    - [x] Create backup strategy
  - [x] Implementation (1-2 hours)
    - [x] Move components to new locations
    - [x] Update import paths
    - [x] Fix broken references
    - [x] Test functionality
  - [x] Documentation (30 minutes)
    - [x] Update component docs
    - [x] Document new structure
    - [x] Create migration guide
    - [x] Update examples

## Work and Search Implementation Priority Order

1. [x] Work Page Core Improvements (Estimated: 9-11 hours)

   - [x] Layout and Spacing Fixes (2-3 hours) [PRIORITY 1]

     - [x] Add proper padding for fixed header
     - [x] Create hero section with intro copy
     - [x] Implement grid layout
     - [x] Test responsive behaviour

   - [x] Content Improvements (3-4 hours) [PRIORITY 1]

     - [x] Write introductory section
     - [x] Add key statistics
     - [x] Update experience metrics
     - [x] Review content for Australian English

   - [x] Visual Enhancements (4-5 hours) [PRIORITY 1]
     - [x] Create masonry grid layout
     - [x] Implement hover states
     - [x] Add project status badges
     - [x] Design featured case study section
     - [x] Test visual consistency

2. [ ] Work Page Pagination Implementation (Estimated: 8-10 hours) [NEW]

   - [ ] Server-side Pagination (4-5 hours)

     - [ ] Implement proper data fetching
     - [ ] Add page size configuration
     - [ ] Create pagination utilities
     - [ ] Optimise query performance
     - [ ] Add error handling

   - [ ] Client-side Integration (2-3 hours)

     - [ ] Enhance load more functionality
     - [ ] Add loading states
     - [ ] Implement smooth transitions
     - [ ] Handle edge cases
     - [ ] Add error recovery

   - [ ] Analytics and Monitoring (2 hours)
     - [ ] Track pagination usage
     - [ ] Monitor performance
     - [ ] Add error tracking
     - [ ] Implement usage analytics

3. [ ] Work Page Filtering and Sorting (6-9 hours)

   - [ ] Filtering System (4-6 hours) [PRIORITY 2]

     - [ ] Add filter categories:
       - [ ] Industry sectors
       - [ ] Project type
       - [ ] Year completed
       - [ ] Technology stack
     - [ ] Implement accessible filter chips
     - [ ] Add clear filters functionality
     - [ ] Test filter combinations

   - [ ] Enhanced Sorting Options (2-3 hours) [PRIORITY 2]
     - [ ] Implement sort by:
       - [ ] Date (newest/oldest)
       - [ ] Project duration
       - [ ] Complexity level
       - [ ] Impact metrics
     - [ ] Add visual sorting indicators
     - [ ] Test sort performance

4. [ ] Semantic Search Implementation (Estimated: 12-15 hours)

   - [ ] Search Infrastructure Setup (4-5 hours) [PRIORITY 3]

     - [ ] Research and select search library
     - [ ] Set up search index generation
     - [ ] Implement content indexing pipeline
     - [ ] Create search utility functions
     - [ ] Test search performance

   - [ ] Search UI Components (4-5 hours) [PRIORITY 3]

     - [ ] Design and implement search bar in header
     - [ ] Create search results overlay/modal
     - [ ] Add keyboard navigation for results
     - [ ] Implement search highlighting
     - [ ] Add loading states
     - [ ] Test responsive behaviour

   - [ ] Search Features (4-5 hours) [PRIORITY 3]
     - [ ] Implement fuzzy search
     - [ ] Add search filters
     - [ ] Add search analytics
     - [ ] Implement search suggestions
     - [ ] Create "No results" experience
     - [ ] Test search accuracy

5. [ ] Optimisation and Enhancement (10-13 hours)

   - [ ] Mobile Optimisation (3-4 hours) [PRIORITY 4]

     - [ ] Design collapsible filter menu
     - [ ] Implement touch-friendly filters
     - [ ] Create responsive grid
     - [ ] Optimise mobile images
     - [ ] Test on various devices

   - [ ] Performance Considerations (2-3 hours) [PRIORITY 4]

     - [ ] Implement lazy loading
     - [ ] Add image placeholders
     - [ ] Set up filter result caching
     - [ ] Optimise animations
     - [ ] Conduct performance testing

   - [ ] Interaction Improvements (3-4 hours) [PRIORITY 4]

     - [ ] Add filter state transitions
     - [ ] Implement loading states
     - [ ] Add "Back to top" functionality
     - [ ] Enhance keyboard navigation
     - [ ] Test interaction flows

   - [ ] Accessibility and SEO (2-3 hours) [PRIORITY 4]
     - [ ] Add ARIA labels
     - [ ] Implement focus management
     - [ ] Add screen reader announcements
     - [ ] Create high contrast mode
     - [ ] Test with assistive technologies
     - [ ] Add schema markup
     - [ ] Create meta descriptions
     - [ ] Implement OpenGraph images
     - [ ] Add structured data
     - [ ] Test SEO optimisations

Total Estimated Time: 37-48 hours

Dependencies and Notes:

- Search implementation should begin after core Work page improvements
- Filter system should be designed to work with both manual filtering and search results
- Performance optimisation should be done after all major features are implemented
- All new features must follow Australian English standards
- Accessibility requirements must be considered at each stage

// TODO: Add error handling here
// FIXME: This needs optimization
// [ ] Implement this feature

> Note: All items have been migrated to GitHub Issues.
