# Portfolio Architecture

## System Overview
The portfolio is built as a server-side rendered Astro application with static pages and dynamic API routes for form handling.

## Core Components

### Frontend
- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Components**: `.astro` components with minimal JavaScript
- **Assets**: Optimized images and SVG icons

### Backend Services
- **Contact Form**: 
  - API Route: `/api/contact`
  - Email Service: Nodemailer with Gmail SMTP
  - Authentication: Google Workspace App Password

### Data Flow
1. **Contact Form Submission**
   ```
   User -> Contact Form -> API Route -> Nodemailer -> Gmail SMTP -> Admin Email
   ```

2. **Analytics (Planned)**
   ```
   User -> Page View -> Umami Script -> Umami Server -> PostgreSQL
   ```

## Directory Structure
```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts and templates
├── pages/         # Routes and API endpoints
├── styles/        # Global styles and Tailwind config
└── utils/         # Shared utilities and helpers
```

## External Dependencies
- **Email**: Google Workspace (Gmail SMTP)
- **Analytics**: Umami (planned)
- **Hosting**: CrazyDomains
- **Domain**: dalerogers.com.au

## Security Considerations
- Environment variables for sensitive data
- Server-side email handling
- No client-side exposure of credentials
- Privacy-focused analytics solution

## Performance Optimizations
- Static site generation where possible
- Minimal JavaScript usage
- Optimized image assets
- System font stack
- Lazy-loaded components 