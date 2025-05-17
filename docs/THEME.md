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
