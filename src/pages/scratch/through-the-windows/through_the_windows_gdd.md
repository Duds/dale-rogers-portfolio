# Through the Windows – Interactive Tram Journey

A generative ambient scene built in Astro.js with Canvas. This experience invites users to control a tram through a poetic landscape filled with silhouette characters, parallax layers, and subtle interactions.

---

## 1. Project Summary

- **Title**: Through the Windows
- **Platform**: Astro.js with embedded Canvas component
- **Type**: Interactive narrative sketch
- **Control**: Arrow keys (left/right), Spacebar (bell)
- **Tone**: Ambient, quiet, observational
- **Visual Style**: Layered paper-cut aesthetic with silhouette figures and parallax movement
- **Goal**: Explore, observe, and discover—no destination required.

---

## 2. Scene List (World Zones)

| ID  | Name       | Length (px) | Description                                        |
| --- | ---------- | ----------- | -------------------------------------------------- |
| Z0  | Depot      | 600         | Quiet platform. Birds. A passenger waits.          |
| Z1  | Fields     | 1200        | Open countryside. Trees, windmills, falling leaves |
| Z2  | Station A  | 200         | Farmer and goat at rural stop                      |
| Z3  | Village    | 1200        | Houses, street life. Cat, dog, upstairs window     |
| Z4  | Hill Climb | 700         | Tram leans up. Sparks and sound                    |
| Z5  | Station B  | 300         | Mountain-top platform. Teen and elderly woman      |
| Z6  | Descent    | 700         | Fast ride downhill. Camera drifts forward          |
| Z7  | Industrial | 1000        | Fences, graffiti, trucks, wires                    |
| Z8  | Station C  | 300         | Courier, couple board. Sign flickers               |
| Z9  | Urban End  | 1000        | Dusk. Final stop. Tram fades out in distance       |

---

## 3. Camera & Tram Mechanics

- **Tram Positioning**: Camera lags during acceleration and deceleration (eased centering)
- **Acceleration**: Velocity increases while holding arrow keys
- **Braking**: Automatic easing when keys are released
- **Reverse Movement**: Full support for backward traversal

---

## 4. Interaction System

| Type        | Trigger          | Effect                                          |
| ----------- | ---------------- | ----------------------------------------------- |
| Proximity   | Near object      | Tree shakes, people wave                        |
| Velocity    | Passing fast     | Leaves blow, branches bend                      |
| Idle Time   | Wait 3s+ in zone | Animals appear, doors open                      |
| Input Event | Spacebar (bell)  | Sound + object-specific reactions (goat, light) |

---

## 5. Micro-Events Index

| ID  | Location   | Condition              | Event                    |
| --- | ---------- | ---------------------- | ------------------------ |
| ME1 | Fields     | Pass tree fast         | Tree shakes, leaf falls  |
| ME2 | Village    | Idle near alley        | Cat darts across         |
| ME3 | Hill Climb | Climb slope            | Sparks and sound emitted |
| ME4 | Station C  | Spacebar x2            | Bell chime melody        |
| ME5 | Urban End  | Never stop entire trip | Ghost tram in background |

---

## 6. Visual Layering & Style Guide

- **Layer Order**:
  1. Sky (parallax 0.2)
  2. Mountains/trees (0.4)
  3. Buildings/props (0.7)
  4. Tracks and passengers behind windows (0.9)
  5. Tram body (1.0)
  6. Poles/signs in foreground (1.2)
- **Style**:
  - Flat fills
  - Soft shadows
  - Slight randomness in curves (hand-cut look)
  - Muted tones with occasional colour pops

---

## 7. Passenger System

- **Types**: Silhouette only. Boarding/disembarking appears behind tram body.
- **Logic**:
  - Boarding: appears in window slot
  - Disembarking: disappears after delay
  - Passengers may animate subtly (nod, wave, stretch)

---

## 8. Audio Triggers

| Event            | Sound                    |
| ---------------- | ------------------------ |
| Spacebar         | Tram bell                |
| Fast pass trees  | Wind swoosh              |
| Brake near edge  | Soft metallic screech    |
| Station idle     | Footstep + door chime    |
| Easter egg found | Faint melody in distance |

---

## 9. Deployment

- **Page**: `/sketches/through-the-windows`
- **Component**: `TramScene.astro`
- **Canvas Runtime**: `TramSketch.ts`
- **JSON Config**: Zones and objects loaded dynamically
- **Hosting**: Part of Astro.js static portfolio
