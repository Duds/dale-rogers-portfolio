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

## Design Token Workflow

This project uses a modern, type-safe design token system:

- **Source of Truth:** All design tokens (colours, spacing, shadows, etc.) are defined in TypeScript files in `src/styles/theme/`.
- **CSS Variable Generation:** Run `npm run generate-css-vars` to generate `src/styles/generated-tokens.css` with all tokens as CSS variables. This is automated before dev/build via `predev` and `prebuild` scripts.
- **Usage:**
  - CSS: Tokens are available as CSS variables (e.g., `var(--color-accent)`, `var(--shadow-lg)`, `var(--space-2)`).
  - Tailwind: Tokens are imported into `tailwind.config.js` for consistent utility classes.
  - JS/TS: Tokens can be imported directly from TypeScript for use in components or scripts.
- **Node Version:** Use `nvm use 20` before running scripts if using Node Version Manager (NVM).

This ensures a single source of truth for all design decisions, with full type safety and easy synchronisation between code and styles.

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

All project documentation is now consolidated in the [`/docs/`](./docs/) directory:

- [Development Guide](./docs/DEVELOPMENT.md) – Setup and workflow
- [Architecture](./docs/ARCHITECTURE.md) – System design and architecture
- [Components](./docs/COMPONENTS.md) – UI component library
- [Deployment](./docs/DEPLOYMENT.md) – Deployment procedures
- [Contributing](./docs/CONTRIBUTING.md) – How to contribute
- [Search Features](./docs/SEARCH.md) – Search implementation
- [Testing](./docs/TESTING.md) – Testing strategies
- [Theme System](./docs/THEME.md) – Theming documentation
- [Lessons Learned](./docs/LESSONS_LEARNED.md)
- [Migration Notes](./docs/MIGRATION.md)
- [Backlog](./docs/BACKLOG.md) – **Single source of truth for all actionable TODOs**

See the [documentation index](./docs/README.md) for a complete list of available documentation.

> **Note:** All actionable TODOs are now tracked in [`/docs/BACKLOG.md`](./docs/BACKLOG.md). Please add new tasks there and reference it for project priorities.

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
