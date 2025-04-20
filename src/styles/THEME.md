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

## Shadow System

### Base Shadows

The site uses a consistent shadow system with support for both light and dark modes:

1. **Soft Shadow** (`shadow-soft`)

   - Light mode: `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`
   - Dark mode: `0 4px 6px -1px rgba(255, 255, 255, 0.05), 0 2px 4px -1px rgba(255, 255, 255, 0.03)`
   - Usage: Static elements, cards, containers

2. **Hover Shadow** (`shadow-soft-hover`)

   - Light mode: `0 6px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)`
   - Dark mode: `0 6px 8px -2px rgba(255, 255, 255, 0.05), 0 4px 6px -2px rgba(255, 255, 255, 0.03)`
   - Usage: Interactive elements, buttons, links

3. **Button Hover** (`shadow-button-hover`)

   - Value: `0 4px 14px -2px rgba(139, 92, 246, 0.4)`
   - Usage: Primary button hover states

4. **Card Shadow** (`shadow-card`)
   - Value: `0 8px 30px rgba(139, 92, 246, 0.15)`
   - Usage: Featured cards, prominent containers

### Implementation

```typescript
// Example usage in components
<div class="shadow-soft">Static content</div>
<button class="shadow-soft-hover">Interactive element</button>
<div class="shadow-card">Featured content</div>
```

### Performance Considerations

1. **Hardware Acceleration**

   - Use transform properties for hover effects
   - Combine with `will-change` for heavy animations
   - Implement `@media (prefers-reduced-motion)` support

2. **Dark Mode**
   - Automatic adaptation via CSS custom properties
   - Smooth transitions between modes
   - Proper contrast maintenance

### Accessibility Guidelines

1. **Contrast**

   - Maintain 3:1 minimum contrast ratio
   - Ensure visibility in both modes
   - Test with vision impairment tools

2. **Motion**
   - Respect user motion preferences
   - Provide reduced motion alternatives
   - Keep transitions under 300ms

## TODO

### Shadow System Improvements

1. **Component Integration** (Priority: High)

   - Implement new shadow variants in existing components
   - Test shadow behaviour across all breakpoints
   - Verify dark mode transitions
   - Estimated effort: 30 minutes

2. **Animation Enhancements** (Priority: Medium)

   - Add configurable animation durations
   - Implement staggered shadow animations
   - Create hover animation presets
   - Add support for custom easing functions
   - Estimated effort: 45 minutes

3. **Shadow Showcase** (Priority: Medium)

   - Create a dedicated shadow documentation page
   - Add interactive examples
   - Include performance metrics
   - Document best practices
   - Estimated effort: 1 hour

4. **Responsive Shadows** (Priority: Low)

   - Implement breakpoint-specific shadows
   - Add mobile-optimised variants
   - Create responsive animation timings
   - Test performance across devices
   - Estimated effort: 45 minutes

5. **Performance Optimisation** (Priority: High)

   - Profile shadow rendering performance
   - Optimise shadow layers for mobile
   - Implement selective hardware acceleration
   - Monitor and reduce paint times
   - Estimated effort: 1 hour

6. **Accessibility Enhancements** (Priority: High)

   - Add high contrast shadow modes
   - Implement focus visible indicators
   - Create reduced motion variants
   - Test with screen readers
   - Estimated effort: 45 minutes

7. **Documentation Updates** (Priority: Medium)

   - Add usage examples for new variants
   - Create troubleshooting guide
   - Document performance considerations
   - Add migration guide for older components
   - Estimated effort: 30 minutes

8. **Testing Suite** (Priority: Medium)
   - Add visual regression tests
   - Implement performance benchmarks
   - Create accessibility test suite
   - Add cross-browser tests
   - Estimated effort: 2 hours

### Implementation Notes

- Follow Australian English spelling conventions
- Use metric measurements for shadow offsets
- Maintain WCAG 2.1 AA compliance
- Test in major Australian browsers
- Document all changes in CHANGELOG.md

### Next Actions

1. Begin with high-priority items (Component Integration, Performance, Accessibility)
2. Schedule regular performance audits
3. Plan progressive enhancement strategy
4. Create implementation timeline
5. Set up monitoring for shadow performance

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
