# Tram Sketch Backlog

## Functional User Stories

### Core Movement
- **US001**: Move tram forward/backward using arrow keys
- **US002**: Accelerate/decelerate based on key press duration
- **US003**: Camera lags during acceleration/deceleration for cinematic feel

### World Zones & Parallax
- **US004**: Scroll through distinct world zones
- **US005**: Parallax scrolling with depth layers

### Stations and Passenger Interactions
- **US006**: Stop at stations, passengers board/disembark visibly
- **US007**: Skip stations if desired
- **US008**: Passenger diversity per station

### Micro-Interactions
- **US009**: Trees shake when tram passes quickly
- **US010**: Animals react if tram is nearby or reversing
- **US011**: Spacebar bell triggers sound and object responses

### Easter Eggs
- **US012**: Hidden events trigger from unique behaviours

### Visual Composition
- **US013**: Foreground occlusion objects like poles
- **US014**: Tram leans on slopes

## Non-Functional Stories

### Performance
- **NF001**: Maintain 60fps on desktop browsers
- **NF002**: Smooth performance over long world spans

### Maintainability
- **NF003**: Scene config externalised as JSON
- **NF004**: Modular class-based rendering and input

### Accessibility
- **NF005**: Clear visual feedback for all key actions
- **NF006**: Graceful degradation on low-spec or small screens

### Visual Consistency
- **NF007**: Paper-cut visual consistency across assets
- **NF008**: Use eased motion transitions

### Portability
- **NF009**: Self-contained Astro.js client component
- **NF010**: Embeddable standalone version
