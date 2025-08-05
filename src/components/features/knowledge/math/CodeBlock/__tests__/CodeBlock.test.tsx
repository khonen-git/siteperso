import React from 'react';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from '..';

describe('CodeBlock', () => {
  it('renders code with syntax highlighting', () => {
    const code = 'const x = 42;';
    render(<CodeBlock>{code}</CodeBlock>);
    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it('shows auto-run indicator when enabled', () => {
    render(<CodeBlock autoRun>{`console.log('test');`}</CodeBlock>);
    expect(screen.getByText('Auto-run enabled')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    const { container } = render(
      <CodeBlock className={className}>{`test`}</CodeBlock>
    );
    expect(container.firstChild).toHaveClass(className);
  });
});