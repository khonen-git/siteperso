import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '..';

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

describe('ProjectCard', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'Test Description',
    image: '/test.jpg',
    date: '2024-01-01',
    tags: ['React', 'TypeScript'],
    category: 'Web'
  };

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProject.title)).toHaveAttribute('src', mockProject.image);
  });

  it('renders project tags', () => {
    render(<ProjectCard project={mockProject} />);
    
    mockProject.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('formats date correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    const formattedDate = new Date(mockProject.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('links to project detail page', () => {
    render(<ProjectCard project={mockProject} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/projects/${mockProject.id}`);
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    const { container } = render(
      <ProjectCard project={mockProject} className={className} />
    );
    
    expect(container.firstChild).toHaveClass(className);
  });
});