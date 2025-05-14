# Mermaid Generator

A dual-mode Mermaid diagram generator that works both as an Astro component and as a standalone application.

## Features

- Real-time Mermaid diagram preview
- Export diagrams as SVG or PNG
- Save diagrams as templates
- Zoom controls
- Dark mode support
- Responsive design
- Standalone mode for easy sharing

## Project Structure

```
mermaid-generator/
├── components/           # Astro components
│   ├── MermaidEditor.astro
│   ├── MermaidPreview.astro
│   └── MermaidControls.astro
├── shared/              # Shared code
│   ├── core/           # Core functionality
│   │   ├── editor.js
│   │   ├── preview.js
│   │   ├── controls.js
│   │   └── error-handling.ts
│   ├── types/          # TypeScript types
│   │   └── index.ts
│   └── utils/          # Utility functions
├── standalone/         # Standalone version
│   ├── index.html
│   ├── scripts/
│   ├── styles/
│   └── assets/
├── styles/            # Astro-specific styles
├── build.js          # Build script
└── index.astro       # Main Astro page
```

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development Workflow

1. Start the Astro development server:

   ```bash
   pnpm dev
   ```

2. Build the standalone version:

   ```bash
   node build.js --standalone
   ```

3. Create a distributable zip:
   ```bash
   node build.js --standalone --zip
   ```

## Usage

### Astro Version

The Astro version is integrated into the portfolio website and can be accessed at `/scratch/mermaid-generator`.

### Standalone Version

The standalone version can be used by:

1. Opening `standalone/index.html` in a browser
2. Sharing the zip file (`mermaid-generator-standalone.zip`)

## Contributing

1. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

2. Make your changes
3. Run tests (if available)
4. Submit a pull request

## Git Workflow

- Use semantic commit messages
- Create feature branches for new features
- Submit pull requests for review
- Keep commits atomic and focused

## Error Handling

The project uses a custom error handling system:

- `MermaidError`: For Mermaid-specific errors
- `ExportError`: For export-related errors
- Error boundaries for async and sync operations

## TypeScript

The project uses TypeScript for type safety:

- Strict type checking
- Custom interfaces and types
- Type guards where appropriate
- No `any` types

## Security

- Input validation
- Output sanitization
- No sensitive data storage
- Secure file handling

## Performance

- Lazy loading where appropriate
- Minified assets in production
- Efficient DOM updates
- Proper event handling

## Accessibility

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- No IE11 support required

## License

MIT License - see LICENSE file for details

## Author

Dale Rogers

## Acknowledgments

- [Mermaid.js](https://mermaid.js.org/)
- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ✨ Features

- Standalone static HTML + JS tool (no hosting required)
- Live diagram preview
- AI Assistant: natural language to Mermaid syntax (generate + repair)
- Supports:
  - Flowcharts
  - Sequence diagrams
  - Class diagrams
  - State diagrams
  - ERD diagrams
  - Journey maps
  - Gantt charts
  - Requirement diagrams
  - BPMN (exploratory only, not formal BPMN 2.0)
- Save diagrams as:
  - Mermaid text (`.txt`)
  - PNG image
  - SVG image
- Optional: Export to BPMN.io for formal BPMN diagrams
- Configurable theme panel:
  - Primary / secondary / tertiary colours
  - Fonts
  - Corner radius
- Fully offline-capable for internal use

---

## 🚧 Roadmap

1. Complete AI Assistant integration
2. Add configurable theming panel
3. Add BPMN plugin (experimental)
4. Add data file input (CSV/JSON → diagram generation)
5. Optional: add D2 engine for structured diagrams
6. Optional: export to Visio format

---

## 🎨 Styling Strategy

- Primary styling through Mermaid `themeVariables`
- Secondary adjustments via inline SVG attributes post-render
- R&D planned to optionally fork Mermaid and disable `randomizeId` behaviour for full style control

---

## 🛠️ Technical Architecture

- Single file deployable (HTML + JS + CSS)
- Mermaid.js as rendering core
- AI Assistant module (pluggable local or remote)
- Optional BPMN plugin for exploratory BPMN diagrams

---

## 📝 Project Notes

This is an **internal-only tool for design exploration**.
BPMN support is intentionally limited and not compliant with BPMN 2.0 formal modelling requirements.
For formal process diagrams, BPMN.io or Camunda Modeler should be used externally.

---
