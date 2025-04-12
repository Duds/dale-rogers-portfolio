# Design & Technical Decisions

## Navigation & Layout

### Full-Width Design

- Removed container constraints for edge-to-edge design
- Increased visual impact with full viewport width
- Better alignment with modern web design trends

### Component Theming

- Moved to CSS custom properties for consistent styling
- Created component-specific theme variables
- Standardized class naming conventions
- Improved maintainability through centralized theming

### Typography System

- Implemented responsive font scaling using clamp()
- Created hierarchical type scale
- Used viewport units for fluid typography
- Maintained readability across devices

### Interactive Elements

- Added outline buttons for clear call-to-actions
- Implemented hover states with color transitions
- Created consistent animation durations
- Used geometric shapes for brand identity

## Animation & Performance

### Logo Animation

- Chose CSS animation for performance
- Set 12-second rotation for subtle effect
- Used transform for smooth rendering
- Implemented responsive scaling

### Mobile Considerations

- Enhanced touch targets for better accessibility
- Improved mobile menu interactions
- Maintained performance on lower-end devices
- Ensured smooth transitions on all platforms

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
