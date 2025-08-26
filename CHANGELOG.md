# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **@apply directives not working**: Fixed Tailwind CSS v4 configuration issue where `@apply` directives were not being processed
  - Moved Tailwind CSS Vite plugin configuration from separate `vite.config.ts` to `astro.config.mjs`
  - Ensured proper integration with Astro's build pipeline
  - All component CSS files now properly expand `@apply` directives
- **CSS import order**: Fixed CSS import order to ensure all `@import` statements come before other directives

### Added

- **No PostCSS rule**: Created `.cursor/rules/no-postcss.mdc` to prevent PostCSS usage
  - Enforces Tailwind CSS v4 with Vite plugin configuration
  - Prevents configuration issues that cause `@apply` directive failures
  - Documents correct CSS import structure and component CSS setup

### Changed

- **Configuration structure**: Moved Tailwind CSS Vite plugin configuration to `astro.config.mjs`
  - Removed separate `vite.config.ts` file
  - Ensures proper integration with Astro's build process
  - Maintains optimal developer experience with hot module replacement

### Documentation

- **Troubleshooting guide**: Added comprehensive troubleshooting section for `@apply` directive issues
  - Documents symptoms, root causes, and solutions
  - Provides correct vs. incorrect configuration examples
  - Includes prevention tips and quick fixes

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
