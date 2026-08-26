import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { cn } from '@/lib/utils';
import type { MathProps } from '../../types';

function throwKatexError(error: Error): never {
  throw error;
}

/** Block math — invalid TeX raises instead of rendering a silent error. */
export function MathBlock({ children, className }: MathProps): React.JSX.Element {
  return (
    <div className={cn('my-4', className)}>
      <BlockMath math={children} renderError={throwKatexError} />
    </div>
  );
}

/** Inline math — invalid TeX raises instead of rendering a silent error. */
export function MathInline({
  children,
  className,
}: MathProps): React.JSX.Element {
  return (
    <span className={className}>
      <InlineMath math={children} renderError={throwKatexError} />
    </span>
  );
}
