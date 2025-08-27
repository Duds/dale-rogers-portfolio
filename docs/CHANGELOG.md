# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Major Migration**: Migrated from Docker containerization to Azure Static Web Apps
- **Static Output**: Converted Astro configuration from server to static output
- **GitHub Actions**: Added automated CI/CD workflow for Azure Static Web Apps
- **Static Web App Config**: Added routing and caching configuration for Azure SWA
- **Simplified Build**: Removed complex Docker multi-stage builds and server dependencies

### Changed

- **Build Process**: Simplified from `astro build` with Docker to direct static file generation
- **Deployment**: Moved from Azure Container Registry + App Service to Azure Static Web Apps
- **Configuration**: Updated `astro.config.mjs` to use static output instead of server output
- **Dependencies**: Removed Docker-related packages and Node.js server dependencies
- **API Routes**: Removed server-side API routes (contact, search) for static deployment

### Removed

- **Docker**: Removed Dockerfile, docker-compose.yml, and build-standalone.js
- **Server Adapter**: Removed @astrojs/node adapter and server configuration
- **API Endpoints**: Removed /api/contact and /api/search server routes
- **Container Orchestration**: Eliminated Docker build and deployment complexity

### Benefits

- **Simpler**: No Docker containers or server management required
- **Cheaper**: Pay-per-use pricing with generous free tier
- **Faster**: Global CDN with edge locations for better performance
- **Purpose-built**: Optimized for static sites and JAMstack applications
- **Automatic**: CI/CD integration with GitHub for seamless deployments

## [0.0.2] - 2024-12-XX

### Added

- **Automated CI/CD Pipeline**: Fully functional GitHub Actions workflow for Azure deployment
- **pnpm Integration**: Proper pnpm support in GitHub Actions with optimized caching
- **Azure Deployment**: Direct deployment to Azure Static Web Apps with proper configuration
- **Deployment Documentation**: Comprehensive deployment guides and troubleshooting

### Changed

- **GitHub Workflow**: Updated workflow to properly handle pnpm and Azure deployment paths
- **Build Configuration**: Fixed app_location and output_location for correct Azure deployment
- **Deployment Status**: Site now live and automatically deploying on every push to main
- **Documentation**: Updated all deployment documentation to reflect current status

### Fixed

- **pnpm Support**: Resolved GitHub Actions workflow to properly use pnpm instead of npm
- **Deployment Paths**: Fixed app_location and output_location configuration for Azure
- **Build Caching**: Implemented proper pnpm store caching for faster GitHub Actions builds
- **CI/CD Pipeline**: Resolved all workflow issues for successful automated deployment

### Technical

- **Workflow Configuration**: Proper pnpm setup with store path detection and caching
- **Azure Integration**: Correct deployment paths and skip_app_build configuration
- **Performance**: Optimized build times with pnpm caching in GitHub Actions
- **Reliability**: Automated deployment pipeline now working consistently

## [0.0.1] - 2024-12-XX

### Added

- **Enhanced Articles Page**: Applied best practices from Work page to Articles page
- **Skeleton Loading**: Implemented consistent skeleton loading states across both pages
- **Container Usage**: Ensured proper Container component usage throughout
- **Accessibility**: Enhanced ARIA labels, roles, and live regions
- **Page Structure**: Improved results summary, grid layout, and empty states
- **Consistent Styling**: Unified CSS patterns and theme token usage
- **Enhanced Pagination**: Improved pagination handling and URL structure
- **Component Standardization**: Cleaned up and standardized component usage

### Changed

- **ArticleCard Component**:
  - Improved contrast and visual hierarchy
  - Implemented rust color palette instead of blue
  - Styled tags as badges with proper spacing
  - Fixed spacing around date and author names
  - Removed date badge from thumbnail overlay
- **Theming System**:
  - Ensured consistent use of CSS custom properties
  - Applied rust accent colors throughout
  - Unified theming between Work and Articles pages
- **CSS Organization**:
  - Created dedicated articles-page.css and articles.css files
  - Updated tag-list.css for badge styling
  - Enhanced work-page.css with rust color theming

### Fixed

- **Build Issues**: Resolved erroneous @import in global.css
- **Component Interoperability**: Fixed Astro/React component compatibility issues
- **Pre-commit Hooks**: Added prettier-plugin-astro and .prettierrc configuration
- **HTML Syntax**: Fixed JSX comment syntax in ArticleCard component
- **Commit Linting**: Resolved conventional commit message formatting issues

### Technical

- **CSS Architecture**: Implemented component-specific CSS files with theme tokens
- **Theme Tokens**: Consistent use of var(--color-\*) throughout components
- **Responsive Design**: Enhanced mobile-first responsive layouts
- **Performance**: Optimized image loading and hover effects
- **Accessibility**: Improved keyboard navigation and screen reader support

## [Previous Versions]

### Added

- Initial portfolio setup with Astro framework
- Tailwind CSS v4 integration with custom theme system
- Responsive design with mobile-first approach
- Dark/light theme toggle functionality
- Content collections for articles, case studies, and services
- Component library with reusable UI components
- Accessibility features and ARIA support
- Performance optimizations and lazy loading
- SEO optimization with meta tags and sitemap
- Testing setup with Playwright E2E tests
