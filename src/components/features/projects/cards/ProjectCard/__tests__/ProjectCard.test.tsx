import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '..';
import type { Project } from '@/types/project';

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  description: 'A test project description',
  image: '/test-image.jpg',
  link: '/projects/test-project',
  slug: 'test-project',
  category: 'Data',
  tags: ['React', 'TypeScript'],
  date: '2024-01-01',
  visible: true,
  importance: 3,
  relatedReferences: [],
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByText(mockProject.category)).toBeInTheDocument();
  });

  it('links to the correct project page via slug', () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/projects/${mockProject.slug}`);
  });

  it('renders project image with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('alt', mockProject.title);
  });
});
