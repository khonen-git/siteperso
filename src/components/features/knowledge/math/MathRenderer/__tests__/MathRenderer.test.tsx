import React from 'react';
import { render } from '@testing-library/react';
import { MathBlock, MathInline } from '..';

describe('MathRenderer', () => {
  describe('MathBlock', () => {
    it('renders block math formula', () => {
      const formula = 'E = mc^2';
      const { container } = render(<MathBlock>{formula}</MathBlock>);
      expect(container.querySelector('.katex')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const className = 'custom-class';
      const { container } = render(
        <MathBlock className={className}>{'E = mc^2'}</MathBlock>
      );
      expect(container.firstChild).toHaveClass(className);
    });
  });

  describe('MathInline', () => {
    it('renders inline math formula', () => {
      const formula = 'x^2';
      const { container } = render(<MathInline>{formula}</MathInline>);
      expect(container.querySelector('.katex')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const className = 'custom-class';
      const { container } = render(
        <MathInline className={className}>{'x^2'}</MathInline>
      );
      expect(container.firstChild).toHaveClass(className);
    });
  });
});