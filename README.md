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

# Portfolio Content & Layout Updates

## Article: Designing Intentional Culture

### Recent Enhancements

- **Prominent Callout:**

  - The key statement 'Quality culture = human experiences × defined culture.' is now displayed in a highly visible CalloutBox with a highlight style and a direct link to further reading on quality culture.

- **Column Layouts:**

  - Large slabs of text, especially in the 'A brief history of change' and 'Three helpful toolsets' sections, are now split into columns using responsive flexbox classes (e.g., `md:flex gap-8`, `md:w-1/2`).
  - This improves readability, visual interest, and accessibility, especially on larger screens.

- **Inline Expertise Links:**
  - Key terms such as 'design thinking', 'needfinding', 'ideation', and 'action' now include inline links to reputable external resources (e.g., IDEO, NN/g) for further learning.

### Rationale

- **Accessibility:**
  - Improved content structure and visual separation make the article easier to navigate for all users, including those using assistive technologies.
- **Engagement:**
  - Prominent callouts and columns break up dense content, making it more inviting and easier to scan.
- **Resource Linking:**
  - Inline links provide readers with direct access to authoritative sources, supporting deeper learning and best practice alignment.

### Implementation Notes

- Used `<CalloutBox type="highlight" ...>` for the key statement.
- Used `<div class="md:flex gap-8">` and `<div class="md:w-1/2">` for column layouts.
- Added `target="_blank" rel="noopener noreferrer"` to all external links for security and best practice.

---

For further details or to contribute to content structure improvements, see the `src/content/articles/designing-intentional-culture.mdx` file.
