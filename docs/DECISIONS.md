# Design & Technical Decisions

This document records both architectural decisions (ADRs) and technical decisions made in the Dale Rogers Portfolio project.

## Architectural Decision Records (ADRs)

### ADR 1: Framework Selection - Astro

**Status**: Accepted
**Date**: 23/03/2024

#### Context

Needed a modern framework for building a portfolio website with optimal performance, SEO capabilities, and support for both static and dynamic content.

#### Decision

Selected Astro as the primary framework.

#### Rationale

- Excellent static site generation capabilities
- Built-in content collections for managing case studies and articles
- Partial hydration ("Islands Architecture") for optimal performance
- TypeScript support out of the box
- Strong MDX support for rich content
- Growing ecosystem and community

#### Consequences

- ✅ Improved performance metrics and SEO capabilities
- ✅ Simplified content management through collections
- ⚠️ Smaller ecosystem compared to Next.js or Gatsby
- ⚠️ Learning curve for team members new to Astro

### ADR 2: Styling Solution - TailwindCSS

**Status**: Accepted
**Date**: 23/03/2024

#### Context

Required a styling solution that would support rapid development, maintain consistency, and scale well with the project.

#### Decision

Adopted TailwindCSS as the primary styling solution.

#### Rationale

- Utility-first approach speeds up development
- Built-in responsive design system
- Dark mode support
- Strong TypeScript integration
- Excellent documentation and community support

#### Consequences

- ✅ Faster development cycles
- ✅ Consistent design system
- ✅ Reduced CSS bundle size
- ⚠️ Initial learning curve for utility classes
- ⚠️ HTML can become verbose

### ADR 3: Content Management - MDX

**Status**: Accepted
**Date**: 23/03/2024

#### Context

Needed a flexible content management solution for case studies, articles, and technical posts that supports rich content and code examples.

#### Decision

Implemented MDX with Astro's content collections.

#### Rationale

- Markdown familiarity
- JSX component support in content
- Strong TypeScript integration
- Built-in frontmatter support
- Excellent code block handling

#### Consequences

- ✅ Rich content capabilities
- ✅ Type-safe content through schemas
- ✅ Version control friendly
- ⚠️ Additional build step
- ⚠️ Learning curve for content authors

### ADR 4: Regional Standards - Australian English

**Status**: Accepted
**Date**: 23/03/2024

#### Context

Required consistent language and regional settings across the portfolio to reflect Australian context.

#### Decision

Implemented Australian English standards and regional settings throughout the project.

#### Rationale

- Target audience primarily Australian
- Professional consistency
- Cultural relevance
- SEO benefits for Australian market

#### Consequences

- ✅ Consistent user experience
- ✅ Improved regional SEO
- ✅ Professional credibility
- ⚠️ Additional configuration needed
- ⚠️ Regular review required for consistency

### ADR 5: Component Architecture

**Status**: Accepted
**Date**: 23/03/2024

#### Context

Needed a scalable and maintainable component architecture that supports feature development and reusability.

#### Decision

Implemented a feature-based component architecture with three main categories:

- UI components
- Layout components
- Feature components

#### Rationale

- Clear separation of concerns
- Improved maintainability
- Better code organisation
- Supports team collaboration
- Reduces duplication

#### Consequences

- ✅ Clear component organisation
- ✅ Improved developer experience
- ✅ Better code reuse
- ⚠️ More complex file structure
- ⚠️ Additional documentation needed

### ADR 6: Testing Strategy

**Status**: Accepted
**Date**: 23/03/2024

#### Context

Required a comprehensive testing strategy that ensures code quality without excessive overhead.

#### Decision

Implemented a multi-level testing approach:

- Unit tests for utilities and hooks
- Component tests with Testing Library
- E2E tests with Playwright
- Accessibility testing with axe-core

#### Rationale

- Balance between coverage and maintenance
- Focus on user-centric testing
- Strong accessibility validation
- Automated CI/CD integration

#### Consequences

- ✅ Improved code quality
- ✅ Better accessibility compliance
- ✅ Reduced regression issues
- ⚠️ Additional development time
- ⚠️ CI/CD pipeline complexity

## Technical Decisions

### Navigation & Layout

#### Full-Width Design

- Removed container constraints for edge-to-edge design
- Increased visual impact with full viewport width
- Better alignment with modern web design trends
- Enhanced visual hierarchy through spacing

