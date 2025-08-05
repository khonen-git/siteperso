import React from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className }: TextProps) => (
  <h1 className={cn("mt-8 mb-4 text-3xl font-bold", className)}>{children}</h1>
);

export const Heading2 = ({ children, className }: TextProps) => (
  <h2 className={cn("mt-8 mb-4 text-2xl font-bold", className)}>{children}</h2>
);

export const Heading3 = ({ children, className }: TextProps) => (
  <h3 className={cn("mt-6 mb-3 text-xl font-bold", className)}>{children}</h3>
);

export const Paragraph = ({ children, className }: TextProps) => (
  <p className={cn("mb-4 leading-relaxed", className)}>{children}</p>
);

export const InlineCode = ({ children, className }: TextProps) => (
  <code className={cn("px-1.5 py-0.5 rounded bg-muted font-mono text-sm", className)}>
    {children}
  </code>
);

export const CodeBlock = ({ children, className }: TextProps) => (
  <pre className={cn("mb-4 p-4 rounded bg-muted/70 font-mono text-sm overflow-x-auto", className)}>
    {children}
  </pre>
);

export const Blockquote = ({ children, className }: TextProps) => (
  <blockquote className={cn("mb-4 pl-4 border-l-4 border-primary/50 italic", className)}>
    {children}
  </blockquote>
);