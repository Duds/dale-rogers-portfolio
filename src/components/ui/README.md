# UI Components

This directory contains reusable React components built with TypeScript and Tailwind CSS v4. All components are designed to be accessible, customizable, and well-documented.

## 🎯 Design Principles

- **Accessibility First**: All components meet WCAG AA standards
- **Type Safety**: Full TypeScript support with proper prop interfaces
- **Customizable**: Flexible styling through Tailwind classes and CSS variables
- **Composable**: Components can be combined to create complex UIs
- **Consistent**: Unified design language and interaction patterns

## 📚 Component Library

### Button

A versatile button component with multiple variants and sizes.

**Features:**

- 6 visual variants (default, secondary, destructive, outline, ghost, link)
- 4 sizes (small, default, large, icon)
- Full keyboard navigation support
- Disabled state handling
- Customizable through className prop

**Usage:**

```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="lg">
  Click me
</Button>;
```

### Card

A flexible card component with header, content, and footer sections.

**Features:**

- Modular composition (CardHeader, CardTitle, CardDescription, etc.)
- Responsive design
- Customizable spacing and layout
- Consistent with design system

**Usage:**

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>;
```

## 🎨 Styling System

### Tailwind CSS v4

All components use Tailwind CSS v4 with CSS custom properties for theming.

### CSS Variables

Components automatically use the design system's CSS variables:

- `--background`, `--foreground`
- `--primary`, `--secondary`
- `--muted`, `--accent`
- `--border`, `--ring`

### Dark Mode

Components automatically support dark mode through CSS variable overrides.

## 🧪 Development & Testing

### Storybook

All components have comprehensive Storybook stories:

```bash
pnpm storybook
```

### Testing

Components include unit tests with React Testing Library:

```bash
pnpm test
```

### Type Checking

Full TypeScript support with strict type checking:

```bash
pnpm typecheck
```

## 📖 Documentation

### Component APIs

Each component includes:

- TypeScript interfaces
- Prop descriptions
- Usage examples
- Accessibility notes

### Storybook Stories

Interactive examples showing:

- All variants and states
- Interactive controls
- Responsive behavior
- Accessibility features

## 🔧 Adding New Components

### 1. Create Component File

```tsx
// src/components/ui/NewComponent.tsx
import React from 'react';

export interface NewComponentProps {
  // Define props
}

export const NewComponent: React.FC<NewComponentProps> = ({ ... }) => {
  // Implementation
};
```

### 2. Create Stories File

```tsx
// src/components/ui/NewComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { NewComponent } from "./NewComponent";

const meta: Meta<typeof NewComponent> = {
  title: "UI/NewComponent",
  component: NewComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    /* default props */
  },
};
```

### 3. Add Tests

```tsx
// src/components/ui/__tests__/NewComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { NewComponent } from "../NewComponent";

describe("NewComponent", () => {
  it("renders correctly", () => {
    render(<NewComponent />);
    // Test implementation
  });
});
```

## 🎯 Best Practices

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Provide screen reader support

### Performance

- Use React.memo for expensive components
- Lazy load when appropriate
- Optimize re-renders
- Minimize bundle size

### Styling

- Use Tailwind utility classes
- Leverage CSS custom properties
- Support both themes
- Maintain responsive design

### TypeScript

- Define complete interfaces
- Use proper generic types
- Include JSDoc comments
- Maintain type safety

## 🔗 Integration

### Astro Integration

Components can be used in Astro pages as React islands:

```astro
---
import { Button } from '@/components/ui/Button';
---

<div>
  <Button client:load variant="primary">
    Interactive Button
  </Button>
</div>
```

### Design System

Components follow the established design system:

- Consistent spacing scale
- Unified color palette
- Standard typography
- Common interaction patterns

## 📈 Roadmap

### Planned Components

- [ ] Input fields (text, email, password)
- [ ] Form components (select, checkbox, radio)
- [ ] Navigation components (breadcrumbs, pagination)
- [ ] Feedback components (alert, toast, modal)
- [ ] Data display (table, list, badge)

### Enhancements

- [ ] Animation system
- [ ] Advanced theming
- [ ] Component playground
- [ ] Performance monitoring
- [ ] Accessibility auditing

## 🤝 Contributing

### Code Standards

- Follow TypeScript best practices
- Include comprehensive tests
- Write clear documentation
- Maintain accessibility standards

### Review Process

- All changes require review
- Tests must pass
- Documentation must be updated
- Accessibility must be verified

## 📚 Resources

### Documentation

- [Component Library Guide](./storybook.md)
- [Design System Documentation](../docs/design-system.md)
- [Accessibility Guidelines](../docs/accessibility.md)

### Tools

- [Storybook](https://storybook.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript](https://www.typescriptlang.org/)
