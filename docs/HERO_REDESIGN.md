# Hero Section Redesign - Detailed Specification

## Overview

This document provides detailed specifications for the redesigned hero section that better communicates Dale Rogers' positioning as a Service and Strategic Design leader.

## Current Issues

1. **Visual Hierarchy**: Single-weight typography lacks impact
2. **Inline Styles**: `style="color: var(--color-text-primary);"` breaks component pattern
3. **Line Breaks**: Single-word lines feel abrupt and lack flow
4. **CTAs**: Single button doesn't provide enough action options
5. **Positioning**: Doesn't clearly communicate leadership level

## Design Solution

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Container - max-w-7xl]                                    │
│                                                              │
│  ┌──────────────────────┐  ┌─────────────────────────────┐ │
│  │ Left Column          │  │ Right Column (optional)     │ │
│  │                      │  │                             │ │
│  │ [Kicker]             │  │ [Subtle visual element      │ │
│  │ Dale Rogers          │  │  or leave empty for         │ │
│  │                      │  │  breathing room]            │ │
│  │ [Primary Headline]   │  │                             │ │
│  │ Service Design       │  │                             │ │
│  │                      │  │                             │ │
│  │ [Secondary Headline] │  │                             │ │
│  │ for Strategic        │  │                             │ │
│  │ Transformation       │  │                             │ │
│  │                      │  │                             │ │
│  │ [Description]        │  │                             │ │
│  │ 2-3 line desc...     │  │                             │ │
│  │                      │  │                             │ │
│  │ [CTA Buttons]        │  │                             │ │
│  │ [View Work] [Contact]│  │                             │ │
│  └──────────────────────┘  └─────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Typography Hierarchy

#### 1. Kicker (Personal Name)

- **Purpose**: Immediate personal connection
- **Style**:
  - Font Size: `text-sm md:text-base` (12-16px)
  - Font Weight: `font-medium` (500)
  - Transform: `uppercase`
  - Tracking: `tracking-wide` (0.1em)
  - Color: `var(--color-secondary-main)` (Warm rust - distinctive)
- **Rationale**: Small, branded element establishes personal identity before professional title

#### 2. Primary Headline

- **Content**: "Service Design"
- **Style**:
  - Font Size: `text-5xl md:text-7xl lg:text-8xl` (48-72-96px)
  - Font Weight: `font-extrabold` (800)
  - Line Height: `leading-tight` (1.25)
  - Color: `var(--color-text-primary)`
  - Text Balance: `text-wrap: balance`
- **Rationale**: Maximum impact, clearly states core expertise

#### 3. Secondary Headline

- **Content**: "for Strategic Transformation"
- **Style**:
  - Font Size: `text-3xl md:text-5xl lg:text-6xl` (30-48-60px)
  - Font Weight: `font-semibold` (600)
  - Line Height: `leading-tight` (1.25)
  - Color: `var(--color-text-secondary)` (lighter than primary)
  - Text Balance: `text-wrap: balance`
- **Rationale**: Positions outcome/value, creates visual step-down in hierarchy

#### 4. Description

- **Content**: "I help organisations transform how they deliver value, bridging human needs with strategic goals through decades of service design expertise."
- **Style**:
  - Font Size: `text-xl md:text-2xl` (20-24px)
  - Font Weight: `font-normal` (400)
  - Line Height: `leading-relaxed` (1.625)
  - Color: `var(--color-text-tertiary)`
  - Max Width: `max-w-2xl` (prevents overly long lines)
- **Rationale**: Provides clear value proposition in scannable format

### Call-to-Action Strategy

#### Primary CTA: "View Work"

- **Purpose**: Main conversion path - showcase expertise
- **Variant**: `primary`
- **Size**: Standard
- **Icon**: Arrow Right (forward movement)

#### Secondary CTA: "Get in Touch"

- **Purpose**: Alternative action for ready prospects
- **Variant**: `ghost` with `ghostColour="primary"`
- **Size**: Standard
- **Icon**: None (keeps focus on primary CTA)

### Spacing System

```css
.hero {
  padding-top: 8rem; /* pt-32 */
  padding-bottom: 5rem; /* pb-20 */
}

@media (min-width: 768px) {
  .hero {
    padding-top: 10rem; /* md:pt-40 */
    padding-bottom: 8rem; /* md:pb-32 */
  }
}

.hero__content {
  gap: 2rem; /* space-y-8 - generous spacing between elements */
}
```

### Responsive Behavior

#### Mobile (< 640px)

