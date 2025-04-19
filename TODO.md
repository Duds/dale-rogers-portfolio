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
  - [ ] Enhance Component Props
    - [ ] Add proper prop type validation
    - [ ] Implement default props
    - [ ] Document prop interfaces
  - [ ] Style Management
    - [ ] Extract common styles into themed components
    - [ ] Create style guide documentation
    - [ ] Implement style composition patterns

## Testing Infrastructure

- [ ] Testing Setup and Implementation (Estimated: 8-10 hours)
  - [ ] Unit Testing Infrastructure (3-4 hours)
    - [ ] Set up Jest/Vitest configuration
    - [ ] Create test utilities and helpers
    - [ ] Implement component unit tests
    - [ ] Add test documentation
  - [ ] Integration Testing (3-4 hours)
    - [ ] Set up integration test framework
    - [ ] Create test scenarios
    - [ ] Implement API integration tests
  - [ ] E2E Testing (2-3 hours)
    - [ ] Set up Playwright or Cypress
    - [ ] Create critical path test scenarios
    - [ ] Implement automated UI tests

## Enhanced Accessibility Implementation

- [ ] Accessibility Improvements (Estimated: 5-6 hours)
  - [ ] Core Accessibility Features
    - [ ] Implement proper heading hierarchy
    - [ ] Add skip links for main content
    - [ ] Enhance keyboard navigation
  - [ ] ARIA Implementation
    - [ ] Add ARIA labels to all interactive elements
    - [ ] Implement ARIA landmarks
    - [ ] Add descriptive alt text for images
  - [ ] Testing and Validation
    - [ ] Test with screen readers
    - [ ] Validate colour contrast
    - [ ] Check keyboard navigation paths

## Performance Optimisation

- [ ] Performance Improvements (Estimated: 6-7 hours)
  - [ ] Asset Optimisation
    - [ ] Implement image optimisation
    - [ ] Add lazy loading for below-the-fold content
    - [ ] Optimise font loading
  - [ ] Caching Strategy
    - [ ] Implement proper caching strategies
    - [ ] Add service worker for offline support
    - [ ] Cache static assets
  - [ ] Code Optimisation
    - [ ] Implement code splitting
    - [ ] Optimise bundle size
    - [ ] Remove unused code

## Security Enhancements

- [ ] Security Implementation (Estimated: 4-5 hours)
  - [ ] Headers and Policies
    - [ ] Add Content Security Policy headers
    - [ ] Implement CORS policies
    - [ ] Add security headers
  - [ ] Input/Output Security
    - [ ] Implement input sanitisation
    - [ ] Add output encoding
    - [ ] Validate file uploads
  - [ ] Security Documentation
    - [ ] Create security.md
    - [ ] Document security policies
    - [ ] Add security update procedures
  - [ ] Automated Security
    - [ ] Set up dependency scanning
    - [ ] Implement automated security checks
    - [ ] Add security update automation

## Documentation Expansion

- [ ] Documentation Enhancement (Estimated: 3-4 hours)
  - [ ] Component Documentation
    - [ ] Create component usage guides
    - [ ] Add prop documentation
    - [ ] Include example implementations
  - [ ] Development Guides
    - [ ] Update development workflow documentation
    - [ ] Add troubleshooting guides
    - [ ] Create contribution guidelines
  - [ ] API Documentation
    - [ ] Document all API endpoints
    - [ ] Add request/response examples
    - [ ] Include error handling documentation

## JSDoc Implementation

- [ ] Site-wide JSDoc Documentation (Estimated: 4-5 hours)

  - [ ] Component Documentation (2 hours)

    - [ ] Add comprehensive interface documentation
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
    - [ ] Document component functionality and usage
    - [ ] Add example usage snippets
    - [ ] Document component lifecycle methods
    - [ ] Add accessibility notes

  - [ ] Utility Functions (1 hour)

    - [ ] Document function parameters
    - [ ] Add return type documentation
    - [ ] Include usage examples
    - [ ] Document error handling
    - [ ] Add performance considerations

  - [ ] Types and Interfaces (30 minutes)

    - [ ] Document shared types
    - [ ] Add interface descriptions
    - [ ] Include property constraints
    - [ ] Document generic types

  - [ ] Constants and Configuration (30 minutes)

    - [ ] Document environment variables
    - [ ] Add configuration object documentation
    - [ ] Include validation rules
    - [ ] Document default values

  - [ ] Setup ESLint JSDoc Rules (1 hour)
    - [ ] Configure @typescript-eslint/eslint-plugin-tsdoc
    - [ ] Set up required JSDoc rules
    - [ ] Add automated validation
    - [ ] Create documentation style guide

## Australian English Implementation

- [ ] Project-wide Australian English Audit (Estimated: 3-4 hours)
  - [ ] Content Review (1 hour)
    - [ ] Check all content for American spellings
    - [ ] Update documentation terminology
    - [ ] Review error messages
    - [ ] Audit component text
  - [ ] Code Review (1 hour)
    - [ ] Check variable names
    - [ ] Review function names
    - [ ] Audit comments
    - [ ] Check string literals
  - [ ] Documentation Update (1 hour)
    - [ ] Update README files
    - [ ] Review API documentation
    - [ ] Check component documentation
    - [ ] Update contribution guidelines
  - [ ] Testing (30 minutes)
    - [ ] Test date formats
    - [ ] Verify time formats
    - [ ] Check currency displays
    - [ ] Test localisation features

## Component Organization Cleanup

- [ ] Component Migration (Estimated: 2-3 hours)
  - [ ] Audit Current Structure (30 minutes)
    - [ ] List all components
    - [ ] Identify current locations
    - [ ] Document dependencies
    - [ ] Note usage patterns
  - [ ] Migration Plan (30 minutes)
    - [ ] Create component map
    - [ ] Plan migration order
    - [ ] Document breaking changes
    - [ ] Create backup strategy
  - [ ] Implementation (1-2 hours)
    - [ ] Move components to new locations
    - [ ] Update import paths
    - [ ] Fix broken references
    - [ ] Test functionality
  - [ ] Documentation (30 minutes)
    - [ ] Update component docs
    - [ ] Document new structure
    - [ ] Create migration guide
    - [ ] Update examples

// TODO: Add error handling here
// FIXME: This needs optimization
// [ ] Implement this feature
