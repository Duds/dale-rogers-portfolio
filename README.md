# Dale Rogers Portfolio

A modern, accessible portfolio website built with Astro, showcasing service design expertise and case studies.

## 🚀 Features

- **Modern Tech Stack**: Built with Astro, TypeScript, and Tailwind CSS v4
- **Professional Design**: Clean, accessible design with dark/light theme support
- **Content-Driven**: Rich case studies, articles, and service descriptions
- **Performance-First**: Static generation with optimized assets and lazy loading
- **Accessibility**: WCAG AA compliant with proper ARIA support
- **Responsive**: Mobile-first design that works on all devices
- **Australian Standards**: Localized content and regional considerations

## 🏗️ Architecture

### Static Site Generation

- **Output Mode**: Static HTML/CSS/JS files
- **Build Process**: `astro build` generates optimized static assets
- **No Server**: All content pre-rendered at build time
- **CDN Ready**: Optimized for global content distribution

### Component Structure

```
src/components/
├── ui/           # Reusable UI components
├── layout/       # Layout components (Header, Footer, Container)
├── features/     # Feature-specific components
└── sections/     # Page/section components
```

### Styling System

- **Tailwind CSS v4**: Utility-first CSS framework
- **Theme Tokens**: CSS custom properties for consistent theming
- **Component CSS**: Dedicated stylesheets for each component
- **Design System**: Professional color palette and spacing scale

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10.14.0+

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Build Commands

```bash
# Standard build
pnpm run build

# Build for Azure Static Web Apps
pnpm run build:swa

# Type checking
pnpm run typecheck

# Linting
pnpm run lint
```

## 🌐 Deployment

### Azure Static Web Apps ✅ LIVE

This site is deployed using **Azure Static Web Apps**, which provides:

- **Automatic CI/CD**: GitHub Actions integration
- **Global CDN**: Edge locations worldwide
- **HTTPS**: Automatic SSL/TLS certificates
- **Cost-effective**: Pay-per-use pricing

### Current Deployment Status

- **Production URL**: [https://wonderful-pond-07724bc03.1.azurestaticapps.net](https://wonderful-pond-07724bc03.1.azurestaticapps.net)
- **Preview URL**: [https://wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net](https://wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net)
- **Resource**: `dale-rogers-portfolio` in `dale-rogers-portfolio-rg`

### Deployment Flow

1. **Push to main branch** → Triggers GitHub Actions
2. **Build** → `pnpm install && pnpm build`
3. **Deploy** → Files uploaded to Azure SWA
4. **CDN** → Content distributed globally

### Configuration Files

- **`.github/workflows/azure-static-web-apps.yml`**: CI/CD workflow
- **`staticwebapp.config.json`**: Azure SWA configuration
- **`astro.config.mjs`**: Astro static output configuration

### Quick Deploy

```bash
# Build and deploy directly
pnpm run build:swa
npx @azure/static-web-apps-cli@latest deploy dist --deployment-token YOUR_TOKEN
```

## 📁 Project Structure

```
src/
├── components/     # React and Astro components
├── content/        # MDX content collections
├── layouts/        # Page layouts
├── pages/          # Astro pages
├── styles/         # CSS and theme files
└── types/          # TypeScript type definitions

public/             # Static assets
docs/               # Project documentation
tests/              # Playwright E2E tests
```

## 🎨 Design System

### Color Palette

- **Primary**: Professional black and white
- **Accent**: Rust orange for interactive elements
- **Semantic**: Context-aware colors for different states

### Typography

- **Headings**: Inter (bold, modern)
- **Body**: System fonts for readability
- **Code**: JetBrains Mono for technical content

### Spacing & Layout

- **Container**: Responsive width variants
- **Grid**: 12-column responsive system
- **Spacing**: Consistent scale based on design tokens

## 🧪 Testing

### E2E Testing

- **Framework**: Playwright
- **Coverage**: All major UI components
- **Accessibility**: Automated a11y checks
- **Visual**: Screenshot regression testing

### Test Commands

```bash
# Run all tests
pnpm run test

# Run tests with UI
pnpm run test:ui

# Run specific test file
pnpm run test:ui -- src/components/Button.test.tsx
```

## 📚 Content Management

### Content Collections

- **Articles**: Service design insights and thoughts
- **Case Studies**: Detailed project portfolios
- **Services**: Service offerings and capabilities
- **Scratch**: Technical experiments and prototypes

### Content Types

- **MDX**: Rich content with React components
- **Frontmatter**: Structured metadata
- **Images**: Optimized with lazy loading
- **SEO**: Automatic meta tag generation

## 🔧 Development

### Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting with Astro support
- **Husky**: Pre-commit hooks

### Development Tools

- **Cursor AI**: AI-powered development assistant
- **Astro Dev Tools**: Built-in development utilities
- **Hot Reload**: Instant feedback during development

### Performance

- **Lazy Loading**: Images and components
- **Code Splitting**: Automatic bundle optimization
- **Asset Optimization**: Compressed images and fonts
- **Core Web Vitals**: Performance monitoring

## 🌍 Regional Features

### Australian Standards

- **Language**: Australian English spelling
- **Date Format**: DD/MM/YYYY
- **Time Format**: 24-hour
- **Currency**: AUD (when applicable)

### Accessibility

- **WCAG AA**: Full compliance
- **Screen Readers**: Proper ARIA support
- **Keyboard Navigation**: Complete keyboard support
- **High Contrast**: Dark/light theme support

## 📖 Documentation

### Project Docs

- **`docs/ARCHITECTURE.md`**: System architecture overview
- **`docs/COMPONENTS.md`**: Component standards and patterns
- **`docs/THEME.md`**: Design system documentation
- **`docs/DEPLOYMENT.md`**: Deployment and hosting guide

### Contributing

- **Component Standards**: Follow established patterns
- **Theme Tokens**: Use CSS custom properties
- **Accessibility**: Maintain WCAG AA compliance
- **Testing**: Add tests for new features

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Follow** component standards and theming rules
4. **Test** your changes thoroughly
5. **Submit** a pull request

### Development Standards

- Use TypeScript for all new code
- Follow established component patterns
- Maintain accessibility standards
- Use theme tokens for styling
- Add tests for new functionality

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For technical issues or questions:

- Check the documentation in `docs/`
- Review the troubleshooting guide
- Open an issue for bugs or feature requests

---

**Built with ❤️ using Astro, TypeScript, and Tailwind CSS**

**Deployed on Azure Static Web Apps for optimal performance and reliability**
