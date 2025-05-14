declare module "./components/Game.tsx" {
  import type { GameConfig } from "./types/index";

  export interface GameProps {
    config: GameConfig;
  }

  export const Game: React.FC<GameProps>;
}

declare module "./types/index.ts" {
  export interface GameState {
    isActive: boolean;
    score: number;
    timeRemaining: number;
    currentZone: TramZone;
    status: "idle" | "playing" | "paused" | "gameover";
  }

  export interface TramZone {
    number: number;
    name: string;
    length: number;
    timeLimit: number;
    initialWindows: Window[];
  }

  export interface Window {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    content: WindowContent;
  }

  export interface WindowContent {
    type: "character" | "scene" | "event";
    description: string;
    interaction?: string;
  }

  export interface TramPhysics {
    maxVelocity: number;
    acceleration: number;
    deceleration: number;
    cameraLag: number;
  }

  export interface GameConfig {
    initialState: GameState;
    zones: TramZone[];
    tramPhysics: TramPhysics;
  }
}
