# Storybook Documentation

## Overview

This project includes a comprehensive Storybook setup for documenting and testing UI components and atomic patterns. Storybook provides an isolated environment for developing and showcasing components with various states, props, and use cases.

**Current Status**: ✅ **Working** - Storybook is successfully configured and building with React components.

## Getting Started

### Installation

Storybook is already installed and configured in this project. The necessary dependencies are included in `package.json`:

```json
{
  "devDependencies": {
    "@storybook/addon-essentials": "^8.6.14",
    "@storybook/addon-interactions": "^8.6.14",
    "@storybook/addon-links": "^8.6.14",
    "@storybook/addon-a11y": "^8.6.14",
    "@storybook/addon-themes": "^8.6.14",
    "@storybook/react": "^8.6.14",
    "@storybook/react-vite": "^8.6.14",
    "@storybook/test": "^8.6.14",
    "storybook": "^8.6.14"
  }
}
```

### Running Storybook

```bash
# Start Storybook development server
pnpm run storybook

# Build Storybook for production
pnpm run storybook:build

# Export Storybook as static files
pnpm run storybook:export
```

Storybook will be available at `http://localhost:6006/` by default.

## Configuration

### Main Configuration (`.storybook/main.ts`)

The main configuration file defines:

- **Story discovery patterns**: Automatically finds stories in `src/**/*.stories.@(ts|tsx)`
- **Addons**: Essential addons for interactions, links, accessibility, and themes
- **Framework**: React with Vite for fast development
- **TypeScript**: React docgen for automatic prop documentation
- **Vite integration**: Custom Vite configuration for CSS and aliases

### Preview Configuration (`.storybook/preview.tsx`)

The preview configuration provides:

- **Global CSS**: Imports project styles and theme
- **Backgrounds**: Light, dark, and brand color backgrounds
- **Viewports**: Mobile, tablet, and desktop breakpoints
- **Accessibility**: WCAG compliance rules and testing
- **Theme switching**: Global light/dark theme toggle
- **Layout**: Centered component layout by default

## Component Coverage

### Currently Working Components

#### Button Component ✅
- **Variants**: Default, secondary, destructive, outline, ghost, link
- **Sizes**: Small, default, large, icon
- **States**: Default, disabled, hover, focus
- **Examples**: All variants, all sizes, interactive states

#### Card Component ✅
- **Variants**: Default, clickable, link, with/without title
- **Content Types**: Rich content, case studies, services
- **Layouts**: Responsive grid, custom styling
- **Examples**: Case study cards, service cards, responsive layouts

### Planned Components

The following components are planned for future implementation as React components:

- **Icon Component**: Material Design, Carbon, Simple Icons support
- **TagList Component**: Multiple tags with selection highlighting
- **Heading Component**: Semantic heading levels H1-H6
- **FormattedDate Component**: Australian date formatting
- **Pagination Component**: Page navigation controls
- **PageHeader Component**: Page titles with metadata
- **SectionHeading Component**: Section-level headings
- **Tag Component**: Individual tag display
- **ThemeToggle Component**: Light/dark theme switching

### Component Implementation Strategy

Since this is an Astro project, components are implemented in two ways:

1. **Astro Components** (`.astro` files): Server-side rendered components for the main application
2. **React Components** (`.tsx` files): Interactive components for Storybook and client-side functionality

To add new components to Storybook:

1. Create a React version (`.tsx`) of the component
2. Create comprehensive stories (`.stories.tsx`)
3. Ensure the component follows the project's design system
4. Test accessibility and responsive behavior

## Story Structure

### Story Organization

Stories are organized by component category:

```
UI/
├── Button/          ✅ Working
├── Card/            ✅ Working
├── Icon/            🔄 Planned
├── TagList/         🔄 Planned
├── Heading/         🔄 Planned
├── FormattedDate/   🔄 Planned
├── Pagination/      🔄 Planned
├── PageHeader/      🔄 Planned
├── SectionHeading/  🔄 Planned
├── Tag/             🔄 Planned
└── ThemeToggle/     🔄 Planned
```

### Story Naming Convention

- **Default**: Basic component usage
- **Variants**: Different prop combinations
- **Sizes**: Size variations where applicable
- **States**: Interactive states (hover, focus, disabled)
- **Contexts**: Real-world usage examples
- **Accessibility**: Accessibility features and testing
- **Responsive**: Responsive behavior demonstrations

### Story Documentation

Each story includes:

- **Component description**: Clear explanation of purpose and usage
- **Props documentation**: All available props with descriptions
- **Examples**: Multiple usage scenarios and contexts
- **Accessibility notes**: Screen reader and keyboard navigation support
- **Responsive behavior**: Mobile, tablet, and desktop adaptations

## Addons and Features

### Essential Addons

- **@storybook/addon-essentials**: Core Storybook functionality
- **@storybook/addon-interactions**: Interactive testing and debugging
- **@storybook/addon-links**: Navigation between stories
- **@storybook/addon-a11y**: Accessibility testing and compliance
- **@storybook/addon-themes**: Theme switching and testing

### Accessibility Testing

The accessibility addon provides:

