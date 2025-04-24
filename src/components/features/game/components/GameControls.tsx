/**
 * Game controls component for managing game state
 * @component GameControls
 */
interface Props {
  /** Whether the game is currently active */
  isActive: boolean;
  /** Current game status */
  status: "idle" | "playing" | "paused" | "gameover";
  /** Handler for starting the game */
  onStart: () => void;
  /** Handler for pausing the game */
  onPause: () => void;
  /** Handler for resuming the game */
  onResume: () => void;
}

export function GameControls({ isActive, status, onStart, onPause, onResume }: Props) {
  return (
    <div className="game-controls">
      {status === 'idle' && (
        <button onClick={onStart} className="start-button">
          Start Game
        </button>
      )}

      {status === 'playing' && (
        <button onClick={onPause} className="pause-button">
          Pause
        </button>
      )}

      {status === 'paused' && (
        <button onClick={onResume} className="resume-button">
          Resume
        </button>
      )}

      {status === 'gameover' && (
        <button onClick={onStart} className="restart-button">
          Play Again
        </button>
      )}
    </div>
  );
}
