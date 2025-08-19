# Layout Patterns & Page Width Options

This document outlines all available layout patterns and container width options for consistent page layouts across the Dale Rogers Portfolio.

## Container Component Variants

The main `Container` component provides several width variants:

### 1. Default Container (`variant="default"`)
- **Width**: `max-w-7xl` (~80rem / 1280px)
- **Use Case**: Standard content sections, main page content
- **Example**:
```astro
<Container>
  <h1>Main Content</h1>
  <p>Standard width content...</p>
</Container>
```

### 2. Narrow Container (`variant="narrow"`)
- **Width**: `max-w-4xl` (~64rem / 1024px)
- **Use Case**: Reading content, articles, focused content
- **Example**:
```astro
<Container variant="narrow">
  <article>
    <h1>Article Title</h1>
    <p>Optimized for reading...</p>
  </article>
</Container>
```

### 3. Wide Container (`variant="wide"`)
- **Width**: `max-w-7xl` (~80rem / 1280px)
- **Use Case**: Wide content, galleries, complex layouts
- **Example**:
```astro
<Container variant="wide">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Wide grid layout -->
  </div>
</Container>
```

### 4. Full Width Container (`variant="full"`)
- **Width**: `100%` (full viewport width)
- **Use Case**: Hero sections, full-width backgrounds, immersive content
- **Example**:
```astro
<Container variant="full">
  <div class="bg-gradient-to-r from-purple-500 to-pink-500">
    <h1>Full Width Hero</h1>
  </div>
</Container>
```

## Section Container

The `SectionContainer` component provides consistent horizontal padding:

```astro
<SectionContainer>
  <h2>Section Title</h2>
  <p>Content with consistent padding...</p>
</SectionContainer>
```

**Features**:
- Full width (`w-full`)
- Consistent horizontal padding (`px-6 md:px-12`)
- Ideal for section backgrounds and full-width content

## Global CSS Layout Classes

### Section Layout Classes
```css
.section-full {
  @apply w-full;
}

.section-content {
  @apply max-w-3xl mx-auto;
}

.section-content-narrow {
  @apply max-w-2xl mx-auto;
}

.section-content-wide {
  @apply max-w-4xl mx-auto;
}
```

### Usage Examples
```astro
<!-- Full width section -->
<section class="section-full bg-gray-100">
  <div class="section-content">
    <h2>Centered Content</h2>
  </div>
</section>

<!-- Narrow content -->
<section class="section-content-narrow">
  <p>Optimized for reading...</p>
</section>
```

## Responsive Breakpoints

All containers use consistent responsive breakpoints:

- **Mobile**: `px-6` (1.5rem / 24px)
- **Medium**: `px-12` (3rem / 48px)
- **Large**: `px-12` (3rem / 48px)

## Layout Best Practices

### 1. Content Hierarchy
- Use `Container` for main page content
- Use `SectionContainer` for full-width sections
- Use `variant="narrow"` for reading-focused content

### 2. Responsive Design
- All containers are mobile-first
- Padding scales appropriately across breakpoints
- Content remains readable on all devices

### 3. Consistent Spacing
- Horizontal padding is consistent across all variants
- Vertical spacing should use Tailwind spacing scale
- Maintain visual rhythm across sections

### 4. Accessibility
- Ensure sufficient contrast between content and backgrounds
- Maintain readable line lengths (max ~65-75 characters)
- Use semantic HTML structure

## Migration Guide

### From Old Container Usage
```astro
<!-- Old -->
<Container fullWidth>Content</Container>

<!-- New -->
<Container variant="full">Content</Container>
```

### From Global CSS Classes
```astro
<!-- Old -->
<div class="section-content">Content</div>

<!-- New -->
<Container variant="narrow">Content</Container>
```

## Examples by Use Case

### Blog Post Layout
```astro
<Container variant="narrow">
  <article>
    <h1>Blog Post Title</h1>
    <p>Content optimized for reading...</p>
  </article>
</Container>
```

### Portfolio Grid
```astro
<Container variant="wide">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Portfolio items -->
  </div>
</Container>
```

### Hero Section
```astro
<SectionContainer>
  <div class="bg-gradient-to-r from-purple-500 to-pink-500 py-20">
    <Container>
      <h1 class="text-6xl font-bold text-white">Hero Title</h1>
    </Container>
  </div>
</SectionContainer>
```

### Contact Form
```astro
<Container variant="narrow">
  <form class="space-y-6">
    <h2>Contact Us</h2>
    <!-- Form fields -->
  </form>
</Container>
```

## Custom Layout Patterns

For complex layouts, combine multiple containers:

```astro
<SectionContainer class="bg-gray-50">
  <Container variant="wide">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2>Left Column</h2>
      </div>
      <div>
        <h2>Right Column</h2>
      </div>
    </div>
  </Container>
</SectionContainer>
```

## Performance Considerations

- All containers use CSS classes for consistent performance
- No JavaScript overhead for layout calculations
- Responsive behavior handled by CSS media queries
- Container variants are lightweight and composable

---

**Note**: Always use the appropriate container variant for your content type. When in doubt, start with `variant="default"` and adjust based on content needs.
