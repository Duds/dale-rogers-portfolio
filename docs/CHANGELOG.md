# Changelog

All notable changes to the Dale Rogers Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Enhanced Articles page with consistent theming and best practices from Work page
- Improved ArticleCard component with badge styling and theme token usage
- Created articles-page.css with comprehensive theming and skeleton loading
- Created articles.css for ArticleCard component styling
- Enhanced TagList component with badge styling and rust color theming
- Improved contrast and accessibility across Articles and Work pages
- Consistent skeleton loading patterns for both Articles and Work pages
- Unified theming approach using CSS custom properties throughout

- Contact form with Nodemailer integration
- Colophon page detailing site architecture
- Privacy Policy page with comprehensive data handling information
- Australian English language support across the site
- MDX support for rich content in case studies
- Status indicators for scratch posts
- Dark mode support for all components
- Comprehensive documentation structure
- Environment variable management
- Spinning logo component in navbar centre with geometric design
- Theme-based navigation styling with outline buttons
- Full-width layout for navigation and footer
- Responsive typography scaling system
- Custom documentation update command in Cursor AI
- PartnerLogos component with:
  - Responsive grid layout with hover effects
  - Dark mode support
  - Lazy loading and external links
- Enhanced Code Spell Checker configuration for Australian English:
  - Comprehensive Australian spelling dictionary
  - American spelling flagging
  - Project-specific Australian terms
- Feature-based component organization:
  - UI components in `src/components/ui/`
  - Updated import paths
  - Fixed component references
- `lint:css` script and `lint-css.ts` for auditing CSS `@apply` utilities across stylesheets and Astro components
- `check-token-usage.ts` script to report missing Tailwind utilities and enforce semantic token usage
- `card` colour group in `tailwind.config.ts` generating `bg-card-purple`, `bg-card-green`, `bg-card-orange`, and `bg-card-black` utilities
- Custom Tailwind plugin to auto-generate semantic utilities (`.bg-*`, `.text-*`, `.border-*`, `.ring-*`, spacing, sizing) from CSS variables
- `generate-css-vars.ts` script ensuring CSS custom properties are generated from TypeScript theme tokens
- Comprehensive layout patterns documentation (`LAYOUT_PATTERNS.md`)
- Enhanced Container component with multiple width variants (default, narrow, wide, full)
- Restored search functionality to navigation component
- Integrated SearchInput component into Navigation.astro
- Fixed missing @reference directive in services.css
- Proper semantic navigation component with ARIA attributes
- Mobile hamburger menu with smooth animations
- Active page state detection and styling
- Keyboard navigation and accessibility improvements

### Changed

- Standardized Articles and Work pages to use identical structure and theming patterns
- Updated ArticleCard component to match CaseStudyCard styling and accessibility
- Migrated Articles page from direct content rendering to skeleton loading with redirect pattern
- Enhanced Articles page with Container usage, results summary, and improved empty states
- Unified hover effects and color schemes using rust accent colors across both pages
- Improved spacing and typography consistency between Articles and Work pages

- Migrated from PHP/MySQL to Astro
- Updated hosting configuration for static deployment
- Improved email handling with Gmail SMTP
- Updated FeaturedCaseStudiesSlider component documentation
- Improved case studies content structure
- Enhanced scratch posts layout
- Standardised date formatting to DD/MM/YYYY
- Refactored components to use CSS design tokens:
  - Button component with variant support
  - Card component with dynamic element rendering
  - Navbar with proper ARIA attributes
  - Footer styling with new theme tokens
  - Consistent container classes
- Fixed Node adapter configuration
- Updated content collection naming conventions
- Enhanced navigation design with bolder typography
- Improved mobile menu styling and interactions
- Added decorative oversized text to footer
- Updated `global.css` import ordering to satisfy PostCSS `@import` rules and suppress Vite warnings
- Refactored `ThemeToggle.astro` and other components to replace arbitrary `[var(...)]` classes with semantic utilities like `border-text`
- Updated migration and documentation: `MIGRATION.md`, `THEME.md`, and `TODO.md` to reflect design token migration progress
- Refactored all CSS to remove custom classes from @apply and enforce token-based utility usage throughout the codebase
- Updated all documentation to clarify that contributors must directly update docs (README, changelog, code comments, etc.) as part of any change
- Enforced token-based styling for all colours, spacing, radii, and other design values; Tailwind colour-numbered classes (e.g. -500) are no longer used
- Replaced Fraunces serif font with Inter sans-serif for modern, bold headings
- Enhanced Container component API with variant-based width options
- Improved search input expansion functionality in navigation
- Refactored Hero component to use Container instead of full-width layout
- Updated Heading component to use Inter and DM Sans fonts instead of Fraunces
- Removed gradient effects from Hero and Footer components for cleaner design
- Updated Navigation component to include search functionality
- Enhanced navigation CSS for proper search component integration
- Fixed SearchInput component to use proper color tokens instead of theme() function
- Converted navigation from generic list to proper nav component
- Implemented proper WCAG AA compliant navigation structure
- Added mobile-responsive navigation with hamburger menu
- Enhanced navigation with active state indicators

