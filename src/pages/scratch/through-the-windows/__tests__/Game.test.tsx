import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Game } from '../components/Game';

// Mock game config
const mockConfig = {
  initialState: {
    isActive: false,
    score: 0,
    timeRemaining: 60,
    currentZone: {
      number: 1,
      name: "Tram Depot",
      length: 600,
      timeLimit: 60,
      initialWindows: []
    },
    status: "idle"
  },
  zones: [
    {
      number: 1,
      name: "Tram Depot",
      length: 600,
      timeLimit: 60,
      initialWindows: []
    }
  ],
  tramPhysics: {
    maxVelocity: 5,
    acceleration: 0.5,
    deceleration: 0.3,
    cameraLag: 0.95
  }
};

describe('Game Component', () => {
  it('renders without crashing', () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole('game')).toBeInTheDocument();
  });

  it('displays game window', () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole('game-window')).toBeInTheDocument();
  });

  it('shows game controls', () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole('game-controls')).toBeInTheDocument();
  });

  it('displays game stats', () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByRole('game-stats')).toBeInTheDocument();
  });

  it('shows current zone name', () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByText('Tram Depot')).toBeInTheDocument();
  });

  it('displays initial score', () => {
    render(<Game config={mockConfig} />);
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });
});
