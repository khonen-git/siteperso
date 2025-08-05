import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathProps {
  children: string;
}

export function MathBlock({ children }: MathProps) {
  return <BlockMath math={children} />;
}

export function MathInline({ children }: MathProps) {
  return <InlineMath math={children} />;
}