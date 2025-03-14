'use client';

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { cn } from '@/lib/utils';

interface MathProps {
  children: string;
  className?: string;
}

export function MathBlock({ children }: MathProps) {
  return <BlockMath math={children} />;
}

export function MathInline({ children, className }: MathProps) {
  return (
    <span className={cn('math-inline', className)}>
      <InlineMath math={children} />
    </span>
  );
}

