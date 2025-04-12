# Development Guide

## Setup

### Prerequisites
- Node.js (v18 or later)
- pnpm
- Git

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/dale-rogers/dale-rogers-portfolio.git
   cd dale-rogers-portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. Start development server:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Branch Strategy
- `main`: Production branch
- `develop`: Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Testing
- Run tests: `pnpm test`
- Update snapshots: `pnpm test:update`
- Coverage report: `pnpm test:coverage`

### Code Quality
- Lint: `pnpm lint`
- Format: `pnpm format`
- Type check: `pnpm typecheck`

### Building
- Production build: `pnpm build`
- Preview build: `pnpm preview`

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
   - Clear cache: `pnpm clean`
   - Update dependencies: `pnpm update`
   - Check TypeScript errors: `pnpm typecheck`

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