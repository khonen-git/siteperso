import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { cn } from '@/lib/utils';
import type { MathProps } from '../../types';

function throwKatexError(error: Error): never {
  throw error;
}

/** MDX may pass text nodes instead of string literals — KaTeX requires a string. */
function mathStringFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(mathStringFromChildren).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return mathStringFromChildren(children.props.children);
  }
  return '';
}

/** Block math — invalid TeX raises instead of rendering a silent error. */
export function MathBlock({ children, className }: MathProps): React.JSX.Element {
  const math = mathStringFromChildren(children);
  return (
    <div className={cn('my-4', className)}>
      <BlockMath math={math} renderError={throwKatexError} />
    </div>
  );
}

/** Inline math — invalid TeX raises instead of rendering a silent error. */
export function MathInline({
  children,
  className,
}: MathProps): React.JSX.Element {
  const math = mathStringFromChildren(children);
  return (
    <span className={className}>
      <InlineMath math={math} renderError={throwKatexError} />
    </span>
  );
}
