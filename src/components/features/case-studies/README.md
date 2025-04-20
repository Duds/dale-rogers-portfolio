# Case Studies Components

This directory contains components related to displaying and managing case studies across the portfolio site.

## Components

### FeaturedCaseStudiesSlider

A horizontal slider component that smoothly translates based on scroll position, showcasing featured case studies on the landing page.

#### Usage

```astro
---
import FeaturedCaseStudiesSlider from "@/components/features/case-studies/components/FeaturedCaseStudiesSlider.astro";
---

<FeaturedCaseStudiesSlider />
```

#### Features

- Smooth horizontal scrolling animation tied to vertical page scroll
- Responsive card sizing:
  - Mobile: 70vw width
  - Tablet: 35vw width
  - Desktop: 25vw width
- Hardware-accelerated animations using transform3d
- Optimised performance with:
  - RequestAnimationFrame for smooth animations
  - Passive scroll listeners
  - Debounced resize handling
  - Image lazy loading
- Automatic cleanup on page visibility change

#### Technical Details

##### Animation System

The component uses a scroll-based animation system that:

1. Calculates progress through the section (0 to 1)
2. Maps this progress to horizontal translation
3. Applies smooth transitions with CSS

```typescript
interface CaseStudy {
  title: string;
  coverImage: string;
  slug: string;
  description: string;
}
```

##### Performance Considerations

- Uses `will-change-transform` for optimisation
- Implements proper throttling and debouncing
- Handles cleanup of event listeners and animations
- Manages memory efficiently

#### Accessibility

- Images include descriptive alt text
- Links are properly labelled
- Content remains accessible when JavaScript is disabled
- Maintains proper contrast ratios for text overlay

#### Browser Support

- Supports all modern browsers
- Gracefully degrades on older browsers
- Optimised for both desktop and mobile devices

#### Known Limitations

- Requires JavaScript for animation functionality
- Best viewed on devices with smooth scrolling capability
- Image loading may affect initial positioning

#### Future Improvements

1. Add touch/drag support for mobile devices
2. Implement preloading for smoother image transitions
3. Add keyboard navigation support
4. Consider adding autoplay option for hero section

### CaseStudiesBento

A grid-based layout component for displaying comprehensive case study listings. Documentation to be expanded.

## Directory Structure

```
case-studies/
├── components/
│   ├── FeaturedCaseStudiesSlider.astro
│   ├── CaseStudiesBento.astro
│   └── README.md
└── types/
    └── index.ts
```

## Contributing

When modifying these components:

1. Follow the established naming conventions
2. Update documentation for significant changes
3. Test across different viewport sizes
4. Verify performance metrics
5. Update types as needed

## Related Components

- Hero section
- Navigation
- Individual case study pages

## Maintenance

Regular checks should be performed for:

- Image optimisation
- Animation performance
- Browser compatibility
- Accessibility compliance
