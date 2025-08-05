import React from 'react';
import { render } from '@testing-library/react';
import { ProjectContent } from '..';

describe('ProjectContent', () => {
  const mockContent = (
    <div>
      <h1>Test Content</h1>
      <p>Test paragraph</p>
      <code>Test code</code>
    </div>
  );

  it('renders content correctly', () => {
    const { container } = render(<ProjectContent content={mockContent} />);
    
    expect(container.querySelector('h1')).toHaveTextContent('Test Content');
    expect(container.querySelector('p')).toHaveTextContent('Test paragraph');
    expect(container.querySelector('code')).toHaveTextContent('Test code');
  });

  it('applies prose styles', () => {
    const { container } = render(<ProjectContent content={mockContent} />);
    
    expect(container.firstChild).toHaveClass('prose', 'prose-slate');
  });

  it('applies dark mode styles', () => {
    const { container } = render(<ProjectContent content={mockContent} />);
    
    expect(container.firstChild).toHaveClass('dark:prose-invert');
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    const { container } = render(
      <ProjectContent content={mockContent} className={className} />
    );
    
    expect(container.firstChild).toHaveClass(className);
  });

  it('wraps content in article tag', () => {
    const { container } = render(<ProjectContent content={mockContent} />);
    
    expect(container.firstChild?.nodeName).toBe('ARTICLE');
  });
});