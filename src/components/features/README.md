# Feature Components

This directory contains components that are specific to particular features or sections of the application.

## Component Guidelines

- Components should be feature-specific
- Follow established UI patterns
- Include proper TypeScript types
- Implement proper error handling
- Document feature requirements

## Components List

- `CaseStudyCard.astro`: Case study display component
- `SpinningLogo.astro`: Animated logo component

## Directory Structure

Each feature should have its own directory:

```
features/
├── case-studies/
│   ├── components/
│   ├── types/
│   └── utils/
├── portfolio/
│   ├── components/
│   ├── types/
│   └── utils/
```

## Usage

Import feature components as needed:

```astro
---
import { CaseStudyCard } from '@/components/features/case-studies/CaseStudyCard.astro';
---

<CaseStudyCard project={project} />
```

## Contributing

When adding new feature components:

1. Create a new feature directory if needed
2. Follow established patterns
3. Add proper documentation
4. Include feature-specific tests
5. Document any dependencies
