import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ProjectTags } from '..';

describe('ProjectTags', () => {
  const mockTags = ['React', 'TypeScript', 'Next.js'];
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tags', () => {
    render(<ProjectTags tags={mockTags} />);
    
    mockTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('calls onClick when tag is clicked', () => {
    render(<ProjectTags tags={mockTags} onClick={mockOnClick} />);
    
    const tag = screen.getByText(mockTags[0]);
    fireEvent.click(tag);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockTags[0]);
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

  it('applies theme colors to tags', () => {
    render(<ProjectTags tags={mockTags} />);
    
    const tags = screen.getAllByRole('button');
    tags.forEach(tag => {
      expect(tag).toHaveClass('bg-secondary');
    });
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    const { container } = render(
      <ProjectTags tags={mockTags} className={className} />
    );
    
    expect(container.firstChild).toHaveClass(className);
  });
});