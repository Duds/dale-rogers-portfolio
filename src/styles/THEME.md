# Theme Documentation

This document outlines the theme system used throughout the portfolio site, including color palettes, component theming, and usage guidelines.

## Color System

### Primary Colors

- `--colour-purple`: #af8abf (Primary brand color)
- `--colour-black`: #10100f (Text and dark elements)
- `--colour-green`: #36a96a (Success/positive actions)
- `--colour-orange`: #fa8a58 (Accent/CTA elements)
- `--colour-yellow`: #eaf205 (Highlight elements)

### Semantic Colors

- `--colour-bg`: #ffffff (Background)
- `--colour-text`: var(--colour-black) (Primary text)
- `--colour-accent`: var(--colour-orange) (Accent color)

### UI Colors

- `--colour-button-bg`: var(--colour-black) (Default button background)
- `--colour-button-text`: #ffffff (Default button text)
- `--colour-button-hover`: var(--colour-purple) (Button hover state)
- `--colour-highlight`: var(--colour-yellow) (Highlight elements)
- `--colour-shadow`: rgba(16, 16, 15, 0.08) (Default shadow)
- `--colour-section-alt`: rgba(175, 138, 191, 0.05) (Alternate section background)

## Component Theming

### Buttons

The site uses a flexible button system with multiple variants:

1. **Primary Button** (`.btn-primary`)

   - Background: `--colour-button-bg`
   - Text: `--colour-button-text`
   - Hover: `--colour-button-hover`
   - Used for: Main CTAs, form submissions

2. **Secondary Button** (`.btn-secondary`)

   - Border: `--colour-text`
   - Text: `--colour-text`
   - Hover: Light background
   - Used for: Secondary actions, less prominent CTAs

3. **Contextual Buttons**
   - Success: Green variant for positive actions
   - Warning: Orange variant for cautionary actions
   - Danger: Red variant for destructive actions

### Cards

Cards use a consistent styling system with contextual variants:

1. **Base Card** (`.card-base`)

   - Background: `--colour-bg`
   - Shadow: `--colour-shadow`
   - Border radius: `--radius-lg`

2. **Service Cards**
   - Purple: `.card-service-purple`
   - Black: `.card-service-black`
   - Green: `.card-service-green`
   - Orange: `.card-service-orange`

### Navigation

- Background: `--colour-nav-bg`
- Text: `--colour-nav-text`
- Hover: `--colour-nav-link-hover`
- Border: `--colour-nav-border`

### Footer

- Background: `--colour-footer-bg`
- Text: `--colour-footer-text`
- Links: White with purple hover
- Border: `--colour-footer-border`

## Usage Guidelines

### Button Usage

1. Use primary buttons for main CTAs and form submissions
2. Use secondary buttons for less prominent actions
3. Use contextual buttons when the action type is important
4. Ensure sufficient contrast between text and background

### Color Usage

1. Use primary colors for brand elements
2. Use semantic colors for UI elements
3. Maintain consistent color relationships
4. Ensure WCAG 2.1 AA compliance for text contrast

### Component Styling

1. Use the provided utility classes
2. Maintain consistent spacing using the spacing scale
3. Follow the typography scale for text elements
4. Use shadows and borders consistently

## Theme Customization

To customize the theme:

1. Update the color variables in `global.css`
2. Modify component classes as needed
3. Ensure all changes maintain accessibility standards
4. Test across different contexts and components

## Accessibility Considerations

1. Maintain minimum contrast ratios:

   - Text: 4.5:1
   - Large text: 3:1
   - UI components: 3:1

2. Use semantic colors appropriately:

   - Success: Green
   - Warning: Orange
   - Error: Red

3. Ensure interactive elements have clear states:
   - Hover
   - Focus
   - Active
   - Disabled

# Design System Documentation

## Components

### LogoSalad

A responsive component that displays client logos in a grid layout with hover effects.

**Usage:**

```astro
---
import LogoSalad from "./components/sections/LogoSalad.astro";
---

<LogoSalad />
```

**Features:**

- Responsive grid layout
- Hover effects on logos
- Dark mode support
- Lazy loading of images
- External links to client websites

**Logo Requirements:**
Logos should be placed in the `public/images/logos` directory with the following naming convention:

- `doh.png` - Department of Health
- `services-australia.png` - Services Australia
- `education.png` - Department of Education
- `ato.png` - Australian Taxation Office
- `ndis.png` - National Disability Insurance Scheme
- `dta.png` - Digital Transformation Agency

**Styling:**

- Container: `py-20 bg-gray-50 dark:bg-gray-900`
- Heading: `text-2xl font-semibold text-gray-600 dark:text-gray-400`
- Logo container: `flex flex-wrap justify-center items-center gap-12 md:gap-16`
- Logo links: `opacity-60 hover:opacity-100 transition-opacity duration-300`
- Logo images: `h-12 md:h-16 w-auto`

**Image Requirements:**

- Format: PNG
- Color: Black and white recommended for best visibility
- Size: Will be automatically scaled to `h-12` on mobile and `h-16` on desktop
- Aspect ratio: Maintain original aspect ratio

**Accessibility:**

- All logos have proper alt text
- Links open in new tabs with `rel="noopener noreferrer"`
- Images use lazy loading for performance
