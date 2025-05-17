# Changelog

All notable changes to the Mermaid Generator project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with dual-mode structure (Astro and standalone)
- Basic Mermaid diagram editor with real-time preview
- Export functionality for SVG and PNG formats
- Dark mode support
- Responsive design
- Build script for project structure
- TypeScript type definitions
- Error handling system
- Keyboard shortcuts
- Accessibility features
- Test setup with Vitest
- Project documentation
- Cursor rules for development
- Enhanced build-standalone.js script with comprehensive portability transformations
- Added automatic README.md generation in standalone build
- Improved SEO with proper meta tags in the standalone version

### Changed

- Updated build script to focus on Astro development
- Improved standalone version generation
- Enhanced error handling with custom error types
- Added proper TypeScript types for all components
- Completely refactored standalone version to work with file:// protocol
- Improved JavaScript transformations for better browser compatibility
- Removed Astro-specific code from standalone version
- Standardized file-naming conventions across the project

### Fixed

- Fixed module import issues in standalone version
- Fixed style loading in Astro version
- Fixed linter errors in index.astro
- Fixed keyboard navigation in editor
- Fixed CORS issues in standalone version when opened directly from file system
- Fixed template literal syntax in transformed JavaScript for older browsers
- Fixed module import/export syntax in standalone version
- Fixed file path references in standalone HTML

### Security

- Added input validation
- Added output sanitization
- Implemented secure file handling
- Added proper error boundaries
- Enhanced standalone version to work with local file security restrictions

### Accessibility

- Added ARIA attributes
- Implemented keyboard navigation
- Added screen reader support
- Added focus management
- Added announcements for screen readers

### Performance

- Optimized style loading
- Improved event handling
- Added proper cleanup for event listeners
- Implemented efficient DOM updates
- Reduced file size in standalone version by removing commented code
- Improved load time by avoiding unnecessary imports

## [0.1.0] - 2024-03-19

### Added

- Initial release
- Basic Mermaid diagram editor
- Real-time preview
- Export functionality
- Dark mode support
- Responsive design
- Project structure
- Build script
- TypeScript support
- Error handling
- Keyboard shortcuts
- Accessibility features
- Testing setup
- Documentation
- Development guidelines
