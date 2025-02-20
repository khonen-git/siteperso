import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle Mock', () => {
  it('renders correctly', () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Theme Toggle');
  });
});

export const ThemeToggle = () => (
  <button data-testid="theme-toggle">Theme Toggle</button>
); 