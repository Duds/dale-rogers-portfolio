# LogoSalad Component

A responsive component that displays client logos in a grid layout with hover effects.

## Usage

```astro
---
import LogoSalad from "./LogoSalad.astro";
---

<LogoSalad />
```

## Features

- Responsive grid layout
- Hover effects on logos
- Dark mode support
- Lazy loading of images
- External links to client websites

## Logo Requirements

Logos should be placed in the `public/images/logos` directory with the following naming convention:

- `doh.png` - Department of Health
- `services-australia.png` - Services Australia
- `education.png` - Department of Education
- `ato.png` - Australian Taxation Office
- `ndis.png` - National Disability Insurance Scheme
- `dta.png` - Digital Transformation Agency

## Styling

The component uses the following Tailwind classes:

- Container: `py-20 bg-gray-50 dark:bg-gray-900`
- Heading: `text-2xl font-semibold text-gray-600 dark:text-gray-400`
- Logo container: `flex flex-wrap justify-center items-center gap-12 md:gap-16`
- Logo links: `opacity-60 hover:opacity-100 transition-opacity duration-300`
- Logo images: `h-12 md:h-16 w-auto`

## Image Requirements

- Format: PNG
- Color: Black and white recommended for best visibility
- Size: Will be automatically scaled to `h-12` on mobile and `h-16` on desktop
- Aspect ratio: Maintain original aspect ratio

## Accessibility

- All logos have proper alt text
- Links open in new tabs with `rel="noopener noreferrer"`
- Images use lazy loading for performance