### Fixed

- Removed date badge overlay from ArticleCard thumbnails for cleaner design
- Fixed missing articles.css import error by creating comprehensive component styles
- Resolved theming inconsistencies between Articles and Work pages
- Improved contrast ratios and accessibility compliance across both pages

- Accessibility issues in navigation components
- Image optimisation pipeline
- Mobile responsiveness in case study cards
- Type definitions in scratch post interfaces
- Resolved TypeScript errors in dynamic routes
- Corrected content collection name mismatches
- Fixed adapter configuration issues
- Resolved import errors
- Corrected American English spellings to Australian English
- Extended Tailwind config to include `card` colour utilities, resolving missing `bg-card-*` errors
- Removed invalid `border-border` and `dark:border-border-dark` classes in `ThemeToggle.astro`, replacing with `border-text`
- Fixed search input expansion not working in navigation
- Resolved theme toggle functionality issues
- Fixed search input positioning and z-index conflicts
- Fixed search expansion not working after page navigation in Astro
- Search functionality now properly integrated in header navigation
- Fixed Tailwind CSS build errors in services.css
- Resolved theme toggle initialization issues
- Fixed duplicate SearchResult interface in useSearch hook
- Navigation now uses proper semantic HTML and ARIA roles
- Mobile navigation properly prevents body scroll when open
- Improved keyboard navigation and screen reader support
- Navigation component now fully functional with proper styling and mobile menu
- Fixed missing CSS import that was preventing navigation styles from loading
- Fixed theme toggle functionality by resolving duplicate theme initialization scripts
- Resolved CSS import order warnings in global.css
- Fixed container centering issues by updating grid system from 6-column to 12-column layout
- Updated Hero, AboutSection, and ServicesText components to use standard 12-column grid
- **CaseStudiesBento Full-Width Issue**: Fixed the case studies bento section not being full-width by:
  - Removing redundant inner container div with `max-w-7xl mx-auto` constraints
  - Updating `container--full` CSS class to use higher specificity selectors (`.container.container--full`)
  - Adding `!important` declarations for `max-width: 100%` and `width: 100%` to override conflicting CSS rules
  - Restoring proper padding on both sides (`px-4 sm:px-6 lg:px-8`) for content spacing
- **Container CSS Specificity**: Improved container CSS to prevent width constraints from being overridden by other CSS rules
- **Navigation Centering**: Fixed navigation header centering by removing redundant container structure and ensuring proper CSS import

### Security

- Implemented secure contact form handling
- Added proper input sanitisation
- Set up secure headers
- Configured CSP policies

### Planned

- Integration of Umami Analytics
- Directory-specific README files
- Enhanced documentation coverage

## [1.0.0] - 23/03/2024

### Added

- Initial release of Astro-based portfolio
- Case studies section with featured slider
- Articles section with filtering
- Scratch posts for technical experiments
- Responsive design system
- TypeScript support
- TailwindCSS integration
- Content collection setup
- SEO optimisation
- WCAG 2.1 AA compliance
- Australian regional settings
- Contact form functionality
- Dark mode support
- CSS custom properties for consistent theming
- SVG logo with geometric design
- Centralized theme configuration

### Developer Experience

- Added custom AI command for documentation updates
- Improved settings.json configuration
- Enhanced development workflow automation

## Types of Changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities

## Versioning

We use [SemVer](https://semver.org/) for version numbers:

- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality additions
- PATCH version for backwards-compatible bug fixes

[Unreleased]: https://github.com/Duds/dale-rogers-portfolio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Duds/dale-rogers-portfolio/releases/tag/v1.0.0
