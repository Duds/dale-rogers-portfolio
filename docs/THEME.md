## Usage Examples

### Colours

**TypeScript:**

```typescript
import { uiColours } from "./src/styles/theme/colors";
const primary = uiColours.primary;
```

**CSS:**

```css
.example {
  color: var(--color-accent);
}
```

**Tailwind:**

```tsx
<div className="bg-accent text-text">Example</div>
```

### Spacing

**TypeScript:**

```typescript
import { spacing } from "./src/styles/theme/spacing";
const padding = spacing.md;
```

**CSS:**

```css
.example {
  padding: var(--space-4);
}
```

**Tailwind:**

```tsx
<div className="p-4">Example</div>
```

### Shadows

**TypeScript:**

```typescript
import { shadows } from "./src/styles/theme/shadows";
const cardShadow = shadows.md;
```

**CSS:**

```css
.example {
  box-shadow: var(--shadow-md);
}
```

**Tailwind:**

```tsx
<div className="shadow-md">Example</div>
```

### Typography

**TypeScript:**

```typescript
import { fontSize } from "./src/styles/theme/typography";
const heading = fontSize.lg;
```

**CSS:**

```css
.example {
  font-size: var(--text-lg);
}
```

**Tailwind:**

```tsx
<div className="text-lg">Example</div>
```

### Radius

**TypeScript:**

```typescript
import { radius } from "./src/styles/theme/radius";
const rounded = radius.lg;
```

**CSS:**

```css
.example {
  border-radius: var(--radius-lg);
}
```

**Tailwind:**

```tsx
<div className="rounded-lg">Example</div>
```

### Transitions

**TypeScript:**

```typescript
import { transitionDurationTokens } from "./src/styles/theme/transitions";
const fast = transitionDurationTokens.fast;
```

**CSS:**

```css
.example {
  transition-duration: var(--transition-fast);
}
```

**Tailwind:**

```tsx
<div className="transition-fast">Example</div>
```

### Z-Index

**TypeScript:**

```typescript
import { zIndex } from "./src/styles/theme/zIndex";
const modal = zIndex.modal;
```

**CSS:**

```css
.example {
  z-index: var(--z-10);
}
```

**Tailwind:**

```tsx
<div className="z-10">Example</div>
```

## Token Class Reference

| Token                 | Tailwind Class                                                               | CSS Variable                       | Example Usage                                                                              |
| --------------------- | ---------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| nav-bg                | bg-nav-bg                                                                    | var(--color-nav-bg)                | `<nav class="bg-nav-bg">`                                                                  |
| nav-link              | text-nav-link                                                                | var(--color-nav-link)              | `<a class="text-nav-link">`                                                                |
| nav-link-hover-text   | text-nav-link-hover-text                                                     | var(--color-nav-link-hover-text)   | `<a class="hover:text-nav-link-hover-text">`                                               |
| nav-border            | border-nav-border                                                            | var(--color-nav-border)            | `<div class="border-nav-border">`                                                          |
| footer-bg             | bg-footer-bg                                                                 | var(--color-footer-bg)             | `<footer class="bg-footer-bg">`                                                            |
| footer-text-secondary | text-footer-text-secondary                                                   | var(--color-footer-text-secondary) | `<p class="text-footer-text-secondary">`                                                   |
| on-primary            | text-on-primary                                                              | var(--color-on-primary)            | `<span class="text-on-primary">`                                                           |
| on-primary-dark       | text-on-primary-dark                                                         | var(--color-on-primary-dark)       | `<span class="text-on-primary-dark">`                                                      |
| text-secondary        | text-text-secondary                                                          | var(--color-text-secondary)        | `<span class="text-text-secondary">`                                                       |
| text-secondary-dark   | text-text-secondary-dark                                                     | var(--color-text-secondary-dark)   | `<span class="text-text-secondary-dark">`                                                  |
| card                  | bg-card                                                                      | var(--color-card)                  | `<div class="bg-card">`                                                                    |
| heading               | text-heading                                                                 | var(--color-heading)               | `<h2 class="text-heading">`                                                                |
| subheading            | text-subheading                                                              | var(--color-subheading)            | `<p class="text-subheading">`                                                              |
| info                  | bg-info, border-info, text-info                                              | var(--color-info)                  | `<div class="bg-info border-info text-info">`                                              |
| tip                   | bg-tip, border-tip, text-tip                                                 | var(--color-tip)                   | `<div class="bg-tip border-tip text-tip">`                                                 |
| warning               | bg-warning, border-warning, text-warning                                     | var(--color-warning)               | `<div class="bg-warning border-warning text-warning">`                                     |
| australian-standard   | bg-australian-standard, border-australian-standard, text-australian-standard | var(--color-australian-standard)   | `<div class="bg-australian-standard border-australian-standard text-australian-standard">` |
| service-purple        | bg-service-purple                                                            | var(--color-service-purple)        | `<div class="bg-service-purple">`                                                          |
| service-black         | bg-service-black                                                             | var(--color-service-black)         | `<div class="bg-service-black">`                                                           |
| service-green         | bg-service-green                                                             | var(--color-service-green)         | `<div class="bg-service-green">`                                                           |
| service-orange        | bg-service-orange                                                            | var(--color-service-orange)        | `<div class="bg-service-orange">`                                                          |
| service-purple-hover  | bg-service-purple-hover                                                      | var(--color-service-purple-hover)  | `<div class="hover:bg-service-purple-hover">`                                              |
| service-black-hover   | bg-service-black-hover                                                       | var(--color-service-black-hover)   | `<div class="hover:bg-service-black-hover">`                                               |
| service-green-hover   | bg-service-green-hover                                                       | var(--color-service-green-hover)   | `<div class="hover:bg-service-green-hover">`                                               |
| service-orange-hover  | bg-service-orange-hover                                                      | var(--color-service-orange-hover)  | `<div class="hover:bg-service-orange-hover">`                                              |
| status-in-progress    | bg-status-in-progress, text-status-in-progress                               | var(--color-status-in-progress)    | `<span class="bg-status-in-progress text-status-in-progress">`                             |
| status-completed      | bg-status-completed, text-status-completed                                   | var(--color-status-completed)      | `<span class="bg-status-completed text-status-completed">`                                 |
| status-abandoned      | bg-status-abandoned, text-status-abandoned                                   | var(--color-status-abandoned)      | `<span class="bg-status-abandoned text-status-abandoned">`                                 |
| accent                | text-accent, bg-accent                                                       | var(--color-accent)                | `<span class="text-accent">`                                                               |
| ...                   | ...                                                                          | ...                                | ...                                                                                        |

_Add more as needed for your tokens._
