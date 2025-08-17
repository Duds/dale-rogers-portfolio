# Portfolio Architecture

## Related Documentation

- [Development Guide](./DEVELOPMENT.md) - Setup and workflow information
- [Components Documentation](./docs/COMPONENTS.md) - Detailed component specifications
- [Deployment](./docs/DEPLOYMENT.md) - Deployment procedures and environments
- [Theme System](./src/styles/THEME.md) - Theming and styling documentation
- [Content Management](./docs/CONTENT.md) - Content collections and data flow
- [Search Features](./docs/SEARCH.md) - Search implementation details
- [Documentation Index](./docs/README.md) - Complete documentation list

## System Overview

The portfolio is built as a server-side rendered Astro application with static pages and dynamic API routes for form handling.

## Core Components

### Frontend

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Components**: `.astro` components with minimal JavaScript
- **Assets**: Optimized images and SVG icons

### Backend Services

- **Contact Form**:
  - API Route: `/api/contact`
  - Email Service: Nodemailer with Gmail SMTP
  - Authentication: Google Workspace App Password

### Data Flow

1. **Contact Form Submission**

   ```
   User -> Contact Form -> API Route -> Nodemailer -> Gmail SMTP -> Admin Email
   ```

2. **Analytics (Planned)**
   ```
   User -> Page View -> Umami Script -> Umami Server -> PostgreSQL
   ```

## Directory Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts and templates
├── pages/         # Routes and API endpoints
├── styles/        # Global styles and Tailwind config
└── utils/         # Shared utilities and helpers
```

## External Dependencies

- **Email**: Google Workspace (Gmail SMTP)
- **Analytics**: Umami (planned)
- **Hosting**: CrazyDomains
- **Domain**: dalerogers.com.au

## Security Considerations

- Environment variables for sensitive data
- Server-side email handling
- No client-side exposure of credentials
- Privacy-focused analytics solution

## Performance Optimizations

- Static site generation where possible
- Minimal JavaScript usage
- Optimized image assets
- System font stack
- Lazy-loaded components

## Component Architecture

The project follows a feature-based component architecture with three main categories:

### UI Components (`src/components/ui/`)

Reusable UI components that form the building blocks of our application:

- `Button.astro`: Base button component
- `Card.astro`: Card container component
- `Icon.astro`: Icon system component
- `ThemeToggle.astro`: Theme switching functionality

### Layout Components (`src/components/layout/`)

Components that define the structure and layout:

- `Container.astro`: Content width control
- `Navigation.astro`: Main navigation
- `Footer.astro`: Site-wide footer

### Feature Components (`src/components/features/`)

Feature-specific components organised by domain:

#### Case Studies (`features/case-studies/`)

- Components for displaying case study content
- Includes `CaseStudyCard.astro` for project showcases

#### Portfolio (`features/portfolio/`)

- Portfolio-specific components
- Includes `SpinningLogo.astro` for branding

### Component Guidelines

1. **Directory Structure**

   ```
   src/
   ├── components/
   │   ├── ui/           # Shared UI components
   │   ├── layout/       # Layout components
   │   └── features/     # Feature-specific components
   │       ├── case-studies/
   │       └── portfolio/
   ```

2. **Import Conventions**

   ```astro
   // Import UI components
   import { Button } from '@/components/ui/Button.astro';

   // Import layout components
   import { Container } from '@/components/layout/Container.astro';

   // Import feature components
   import { CaseStudyCard } from '@/components/features/case-studies/components/CaseStudyCard.astro';
   ```

3. **Component Organisation**
   - Each feature directory contains:
     - `components/`: Feature-specific components
     - `types/`: TypeScript types and interfaces
     - `utils/`: Helper functions and utilities

4. **Best Practices**
   - Follow component naming conventions
   - Maintain proper documentation
   - Include TypeScript types
   - Implement accessibility features
   - Add necessary tests
