# Pages

This directory contains all the pages and API routes for the portfolio site. Pages are built using Astro and follow a consistent structure and styling.

## Page Structure

### Main Pages

- `index.astro` - Home page
- `about.astro` - About page
- `contact.astro` - Contact page with form
- `capabilities.astro` - Services and capabilities
- `case-studies.astro` - Case studies listing
- `colophon.astro` - Site information and tech stack

### Dynamic Routes

- `case-studies/[slug].astro` - Individual case study pages
- `articles/[slug].astro` - Individual article pages

### API Routes

- `api/contact.ts` - Contact form submission handler

## Directory Structure

```
pages/
├── api/                  # API routes
│   └── contact.ts        # Contact form API
├── articles/            # Article pages
│   └── [slug].astro     # Dynamic article routes
├── case-studies/        # Case study pages
│   └── [slug].astro     # Dynamic case study routes
├── about.astro          # About page
├── capabilities.astro   # Services page
├── case-studies.astro   # Case studies listing
├── colophon.astro       # Site information
├── contact.astro        # Contact page
└── index.astro          # Home page
```

## Page Components

Each page typically includes:

1. **Layout**
   - Uses the main Layout component
   - Sets appropriate title and description

2. **Content Structure**
   - Hero section (where applicable)
   - Main content area
   - Consistent spacing and typography

3. **Components**
   - Reusable components from the components directory
   - Page-specific components where needed

## API Routes

### Contact Form API (`api/contact.ts`)

- Handles form submissions
- Uses Nodemailer for email delivery
- Implements proper error handling
- Returns appropriate HTTP status codes

## Best Practices

1. **Page Structure**
   - Use semantic HTML
   - Follow consistent layout patterns
   - Implement proper heading hierarchy

2. **Performance**
   - Optimize images and assets
   - Minimize JavaScript usage
   - Implement proper caching headers

3. **SEO**
   - Set appropriate meta tags
   - Use semantic HTML
   - Implement proper heading structure

4. **Accessibility**
   - Follow WCAG guidelines
   - Implement proper ARIA attributes
   - Ensure keyboard navigation

## Development Guidelines

1. **Creating New Pages**
   - Use the Layout component
   - Follow existing page patterns
   - Implement proper error handling

2. **Dynamic Routes**
   - Use proper slug patterns
   - Implement 404 handling
   - Follow content collection structure

3. **API Routes**
   - Implement proper error handling
   - Use TypeScript for type safety
   - Follow RESTful principles
