import { useCallback, useEffect, useState, useRef } from 'react';
import type { GameConfig, GameState, WindowPosition, TramZone, TramPosition } from '../types/index.js';

// Import components with correct .tsx extensions
import { GameControls } from './GameControls.tsx';
import { GameStats } from './GameStats.tsx';
import { GameWindow } from './GameWindow.tsx';

interface Props {
  config: GameConfig;
  onGameOver?: (score: number) => void;
}

// Update initial state to match GameState interface
const INITIAL_STATE: GameState = {
  score: 0,
  isActive: false,
  status: 'idle',
  timeRemaining: 0,
  currentZone: {
    number: 1,
    name: 'Tram Depot',
    length: 600,
    timeLimit: 60,
    initialWindows: []
  }
};

const INITIAL_TRAM_POSITION: TramPosition = {
  x: 0,
  velocity: 0,
  targetX: 0,
  cameraOffset: 0
};

// Key codes for arrow keys
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';

/** Default physics settings if not provided in config */
const DEFAULT_PHYSICS = {
  maxVelocity: 5,
  acceleration: 0.5,
  deceleration: 0.3,
  cameraLag: 0.95
};

/**
 * Game component that manages the tram journey through different zones
 * Implements the "Through the Windows" tram journey concept
 */
export function Game({ config, onGameOver }: Props) {
  // Use default physics if not provided
  const tramPhysics = config.tramPhysics || DEFAULT_PHYSICS;

  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [windows, setWindows] = useState<boolean[]>([]);
  const [windowPosition, setWindowPosition] = useState<WindowPosition>({
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });
  const [tramPosition, setTramPosition] = useState<TramPosition>(INITIAL_TRAM_POSITION);

  // Track key presses with refs to avoid re-renders
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameId = useRef<number | null>(null);
  const lastTimestamp = useRef<number>(0);

  /** Starts a new journey */
  const startGame = useCallback(() => {
    const firstZone = config.zones[0];
    if (!firstZone) return;

    setGameState({
      ...INITIAL_STATE,
      isActive: true,
      status: 'playing',
      timeRemaining: firstZone.timeLimit,
      currentZone: firstZone
    });

    setTramPosition({
      ...INITIAL_TRAM_POSITION,
      x: 0
    });

    setWindows(Array(10).fill(false));
  }, [config.zones]);

  /** Pauses the current journey */
  const pauseGame = useCallback(() => {
    setGameState((prev: GameState) => ({
      ...prev,
      isActive: false,
      status: 'paused'
    }));

    // Cancel animation frame if paused
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, []);

  /** Resume animation if game was paused */
  const resumeGame = useCallback(() => {
    setGameState((prev: GameState) => ({
      ...prev,
      isActive: true,
      status: 'playing'
    }));

    // Resume animation will be handled by the useEffect below
  }, []);

  /** Handles key events for tram movement */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.status !== 'playing') return;

      if (e.key === KEY_LEFT || e.key === KEY_RIGHT) {
        keysPressed.current.add(e.key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === KEY_LEFT || e.key === KEY_RIGHT) {
        keysPressed.current.delete(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.status]);

  /** Check if tram has moved to a new zone */
  const checkZoneTransition = useCallback((position: number) => {
    // Ensure we have valid zones
    if (!config.zones || !Array.isArray(config.zones)) return;

    const currentZoneIndex = config.zones.findIndex(
      zone => zone && zone.number === gameState.currentZone.number
    );

    if (currentZoneIndex === -1) return;

    // Calculate the total length of all previous zones
    let totalPreviousLength = 0;
    for (let i = 0; i < currentZoneIndex; i++) {
      const zone = config.zones[i];
      if (zone && typeof zone.length === 'number') {
        totalPreviousLength += zone.length;
      }
    }

    // Calculate the end position of the current zone
    const currentZoneEnd = totalPreviousLength + gameState.currentZone.length;

    // Check if we've moved beyond the current zone
    if (position > currentZoneEnd && currentZoneIndex < config.zones.length - 1) {
      // Move to next zone
      const nextZone = config.zones[currentZoneIndex + 1];
      if (nextZone && typeof nextZone.timeLimit === 'number') {
        setGameState(prev => ({
          ...prev,
          currentZone: nextZone,
          timeRemaining: nextZone.timeLimit
        }));
      }
    } else if (position < totalPreviousLength && currentZoneIndex > 0) {
      // Move to previous zone
      const prevZone = config.zones[currentZoneIndex - 1];
      if (prevZone && typeof prevZone.timeLimit === 'number') {
        setGameState(prev => ({
          ...prev,
          currentZone: prevZone,
          timeRemaining: prevZone.timeLimit
        }));
      }
    }
  }, [gameState.currentZone, config.zones]);

  /** Update tram position based on physics */
  const updateTramPosition = useCallback((timestamp: number) => {
    if (gameState.status !== 'playing') return;

    const deltaTime = timestamp - lastTimestamp.current;
    lastTimestamp.current = timestamp;

    // Calculate acceleration based on key presses
    let acceleration = 0;

    if (keysPressed.current.has(KEY_RIGHT)) {
      acceleration = tramPhysics.acceleration;
    } else if (keysPressed.current.has(KEY_LEFT)) {
      acceleration = -tramPhysics.acceleration;
    } else {
      // Apply deceleration if no keys are pressed
      if (tramPosition.velocity > 0) {
        acceleration = -tramPhysics.deceleration;
      } else if (tramPosition.velocity < 0) {
        acceleration = tramPhysics.deceleration;
      }
    }

    // Update velocity based on acceleration
    let newVelocity = tramPosition.velocity + acceleration * (deltaTime / 1000);

    // Apply maximum velocity limit
    if (Math.abs(newVelocity) > tramPhysics.maxVelocity) {
      newVelocity = Math.sign(newVelocity) * tramPhysics.maxVelocity;
    }

    // Stop tram if velocity is very small
    if (Math.abs(newVelocity) < 0.01 && acceleration === 0) {
      newVelocity = 0;
    }

    // Update position based on velocity
    const newX = tramPosition.x + newVelocity * (deltaTime / 1000);

    // Calculate camera offset with lag effect
    const targetCameraOffset = -newX; // Center tram in view
    const newCameraOffset = tramPosition.cameraOffset +
      (targetCameraOffset - tramPosition.cameraOffset) * (1 - tramPhysics.cameraLag) * (deltaTime / 1000);

    // Update tram position state
    setTramPosition({
      x: newX,
      velocity: newVelocity,
      targetX: newX,
      cameraOffset: newCameraOffset
    });

    // Check if we've moved to a new zone
    checkZoneTransition(newX);

    // Continue animation loop
    animationFrameId.current = requestAnimationFrame(updateTramPosition);
  }, [gameState.status, tramPosition, tramPhysics, checkZoneTransition]);

  /** Start animation loop when game becomes active */
  useEffect(() => {
    if (gameState.isActive && gameState.status === 'playing') {
      lastTimestamp.current = performance.now();
      // Need to explicitly assign updateTramPosition to handle possible undefined
      const animationCallback = (timestamp: number) => updateTramPosition(timestamp);
      animationFrameId.current = requestAnimationFrame(animationCallback);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState.isActive, gameState.status, updateTramPosition]);

  /** Handles game timing and updates */
  useEffect(() => {
    if (!gameState.isActive) return;

    const timer = setInterval(() => {
      setGameState((prev: GameState) => {
        const timeRemaining = prev.timeRemaining - 1;

        if (timeRemaining <= 0) {
          // Move to next zone if available
          const nextZoneIndex = config.zones.findIndex(
            (zone: TramZone) => zone.number === prev.currentZone.number
          ) + 1;

          if (nextZoneIndex < config.zones.length) {
            const nextZone = config.zones[nextZoneIndex];
            if (nextZone) {
              return {
                ...prev,
                timeRemaining: nextZone.timeLimit,
                currentZone: nextZone
              };
            }
          }

          // Journey over - no more zones
          if (onGameOver) onGameOver(prev.score);
          return {
            ...prev,
            isActive: false,
            status: 'gameover'
          };
        }

        return {
          ...prev,
          timeRemaining
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isActive, config.zones, onGameOver]);

  /** Updates window states periodically */
  useEffect(() => {
    if (!gameState.isActive) return;

    const interval = setInterval(() => {
      setWindows((prev: boolean[]) => {
        const newWindows = [...prev];
        const randomIndex = Math.floor(Math.random() * newWindows.length);
        newWindows[randomIndex] = !newWindows[randomIndex];
        return newWindows;
      });

      setWindowPosition({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        width: 100,
        height: 100
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.isActive]);

  /** Handles window click for scoring */
  const handleWindowClick = useCallback((index: number) => {
    if (!gameState.isActive || !windows[index]) return;

    setGameState((prev: GameState) => ({
      ...prev,
      score: prev.score + 10 // Simple scoring for now
    }));

    setWindows((prev: boolean[]) => {
      const newWindows = [...prev];
      newWindows[index] = false;
      return newWindows;
    });
  }, [gameState.isActive, windows]);

  // Calculate visual style based on tram position
  const tramStyle = {
    transform: `translateX(${tramPosition.cameraOffset}px)`,
    transition: 'transform 0.05s ease-out'
  };

  return (
    <div className="game">
      <GameControls
        isActive={gameState.isActive}
        status={gameState.status}
        onStart={startGame}
        onPause={pauseGame}
        onResume={resumeGame}
      />

      <GameStats
        score={gameState.score}
        timeRemaining={gameState.timeRemaining}
        level={gameState.currentZone.number}
      />

      <div className="game-scene" style={tramStyle}>
        <div className="tram" style={{ left: `${tramPosition.x}px` }}>
          {/* Tram visualization will go here */}
        </div>

        <div className="game-windows">
          {windows.map((isOpen, index) => (
            <GameWindow
              key={index}
              isOpen={isOpen}
              position={windowPosition}
              onClick={() => handleWindowClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
