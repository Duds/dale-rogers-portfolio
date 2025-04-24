/**
 * Core game types and interfaces for Through the Windows
 */

export interface GameState {
  /** Whether the game is currently active */
  isActive: boolean;
  /** Current game score */
  score: number;
  /** Time remaining in seconds */
  timeRemaining: number;
  /** Current game zone */
  currentZone: TramZone;
  /** Current game status */
  status: "idle" | "playing" | "paused" | "gameover";
}

export interface WindowPosition {
  /** X coordinate of the window */
  x: number;
  /** Y coordinate of the window */
  y: number;
  /** Width of the window */
  width: number;
  /** Height of the window */
  height: number;
}

export interface TramZone {
  /** Zone number */
  number: number;
  /** Zone name */
  name: string;
  /** Length of zone in pixels */
  length: number;
  /** Time limit in seconds */
  timeLimit: number;
  /** Initial window positions */
  initialWindows: WindowPosition[];
}

export interface TramPosition {
  /** Position along the track (x-axis) */
  x: number;
  /** Velocity of the tram */
  velocity: number;
  /** Target position of the tram */
  targetX: number;
  /** Camera offset from tram position */
  cameraOffset: number;
}

export interface GameConfig {
  /** Initial game state */
  initialState: GameState;
  /** Array of game zones */
  zones: TramZone[];
  /** Tram physics settings */
  tramPhysics: {
    /** Maximum velocity */
    maxVelocity: number;
    /** Acceleration rate when key pressed */
    acceleration: number;
    /** Deceleration rate when key released */
    deceleration: number;
    /** Camera lag factor (0-1) */
    cameraLag: number;
  };
}
