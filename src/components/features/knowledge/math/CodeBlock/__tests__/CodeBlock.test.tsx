import React from 'react';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from '..';

jest.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light' }),
}));

jest.mock('@/lib/code-syntax-theme', () => ({
  codeBlockCustomStyle: { fontFamily: 'monospace', fontSize: '14px' },
  getPrismSyntaxStyle: () => ({}),
}));

jest.mock('next/dynamic', () => () => {
  return function MockHighlighter({ children, language }: { children: string; language: string }) {
    return (
      <pre data-testid="syntax" data-language={language}>
        {children}
      </pre>
    );
  };
});

describe('CodeBlock', () => {
  it('renders code content', () => {
    const code = 'const x = 42;';
    render(<CodeBlock language="typescript">{code}</CodeBlock>);
    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it('passes language to highlighter', () => {
    render(<CodeBlock language="python">{'print(1)'}</CodeBlock>);
    expect(screen.getByTestId('syntax')).toHaveAttribute('data-language', 'python');
  });

  it('applies custom className on wrapper', () => {
    const { container } = render(<CodeBlock className="custom-class">{`test`}</CodeBlock>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
