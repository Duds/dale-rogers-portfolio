# Layouts

This directory contains the main layout templates used across the portfolio site. Layouts provide the consistent structure and common elements for all pages.

## Available Layouts

### Main Layout (`BaseLayout.astro`)

- The primary layout template used across all pages
- Includes:
  - HTML document structure
  - Meta tags and SEO elements
  - Navigation bar
  - Footer
  - Global styles
- Props:
  - `title`: Page title (required)
  - `description`: Meta description (optional, defaults to site description)

## Usage

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title">
  <!-- Page content goes here -->
</BaseLayout>
```

## Structure

The main layout (`BaseLayout.astro`) provides:

1. **Document Structure**
   - HTML5 doctype
   - Language attribute
   - Viewport meta tag
   - Favicon
   - Title and description meta tags

2. **Common Elements**
   - Navigation bar (imported from components)
   - Footer (imported from components)
   - Main content area with proper semantic structure

3. **Styling**
   - Global CSS imports
   - Base typography styles
   - Consistent spacing and layout

## Best Practices

1. **Consistency**
   - Use the main layout for all pages
   - Maintain consistent header/footer across pages
   - Follow semantic HTML structure

2. **Performance**
   - Minimal JavaScript in layouts
   - Optimized CSS loading
   - Proper meta tags for SEO

3. **Accessibility**
   - Proper heading hierarchy
   - ARIA landmarks
   - Semantic HTML elements
