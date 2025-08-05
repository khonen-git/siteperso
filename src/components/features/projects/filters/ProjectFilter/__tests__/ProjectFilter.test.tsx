import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ProjectFilter } from '..';

describe('ProjectFilter', () => {
  const mockProps = {
    onSearch: jest.fn(),
    onCategoryChange: jest.fn(),
    onTagSelect: jest.fn(),
    onSortChange: jest.fn(),
    selectedCategory: 'all',
    selectedTags: [],
    sortBy: 'date' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter components', () => {
    render(<ProjectFilter {...mockProps} />);
    
    expect(screen.getByPlaceholderText('Rechercher un projet...')).toBeInTheDocument();
    expect(screen.getByText('Catégorie')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('Trier par')).toBeInTheDocument();
  });

  it('calls onSearch when typing in search input', () => {
    render(<ProjectFilter {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Rechercher un projet...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(mockProps.onSearch).toHaveBeenCalledWith('test');
  });

  it('calls onCategoryChange when selecting category', () => {
    render(<ProjectFilter {...mockProps} />);
    
    const categorySelect = screen.getByText('Catégorie');
    fireEvent.click(categorySelect);
    
    const option = screen.getByText('Toutes les catégories');
    fireEvent.click(option);
    
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('all');
  });

  it('calls onSortChange when changing sort', () => {
    render(<ProjectFilter {...mockProps} />);
    
    const sortSelect = screen.getByText('Trier par');
    fireEvent.click(sortSelect);
    
    const option = screen.getByText('Titre');
    fireEvent.click(option);
    
    expect(mockProps.onSortChange).toHaveBeenCalledWith('title');
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    const { container } = render(
      <ProjectFilter {...mockProps} className={className} />
    );
    
    expect(container.firstChild).toHaveClass(className);
  });
});