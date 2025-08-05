import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '..';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Button>Test</Button>);
    expect(getByRole('button')).toHaveTextContent('Test');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies variant classes correctly', () => {
    const { getByRole } = render(<Button variant="destructive">Delete</Button>);
    expect(getByRole('button')).toHaveClass('bg-destructive');
  });

  it('applies size classes correctly', () => {
    const { getByRole } = render(<Button size="sm">Small</Button>);
    expect(getByRole('button')).toHaveClass('h-8');
  });

  it('is disabled when specified', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect(getByRole('button')).toBeDisabled();
  });
});