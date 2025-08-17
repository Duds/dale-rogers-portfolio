import type { WindowPosition } from "../types/index.js";

/**
 * Component representing a game window that can be clicked
 * @component GameWindow
 */
interface Props {
  /** Whether the window is currently open/active */
  isOpen: boolean;
  /** Position and size of the window */
  position: WindowPosition;
  /** Click handler */
  onClick: () => void;
}

export function GameWindow({ isOpen, position, onClick }: Props) {
  if (!isOpen) return null;

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${position.width}px`,
    height: `${position.height}px`,
    position: "absolute" as const,
  };

  return (
    <div
      className={`game-window ${isOpen ? "open" : "closed"}`}
      style={style}
      onClick={onClick}
    >
      <div className="window-content">
        <div className="window-titlebar">
          <div className="window-title">Window</div>
          <div className="window-controls">
            <span className="window-control close" />
          </div>
        </div>
      </div>
    </div>
  );
}
