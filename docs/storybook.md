# Storybook Configuration & Usage Guide

## Overview

Storybook is configured for React components with Vite integration, providing an isolated development environment for UI components. This setup supports TypeScript, Tailwind CSS v4, and comprehensive component documentation.

## 🚀 Quick Start

### Start Storybook

```bash
pnpm storybook
```

Storybook will start on `http://localhost:6006`

### Build Storybook

```bash
pnpm storybook:build
```

### Export Static Files

```bash
pnpm storybook:export
```

## 📁 Configuration Files

### `.storybook/main.ts`

Main Storybook configuration with:

- React + Vite framework
- TypeScript support
- Essential addons (links, essentials, interactions)
- Story discovery patterns
- TypeScript docgen configuration

### `.storybook/preview.ts`

Preview configuration with:

- Global styles import
- Theme switching (light/dark)
- Background controls
- Layout settings
- Global decorators

### `.storybook/manager.ts`

UI customization:

- Light theme
- Sidebar configuration
- Toolbar settings

### `.storybook/preview-head.html`

Additional HTML head content:

- Font loading (Inter)
- Meta tags
- Custom styles

## 🎨 Component Stories

### Button Component

Located at `src/components/ui/Button.stories.tsx`

**Variants:**

- Default, Secondary, Destructive
- Outline, Ghost, Link

**Sizes:**

- Small, Default, Large, Icon

**States:**

- Disabled, Interactive

**Stories:**

- Individual variant/size stories
- Comparison stories (AllVariants, AllSizes)
- Interactive examples

### Card Component

Located at `src/components/ui/Card.stories.tsx`

**Composition:**

- CardHeader, CardTitle, CardDescription
- CardContent, CardFooter

**Examples:**

- Default card layout
- Profile cards
- Stats cards
- Interactive cards
- Content-only cards

## 🛠️ Development Workflow

### Adding New Components

1. **Create Component File**

   ```tsx
   // src/components/ui/NewComponent.tsx
   import React from 'react';

   export interface NewComponentProps {
     // Define props
   }

   export const NewComponent: React.FC<NewComponentProps> = ({ ... }) => {
     // Component implementation
   };
   ```

2. **Create Stories File**

   ```tsx
   // src/components/ui/NewComponent.stories.tsx
   import type { Meta, StoryObj } from "@storybook/react";
   import { NewComponent } from "./NewComponent";

   const meta: Meta<typeof NewComponent> = {
     title: "UI/NewComponent",
     component: NewComponent,
     parameters: {
       layout: "centered",
     },
     tags: ["autodocs"],
   };

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {
       // Default props
     },
   };
   ```

### Story Best Practices

1. **Use Descriptive Titles**
   - Group related components: `UI/Button`, `UI/Card`
   - Use clear, descriptive names

2. **Include Metadata**

   ```tsx
   tags: ['autodocs'], // Auto-generate documentation
   parameters: {
     layout: 'centered', // Layout preference
     docs: {
       description: {
         component: 'Component description',
       },
     },
   },
   ```

3. **Define Controls**

   ```tsx
   argTypes: {
     variant: {
       control: { type: 'select' },
       options: ['option1', 'option2'],
       description: 'What this prop does',
     },
   },
   ```

4. **Create Multiple Stories**
   - Default state
   - Variants
   - Interactive states
   - Edge cases

## 🎯 Advanced Features

### Theme Switching

Stories automatically support light/dark theme switching through the global decorator.

### Background Controls

Pre-configured backgrounds for testing component appearance on different surfaces.

### Layout Controls

Centered layout by default, with options for full-width or custom layouts.

### Auto-Documentation

Components tagged with `['autodocs']` automatically generate documentation pages.

## 🔧 Customization

### Adding Addons

1. Install addon package
2. Add to `.storybook/main.ts` addons array
3. Configure in `.storybook/preview.ts`

### Custom Decorators

Add global decorators in `.storybook/preview.ts`:

```tsx
decorators: [
  (Story, context) => {
    // Custom wrapper logic
    return <CustomWrapper><Story /></CustomWrapper>;
  },
],
```

### Custom Parameters

Set global parameters in `.storybook/preview.ts`:

```tsx
parameters: {
  // Global parameters
  backgrounds: { ... },
  layout: '...',
  docs: { ... },
},
```

## 🧪 Testing Integration

### Component Testing

Stories can be used for:

- Visual regression testing
- Component behavior testing
- Accessibility testing
- Cross-browser testing

### Storybook Testing Library

```tsx
import { within, userEvent } from "@storybook/testing-library";

export const InteractionTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
  },
};
```

## 📱 Responsive Design

### Viewport Addon

Configure different viewport sizes for testing responsive behavior:

```tsx
parameters: {
  viewport: {
    viewports: {
      mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
      tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
    },
  },
},
```

## 🎨 Design System Integration

### Tailwind CSS v4

- All Tailwind utilities available in stories
- CSS custom properties for theming
- Dark mode support

### Component Variants

- Consistent prop interfaces
- Reusable component patterns
- Design token integration

## 🚀 Performance

### Build Optimization

- Vite integration for fast builds
- Tree-shaking for unused code
- Optimized bundle generation

### Development Experience

- Hot module replacement
- Fast refresh
- Efficient story loading

## 📚 Resources

### Official Documentation

- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook Addons](https://storybook.js.org/addons/)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/introduction)

### Community

- [Storybook Discord](https://discord.gg/storybook)
- [GitHub Discussions](https://github.com/storybookjs/storybook/discussions)

## 🔍 Troubleshooting

### Common Issues

1. **Stories Not Loading**
   - Check file naming: `*.stories.tsx`
   - Verify import paths
   - Check TypeScript errors

2. **Styles Not Applied**
   - Ensure global CSS import in preview.ts
   - Check Tailwind CSS configuration
   - Verify CSS variable definitions

3. **Build Failures**
   - Check TypeScript compilation
   - Verify dependency versions
   - Check for syntax errors

### Debug Mode

Start Storybook with debug information:

```bash
DEBUG=* pnpm storybook
```

## 📈 Next Steps

### Planned Enhancements

- [ ] Add more UI components
- [ ] Implement visual regression testing
- [ ] Add accessibility testing addon
- [ ] Create design system documentation
- [ ] Add component playground
- [ ] Implement story composition

### Integration Opportunities

- [ ] Design tokens documentation
- [ ] Component API documentation
- [ ] Interactive examples
- [ ] Performance monitoring
- [ ] Accessibility auditing
