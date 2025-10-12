# Phase 2: Visual System Refinement - Implementation Plan

**Phase**: 2 of 4
**Timeline**: Week 3-4 (January 2025)
**Status**: In Progress
**Priority**: HIGH

---

## Overview

Phase 2 refines the visual systems established in Phase 1, focusing on:

1. Content voice audit and revision
2. Image component consolidation
3. Typography refinement
4. Animation migration to unified system

---

## Objectives

### Primary Goals

- ✅ Ensure consistent first-person voice across ALL content
- ✅ Reduce image component complexity (4 → 1 unified component)
- ✅ Enhance typography hierarchy and readability
- ✅ Eliminate duplicate animation keyframes

### Success Criteria

- 100% content follows voice guidelines
- 1 unified image component (deprecate others)
- Improved heading weight contrast
- 0 duplicate animation definitions

---

## Task 1: Content Voice Audit

### Scope

- 14 articles in `src/content/articles/`
- 7 case studies in `src/content/case-studies/`
- 11 services in `src/content/services/`
- 2 scratch posts in `src/content/scratch/`
- Homepage sections in `src/content/site-content/`

### Checklist for Each File

- [ ] Uses first-person ("I" not "Dale")
- [ ] Active voice (80%+ sentences)
- [ ] Australian English spelling
- [ ] No unnecessary buzzwords
- [ ] Confident without arrogance

### Common Issues to Fix

1. **Third-person references**: "Dale Rogers is..." → "I'm..."
2. **American spelling**: "specialize" → "specialise", "behavior" → "behaviour"
3. **Passive voice**: "was designed" → "I designed"
4. **Buzzwords**: "leverage", "utilize" → "use", "work with"

### Tools

```bash
# Find third-person references
grep -r "Dale Rogers" src/content/

# Find American spelling
grep -r "ize\|ization" src/content/
grep -r "behavior\|color[^-]" src/content/

# Find passive voice indicators
grep -r "will be\|was\|were designed" src/content/
```

---

## Task 2: Image Component Consolidation

### Current State (4 Components)

1. **OptimizedImage.astro** - Responsive image with WebP support
2. **ResponsiveImage.astro** - srcset generation and lazy loading
3. **LazyImage.astro** - Intersection Observer lazy loading
4. **ImageCache.astro** - Service worker caching

### Problem

- Overlapping functionality
- Decision paralysis for developers
- Inconsistent usage patterns
- Maintenance overhead

### Solution: Unified Image Component

**New Component**: `src/components/ui/Image.astro`

**Features**:

- Responsive srcset generation
- WebP format support
- Lazy loading with Intersection Observer
- Priority loading for above-fold images
- Automatic aspect ratio preservation
- Alt text required (accessibility)
- Loading states with fade-in
- Optional blur placeholder

**API Design**:

```typescript
interface ImageProps {
  src: string; // Image source
  alt: string; // Required alt text
  width?: number; // Image width
  height?: number; // Image height
  class?: string; // Custom classes
  priority?: boolean; // Load immediately (above fold)
  sizes?: string; // Responsive sizes attribute
  quality?: number; // Image quality (1-100)
  loading?: 'lazy' | 'eager'; // Loading strategy
  objectFit?: 'cover' | 'contain'; // Object fit CSS
}
```

**Migration Strategy**:

1. Create new unified `Image.astro` component
2. Update high-traffic pages to use new component
3. Deprecate old components (add warnings)
4. Remove old components in Phase 3

---

## Task 3: Typography Refinement

### Current Issues

- Heading weights could be more differentiated
- Line height needs optimization for longer content
- Letter spacing inconsistent

### Improvements

#### Heading Weight Hierarchy

```typescript
// BEFORE
h1: font - bold(700);
h2: font - semibold(600);
h3: font - semibold(600);

// AFTER
h1: font - extrabold(800);
h2: font - bold(700);
h3: font - semibold(600);
h4: font - medium(500);
```

#### Line Height Optimization

```typescript
// Headlines: Tighter for impact
h1, h2: line-height: 1.1 (was 1.25)

// Body: More comfortable for reading
p: line-height: 1.7 (was 1.5)
```

#### Letter Spacing

```typescript
// Large headings: Slight tightening
.hero-headline: letter-spacing: -0.02em

// Small caps: Wider for readability
.kicker, .overline: letter-spacing: 0.1em
```

### Files to Update

- `src/styles/theme/typography.ts` - Type definitions
- `src/styles/global.css` - Base heading styles
- `src/styles/components/hero.css` - Hero typography
- Component-specific styles as needed

---

## Task 4: Animation Migration

### Current Duplicate Keyframes

**Duplicated in Multiple Files**:

```css
/* Found in: articles.css, work-page.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Migration Plan

1. **Audit all CSS files** for @keyframes
2. **Remove duplicate definitions**
3. **Replace with unified system**:
   - Use utility classes: `.animate-fade-in-up`
   - Or reference keyframe from `animations.css`
4. **Ensure reduced motion support** maintained

### Files to Update

```bash
# Find all keyframes
grep -r "@keyframes" src/styles/components/

# Expected duplicates:
- src/styles/components/articles.css (fadeInUp)
- src/styles/components/work-page.css (fadeInUp)
- src/styles/components/articles-page.css (possible)
```

### Replacement Pattern

```css
/* REMOVE */
@keyframes fadeInUp {
  /* ... */
}
.article-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* REPLACE WITH */
.article-card {
  @apply animate-fade-in-up;
}
/* OR keep animation property but remove @keyframes */
.article-card {
  animation: fadeInUp 600ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
```

---

## Implementation Order

### Week 1 (Days 1-3)

1. ✅ Content voice audit
2. ✅ Fix identified content issues
3. ✅ Create unified Image component

### Week 2 (Days 4-7)

4. ✅ Typography refinement
5. ✅ Animation migration
6. ✅ Update components with new patterns
7. ✅ Testing and documentation

---

## Task Details

### Task 2.1: Content Voice Audit

**Process**:

1. Scan all articles for voice consistency
2. Document issues in audit report
3. Prioritize fixes by page traffic
4. Apply corrections systematically
5. Verify changes maintain meaning

**Audit Report**: See `CONTENT_VOICE_GUIDELINES.md` (includes implementation history and audit findings in appendix)

---

### Task 2.2: Image Component Consolidation

**Steps**:

1. Analyze existing components for best features
2. Design unified API
3. Implement new `Image.astro` component
4. Add comprehensive TypeScript types
5. Include accessibility features
6. Write component documentation
7. Create migration guide

**Deprecation Strategy**:

- Add deprecation warnings to old components
- Update documentation to recommend new component
- Leave old components functional (remove in Phase 3)

---

### Task 2.3: Typography Refinement

**Steps**:

1. Update typography tokens in `typography.ts`
2. Modify global heading styles
3. Update hero component typography
4. Test hierarchy across all pages
5. Verify readability
6. Check mobile responsiveness

**Testing**:

- Visual hierarchy should be immediately clear
- Headings should stand out more
- Body text should be more comfortable to read
- Mobile typography should scale appropriately

---

### Task 2.4: Animation Migration

**Steps**:

1. Audit all CSS files for @keyframes
2. Create migration checklist
3. Remove duplicate keyframes
4. Update animation references
5. Test all animations still work
6. Verify reduced motion support

**Quality Checks**:

- 0 duplicate @keyframes definitions
- All animations reference unified system
- Reduced motion works everywhere
- Performance not degraded

---

## Deliverables

### Documentation

1. `PHASE_2_IMPLEMENTATION_PLAN.md` - This document
2. `CONTENT_VOICE_GUIDELINES.md` - Voice standards (includes audit findings and implementation history)
3. `IMAGE_COMPONENT_MIGRATION.md` - Migration guide
4. `PHASE_2_TEST_REPORT.md` - Testing results

### Code

1. `src/components/ui/Image.astro` - Unified image component
2. Updated typography tokens
3. Updated component styles (animation migration)
4. Content corrections across all MDX files

### Testing

- Screenshot comparison (before/after typography)
- Animation verification
- Content voice validation
- Image component functionality

---

## Success Metrics

### Quantitative

- [ ] 100% content uses first-person voice
- [ ] 1 image component (not 4)
- [ ] 0 duplicate @keyframes
- [ ] Heading weight contrast improved (700→800 for h1)

### Qualitative

- [ ] Typography hierarchy more impactful
- [ ] Content voice consistently professional
- [ ] Image handling simplified
- [ ] Animations consistently smooth

---

## Risk Management

### Potential Issues

1. **Content changes**: Could affect SEO or messaging
   - Mitigation: Review carefully, maintain meaning
2. **Image component**: Breaking changes for existing usage
   - Mitigation: Keep old components deprecated, not removed

3. **Typography changes**: Could affect layout
   - Mitigation: Test all pages after changes

4. **Animation migration**: Could break existing animations
   - Mitigation: Test thoroughly, maintain reduced motion

---

## References

**Phase 1 Complete**: See `FINAL_PHASE_1_SUMMARY.md`
**Content Guidelines**: `docs/CONTENT_VOICE_GUIDELINES.md`
**Animation System**: `src/styles/animations.css`
**Typography Tokens**: `src/styles/theme/typography.ts`

---

**Status**: Ready to begin
**Owner**: Development team
**Review**: After completion
**Next**: Phase 3 - Aesthetic Excellence