- **WCAG compliance**: Automatic accessibility rule checking
- **Color contrast**: Ensures sufficient contrast ratios
- **Heading structure**: Validates proper heading hierarchy
- **ARIA labels**: Checks for proper ARIA implementation
- **Keyboard navigation**: Tests keyboard accessibility

### Theme Testing

Theme switching allows testing:

- **Light theme**: Default light appearance
- **Dark theme**: Dark mode appearance
- **Brand colors**: Primary color variations
- **Responsive themes**: Theme behavior across breakpoints

### Viewport Testing

Multiple viewport sizes for testing:

- **Mobile**: 375x667px (iPhone SE)
- **Tablet**: 768x1024px (iPad)
- **Desktop**: 1200x800px (Standard desktop)

## Best Practices

### Component Development

1. **Start with stories**: Write stories before implementing components
2. **Cover all variants**: Document every prop combination
3. **Include real examples**: Show components in realistic contexts
4. **Test accessibility**: Ensure WCAG compliance
5. **Test responsiveness**: Verify mobile and tablet behavior

### Story Writing

1. **Clear descriptions**: Explain what each story demonstrates
2. **Meaningful names**: Use descriptive story names
3. **Realistic data**: Use realistic content and examples
4. **Context examples**: Show components in page layouts
5. **Interactive examples**: Include clickable and interactive states

### Documentation

1. **Component descriptions**: Clear purpose and usage guidelines
2. **Prop documentation**: All props with types and descriptions
3. **Usage examples**: Code examples and implementation patterns
4. **Accessibility notes**: Screen reader and keyboard support
5. **Responsive behavior**: Mobile and tablet adaptations

## Testing and Quality

### Automated Testing

- **Accessibility**: Automatic WCAG compliance checking
- **Visual regression**: Screenshot testing for visual changes
- **Interaction testing**: User interaction and state management
- **Responsive testing**: Multiple viewport size testing

### Manual Testing

- **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
- **Mobile devices**: Test on actual mobile devices
- **Screen readers**: Test with NVDA, JAWS, VoiceOver
- **Keyboard navigation**: Test tab order and focus management

## Troubleshooting

### Common Issues

1. **Stories not loading**: Check file naming and location
2. **CSS not applying**: Verify CSS imports in preview configuration
3. **TypeScript errors**: Check component prop types and interfaces
4. **Build failures**: Clear Storybook cache and rebuild

### Performance Optimization

1. **Lazy loading**: Load stories on demand
2. **Bundle analysis**: Monitor bundle size and dependencies
3. **Image optimization**: Compress images and use appropriate formats
4. **Code splitting**: Split large components into smaller chunks

## Integration with Development

### Development Workflow

1. **Component creation**: Start with Storybook stories
2. **Implementation**: Build component based on stories
3. **Testing**: Test in Storybook environment
4. **Documentation**: Update stories with real examples
5. **Review**: Use stories for component review and approval

### Design System Integration

- **Token usage**: Consistent design tokens across components
- **Theme support**: Light and dark theme variants
- **Responsive design**: Mobile-first responsive behavior
- **Accessibility**: WCAG AA compliance standards

### Continuous Integration

- **Storybook builds**: Automated Storybook builds on PR
- **Accessibility testing**: Automated accessibility compliance checks
- **Visual regression**: Screenshot comparison testing
- **Performance monitoring**: Bundle size and performance tracking

## Future Enhancements

### Immediate Next Steps

1. **Create React versions** of remaining UI components
2. **Add comprehensive stories** for each new component
3. **Implement design tokens** consistently across components
4. **Add accessibility features** to all components

### Planned Features

- **Component playground**: Interactive component testing
- **Design token documentation**: Visual design system documentation
- **Component composition**: Examples of component combinations
- **Performance metrics**: Component performance benchmarking
- **Internationalization**: Multi-language component examples

### Community Contributions

- **Story additions**: New story examples and use cases
- **Component improvements**: Enhanced component functionality
- **Documentation updates**: Improved component documentation
- **Accessibility enhancements**: Better accessibility support
- **Performance optimizations**: Faster component rendering

## Resources

### Documentation

- [Storybook Documentation](https://storybook.js.org/docs)
- [React Addon Documentation](https://storybook.js.org/addons/@storybook/addon-essentials)
- [Accessibility Addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Theme Addon](https://storybook.js.org/addons/@storybook/addon-themes)

### Community

- [Storybook Discord](https://discord.gg/storybook)
- [GitHub Discussions](https://github.com/storybookjs/storybook/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/storybook)

### Examples

- [Storybook Examples](https://storybook.js.org/examples)
- [Component Libraries](https://storybook.js.org/showcase)
- [Design Systems](https://storybook.js.org/showcase/design-systems)

---

## Current Status Summary

✅ **Storybook Setup**: Successfully configured and building
✅ **Button Component**: Full stories and documentation
✅ **Card Component**: Full stories and documentation
🔄 **Additional Components**: Planned for future implementation

This Storybook setup provides a solid foundation for component development, testing, and documentation. It currently supports the Button and Card components with comprehensive stories, and is ready for expansion as more React components are implemented.

The setup follows best practices for accessibility, responsive design, and theme support, making it an excellent tool for maintaining design consistency and component quality across the application.
