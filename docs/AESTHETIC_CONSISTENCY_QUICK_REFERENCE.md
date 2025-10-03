# 🎨 Aesthetic Consistency Quick Reference

**For Developers - Maintain Visual Consistency Across All Pages**

## 🚨 **DO NOT USE** These Hardcoded Classes

### ❌ **Colors**

```css
/* DON'T USE - Use theme tokens instead */
text-neutral-600 dark:text-neutral-300
bg-white dark:bg-neutral-800
text-primary
border-neutral-200 dark:border-neutral-700
```

### ❌ **Typography**

```css
/* DON'T USE - Use consistency classes instead */
font-bold text-4xl
font-semibold text-2xl
text-lg text-neutral-600
```

## ✅ **USE THESE** Theme Tokens and Consistency Classes

### **Colors - Always Use Theme Variables**

```css
/* Text Colors */
style="color: var(--color-text-primary);"      /* Main text */
style="color: var(--color-text-secondary);"    /* Secondary text */
style="color: var(--color-text-muted);"        /* Muted text */
style="color: var(--color-text-inverse);"      /* White text on dark */

/* Background Colors */
style="background-color: var(--color-background-primary);"    /* Main background */
style="background-color: var(--color-background-secondary);"  /* Card backgrounds */
style="background-color: var(--color-background-tertiary);"   /* Section backgrounds */

/* Border Colors */
style="border-color: var(--color-border-primary);"    /* Main borders */
style="border-color: var(--color-border-focus);"      /* Focus states */
```

### **Typography - Use Consistency Classes**

```css
/* Headings */
class="heading-primary"      /* Main page titles */
class="heading-secondary"    /* Section headers */
class="heading-tertiary"     /* Subsection headers */
class="heading-quaternary"   /* Small headers */

/* Body Text */
class="body-large"           /* Large body text */
class="body-medium"          /* Medium body text */
class="body-standard"        /* Standard body text */
class="body-small"           /* Small body text */
```

### **Layout - Use Consistency Classes**

```css
/* Page Structure */
class="page-main"            /* Standard page layout */
class="page-section"         /* Standard section spacing */
class="page-section-small"   /* Small section spacing */
class="page-section-large"   /* Large section spacing */

/* Content Widths */
class="content-narrow"       /* Max-width: 3xl */
class="content-standard"     /* Max-width: 4xl */
class="content-wide"         /* Max-width: 6xl */
```

### **Components - Use Consistency Classes**

```css
/* Cards */
class="consistency-card"     /* Standard card styling */

/* Sections */
class="consistency-section"  /* Standard section styling */

/* Buttons */
class="consistency-button"   /* Standard button styling */

/* Links */
class="consistency-link"     /* Standard link styling */
```

### **Grids - Use Consistency Classes**

```css
/* Grid Layouts */
class="grid-2"               /* 2-column grid */
class="grid-3"               /* 3-column grid */
class="grid-4"               /* 4-column grid */
```

### **Spacing - Use Consistency Classes**

```css
/* Spacing Utilities */
class="spacing-xs"           /* Small margin */
class="spacing-sm"           /* Small margin */
class="spacing-md"           /* Medium margin */
class="spacing-lg"           /* Large margin */
class="spacing-xl"           /* Extra large margin */
class="spacing-2xl"          /* Double extra large margin */
```

## 📝 **Example Usage**

### **Before (Inconsistent)**

```astro
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
  Page Title
</h1>
<p class="text-lg text-neutral-600 dark:text-neutral-300">Description text</p>
<div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">Card content</div>
```

### **After (Consistent)**

```astro
<h1 class="heading-primary">Page Title</h1>
<p class="body-medium">Description text</p>
<div class="consistency-card">Card content</div>
```

## 🔧 **Quick Fixes for Common Issues**

### **Replace Hardcoded Colors**

```bash
# Find and replace these patterns:
text-neutral-600 dark:text-neutral-300 → style="color: var(--color-text-secondary);"
bg-white dark:bg-neutral-800 → style="background-color: var(--color-background-secondary);"
text-primary → style="color: var(--color-primary-main);"
```

### **Replace Hardcoded Typography**

```bash
# Find and replace these patterns:
font-bold text-4xl → heading-secondary
font-semibold text-2xl → heading-tertiary
text-lg text-neutral-600 → body-medium
```

### **Replace Custom Cards**

```bash
# Find and replace these patterns:
bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg → consistency-card
```

## 📋 **Checklist Before Committing**

- [ ] No hardcoded colors (`text-neutral-*`, `bg-white`, etc.)
- [ ] No hardcoded typography (`font-bold`, `text-4xl`, etc.)
- [ ] Using consistency classes where available
- [ ] All colors use theme tokens (`var(--color-*)`)
- [ ] Consistent spacing patterns
- [ ] Proper component usage

## 🚀 **Benefits of Following These Guidelines**

1. **Visual Consistency** - All pages look cohesive
2. **Theme Reliability** - Proper light/dark mode switching
3. **Maintainability** - Easy to update design system
4. **Developer Experience** - Clear patterns to follow
5. **Accessibility** - Consistent focus states and contrast
6. **Performance** - Optimized CSS with consistent patterns

## 📚 **Additional Resources**

- **Full Audit Report:** `docs/AESTHETIC_CONSISTENCY_AUDIT.md`
- **Theme Tokens:** `src/styles/theme/`
- **Typography System:** `src/styles/theme/typography.ts`
- **Component Library:** `src/components/ui/`

## 🏗️ **Architecture Benefits**

### **Why This Approach is Better:**

1. **Single Source of Truth** - All design values in theme tokens
2. **Type Safety** - TypeScript interfaces for all design values
3. **Tailwind Integration** - Uses `@theme` directive properly
4. **No Additional CSS Files** - Everything in the established system
5. **Maintainable** - Changes in one place affect everywhere
6. **Performance** - No duplicate CSS or unused styles

---

**Remember:** When in doubt, use theme tokens and consistency classes. Consistency is key to maintaining a professional portfolio appearance! 🎯
