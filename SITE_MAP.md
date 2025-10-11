# Dale Rogers Portfolio - Complete Site Map

## 🏠 Homepage Structure

```
/ (index.astro)
├── Hero Section
├── Featured Services Slider
├── About Section
├── Case Studies Bento Grid
├── Services Overview
├── Services Text
├── My Values
└── Partner Logos
```

## 📄 Static Pages

```
/about.astro                    # About Dale Rogers
/capabilities.astro             # Service capabilities
/contact.astro                  # Contact form and information
/values.astro                   # Personal values and approach
/colophon.astro                 # Site credits and technical details
/privacy.astro                  # Privacy policy
/cookie-policy.astro           # Cookie policy
/terms.astro                    # Terms of service
/search.astro                   # Site-wide search functionality
```

## 📚 Content Collections

### Articles (14 articles)

```
/articles/
├── index.astro                 # Articles listing page
├── [page].astro               # Paginated articles
└── [slug].astro               # Individual article pages
    ├── what-is-service-design.mdx
    ├── service-design-in-the-era-of-remote-work.mdx
    ├── designing-intentional-culture.mdx
    ├── service-design-principles.md
    ├── using-ms-teams-for-better-organisational-security.mdx
    ├── will-ai-mean-the-end-of-consulting.mdx
    ├── how-to-embed-continuous-improvement.mdx
    ├── poka-yoke-in-service-design-and-user-experience.mdx
    ├── considerations-for-trauma-informed-design.mdx
    ├── how-the-design-thinking-process-works-in-government.mdx
    ├── the-ethics-of-service-design.mdx
    ├── service-blueprinting.md
    ├── five-elements-of-service-design-for-government.mdx
    └── embracing-gemba-in-service-design-for-effective-problem-solving.mdx
```

### Case Studies (7 case studies)

```
/work/
├── index.astro                 # Case studies overview
├── [page].astro               # Paginated case studies
└── [slug].astro               # Individual case study pages
    ├── a-better-fit-and-proper-person-test.mdx
    ├── designing-a-quality-solution-to-an-airbag-problem.mdx
    ├── developing-a-bespoke-pmo-as-a-service-for-rio-tinto-aluminium.mdx
    ├── developing-a-robust-doctrine-application-for-the-antarctic.mdx
    ├── improving-digital-agility-in-higher-education.mdx
    ├── making-travel-simple.mdx
    └── protecting-our-borders-with-digital-verification.mdx
```

### Services (11 services)

```
/services/
├── index.astro                 # Services overview
├── [slug].astro               # Individual service pages
└── bid-strategy.astro         # Special bid strategy page
    ├── accessibility.mdx
    ├── citizen-portal.mdx
    ├── design-system.mdx
    ├── digital-strategy.mdx
    ├── digital-transform.mdx
    ├── research-testing.mdx
    ├── service-blueprint.mdx
    ├── service-design.mdx
    ├── service-integration.mdx
    ├── training-capability.mdx
    └── ux-research.mdx
```

### Scratch (2 scratch posts)

```
/scratch/
├── index.astro                 # Scratch posts overview
└── [...slug].astro            # Individual scratch posts
    ├── mermaid-generator.mdx
    └── portfolio-v2.mdx
```

### Tags System

```
/tags/
├── index.astro                 # All tags overview
└── [tag].astro                # Posts filtered by tag
```

## 🧩 Component Architecture

### Layout Components

```
src/components/layout/
├── BaseLayout.astro           # Main site layout
├── Container.astro            # Content container
├── Footer.astro               # Site footer
├── Header.astro               # Site header
├── Navigation.astro           # Main navigation
└── SectionContainer.astro     # Section wrapper
```

### UI Components

```
src/components/ui/
├── Button.astro               # Reusable button component
├── Card.astro                 # Content card component
├── FormattedDate.astro        # Date formatting
├── Heading.astro              # Typography headings
├── Icon.astro                 # Icon component
├── ImageCache.astro           # Image caching utility
├── LazyImage.astro            # Lazy-loaded images
├── OptimizedImage.astro       # Optimized image component
├── PageHeader.astro           # Page headers
├── Pagination.astro           # Pagination controls
├── ResponsiveImage.astro      # Responsive images
├── SectionHeading.astro       # Section headings
├── Tag.astro                  # Tag component
├── TagList.astro              # Tag collections
├── ThemeToggle.astro          # Dark/light theme toggle
└── VersionBadge.astro         # Version indicator
```

