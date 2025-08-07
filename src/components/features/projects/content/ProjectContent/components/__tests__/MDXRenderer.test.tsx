import { render, screen } from '@testing-library/react';
import { MDXRenderer } from '../MDXRenderer';

const mockContent = {
  compiledSource: '',
  scope: {}
};

jest.mock('next-mdx-remote', () => ({
  MDXRemote: () => <div data-testid="mdx-content">MDX Content</div>
}));

describe('MDXRenderer', () => {
  it('renders MDX content', () => {
    render(<MDXRenderer content={mockContent} />);
    
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <MDXRenderer content={mockContent} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
  });
});