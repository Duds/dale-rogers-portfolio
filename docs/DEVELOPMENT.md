# Development Guide

This document outlines the development standards, workflows, and best practices for the Dale Rogers Portfolio project.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (preferred) or npm
- Git
- VS Code (recommended)

### Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/username/dale-rogers-portfolio.git
   cd dale-rogers-portfolio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   pnpm dev
   ```

## Development Workflow

### 1. Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates

### 2. Commit Standards

Follow conventional commits:

```bash
feat: add case study component
fix: resolve mobile navigation issue
docs: update component documentation
style: format with prettier
refactor: improve performance
test: add unit tests
```

### 3. Pull Request Process

1. Create feature branch
2. Implement changes
3. Run tests and linting
4. Create pull request
5. Request review
6. Address feedback
7. Merge when approved

## Code Standards

### 1. TypeScript

- Enable strict mode
- Use proper type definitions
- Avoid `any` type
- Document complex types
- Use type guards appropriately

```typescript
// Good
interface CaseStudy {
  /** Unique identifier */
  id: string;
  /** Study title */
  title: string;
  /** Publication date */
  pubDate: Date;
}

// Bad
interface Data {
  id: any;
  title: any;
  date: any;
}
```

### 2. Component Structure

Follow the feature-based architecture:

```
src/components/
├── features/          # Feature-specific components
│   ├── case-studies/
│   ├── articles/
│   └── scratch/
├── layout/           # Layout components
└── ui/              # Reusable UI components
```

### 3. Styling Guidelines

- Use TailwindCSS utilities
- Follow BEM-like naming for custom classes
- Maintain consistent spacing
- Support dark mode
- Ensure responsive design

```typescript
// Good
<div className="case-study-card dark:bg-gray-800">
  <h2 className="text-xl font-bold mb-4 dark:text-white">
    {title}
  </h2>
</div>

// Bad
<div className="card" style={{ marginBottom: '1rem' }}>
  <h2 className="title">
    {title}
  </h2>
</div>
```

### 4. Testing Standards

- Write unit tests for utilities
- Test components with Testing Library
- Add E2E tests for critical paths
- Maintain test coverage
- Test accessibility compliance

```typescript
describe("CaseStudyCard", () => {
  it("renders case study details correctly", () => {
    render(<CaseStudyCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
  });
});
```

## Performance Guidelines

### 1. Image Optimisation

- Use appropriate formats (WebP)
- Implement lazy loading
- Provide proper dimensions
- Optimise for different viewports
- Include alt text

### 2. Component Optimisation

- Minimise re-renders
- Use proper memoisation
- Implement code splitting
- Optimise bundle size
- Monitor performance metrics

### 3. Build Optimisation

- Enable tree shaking
- Implement proper caching
- Optimise asset loading
- Monitor bundle size
- Use production builds

## Accessibility Standards

### 1. WCAG 2.1 AA Compliance

- Proper heading structure
- Sufficient colour contrast
- Keyboard navigation
- Screen reader support
- Focus management

### 2. ARIA Implementation

- Use semantic HTML
- Add proper ARIA labels
- Implement ARIA roles
- Handle focus states
- Test with screen readers

## Regional Standards

### 1. Australian English

- Use Australian spelling
- Follow Australian date format (DD/MM/YYYY)
- Use 24-hour time format
- Implement Australian time zones
- Use metric measurements

### 2. VS Code Configuration

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "cSpell.language": "en-AU",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Deployment

### 1. Development

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

### 2. Production

- Automated deployment via GitHub Actions
- Production builds on Vercel
- Environment variable management
- Performance monitoring
- Error tracking

## Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Testing Library](https://testing-library.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Australian Style Manual](https://stylemanual.gov.au)
