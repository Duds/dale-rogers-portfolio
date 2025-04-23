# Through the Windows - Project Backlog

## Project Overview

A photographic exploration of architecture through windows, examining the interplay of light, perspective, and architectural design.

## Directory Structure

```
src/pages/scratch/through-the-windows/
├── index.astro           # Main project page
├── backlog.md           # This file
└── content/             # To be created
    ├── windows/         # Window photographs and stories
    └── collections/     # Curated collections of windows
```

## Backlog Items

### Phase 1: Project Setup

- [ ] Create content directory structure
- [ ] Set up content collections for windows and collections
- [ ] Define TypeScript interfaces for content
- [ ] Create base layout components
- [ ] Implement dark mode support
- [ ] Set up image optimisation pipeline

### Phase 2: Core Features

- [ ] Implement window card component
- [ ] Create grid layout for window displays
- [ ] Add filtering and sorting capabilities
- [ ] Implement lazy loading for images
- [ ] Add window detail view
- [ ] Create collection overview page

### Phase 3: Enhanced Features

- [ ] Add interactive map view
- [ ] Implement search functionality
- [ ] Add related windows feature
- [ ] Create timeline view
- [ ] Add sharing capabilities
- [ ] Implement favourites system

### Phase 4: Content Population

- [ ] Create initial window entries
- [ ] Write collection descriptions
- [ ] Add metadata for all entries
- [ ] Create featured collections
- [ ] Add location data

### Phase 5: Optimisation

- [ ] Optimise image loading
- [ ] Implement caching strategy
- [ ] Add performance monitoring
- [ ] Optimise for mobile devices
- [ ] Implement PWA features

### Phase 6: Documentation

- [ ] Write technical documentation
- [ ] Create content style guide
- [ ] Document photography guidelines
- [ ] Create contribution guidelines
- [ ] Write accessibility documentation

## Technical Requirements

### Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Accessibility Requirements

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader optimisation
- Proper ARIA attributes
- High contrast support

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Content Guidelines

### Photography Standards

- Minimum resolution: 2048x1536
- Format: JPEG/WebP
- Metadata requirements:
  - Location
  - Date taken
  - Camera settings
  - Architectural style
  - Building period

### Metadata Schema

```typescript
interface WindowEntry {
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  dateTaken: string; // ISO 8601
  architecturalStyle: string;
  buildingPeriod: string;
  photographer: string;
  camera: {
    model: string;
    settings: {
      aperture: string;
      shutterSpeed: string;
      iso: number;
      focalLength: string;
    };
  };
  tags: string[];
  collections: string[];
}
```

## Notes

- All dates should follow Australian format (DD/MM/YYYY)
- Use metric measurements where applicable
- Follow Australian English spelling conventions
- Times should be in 24-hour format with AEST/AEDT specified
