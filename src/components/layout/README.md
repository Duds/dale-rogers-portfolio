# Layout Components

This directory contains components that define the structure and layout of pages across the application.

## Component Guidelines

- Components should focus on structural layout
- Implement responsive design patterns
- Use CSS Grid and Flexbox appropriately
- Follow accessibility best practices
- Include proper TypeScript types

## Components List

- `Container.astro`: Main container component for content width control
- `Navigation.astro`: Main navigation component
- `Footer.astro`: Site-wide footer component

## Usage

Import layout components as needed:

```astro
---
import { Container } from '@/components/layout/Container.astro';
---

<Container>
  <slot />
</Container>
```

## Layout Patterns

- Use CSS Grid for page-level layouts
- Use Flexbox for component-level layouts
- Implement proper spacing using design tokens
- Follow mobile-first responsive design

## Contributing

When adding new layout components:

1. Follow established layout patterns
2. Document breakpoints and responsive behaviour
3. Include usage examples
4. Test across different viewport sizes
