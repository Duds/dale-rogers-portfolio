import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Game } from "../components/Game.js";
import type { GameConfig, GameState } from "../types/index.js";

// Mock game config
const mockConfig: GameConfig = {
  initialState: {
    isActive: false,
    score: 0,
    timeRemaining: 60,
    currentZone: {
      number: 1,
      name: "Tram Depot",
      length: 600,
      timeLimit: 60,
      initialWindows: [],
    },
    status: "idle" as GameState["status"],
  },
  zones: [
    {
      number: 1,
      name: "Tram Depot",
      length: 600,
      timeLimit: 60,
      initialWindows: [],
    },
  ],
  tramPhysics: {
    maxVelocity: 5,
    acceleration: 0.5,
    deceleration: 0.3,
    cameraLag: 0.95,
  },
};

// Mock window.requestAnimationFrame
vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
  cb(0);
  return 0;
});

describe("Game Component", () => {
  it("renders without crashing", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole("game")).toBeInTheDocument();
  });

  it("displays game window", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole("game-window")).toBeInTheDocument();
  });

  it("shows game controls", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole("game-controls")).toBeInTheDocument();
  });

  it("displays game stats", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole("game-stats")).toBeInTheDocument();
  });

  it("shows current zone name", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByText("Tram Depot")).toBeInTheDocument();
  });

  it("displays initial score", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
  });

  it("starts in idle state", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByText("Status: idle")).toBeInTheDocument();
  });

  it("shows time remaining", () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByText("Time: 60s")).toBeInTheDocument();
  });

  it("responds to start button click", () => {
    render(<Game config={mockConfig} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    expect(screen.getByText("Status: active")).toBeInTheDocument();
  });

  it("responds to stop button click", () => {
    render(<Game config={mockConfig} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    const stopButton = screen.getByRole("button", { name: /stop/i });
    fireEvent.click(startButton);
    fireEvent.click(stopButton);
    expect(screen.getByText("Status: idle")).toBeInTheDocument();
  });

  it("responds to reset button click", () => {
    render(<Game config={mockConfig} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(startButton);
    fireEvent.click(resetButton);
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    expect(screen.getByText("Time: 60s")).toBeInTheDocument();
    expect(screen.getByText("Status: idle")).toBeInTheDocument();
  });
});
