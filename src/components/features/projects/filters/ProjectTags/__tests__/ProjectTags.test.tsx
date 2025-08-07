import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectTags } from '..';

const mockTags = ['React', 'TypeScript', 'Next.js'];
const mockOnClick = jest.fn();

describe('ProjectTags', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders all tags', () => {
    render(<ProjectTags tags={mockTags} />);
    
    mockTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('applies correct color classes to tags', () => {
    render(<ProjectTags tags={mockTags} />);
    
    const reactTag = screen.getByText('React').closest('.badge');
    const typescriptTag = screen.getByText('TypeScript').closest('.badge');
    const nextjsTag = screen.getByText('Next.js').closest('.badge');

    expect(reactTag).toHaveClass('bg-cyan-500/10');
    expect(typescriptTag).toHaveClass('bg-purple-500/10');
    expect(nextjsTag).toHaveClass('bg-black/10');
  });

  it('shows remove button when removable is true', () => {
    render(<ProjectTags tags={mockTags} removable onClick={mockOnClick} />);
    
    const removeButtons = screen.getAllByRole('button');
    expect(removeButtons).toHaveLength(mockTags.length);
  });

  it('calls onClick when remove button is clicked', () => {
    render(<ProjectTags tags={mockTags} removable onClick={mockOnClick} />);
    
    const removeButtons = screen.getAllByRole('button');
    fireEvent.click(removeButtons[0]);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockTags[0]);
  });

  it('does not show remove button when removable is false', () => {
    render(<ProjectTags tags={mockTags} />);
    
    const removeButtons = screen.queryAllByRole('button');
    expect(removeButtons).toHaveLength(0);
  });
});