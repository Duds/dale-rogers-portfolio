/**
 * Component to display game statistics
 * @component GameStats
 */
interface Props {
  /** Current game score */
  score: number;
  /** Time remaining in seconds */
  timeRemaining: number;
  /** Current level number */
  level: number;
}

export function GameStats({ score, timeRemaining, level }: Props) {
  return (
    <div className="game-stats">
      <div className="stat">
        <span className="stat-label">Score:</span>
        <span className="stat-value">{score}</span>
      </div>

      <div className="stat">
        <span className="stat-label">Time:</span>
        <span className="stat-value">{timeRemaining}</span>
      </div>

      <div className="stat">
        <span className="stat-label">Level:</span>
        <span className="stat-value">{level}</span>
      </div>
    </div>
  );
}