#### Component Theming

- Moved to CSS custom properties for consistent styling
- Created component-specific theme variables
- Standardized class naming conventions
- Improved maintainability through centralized theming
- Implemented themed component classes for reusability

#### Typography System

- Implemented responsive font scaling using clamp()
- Created hierarchical type scale
- Used viewport units for fluid typography
- Maintained readability across devices
- Enhanced visual impact with larger font sizes

#### Interactive Elements

- Added outline buttons for clear call-to-actions
- Implemented hover states with colour transitions
- Created consistent animation durations
- Used geometric shapes for brand identity
- Enhanced touch targets for mobile

### Animation & Performance

#### Logo Animation

- Chose CSS animation for performance
- Set 12-second rotation for subtle effect
- Used transform for smooth rendering
- Implemented responsive scaling
- Maintained accessibility with aria-hidden

#### Mobile Considerations

- Enhanced touch targets for better accessibility
- Improved mobile menu interactions
- Maintained performance on lower-end devices
- Ensured smooth transitions on all platforms
- Optimized layout for various screen sizes

### Developer Experience

#### Documentation Workflow

- Implemented AI-powered documentation updates
- Standardized commit message format
- Automated file updates through Cursor AI
- Maintained consistent documentation structure

#### Code Organization

- Centralized theme configuration
- Used component-specific CSS classes
- Maintained clear file structure
- Implemented consistent naming patterns

### Package Manager: Standardized on npm

**Date**: 12/04/2024

#### Context

Multiple lockfiles causing VS Code warnings

#### Options Considered

1. Keep multiple package managers (npm, pnpm)
2. Standardize on npm
3. Standardize on pnpm

#### Decision

Standardize on npm

#### Reasoning

- Simplifies development environment
- Reduces tooling complexity
- Prevents VS Code warnings
- Maintains consistency across team

#### Implementation

- Removed pnpm-lock.yaml
- Updated VS Code settings
- Documented in LESSONS_LEARNED.md

### Analytics: Chose Umami over Google Analytics

**Date**: 12/04/2024

#### Context

Needed privacy-focused, lightweight analytics

#### Options Considered

1. Google Analytics
2. Plausible
3. Umami

#### Decision

Umami

#### Reasoning

- Open source and self-hostable
- Lightweight (1KB)
- No cookies required
- Simple deployment

#### Implementation Plan

- Deploy separately from main site
- Use managed PostgreSQL database
- Add minimal tracking script to site

### Contact Form: Nodemailer with Gmail SMTP

**Date**: 12/04/2024

#### Context

Needed reliable email delivery for contact form

#### Options Considered

1. SendGrid
2. Mailgun
3. Nodemailer with Gmail SMTP

#### Decision

Nodemailer with Gmail SMTP

#### Reasoning

- Already using Google Workspace
- No additional service dependencies
- Direct control over email sending
- Cost-effective (included in Google Workspace)

#### Implementation Details

- Using contact@dalerogers.com.au alias
- Server-side implementation in Astro API route
- Custom email templates with HTML/text versions

### Standardized Layout Patterns

**Date**: 12/04/2024

#### Context

Inconsistent full-width section implementations across components

#### Options Considered

1. Component-specific implementations
2. Container component approach
3. Global CSS classes

#### Decision

Global CSS classes with standardized patterns

#### Reasoning

- Consistent implementation across components
- Reduced code duplication
- Easier maintenance
- Clearer documentation

#### Implementation

- Created `.section-full` for full-width sections
- Added `.section-content` for constrained content
- Implemented `.section-content-narrow` and `.section-content-wide` variants
- Updated components to use new classes
- Documented in DEVELOPMENT.md

#### Layout Pattern Rules

1. **Full-Width Sections**
   - Use `.section-full` for edge-to-edge sections
   - Maintain consistent padding with `.px-4 sm:px-6 lg:px-8`
   - Centre headings with `.max-w-7xl mx-auto text-centre`

2. **Content Width**
   - Use `.section-content` for standard width
   - Apply `.section-content-narrow` for 2/3 width
   - Implement `.section-content-wide` for wider content
   - Remove container constraints for full-width elements

3. **Typography**
   - Maintain consistent heading hierarchy
   - Use standardized text sizes
   - Implement responsive scaling
   - Ensure proper spacing
