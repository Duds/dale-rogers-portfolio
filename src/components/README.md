# Components

This directory contains reusable UI components used throughout the portfolio site. All components are built using Astro and follow a consistent design system.

## Available Components

### Button (`Button.astro`)

- A flexible button component that can render as either a `<button>` or `<a>` element
- Supports multiple variants: primary, secondary, and outline
- Inherits all standard HTML button/anchor attributes
- Automatically handles hover states and transitions

### Card (`Card.astro`)

- A container component for displaying content in a consistent, styled box
- Can be rendered as a `<div>` or `<a>` element
- Supports optional title and hover effects
- Uses consistent spacing and shadow styles

### Icon (`Icon.astro`)

- SVG icon component with consistent styling
- Supports predefined set of icons:
  - Social: linkedin, github, instagram
  - Contact: mail
  - Services: strategy, research, blueprint, codesign, evaluation
- Customizable size through className prop

### Navigation (`Navbar.astro`)

- Main site navigation component
- Responsive design with mobile menu
- Includes logo and navigation links
- Handles scroll behavior and active states

### Footer (`Footer.astro`)

- Site footer with multiple sections
- Includes CTA, social links, sitemap, and legal links
- Responsive grid layout
- Consistent styling with main site theme

### Spinning Logo (`SpinningLogo.astro`)

- Animated logo component
- Continuous slow rotation animation
- Customizable size and color
- Used in navigation and hero sections

### Case Study Card (`CaseStudyCard.astro`)

- Specialized card for displaying case studies
- Includes title, description, and tags
- Consistent styling with main Card component
- Used in case studies listing page

## Usage Guidelines

1. **Importing Components**

   ```astro
   import ComponentName from '../components/ComponentName.astro';
   ```

2. **Props**

   - All components use TypeScript interfaces for props
   - Required props are marked as such
   - Optional props have default values

3. **Styling**

   - Components use Tailwind CSS classes
   - Custom styles are defined in `global.css`
   - Theme variables are used for consistent colors

4. **Accessibility**
   - All components include proper ARIA attributes
   - Keyboard navigation is supported
   - Color contrast meets WCAG guidelines

## Best Practices

1. **Component Structure**

   - One component per file
   - Clear prop interfaces
   - Consistent naming conventions

2. **Documentation**

   - JSDoc comments for props and functions
   - Clear examples in component files
   - TypeScript types for better IDE support

3. **Testing**
   - Manual testing for visual consistency
   - Responsive design testing
   - Accessibility testing
