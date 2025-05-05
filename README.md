# Dale Rogers Portfolio

A modern, performant portfolio website built with Astro, showcasing case studies, articles, and technical experiments.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- 🚀 Built with Astro v5.7.4
- 💅 Styled with TailwindCSS
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🎨 Custom design system
- 📝 MDX support for rich content
- 🔍 SEO optimised
- ♿ WCAG 2.1 AA compliant
- 🇦🇺 Australian English localisation

## Project Structure

```
dale-rogers-portfolio/
├── src/
│   ├── components/    # Reusable UI components
│   ├── content/       # Content collections
│   ├── layouts/       # Page layouts
│   ├── pages/         # Route components
│   └── styles/        # Global styles
├── public/           # Static assets
└── docs/            # Project documentation
```

## Documentation

Comprehensive documentation is available in the project:

- [Development Guide](./DEVELOPMENT.md) - Setup and workflow
- [Architecture](./ARCHITECTURE.md) - System design and architecture
- [Components](./docs/COMPONENTS.md) - UI component library
- [Deployment](./docs/DEPLOYMENT.md) - Deployment procedures
- [Contributing](./docs/CONTRIBUTING.md) - How to contribute
- [Search Features](./docs/SEARCH.md) - Search implementation
- [Testing](./docs/TESTING.md) - Testing strategies
- [Theme System](./src/styles/THEME.md) - Theming documentation

See the [documentation index](./docs/README.md) for a complete list of available documentation.

## Development

### Prerequisites

- Node.js 18+
- npm 9+
- VS Code with recommended extensions

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Install dependencies
4. Start the development server

For detailed setup instructions, see [DEVELOPMENT.md](./docs/DEVELOPMENT.md).

## Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

### Development Standards

- TypeScript for type safety
- Australian English for content and documentation
- Component-driven architecture
- Accessibility-first development
- Comprehensive documentation

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact

Dale Rogers - [contact@dalerogers.com.au](mailto:contact@dalerogers.com.au)

Project Link: [https://github.com/Duds/dale-rogers-portfolio](https://github.com/Duds/dale-rogers-portfolio)

## MDX Article & Component Standards

All MDX articles and UI components must:

- Use accessible, reusable components (see `src/components/ui`)
- Follow Australian English spelling, date (DD/MM/YYYY), and $AUD currency formats
- Be tested for rendering, theming, and accessibility (see `docs/TESTING.md`)
- Be responsive and mobile-friendly

See `docs/TESTING.md` and `src/components/ui/README.md` for full requirements and contributor checklists.
