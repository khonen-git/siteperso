import { render, screen } from '@testing-library/react';
import { ProjectCard } from '..';

const mockProject = {
  title: 'Test Project',
  description: 'A test project description',
  image: '/test-image.jpg',
  link: '/projects/test-project',
  category: 'Test Category',
  tags: ['React', 'TypeScript'],
  date: '2024-01-01',
  status: 'completed' as const
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByText(mockProject.category)).toBeInTheDocument();
    
    // Vérifie que les tags sont rendus
    mockProject.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('links to the correct project page', () => {
    render(<ProjectCard project={mockProject} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProject.link);
  });

  it('renders project image with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('alt', mockProject.title);
  });
});