- Single column layout
- Smaller type scale (text-5xl for primary)
- Stacked CTAs (flex-col)
- Focused on vertical rhythm

#### Tablet (640px - 1024px)

- Increased type scale (text-7xl for primary)
- CTAs side-by-side (flex-row)
- Slightly more padding

#### Desktop (> 1024px)

- Maximum type scale (text-8xl for primary)
- Two-column grid (content left, visual/space right)
- Generous whitespace
- Optimal reading line length

## Animation Specifications

### On Load

1. **Kicker**: Fade in from bottom, 200ms delay
2. **Primary Headline**: Fade in from bottom, 300ms delay
3. **Secondary Headline**: Fade in from bottom, 400ms delay
4. **Description**: Fade in from bottom, 500ms delay
5. **CTAs**: Fade in from bottom, 600ms delay

### Stagger Pattern

```typescript
element.style.transitionDelay = `${baseDelay + index * 100}ms`;
```

### Reduced Motion

All animations disabled if `prefers-reduced-motion: reduce`

## Color Specifications

### Light Mode

- Kicker: `var(--color-secondary-main)` - Warm rust
- Primary Headline: `var(--color-text-primary)` - Near black
- Secondary Headline: `var(--color-text-secondary)` - Medium grey
- Description: `var(--color-text-tertiary)` - Light grey
- Background: `var(--color-background-primary)` - White/off-white

### Dark Mode

- Kicker: `var(--color-secondary-light)` - Lighter rust
- Primary Headline: `var(--color-text-primary)` - Near white
- Secondary Headline: `var(--color-text-disabled)` - Medium grey
- Description: `var(--color-text-muted)` - Light grey
- Background: `var(--color-background-primary)` - Dark navy

## Accessibility Considerations

### Semantic HTML

```html
<section aria-label="Hero introduction">
  <div class="hero__content">
    <span aria-label="Personal introduction">Dale Rogers</span>
    <h1>
      <span class="hero__headline-primary">Service Design</span>
      <span class="hero__headline-secondary">for Strategic Transformation</span>
    </h1>
    <p class="hero__description"><!-- value prop --></p>
    <nav aria-label="Primary actions">
      <!-- CTAs -->
    </nav>
  </div>
</section>
```

### Contrast Ratios

- Kicker on background: 7:1 (AAA)
- Primary headline on background: 15:1 (AAA)
- Secondary headline on background: 7:1 (AAA)
- Description on background: 4.5:1 (AA)

### Keyboard Navigation

- Tab order: Skip kicker → H1 → Description → Primary CTA → Secondary CTA
- Focus indicators: 2px solid ring with 2px offset
- All interactive elements keyboard accessible

## Implementation Files

### New Files

- `src/styles/components/hero.css` - Hero-specific styles
- Component uses existing: `src/components/sections/home/Hero.astro`

### Modified Files

- `src/components/sections/home/Hero.astro` - Complete restructure
- `src/styles/components/hero.css` - New dedicated stylesheet

## Testing Requirements

### Visual Testing

- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1440px, 1920px)
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Verify all animations
- [ ] Test with animations disabled

### Accessibility Testing

- [ ] Screen reader navigation (NVDA/JAWS)
- [ ] Keyboard-only navigation
- [ ] Contrast ratio verification (WAVE)
- [ ] Semantic HTML validation

### Performance Testing

- [ ] Lighthouse performance score
- [ ] Core Web Vitals (LCP < 2.5s)
- [ ] No layout shift on load

## Success Criteria

✅ **Visual Impact**: Immediately communicates leadership level
✅ **Clear Hierarchy**: Eye flows naturally through content
✅ **Accessibility**: WCAG AAA compliance
✅ **Responsive**: Optimal experience across all devices
✅ **Performance**: No negative impact on load time
✅ **Maintainable**: All styles use theme tokens

## Comparison: Before vs. After

### Before

```
Service
Design
Strategy

I'm Dale Rogers...

[View Work →]
```

**Issues**: Abrupt line breaks, unclear positioning, inline styles

### After

```
DALE ROGERS

Service Design
for Strategic Transformation

I help organisations transform how they deliver value,
bridging human needs with strategic goals through
decades of service design expertise.

[View Work →]  [Get in Touch]
```

**Improvements**: Clear hierarchy, leadership positioning, dual CTAs, proper spacing

---

**Implementation Date**: TBD
**Designer**: AI Design Leader Review
**Developer**: TBD
**Reviewer**: Dale Rogers
