# Portfolio TODO List

## Analytics Setup

- [ ] Deploy Umami Analytics
  - Recommended: Deploy separately from main site for better maintainability
  - Options: Vercel, Railway, or existing hosting
  - Need: PostgreSQL database (consider Neon or Supabase)
  - Add script tag to Astro site after deployment
  - Document deployment details in DEPLOYMENT.md

## Documentation Improvements

For better AI context and collaboration, maintain these documentation files:

### DECISIONS.md

- Document important technical decisions
- Include context, alternatives considered, and reasoning
- Example format:

  ```markdown
  ## [Date] Analytics: Chose Umami over Google Analytics

  - Context: Needed privacy-focused, lightweight analytics
  - Options Considered:
    1. Google Analytics
    2. Plausible
    3. Umami
  - Decision: Umami
  - Reasoning:
    - Open source and self-hostable
    - Lightweight (1KB)
    - No cookies required
    - Simple deployment
  ```

### ARCHITECTURE.md

- Document system architecture
- Include component relationships
- API integrations
- Data flow diagrams

### DEVELOPMENT.md

- Development environment setup
- Local development workflows
- Testing procedures
- Deployment processes

### .env.example

- Keep updated with all environment variables
- Include descriptions for each variable
- Document any required third-party credentials

### CHANGELOG.md

- Track significant changes
- Link to relevant issue/PR numbers
- Include migration notes if needed

## Best Practices for AI Context

1. Use consistent file naming:

   - Component files: PascalCase (e.g., `ContactForm.astro`)
   - Utility files: camelCase (e.g., `emailUtils.ts`)
   - Documentation: UPPERCASE.md

2. Add JSDoc comments for important functions:

   ```typescript
   /**
    * Sends contact form email using Nodemailer
    * @param {FormData} data - Form data from contact submission
    * @returns {Promise<void>} - Resolves when email is sent
    * @throws {Error} - If email fails to send
    */
   ```

3. Create README files in major directories:

   - `/src/components/README.md`
   - `/src/layouts/README.md`
   - `/src/pages/README.md`

4. Use conventional commits:
   ```
   feat: add contact form email functionality
   fix: correct email template formatting
   docs: update deployment instructions
   ```

## Current Development Tasks

- [ ] Set up Umami Analytics
- [ ] Create initial DECISIONS.md file
- [ ] Add directory README files
- [ ] Update documentation with current architecture
- [ ] Component Theme Improvements
  - [ ] Create theme documentation with color palette and usage guidelines
  - [ ] Add theme toggle functionality
  - [ ] Implement theme preview in Colophon page
  - [ ] Add unit tests for themed components
  - [ ] Create theme migration guide for future updates
- [ ] Accessibility Enhancements
  - [ ] Add ARIA labels to all interactive elements
  - [ ] Implement keyboard navigation for mobile menu
  - [ ] Add skip-to-content link
  - [ ] Test with screen readers
- [ ] Performance Optimization
  - [ ] Audit CSS custom property usage
  - [ ] Consider extracting common styles to utility classes
  - [ ] Implement critical CSS loading

// TODO: Add error handling here
// FIXME: This needs optimization
// [ ] Implement this feature
