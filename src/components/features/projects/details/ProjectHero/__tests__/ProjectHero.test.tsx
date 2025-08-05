import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectHero } from '..';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

describe('ProjectHero', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'Test Description',
    image: '/test.jpg',
    date: '2024-01-01',
    tags: ['React', 'TypeScript'],
    category: 'Web',
    content: {
      summary: '',
      objectives: [],
      approach: '',
      technologies: [],
      results: '',
      images: [],
      conclusion: ''
    }
  };

  it('renders project header information', () => {
    render(<ProjectHero project={mockProject} />);
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProject.title)).toHaveAttribute('src', mockProject.image);
  });

  it('renders project metadata', () => {
    render(<ProjectHero project={mockProject} />);
    
    const formattedDate = new Date(mockProject.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(screen.getByText(mockProject.category)).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(<ProjectHero project={mockProject} />);
    
    mockProject.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('applies priority to hero image', () => {
    render(<ProjectHero project={mockProject} />);
    
    const image = screen.getByAltText(mockProject.title);
    expect(image).toHaveAttribute('priority', 'true');
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    const { container } = render(
      <ProjectHero project={mockProject} className={className} />
    );
    
    expect(container.firstChild).toHaveClass(className);
  });
});