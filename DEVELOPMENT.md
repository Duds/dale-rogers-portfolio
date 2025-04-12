# Development Guide

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

/* Colors */
--colour-nav-bg: var(--colour-bg);
--colour-nav-text: var(--colour-black);
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
- Color inheritance through currentColor

### Navigation

- Full viewport width design
- Themed component classes
- Mobile-first responsive approach
- Consistent interactive states

### Animation

- Use CSS transforms for performance
- Keep animations subtle and purposeful
- Provide reduced-motion alternatives
- Test performance on mobile devices

### Responsive Design

- Use clamp() for fluid typography
- Test all breakpoints thoroughly
- Ensure touch targets are adequate
- Maintain visual hierarchy across sizes
