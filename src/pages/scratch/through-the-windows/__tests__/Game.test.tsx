import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from '../components/Game';

describe('Game Component', () => {
  it('renders without crashing', () => {
    render(<Game />);
    expect(screen.getByRole('game')).toBeInTheDocument();
  });

  it('displays game window', () => {
    render(<Game />);
    expect(screen.getByRole('game-window')).toBeInTheDocument();
  });

  it('shows game controls', () => {
    render(<Game />);
    expect(screen.getByRole('game-controls')).toBeInTheDocument();
  });

  it('displays game stats', () => {
    render(<Game />);
    expect(screen.getByRole('game-stats')).toBeInTheDocument();
  });
});
