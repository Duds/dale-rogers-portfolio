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

### Case Study Components

#### CaseStudyCard (`CaseStudyCard.astro`)

- **Enhanced card component** for displaying case study previews
- **Improved typography** with clear hierarchy and spacing
- **Better information layout** with structured metadata presentation
- **Client badge overlay** for prominent client identification
- **Interactive elements** with smooth hover animations
- **Responsive design** optimised for all device sizes

#### CaseStudyHero (`CaseStudyHero.astro`)

- **Dedicated hero component** for case study pages
- **Enhanced visual impact** with prominent title and metadata
- **Project overview grid** for structured information display
- **Icon integration** for different information types
- **Responsive layout** optimised for all screen sizes

#### CaseStudyLayout (`CaseStudyLayout.astro`)

- **Enhanced layout component** for individual case study pages
- **Hero integration** using CaseStudyHero for consistency
- **Content typography** with improved readability
- **Visual elements** with enhanced styling for all content types
- **Accessibility features** with proper semantic structure

## Enhanced Case Studies Features

### Typography Improvements

- **Font Hierarchy**: Clear distinction between heading levels
- **Spacing**: Consistent spacing using design tokens
- **Readability**: Improved line height and paragraph spacing
- **Contrast**: Enhanced contrast for better accessibility

### Information Architecture

- **Structured Layout**: Logical grouping of related information
- **Visual Separation**: Clear boundaries between content sections
- **Metadata Presentation**: Enhanced display of project details
- **Content Flow**: Improved reading experience

### Visual Enhancements

- **Card Design**: Modern card-based layout with subtle shadows
- **Hover Effects**: Smooth animations and transitions
- **Icon Integration**: Meaningful icons for different content types
- **Color Usage**: Consistent use of theme tokens

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
   - Components use Tailwind CSS classes with theme tokens
   - Custom styles are defined in component-specific CSS files
   - Theme variables are used for consistent colors and spacing

4. **Accessibility**
   - All components include proper ARIA attributes
   - Keyboard navigation is supported
   - Color contrast meets WCAG AA guidelines

## Best Practices

1. **Component Structure**
   - One component per file
   - Clear prop interfaces with TypeScript
   - Consistent naming conventions
   - Component-specific CSS files

2. **Documentation**
   - JSDoc comments for props and functions
   - Clear examples in component files
   - TypeScript types for better IDE support
   - README files for complex components

3. **Testing**
   - Manual testing for visual consistency
   - Responsive design testing across devices
   - Accessibility testing with screen readers
   - Performance testing for animations

4. **Theme Integration**
   - Use theme tokens for all design values
   - Support both light and dark modes
   - Consistent spacing and typography scales
   - Proper contrast ratios for accessibility

## Case Studies Implementation

The case studies components provide a comprehensive solution for displaying project work:

1. **Grid View** (`CaseStudyCard`): Enhanced cards for listing pages
2. **Hero View** (`CaseStudyHero`): Prominent presentation for individual pages
3. **Layout System** (`CaseStudyLayout`): Consistent page structure
4. **Typography System**: Enhanced readability and visual hierarchy
5. **Responsive Design**: Optimised for all device sizes
6. **Accessibility**: WCAG AA compliant with proper semantic structure

For detailed documentation on case studies components, see `src/components/features/case-studies/README.md`.
