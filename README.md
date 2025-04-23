# Dale Rogers Portfolio

A modern, performant portfolio website built with Astro, TypeScript, and TailwindCSS.

## Recent Updates

### 23/03/2024

- Added Privacy Policy page with comprehensive data handling information
- Enhanced case studies content structure with MDX support
- Improved scratch posts layout with status indicators
- Updated documentation for FeaturedCaseStudiesSlider component
- Added Australian English language support across the site
- Implemented proper date formatting (DD/MM/YYYY)

## Core Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System design and architecture decisions
- [Development](./docs/DEVELOPMENT.md) - Development setup and workflows
- [Components](./docs/COMPONENTS.md) - Component standards and guidelines
- [Content](./docs/CONTENT.md) - Content management and guidelines
- [Testing](./docs/TESTING.md) - Testing strategy and procedures
- [Security](./docs/SECURITY.md) - Security policies and procedures
- [Decisions](./docs/DECISIONS.md) - Architecture and technical decisions
- [Changelog](./docs/CHANGELOG.md) - Version history and changes

## Features

- 🚀 Built with Astro for optimal performance
- 💪 TypeScript for type safety
- 🎨 TailwindCSS for styling
- 📱 Fully responsive design
- ♿ WCAG 2.1 AA compliant
- 🇦🇺 Australian English and regional settings
- 📝 MDX support for rich content
- 🎯 Case studies and articles
- ⚡ Optimised images and assets
- 🔍 SEO optimised
- 🌙 Dark mode support

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/
│   ├── features/      # Feature-specific components
│   ├── layout/        # Layout components
│   └── ui/           # Reusable UI components
├── content/
│   ├── case-studies/  # Case study MDX files
│   ├── articles/      # Article MDX files
│   └── scratch/       # Scratch post MDX files
├── layouts/          # Page layouts
├── pages/           # Route pages
└── styles/          # Global styles
```

## Development Standards

### Australian English Standards

This project follows Australian English standards:

- Australian spelling (e.g., colour, organisation)
- Date format: DD/MM/YYYY
- 24-hour time format
- Australian time zones (AEST/AEDT)
- Metric measurements

### Component Organisation

We follow a feature-based component architecture:

- UI components: `src/components/ui/`
- Layout components: `src/components/layout/`
- Feature components: `src/components/features/<feature>/components/`

For more details, see [DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Request code review

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

## Testing

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:unit
pnpm test:integration
pnpm test:e2e
```

See [TESTING.md](docs/TESTING.md) for detailed testing guidelines.

## Deployment

The site is deployed on Vercel. Push to the `main` branch to trigger a deployment.

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment procedures.

## Security

For security concerns or vulnerability reports, please see our [Security Policy](docs/SECURITY.md).

## License

MIT License - See [LICENSE](./LICENSE) for details.

## Contact

For any questions or suggestions:

- Email: contact@dalerogers.dev
- GitHub Issues: [Create an issue](https://github.com/Duds/dale-rogers-portfolio/issues)

## Project Status

### Current Features

- [x] Basic portfolio structure
- [x] Responsive design
- [x] Content management system
- [x] Case studies section
- [x] Blog/articles section
- [x] Contact form
- [x] SEO optimisation
- [x] Dark mode support
- [x] Performance optimisation

### Upcoming Features

- [ ] Newsletter subscription
- [ ] Analytics dashboard
- [ ] Advanced search functionality
- [ ] Project showcase timeline
- [ ] Integrated blog comments

For detailed progress and plans, see our [Project Board](https://github.com/Duds/dale-rogers-portfolio/projects/1).
