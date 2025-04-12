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
