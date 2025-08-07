import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectContent } from '..';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

const mockContent: MDXRemoteSerializeResult = {
  compiledSource: '',
  scope: {},
  frontmatter: {}
};

const mockMeta = {
  title: 'Test Project',
  description: 'A test project description',
  image: '/test-image.jpg',
  link: '/projects/test-project',
  category: 'Test Category',
  tags: ['React', 'TypeScript'],
  date: '2024-01-01',
  status: 'completed' as const
};

jest.mock('next-mdx-remote', () => ({
  MDXRemote: () => <div data-testid="mdx-content">MDX Content</div>
}));

jest.mock('next/link', () => {
  return ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>;
  };
});

describe('ProjectContent', () => {
  it('renders MDX content', () => {
    render(<ProjectContent content={mockContent} meta={mockMeta} />);
    
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument();
  });

  it('renders back button with correct link', () => {
    render(<ProjectContent content={mockContent} meta={mockMeta} />);
    
    const backButton = screen.getByRole('link', { name: /retour aux projets/i });
    expect(backButton).toHaveAttribute('href', '/projects');
  });

  it('applies correct layout classes', () => {
    const { container } = render(
      <ProjectContent content={mockContent} meta={mockMeta} />
    );
    
    expect(container.firstChild).toHaveClass('container', 'py-16');
  });
});