# Component Standards

This document outlines the standards and best practices for creating and maintaining components in the Dale Rogers Portfolio project.

## Directory Structure

Components are organised by feature and type:

```
src/components/
├── features/      # Feature-specific components
│   ├── case-studies/     # Case study components (CaseStudyCard, etc.)
│   ├── articles/         # Article components (ArticleCard, etc.)
│   └── scratch/          # Scratch post components
├── layout/        # Layout components (Container, Header, Footer)
└── ui/           # Reusable UI components (Button, Pagination, etc.)
```

## Component Requirements

### 1. TypeScript Types

All components must have proper TypeScript types:

```typescript
interface Props {
  /** Title of the component */
  title: string;
  /** Optional description */
  description?: string;
  /** Array of related items */
  items: Array<{
    id: string;
    label: string;
  }>;
}
```

### 2. Documentation

Components require comprehensive JSDoc documentation:

````typescript
/**
 * Displays a featured case study with image and description
 * @component FeaturedCaseStudy
 *
 * @example
 * ```astro
 * <FeaturedCaseStudy
 *   title="Project Title"
 *   description="Project description"
 *   image={imageData}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic HTML structure
 * - Images have descriptive alt text
 * - Interactive elements are keyboard accessible
 * - ARIA labels provided where needed
 *
 * @performance
 * - Images are optimised
 * - Lazy loading implemented
 * - Minimal re-renders
 *
 * @behaviour
 * - Responsive design
 * - Handles loading states
 * - Error boundaries implemented
 */
````

### 3. Styling

- Use TailwindCSS with theme tokens (CSS custom properties)
- Follow BEM-like class naming conventions
- Support both light and dark themes
- Maintain responsive design principles
- Use semantic color tokens (e.g., `var(--color-accent-main)`, `var(--color-text-primary)`)
- Implement consistent hover effects and transitions
- Follow component-specific CSS file structure in `src/styles/components/`

### 4. Accessibility

- Follow WCAG 2.1 AA standards
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Provide sufficient colour contrast
- Support screen readers

## Component Creation Checklist

1. **Planning**
   - [ ] Identify component purpose
   - [ ] Define required props
   - [ ] Plan component structure
   - [ ] Consider accessibility needs

2. **Implementation**
   - [ ] Create component file
   - [ ] Add TypeScript types
   - [ ] Write JSDoc documentation
   - [ ] Implement component logic
   - [ ] Add styling
   - [ ] Implement accessibility features

3. **Testing**
   - [ ] Test functionality
   - [ ] Verify accessibility
   - [ ] Check responsive design
   - [ ] Test dark mode
   - [ ] Validate performance

4. **Review**
   - [ ] Code review
   - [ ] Documentation review
   - [ ] Accessibility review
   - [ ] Performance review

## Best Practices

1. **Component Design**
   - Keep components focused and single-purpose
   - Use composition over inheritance
   - Implement proper prop validation
   - Handle loading and error states

2. **Performance**
   - Minimise unnecessary renders
   - Optimise images and assets
   - Use proper caching strategies
   - Implement code splitting

3. **Maintenance**
   - Keep documentation updated
   - Follow version control practices
   - Write clear commit messages
   - Update component examples

4. **Regional Considerations**
   - Use Australian English
   - Follow Australian date format (DD/MM/YYYY)
   - Use 24-hour time format
   - Consider Australian time zones

## Examples

### Basic Component

```typescript
/**
 * Displays a button with customisable styles
 * @component Button
 */
interface Props {
  /** Button label text */
  label: string;
  /** Optional variant style */
  variant?: "primary" | "secondary";
  /** Click handler */
  onClick?: () => void;
}

const Button: FC<Props> = ({ label, variant = "primary", onClick }) => {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick} type="button">
      {label}
    </button>
  );
};
```

### Feature Component

```typescript
/**
 * Displays a case study card with image and details
 * @component CaseStudyCard
 */
interface Props {
  /** Case study title */
  title: string;
  /** Publication date */
  pubDate: Date;
  /** Cover image data */
  coverImage: ImageMetadata;
  /** Case study description */
  description: string;
  /** Status of the case study */
  status: "draft" | "published";
}

const CaseStudyCard: FC<Props> = ({
  title,
  pubDate,
  coverImage,
  description,
  status,
}) => {
  return (
    <article className="case-study-card">
      <Image
        src={coverImage}
        alt={title}
        width={800}
        height={600}
        class="case-study-card__image"
      />
      <div className="case-study-card__content">
        <h2>{title}</h2>
        <time dateTime={pubDate.toISOString()}>{formatDate(pubDate)}</time>
        <p>{description}</p>
        <span className={`status status--${status}`}>{status}</span>
      </div>
    </article>
  );
};
```

## Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
