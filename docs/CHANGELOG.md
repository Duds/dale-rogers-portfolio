# Changelog

All notable changes to the Dale Rogers Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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

### Changed

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

### Fixed

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
