# Through The Windows

An interactive tram journey through a poetic landscape, exploring storytelling through windows and ambient scenes.

## Project Description

Through The Windows is an interactive web-based experience built in Astro.js with Canvas. It invites users to control a tram through a carefully crafted landscape filled with silhouette characters, parallax layers, and subtle interactions. The game combines elements of visual storytelling, ambient exploration, and creative discovery.

## Key Features

- **Interactive Tram Journey**: Control a tram through various zones using arrow keys
- **Ambient Storytelling**: Discover micro-events and environmental storytelling
- **Visual Style**: Layered paper-cut aesthetic with silhouette figures and parallax movement
- **Dynamic Scenes**: 10 unique zones with their own atmosphere and events
- **Interactive Elements**:
  - Arrow keys for tram control
  - Spacebar for tram bell
  - Proximity-based interactions
  - Velocity-based environmental reactions
  - Idle time discoveries

## Development

The game is part of the main portfolio project and runs within its development environment.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Running the Game

```bash
# From the main portfolio directory
npm run dev
```

The game will be available at `/scratch/through-the-windows`

### Project Structure

```
through-the-windows/
├── components/
│   ├── Game.tsx           # Main game component
│   ├── GameControls.tsx   # Tram controls
│   ├── GameStats.tsx      # Journey statistics
│   └── GameWindow.tsx     # Scene rendering
├── types/
│   └── index.ts          # TypeScript definitions
├── __tests__/
│   ├── Game.test.tsx     # Component tests
│   └── setup.ts          # Test configuration
├── index.astro           # Main entry point
└── README.md             # This file
```

### Testing

Tests are run from the main portfolio's test environment:

```bash
# From the main portfolio directory
npm test
```

To run tests specifically for the game:

```bash
npm test -- through-the-windows
```

## Game Zones

1. **Depot** (600px) - Quiet platform with birds and waiting passenger
2. **Fields** (1200px) - Open countryside with trees and windmills
3. **Station A** (200px) - Rural stop with farmer and goat
4. **Village** (1200px) - Houses and street life
5. **Hill Climb** (700px) - Ascending slope with sparks
6. **Station B** (300px) - Mountain-top platform
7. **Descent** (700px) - Downhill journey
8. **Industrial** (1000px) - Urban industrial area
9. **Station C** (300px) - Urban station
10. **Urban End** (1000px) - Dusk scene with fading tram

## Interaction System

- **Proximity**: Objects react when the tram is near
- **Velocity**: Environmental reactions based on speed
- **Idle Time**: Special events after waiting
- **Bell**: Spacebar triggers the tram bell with scene-specific reactions

## Visual Style

- Layered paper-cut aesthetic
- Parallax movement (0.2 to 1.2 depth layers)
- Silhouette figures
- Muted tones with occasional color accents
- Soft shadows and hand-cut look

## Documentation

- [Game Design Document](./through_the_windows_gdd.md) - Detailed game mechanics and design
- [Scene Map](./through_the_windows_scene_map.md) - Zone descriptions and events
- [Backlog](./tram_sketch_backlog.md) - Development tasks and future features

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Write tests
4. Update documentation
5. Submit a pull request

## License

Part of the main portfolio project. See main repository for license information.

## Changelog

### [Unreleased]

- Initial project setup
- Basic tram movement
- Zone system implementation
- Window interaction system
- Scene management

### [0.1.0] - YYYY-MM-DD

- Initial release
- Basic tram mechanics
- First three zones implemented
- Core interaction system
