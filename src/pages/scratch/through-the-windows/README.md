# Through The Windows

A creative exploration game where players interact with scenes through windows, experiencing different perspectives and narratives.

## Project Description

Through The Windows is an interactive web-based game that explores storytelling through the metaphor of windows. Players can interact with various scenes, each offering unique perspectives and narratives. The game combines elements of visual storytelling, interactive fiction, and creative exploration.

## Setup Instructions

1. **Prerequisites**

   - Node.js (v18 or higher)
   - npm (v9 or higher)
   - Git

2. **Installation**

   ```bash
   # Clone the repository (if not already done)
   git clone <repository-url>
   cd dale-rogers-portfolio

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

3. **Development**
   - The game is located at `/scratch/through-the-windows`
   - Main entry point: `index.astro`
   - Game components: `components/`
   - Types: `types/`
   - Styles: `styles/`

## Development Guidelines

1. **Component Structure**

   - `Game.tsx` - Main game component
   - `GameControls.tsx` - Player controls
   - `GameStats.tsx` - Game statistics
   - `GameWindow.tsx` - Window rendering

2. **State Management**

   - Use React hooks for local state
   - Implement proper state management
   - Handle game state transitions

3. **Testing**

   - Write unit tests for components
   - Test game logic
   - Ensure accessibility
   - Test user interactions

4. **Styling**
   - Use Tailwind CSS
   - Follow design system
   - Ensure responsive design
   - Maintain accessibility

## Dependencies

- React
- TypeScript
- Tailwind CSS
- Astro
- [Other specific dependencies]

## Build Process

1. **Development**

   ```bash
   npm run dev
   ```

2. **Production**

   ```bash
   npm run build
   ```

3. **Preview**
   ```bash
   npm run preview
   ```

## Project Structure

```
through-the-windows/
├── components/
│   ├── Game.tsx
│   ├── GameControls.tsx
│   ├── GameStats.tsx
│   └── GameWindow.tsx
├── types/
│   └── index.ts
├── styles/
│   └── game.css
├── __tests__/
│   └── game.test.tsx
├── index.astro
├── README.md
├── package.json
└── tsconfig.json
```

## Documentation

- [Game Design Document](./through_the_windows_gdd.md)
- [Scene Map](./through_the_windows_scene_map.md)
- [Backlog](./tram_sketch_backlog.md)

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Update documentation
5. Submit a pull request

## License

[License information]

## Changelog

### [Unreleased]

- Initial project setup
- Basic game structure
- Window interaction system
- Scene management

### [0.1.0] - YYYY-MM-DD

- Initial release
- Basic game mechanics
- First scene implementation