### Feature Components

```
src/components/features/
├── articles/
│   └── components/
│       └── ArticleCard.astro
├── case-studies/
│   └── components/
│       ├── CaseStudyCard.astro
│       ├── CaseStudyHero.astro
│       └── CaseStudyImages.astro
├── home/
│   └── types/
├── portfolio/
│   └── components/
│       └── SpinningLogo.astro
├── scratch/
│   └── components/
│       ├── ProjectStatus.astro
│       └── ScratchCard.astro
├── search/
│   ├── SearchInput.astro
│   ├── SearchResults.astro
│   ├── hooks/
│   │   └── useSearch.ts
│   └── utils/
│       └── searchUtils.ts
├── services/
│   ├── Callout.astro
│   ├── Metric.astro
│   └── Testimonial.astro
├── theme-examples/
│   └── ThemeTokenExamples.astro
└── values/
    └── types/
```

### Section Components

```
src/components/sections/home/
├── AboutSection.astro         # About section
├── CaseStudiesBento.astro     # Case studies grid
├── FeaturedServicesSlider.astro # Services carousel
├── Hero.astro                 # Hero section
├── MyValues.astro             # Values section
├── PartnerLogos.astro         # Partner logos
├── Services.astro             # Services overview
└── ServicesText.astro         # Services description
```

## 📋 Layout Templates

```
src/layouts/
├── BaseLayout.astro           # Default layout
├── ArticleLayout.astro        # Article-specific layout
├── CaseStudyLayout.astro      # Case study layout
├── ScratchLayout.astro        # Scratch post layout
└── ScratchStandaloneLayout.astro # Standalone scratch layout
```

## 🎨 Styling System

```
src/styles/
├── global.css                 # Global styles
├── generated-tokens.css       # Generated design tokens
├── components/                # Component-specific styles (29 files)
└── theme/                     # Theme configuration (8 files)
    ├── colors.ts
    ├── spacing.ts
    ├── typography.ts
    └── other theme tokens
```

## 🔧 Configuration & Types

```
src/
├── types/                     # TypeScript type definitions
│   ├── case-studies.ts
│   └── services.ts
├── lib/
│   └── utils.ts               # Utility functions
└── env.d.ts                   # Environment types
```

## 📊 Content Management

```
src/content/
├── config.ts                  # Content collection schemas
├── site-content/
│   └── home.json              # Homepage content sections
└── services.json              # Services configuration
```

## 🧪 Testing Structure

```
tests/
├── setup/                     # Test setup files
├── ui/                        # UI component tests (12 test files)
└── utils/                     # Test utilities
```

## 🚀 Build & Deployment

```
├── astro.config.mjs           # Astro configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── playwright.config.ts       # Playwright test configuration
├── staticwebapp.config.json   # Azure Static Web Apps config
└── package.json               # Dependencies and scripts
```

## 🔍 Key Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Theme toggle functionality
- **Content Collections**: Structured content management
- **Search Functionality**: Site-wide search
- **Performance Optimized**: Lazy loading, image optimization
- **Accessibility**: WCAG AA compliant
- **SEO Optimized**: Meta tags, structured data
- **Australian Standards**: Date formats, spelling, currency
- **E2E Testing**: Playwright test coverage
- **Type Safety**: Full TypeScript implementation

## 📈 Content Statistics

- **Articles**: 14 published articles
- **Case Studies**: 7 detailed case studies
- **Services**: 11 service offerings
- **Scratch Posts**: 2 work-in-progress posts
- **Components**: 40+ reusable components
- **Test Coverage**: 12 UI component tests
- **Layouts**: 5 different page layouts
- **Theme Support**: Light/dark mode with design tokens

## 🌐 Site Navigation Flow

```
Home → About → Services → Work → Articles → Contact
  ↓      ↓       ↓        ↓       ↓        ↓
Values  Search  Tags    Scratch  Privacy  Terms
  ↓      ↓       ↓        ↓       ↓        ↓
Colophon Cookie Policy
```

This portfolio showcases Dale Rogers' expertise in service design through a comprehensive, well-structured site that demonstrates both technical excellence and user-centered design principles.
