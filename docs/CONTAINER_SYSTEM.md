# Container System

## Overview

The Container system provides standardized layout patterns for consistent margins and spacing across all components. This ensures visual consistency and maintainability throughout the portfolio site.

## Container Variants

### 1. `container--standard` (Default)
- **Purpose**: Standard content width with centered layout
- **Width**: `max-w-7xl` (~80rem/1280px)
- **Margins**: `mx-auto` (centered)
- **Padding**: `px-4 sm:px-6 lg:px-8`
- **Use Case**: Main content areas, articles, standard pages

### 2. `container--narrow`
- **Purpose**: Narrow content width for reading-focused content
- **Width**: `max-w-4xl` (~64rem/1024px)
- **Margins**: `mx-auto` (centered)
- **Padding**: `px-4 sm:px-6 lg:px-8`
- **Use Case**: Blog posts, reading content, focused text

### 3. `container--full`
- **Purpose**: Edge-to-edge full width with no content margins
- **Width**: `100%` (full viewport)
- **Margins**: None
- **Padding**: `px-4 sm:px-6 lg:px-8` (maintains side padding)
- **Use Case**: Hero sections, full-width backgrounds, edge-to-edge layouts

### 4. `container--content-margin` ⭐ **NEW**
- **Purpose**: Full width with consistent content margins
- **Width**: `100%` (full viewport)
- **Margins**: None
- **Padding**: `px-6 md:px-12` (consistent content margins)
- **Use Case**: Footer, MyValues, CaseStudiesBento, content sections

## Usage Examples

### Standard Content
```astro
<Container>
  <!-- Standard centered content -->
</Container>
```

### Full Width (Edge-to-Edge)
```astro
<Container fullWidth={true}>
  <!-- Full width with no content margins -->
</Container>
```

### Content Margins (Recommended for Sections)
```astro
<Container contentMargin={true}>
  <!-- Full width with consistent content margins -->
</Container>
```

### Narrow Content
```astro
<Container narrow={true}>
  <!-- Narrow centered content -->
</Container>
```

## Implementation in Components

### Footer
```astro
<Container contentMargin={true}>
  <div class="footer-inner">
    <!-- Content with consistent margins -->
  </div>
</Container>
```

### MyValues
```astro
<Container contentMargin={true} class="my-values-section">
  <!-- Content with consistent margins -->
</Container>
```

### CaseStudiesBento
```astro
<Container contentMargin={true}>
  <!-- Content with consistent margins -->
</Container>
```

## Benefits

1. **Consistency**: All content sections use the same margin system
2. **Maintainability**: Single source of truth for spacing
3. **Flexibility**: Multiple variants for different layout needs
4. **Responsiveness**: Built-in responsive padding adjustments
5. **Professional**: Consistent visual rhythm across the site

## CSS Variables

The system uses CSS custom properties for consistent spacing:

```css
.container--content-margin {
  @apply w-full px-6 md:px-12;
}
```

This provides:
- **Mobile**: `px-6` (24px)
- **Medium+**: `px-12` (48px)

## Best Practices

1. **Use `contentMargin`** for content sections that need consistent margins
2. **Use `fullWidth`** for truly edge-to-edge layouts
3. **Use `standard`** for centered content with max-width constraints
4. **Use `narrow`** for reading-focused content
5. **Avoid custom margin/padding** in components - let containers handle it

## Migration Notes

- **Footer**: Updated from custom margins to `contentMargin`
- **MyValues**: Updated from `SectionContainer` to `contentMargin`
- **CaseStudiesBento**: Updated from `fullWidth` to `contentMargin`
- **All components** now use consistent spacing system

## Future Enhancements

- Consider adding more specialized variants if needed
- Maintain consistency across all new components
- Document any new patterns that emerge
