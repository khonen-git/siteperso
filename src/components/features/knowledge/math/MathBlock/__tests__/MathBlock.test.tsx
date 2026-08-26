import React from 'react';
import { render } from '@testing-library/react';
import { MathBlock, MathInline } from '..';

describe('MathBlock / MathInline', () => {
  it('renders valid block math', () => {
    const { container } = render(<MathBlock>{'x^2'}</MathBlock>);
    expect(container.querySelector('.katex')).toBeTruthy();
  });

  it('renders valid inline math', () => {
    const { container } = render(<MathInline>{'a+b'}</MathInline>);
    expect(container.querySelector('.katex')).toBeTruthy();
  });

  it('throws on invalid KaTeX expressions', () => {
    expect(() => render(<MathBlock>{'\\invalid{'}</MathBlock>)).toThrow();
    expect(() => render(<MathInline>{'\\invalid{'}</MathInline>)).toThrow();
  });
});
