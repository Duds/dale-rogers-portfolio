# Dale Rogers Portfolio

A modern, performant portfolio website built with Astro, TypeScript, and Tailwind CSS. This site showcases my professional work, case studies, and articles on service design and technology.

## 🚀 Features

- **Modern Tech Stack**: Built with Astro, TypeScript, and Tailwind CSS
- **Performance Optimized**: Fast loading times and excellent Lighthouse scores
- **Responsive Design**: Looks great on all devices
- **Content Management**: Easy-to-update content structure
- **SEO Friendly**: Built with search engine optimization in mind

## 📦 Tech Stack

- [Astro](https://astro.build/) - Modern static site generator
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PostCSS](https://postcss.org/) - CSS processing
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Duds/dale-rogers-portfolio.git
   cd dale-rogers-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

### Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Markdown content
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route components
│   └── styles/         # Global styles
├── public/             # Static assets
└── astro.config.mjs    # Astro configuration
```

## 📝 Content Management

Content is managed through Markdown files in the `src/content/` directory:

- Articles: `src/content/articles/`
- Case Studies: `src/content/case-studies/`

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
pnpm test
```

## 🚀 Deployment

The site is configured for deployment on Vercel. Push to the `main` branch to trigger a deployment.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Contact

For any questions or suggestions, please open an issue or contact me directly.

## ✅ Project Status

### MVP Features

- [x] Basic portfolio structure
- [x] Responsive design
- [x] Content management setup
- [ ] Case studies section
- [ ] Blog/articles section
- [ ] Contact form integration
- [ ] SEO optimization

### Future Enhancements

- [ ] Dark mode support
- [ ] Internationalization
- [ ] Performance optimizations
- [ ] Analytics integration
- [ ] Newsletter subscription

## Development Standards

### Component Organization

We follow a feature-based component architecture:

- UI components: `src/components/ui/`
- Layout components: `src/components/layout/`
- Feature components: `src/components/features/<feature>/components/`

For more details, see [DEVELOPMENT.md](DEVELOPMENT.md).

### Australian English Standards

This project follows Australian English standards:

- Australian spelling (e.g., colour, organisation)
- Australian date format (DD/MM/YYYY)
- 24-hour time format
- Australian time zones
- Metric measurements

VS Code Setup:

```json
{
  "cSpell.language": "en,en-AU",
  "cSpell.words": ["colour", "organisation", ...]
}
```

For full configuration, see [DEVELOPMENT.md](DEVELOPMENT.md).
