# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Contact form with Nodemailer integration
- Colophon page detailing site architecture
- Comprehensive documentation structure
- Environment variable management
- LESSONS_LEARNED.md documenting key insights
- Australian English spell checking configuration
- Spinning logo component in navbar center with geometric design
- Theme-based navigation styling with outline buttons
- Full-width layout for navigation and footer
- Responsive typography scaling system
- Custom documentation update command in Cursor AI

### Changed

- Migrated from PHP/MySQL to Astro
- Updated hosting configuration for static deployment
- Improved email handling with Gmail SMTP
- Refactored components to use CSS design tokens
  - Updated Button component with variant support
  - Improved Card component with dynamic element rendering
  - Enhanced Navbar with proper ARIA attributes
  - Standardized Footer styling with new theme tokens
  - Implemented consistent container classes
  - Added TypeScript improvements across components
- Fixed Node adapter configuration in astro.config.mjs
- Updated content collection naming conventions
- Standardized on npm as package manager
- Enhanced navigation design with bolder typography and outline buttons
- Updated footer to use theme variables and full viewport width
- Improved mobile menu styling and interactions
- Standardized component class naming
- Added decorative oversized text to footer
- Increased padding and spacing in navigation

### Fixed

- Resolved TypeScript errors in dynamic routes
- Corrected content collection name mismatches
- Fixed adapter configuration issues

### Planned

- Integration of Umami Analytics
- Directory-specific README files
- Enhanced documentation coverage

## [1.0.0] - 2024-04-12

### Added

- Initial release of Astro-based portfolio
- Contact form functionality
- Dark mode support
- Responsive design implementation

### Technical

- Added CSS custom properties for consistent theming
- Implemented slow spin animation using CSS
- Improved responsive breakpoints
- Added SVG logo with geometric design
- Centralized theme configuration in global.css
- Enhanced component organization with themed classes

### Developer Experience

- Added custom AI command for documentation updates
- Improved settings.json configuration
- Enhanced development workflow automation

[Unreleased]: https://github.com/Duds/dale-rogers-portfolio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Duds/dale-rogers-portfolio/releases/tag/v1.0.0
