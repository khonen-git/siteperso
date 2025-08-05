import React from 'react';
import { renderWithProviders, mockNextImage, mockNextLink } from '@/components/common/test-utils';
import { ProjectCard } from '..';

// Setup mocks
mockNextImage();
mockNextLink();

const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'Test Description',
  image: '/test.jpg',
  date: '2024-01-01',
  tags: ['React', 'TypeScript'],
  category: 'Web'
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const { getByText, getByAltText } = renderWithProviders(
      <ProjectCard project={mockProject} />
    );

    expect(getByText(mockProject.title)).toBeInTheDocument();
    expect(getByText(mockProject.description)).toBeInTheDocument();
    expect(getByAltText(mockProject.title)).toHaveAttribute('src', mockProject.image);
  });

  it('renders tags correctly', () => {
    const { getByText } = renderWithProviders(
      <ProjectCard project={mockProject} />
    );

    mockProject.tags.forEach(tag => {
      expect(getByText(tag)).toBeInTheDocument();
    });
  });

  it('formats date correctly', () => {
    const { getByText } = renderWithProviders(
      <ProjectCard project={mockProject} />
    );

    const formattedDate = new Date(mockProject.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
    expect(getByText(formattedDate)).toBeInTheDocument();
  });

  it('links to project detail page', () => {
    const { container } = renderWithProviders(
      <ProjectCard project={mockProject} />
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', `/projects/${mockProject.id}`);
  });

  it('applies hover animation class', () => {
    const { container } = renderWithProviders(
      <ProjectCard project={mockProject} />
    );

    expect(container.firstChild).toHaveClass('hover:scale-[1.02]');
  });
});