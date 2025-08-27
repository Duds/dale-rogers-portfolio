# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Automated Release System**: Implemented semantic-release for automatic version management
  - **Semantic Release**: Automatic version increments based on conventional commit messages
  - **Version Sync Script**: Automatically updates version numbers across all component files
  - **GitHub Actions Integration**: Automated releases triggered by pushes to main branch
  - **Conventional Commits**: Enforced commit message format for consistent versioning
  - **Zero Manual Version Management**: Version numbers, changelogs, and releases are fully automated

- **Version Badge Component**: Added comprehensive version tracking and environment detection
  - New `VersionBadge` component displays version number and deployment environment
  - Footer now shows version badge with environment-specific styling
  - Automatic environment detection (dev/preview/prod) with visual indicators
  - Build-time environment variables injected via GitHub Actions workflows
  - Hover tooltips show branch and commit hash information

- **Enhanced Environment Detection**: Improved deployment environment identification
  - Automatic detection of Azure Static Web Apps preview vs production
  - Build-time injection of commit hash, branch name, and environment
  - Console logging of comprehensive version information
  - Meta tags for version, build time, and deployment details

### Fixed

- **@apply directives not working**: Fixed Tailwind CSS v4 configuration issue where `@apply` directives were not being processed
  - Moved Tailwind CSS Vite plugin configuration from separate `vite.config.ts` to `astro.config.mjs`
  - Ensured proper integration with Astro's build pipeline
  - All component CSS files now properly expand `@apply` directives
- **CSS import order**: Fixed CSS import order to ensure all `@import` statements come before other directives

### Changed

- **Package version**: Updated from v0.0.1 to v0.0.2 for consistency
- **GitHub Actions workflows**: Enhanced with build-time environment variable injection
  - Added `ASTRO_COMMIT_HASH`, `ASTRO_BRANCH`, and `ASTRO_ENVIRONMENT` variables
  - Improved version tracking and deployment identification
- **Astro configuration**: Added environment variable passthrough for build-time data
- **BaseLayout**: Enhanced with comprehensive version information and environment detection

### Documentation

- **Deployment documentation**: Updated with version badge and environment detection details
- **Version information**: Added comprehensive documentation of new versioning features
- **Environment detection**: Documented automatic environment identification system

## [0.0.1] - 2025-01-XX

### Added

- Initial project setup
- Astro-based portfolio website
- Tailwind CSS v4 with Vite plugin
- Component-based architecture
- Responsive design system
- Dark/light theme support
- Content management system
- Testing infrastructure with Playwright
- Storybook for component development
- Comprehensive documentation

### Changed

- Migrated from React components to Astro components
- Implemented new theme system with design tokens
- Refactored CSS architecture for better maintainability

### Removed

- PostCSS dependencies and configuration
- Legacy Tailwind CSS v3 configuration
- React-specific dependencies and components
