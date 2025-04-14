# Design & Technical Decisions

## Navigation & Layout

### Full-Width Design

- Removed container constraints for edge-to-edge design
- Increased visual impact with full viewport width
- Better alignment with modern web design trends
- Enhanced visual hierarchy through spacing

### Component Theming

- Moved to CSS custom properties for consistent styling
- Created component-specific theme variables
- Standardized class naming conventions
- Improved maintainability through centralized theming
- Implemented themed component classes for reusability

### Typography System

- Implemented responsive font scaling using clamp()
- Created hierarchical type scale
- Used viewport units for fluid typography
- Maintained readability across devices
- Enhanced visual impact with larger font sizes

### Interactive Elements

- Added outline buttons for clear call-to-actions
- Implemented hover states with color transitions
- Created consistent animation durations
- Used geometric shapes for brand identity
- Enhanced touch targets for mobile

## Animation & Performance

### Logo Animation

- Chose CSS animation for performance
- Set 12-second rotation for subtle effect
- Used transform for smooth rendering
- Implemented responsive scaling
- Maintained accessibility with aria-hidden

### Mobile Considerations

- Enhanced touch targets for better accessibility
- Improved mobile menu interactions
- Maintained performance on lower-end devices
- Ensured smooth transitions on all platforms
- Optimized layout for various screen sizes

## Developer Experience

### Documentation Workflow

- Implemented AI-powered documentation updates
- Standardized commit message format
- Automated file updates through Cursor AI
- Maintained consistent documentation structure

### Code Organization

- Centralized theme configuration
- Used component-specific CSS classes
- Maintained clear file structure
- Implemented consistent naming patterns

# Technical Decisions Log

## [2024-04-12] Package Manager: Standardized on npm

- Context: Multiple lockfiles causing VS Code warnings
- Options Considered:
  1. Keep multiple package managers (npm, pnpm)
  2. Standardize on npm
  3. Standardize on pnpm
- Decision: Standardize on npm
- Reasoning:
  - Simplifies development environment
  - Reduces tooling complexity
  - Prevents VS Code warnings
  - Maintains consistency across team
- Implementation:
  - Removed pnpm-lock.yaml
  - Updated VS Code settings
  - Documented in LESSONS_LEARNED.md

## [2024-04-12] Astro Adapter Configuration

- Context: Build errors with server-side rendering
- Options Considered:
  1. Use adapter in integrations array
  2. Use dedicated adapter property
  3. Switch to static site generation
- Decision: Use dedicated adapter property
- Reasoning:
  - Follows Astro best practices
  - Provides clearer configuration
  - Resolves build errors
  - Maintains SSR capabilities
- Implementation:
  - Updated astro.config.mjs
  - Documented in LESSONS_LEARNED.md

## [2024-04-12] Analytics: Chose Umami over Google Analytics

- Context: Needed privacy-focused, lightweight analytics
- Options Considered:
  1. Google Analytics
  2. Plausible
  3. Umami
- Decision: Umami
- Reasoning:
  - Open source and self-hostable
  - Lightweight (1KB)
  - No cookies required
  - Simple deployment
- Implementation Plan:
  - Deploy separately from main site
  - Use managed PostgreSQL database
  - Add minimal tracking script to site

## [2024-04-12] Contact Form: Nodemailer with Gmail SMTP

- Context: Needed reliable email delivery for contact form
- Options Considered:
  1. SendGrid
  2. Mailgun
  3. Nodemailer with Gmail SMTP
- Decision: Nodemailer with Gmail SMTP
- Reasoning:
  - Already using Google Workspace
  - No additional service dependencies
  - Direct control over email sending
  - Cost-effective (included in Google Workspace)
- Implementation Details:
  - Using contact@dalerogers.com.au alias
  - Server-side implementation in Astro API route
  - Custom email templates with HTML/text versions

## [2024-04-12] Testing Strategy: Manual Testing with Future Automation

- Context: Need to establish testing approach for portfolio site
- Options Considered:
  1. Manual testing only
  2. Full automated testing suite
  3. Hybrid approach with selective automation
- Decision: Manual testing with future automation
- Reasoning:
  - Portfolio site has relatively simple functionality
  - Quick development cycles benefit from manual testing
  - Critical paths can be automated later if needed
  - Focus on rapid iteration and visual feedback
- Implementation:
  - Manual testing of all features during development
  - Regular review of testing needs
  - Documentation of test procedures in DEVELOPMENT.md
  - Open to adding automated tests for critical paths in future

## LogoSalad Component

### Grid Layout

- **Decision**: Use CSS Grid with responsive column counts
- **Rationale**: Provides better control over spacing and alignment compared to flexbox
- **Implementation**:
  - 2 columns on mobile
  - 3 columns on tablet
  - 4 columns on desktop
  - Uses `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

### Hover Effects

- **Decision**: Implement subtle scale and shadow effects
- **Rationale**: Provides visual feedback without being distracting
- **Implementation**:
  - Scale: `hover:scale-105`
  - Shadow: `hover:shadow-lg`
  - Transition: `transition-all duration-300`

### Dark Mode

- **Decision**: Use Tailwind's dark mode classes
- **Rationale**: Consistent with site-wide dark mode implementation
- **Implementation**:
  - Background: `dark:bg-gray-800`
  - Border: `dark:border-gray-700`
  - Shadow: `dark:shadow-gray-900`

### Image Loading

- **Decision**: Implement lazy loading
- **Rationale**: Improves initial page load performance
- **Implementation**:
  - `loading="lazy"`
  - `fetchpriority="low"`

### Accessibility

- **Decision**: Include descriptive alt text and ARIA labels
- **Rationale**: Ensures screen reader compatibility
- **Implementation**:
  - `alt="Logo of {client}"`
  - `aria-label="Visit {client}'s website"`

## [2024-04-12] Standardized Layout Patterns

- Context: Inconsistent full-width section implementations across components
- Options Considered:
  1. Component-specific implementations
  2. Container component approach
  3. Global CSS classes
- Decision: Global CSS classes with standardized patterns
- Reasoning:
  - Consistent implementation across components
  - Reduced code duplication
  - Easier maintenance
  - Clearer documentation
- Implementation:
  - Created `.section-full` for full-width sections
  - Added `.section-content` for constrained content
  - Implemented `.section-content-narrow` and `.section-content-wide` variants
  - Updated components to use new classes
  - Documented in DEVELOPMENT.md

### Layout Pattern Rules

1. **Full-Width Sections**

   - Use `.section-full` for edge-to-edge sections
   - Maintain consistent padding with `.px-4 sm:px-6 lg:px-8`
   - Center headings with `.max-w-7xl mx-auto text-center`

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
