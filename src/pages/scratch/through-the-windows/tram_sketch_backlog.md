# Tram Sketch Backlog

## Functional User Stories

### Core Movement

- **US001**: Move tram forward/backward using arrow keys
- **US002**: Accelerate/decelerate based on key press duration
- **US003**: Camera lags during acceleration/deceleration for cinematic feel

### World Zones & Parallax

- **US004**: Scroll through distinct world zones
- **US005**: Parallax scrolling with depth layers
- **US015**: Display multiple background layers with different scroll speeds based on depth
- **US016**: Ensure foreground elements move faster than distant elements
- **US017**: Create atmospheric depth with at least 5 distinct parallax layers
- **US018**: Implement smooth transitions between parallax elements at zone boundaries

### Stations and Passenger Interactions

- **US006**: Stop at stations, passengers board/disembark visibly
- **US007**: Skip stations if desired
- **US008**: Passenger diversity per station
- **US019**: Show silhouette passengers behind tram windows after boarding
- **US020**: Animate passenger boarding with smooth transitions
- **US021**: Enable passengers to disembark when tram stops at stations
- **US022**: Display waiting passengers on platforms with varied poses

### Micro-Interactions

- **US009**: Trees shake when tram passes quickly
- **US010**: Animals react if tram is nearby or reversing
- **US011**: Spacebar bell triggers sound and object responses
- **US023**: Implement proximity-based interactions with trackside objects
- **US024**: Create velocity-dependent responses for passing objects
- **US025**: Track idle time to trigger special events when stationary
- **US026**: Enable object-specific reactions to tram bell chimes

### Easter Eggs

- **US012**: Hidden events trigger from unique behaviours

### Visual Composition

- **US013**: Foreground occlusion objects like poles
- **US014**: Tram leans on slopes

### Configuration and Data

- **US027**: Create comprehensive zone configuration object matching GDD specifications
- **US028**: Define all zones with proper lengths, names and characteristics
- **US029**: Store scene elements and their properties in structured JSON format
- **US030**: Allow dynamic loading of zone configurations for easier updates

## Non-Functional Stories

### Performance

- **NF001**: Maintain 60fps on desktop browsers using requestAnimationFrame
- **NF002**: Smooth performance over long world spans using canvas-based rendering
- **NF003**: Implement efficient sprite batching for multiple parallax layers
- **NF004**: Use hardware acceleration with transform3d for smooth animations

### Technology Stack

- **NF005**: Implement core animation system using Canvas API
- **NF006**: Use TypeScript for type-safe game state management
- **NF007**: Implement physics calculations using native JavaScript for minimal overhead
- **NF008**: Use Web Audio API for positional sound effects
- **NF009**: Implement asset preloading system using Promise.all
- **NF010**: Use requestIdleCallback for non-critical background calculations

### State Management

- **NF011**: Implement game state using TypeScript interfaces and strict type checking
- **NF012**: Use React's useCallback and useMemo for optimised render cycles
- **NF013**: Implement zone transitions using a finite state machine pattern
- **NF014**: Store game configuration in JSON using Zod for runtime validation

### Asset Management

- **NF015**: Implement sprite atlas for efficient texture management
- **NF016**: Use SVG for UI elements to maintain crisp rendering at all scales
- **NF017**: Implement dynamic asset loading based on current and adjacent zones
- **NF018**: Use WebP format for background images with PNG fallback

### Code Architecture

- **NF019**: Implement Entity Component System for game objects
- **NF020**: Use Observer pattern for event handling
- **NF021**: Implement Command pattern for user inputs
- **NF022**: Use Factory pattern for game object creation
- **NF023**: Implement Singleton for game state management
- **NF024**: Use Strategy pattern for different movement behaviours

### Testing and Quality

- **NF025**: Implement Jest unit tests for game logic
- **NF026**: Use Playwright for E2E testing of game interactions
- **NF027**: Implement performance monitoring using Performance API
- **NF028**: Use ESLint with strict TypeScript rules
- **NF029**: Implement automated performance regression testing
- **NF030**: Use Lighthouse CI for performance monitoring

### Accessibility

- **NF031**: Implement ARIA labels for all interactive elements
- **NF032**: Support keyboard controls with visual indicators
- **NF033**: Implement high contrast mode for visuals
- **NF034**: Add screen reader support for game events
- **NF035**: Support reduced motion preferences
- **NF036**: Implement configurable game speed

### Browser Compatibility

- **NF037**: Support latest two versions of major browsers
- **NF038**: Implement feature detection for critical APIs
- **NF039**: Provide fallback rendering for older browsers
- **NF040**: Handle touch events for mobile devices

### Development Workflow

- **NF041**: Use Vite for fast development builds
- **NF042**: Implement hot module replacement for quick iterations
- **NF043**: Use TypeScript path aliases for clean imports
- **NF044**: Implement automated code formatting with Prettier
- **NF045**: Use Conventional Commits for version control

### Documentation

- **NF046**: Generate API documentation using TypeDoc
- **NF047**: Maintain architecture decision records (ADRs)
- **NF048**: Document performance benchmarks and targets
- **NF049**: Create component storybook for UI elements
- **NF050**: Maintain technical debt tracking system

### Monitoring and Analytics

- **NF051**: Implement error tracking using custom error boundaries
- **NF052**: Track performance metrics using Web Vitals
- **NF053**: Monitor memory usage with Performance API
- **NF054**: Track user interactions for gameplay analysis
- **NF055**: Implement debug mode for development

### Security

- **NF056**: Implement Content Security Policy
- **NF057**: Sanitise all user inputs
- **NF058**: Use Subresource Integrity for external resources
- **NF059**: Implement rate limiting for game actions
- **NF060**: Use secure random number generation for game events
