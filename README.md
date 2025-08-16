# Dale Rogers Portfolio

## Overview

This is the personal portfolio for Dale Rogers, built with Astro, TypeScript, and a modular, token-based CSS system. The project is designed for accessibility, responsiveness, and compliance with Australian standards.

## Key Features

- Modular UI components
- Token-based theming (all colours, spacing, radii, etc. use design tokens)
- Dark/light mode support
- Accessible (WCAG AA contrast)
- E2E tested (Playwright)
- Content-driven (case studies, articles, services)
- Australian English, date, and currency conventions

## Design System & CSS Refactor

- **Token-based styling is mandatory**: All colours, spacing, radii, and other design values use CSS variables (tokens). Do not use Tailwind's default colour-numbered classes (e.g. `-500`).
- **No custom classes in @apply**: Custom token-based utility classes (e.g. `bg-primary`, `text-primary`) must not be used in `@apply` rules. Use them directly in markup.
- **Component-level styles**: Each component imports its own CSS, using theme tokens.
- **Direct documentation updates**: When making changes, you must directly update all relevant documentation files (README, changelog, code comments, architecture docs, etc.) as part of your change. Do not just describe or suggest documentation updates—make the actual edits.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Package Manager

**This project uses pnpm exclusively.** Do not use npm or yarn.

### Why pnpm?

- Faster installation and updates
- Better disk space efficiency
- Strict dependency resolution
- Consistent package management

### Commands

```bash
# Install dependencies
pnpm install

# Add new dependency
pnpm add <package-name>

# Add dev dependency
pnpm add -D <package-name>

# Run scripts
pnpm run <script-name>

# Remove dependency
pnpm remove <package-name>

# Update dependencies
pnpm update
```

### Enforcement

- The project includes automatic checks to prevent npm/yarn usage
- Run `pnpm run check-pm` to verify package manager compliance
- Pre-commit hooks automatically check for violations
- Unwanted lockfiles (package-lock.json, yarn.lock) are automatically detected

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
- **CSS Variable Generation:** Run `pnpm run generate-css-vars` to generate `src/styles/generated-tokens.css` with all tokens as CSS variables. This is automated before dev/build via `predev` and `prebuild` scripts.
- **Usage:**
  - CSS: Tokens are available as CSS variables (e.g., `var(--color-accent)`, `var(--shadow-lg)`, `var(--space-2)`).
  - Tailwind: Tokens are imported into `tailwind.config.js` for consistent utility classes.
  - JS/TS: Tokens can be imported directly from TypeScript for use in components or scripts.
- **Node Version:** Use `nvm use 20.19.2` before running scripts if using Node Version Manager (NVM). Node.js 20+ is required for Azure dependencies.

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

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details on recent changes.

## Recent Updates (DD/MM/YYYY)

- Fixed all Tailwind @apply errors (tokens, variants, and custom utilities)
- Updated button, card, and section-heading styles for consistency and accessibility
- Improved footer CTA (purple, large, animated, accessible)
- Integrated custom shadows plugin for cards and buttons
- Added and documented custom tokens (e.g., bg-bg)
- Ensured all changes follow Australian English and accessibility standards

See the changelog and code comments for more details.
