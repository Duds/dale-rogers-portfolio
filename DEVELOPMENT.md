# Development Guide

## Related Documentation

- [Architecture](./ARCHITECTURE.md) - System architecture and design
- [Components](./docs/COMPONENTS.md) - Component library details
- [Content Management](./docs/CONTENT.md) - Content collections and data
- [Testing](./docs/TESTING.md) - Testing strategies and requirements
- [Deployment](./docs/DEPLOYMENT.md) - Deployment procedures
- [Search Features](./docs/SEARCH.md) - Search implementation details
- [Documentation Index](./docs/README.md) - Complete documentation list

## Setup

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Git

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/dale-rogers/dale-rogers-portfolio.git
   cd dale-rogers-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Strategy

- `main`: Production branch
- `develop`: Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Testing

- Run tests: `npm test`
- Update snapshots: `npm test -- -u`
- Coverage report: `npm test -- --coverage`

### Code Quality

- Lint: `npm run lint`
- Format: `npm run format`
- Type check: `npm run typecheck`

### Building

- Production build: `npm run build`
- Preview build: `npm run preview`

## Content Collections

### Naming Conventions

- Use kebab-case for collection names (e.g., `case-studies`)
- Match collection names exactly in `getCollection()` calls
- Define interfaces for content types

### TypeScript Integration

- Create interfaces for content entries
- Use type assertions when necessary
- Document type definitions in comments

## Deployment

### Production Deployment

1. Merge to `main` branch
2. Automated deployment via CI/CD
3. Manual verification

### Environment Variables

Required environment variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM=contact@domain.com
EMAIL_TO=your-email@domain.com
```

## Troubleshooting

### Common Issues

1. Email sending fails:

   - Check SMTP credentials
   - Verify app password
   - Check email aliases

2. Build failures:

   - Clear cache: `npm run clean`
   - Update dependencies: `npm update`
   - Check TypeScript errors: `npm run typecheck`

3. Adapter issues:
   - Verify adapter configuration in astro.config.mjs
   - Check for conflicting adapters
   - Ensure correct output mode is set

## Best Practices

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use Prettier for formatting
- Add JSDoc comments for functions

### Commits

Follow conventional commits:

```bash
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update tooling
```

### Pull Requests

- Include description of changes
- Reference related issues
- Include testing steps
- Update documentation

## Theme System

### CSS Custom Properties

```css
/* Typography */
--text-nav: clamp(1.25rem, 1.75vw, 1.5rem);
--text-nav-logo: clamp(2rem, 2.5vw, 3rem);

/* colours */
--colour-nav-bg: var(--colour-bg);
--colour-nav-text: var(--colour-black);
--colour-nav-border: rgba(16, 16, 15, 0.1);
--colour-nav-link-hover: var(--colour-purple);
```

### Component Classes

We use themed component classes for consistent styling:

```css
.nav-base {
  @apply fixed top-0 left-0 w-full z-50;
}

.nav-link {
  @apply font-heading text-xl md:text-2xl px-6 py-2 border-2;
}
```

## Components

### SpinningLogo

- SVG-based logo component
- Uses CSS animation for rotation
- Responsive sizing with breakpoints
- colour inheritance through currentcolour
- Geometric shape-based design

### Navigation

- Full viewport width design
- Themed component classes
- Mobile-first responsive approach
- Consistent interactive states
- Outline button styling

### Footer

- Edge-to-edge layout
- Decorative oversized text
- Responsive column layout
- Themed typography scale
- Consistent spacing system

### PartnerLogos

The PartnerLogos component (`src/components/PartnerLogos.astro`) provides a responsive grid layout for displaying client logos. It features:

- Responsive grid layout (2-4 columns based on viewport)
- Hover effects with scale and shadow
- Dark mode support
- Lazy loading for images
- External links to client websites
- Accessibility features

Usage:

```astro
---
import PartnerLogos from '../components/PartnerLogos.astro';
---

<PartnerLogos />
```

## Best Practices

### Animation

- Use CSS transforms for performance
- Keep animations subtle and purposeful
- Provide reduced-motion alternatives
- Test performance on mobile devices
- Maintain consistent timing

### Responsive Design

- Use clamp() for fluid typography
- Test all breakpoints thoroughly
- Ensure touch targets are adequate
- Maintain visual hierarchy across sizes
- Consider viewport-based units

### Documentation

- Use AI-powered updates with `update-docs`
- Keep changelog entries concise
- Document architectural decisions
- Maintain development guidelines
- Track lessons learned

### Theme Usage

- Use custom properties for consistency
- Implement component-specific classes
- Follow naming conventions
- Maintain centralized configuration
- Document theme structure

## Layout Patterns

### Standardized Section Classes

The following classes are available for consistent layout implementation:

```css
.section-full {
  @apply w-full;
}

.section-content {
  @apply max-w-3xl mx-auto;
}

.section-content-narrow {
  @apply max-w-2xl mx-auto;
}

.section-content-wide {
  @apply max-w-4xl mx-auto;
}
```

### Implementation Examples

1. **Full-Width Section with centreed Heading**

```astro
<section class="section-full">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-centre">
    <h2>Section Heading</h2>
  </div>
  <div class="section-content-narrow">
    <!-- Content here -->
  </div>
</section>
```

2. **Full-Width Section with Full-Width Image**

```astro
<section class="section-full">
  <div class="section-content">
    <h2>Section Heading</h2>
    <p>Content text</p>
  </div>
  <div class="w-full">
    <img src="image.jpg" alt="Description" />
  </div>
</section>
```

### Usage Guidelines

1. **Section Structure**

   - Always use `.section-full` for the outer container
   - Apply appropriate content width class for text content
   - Use full width for images and other visual elements
   - Maintain consistent padding with `.px-4 sm:px-6 lg:px-8`

2. **Responsive Considerations**

   - Test layouts at all breakpoints
   - Ensure proper spacing on mobile
   - Consider content readability
   - Maintain visual hierarchy

3. **Accessibility**
   - Use semantic HTML
   - Maintain proper heading structure
   - Ensure sufficient contrast
   - Consider screen reader navigation

## Component Development

### Component Organization

Components must follow the feature-based directory structure:

```
src/
└── components/
    ├── ui/           # Shared UI components (Button, Card, etc.)
    ├── layout/       # Layout components (Header, Footer, etc.)
    └── features/     # Feature-specific components
        └── feature-name/
            └── components/
                └── Component.astro
```

Import components using the following conventions:

```typescript
import Button from "@/components/ui/Button.astro";
import Container from "@/components/layout/Container.astro";
import Feature from "@/components/features/feature-name/components/Component.astro";
```

### Australian English Standards

All code and documentation must follow Australian English standards:

1. **Spelling Configuration**

   - Use VS Code Code Spell Checker extension
   - Enable Australian English: `"cSpell.language": "en,en-AU"`
   - Add project-specific terms to `cSpell.words`

2. **Common Australian Spellings**

   - Use '-our' endings: colour, behaviour, favour
   - Use '-ise' endings: customise, realise
   - Use '-re' endings: centre, metre
   - Use Australian terms: organisation, catalogue

3. **Date and Time Formats**

   - Dates: DD/MM/YYYY
   - Time: 24-hour format
   - Time zones: Australian time zones

4. **Documentation**
   - Use Australian English in comments
   - Use Australian terminology
   - Include Australian examples
   - Follow Australian standards
