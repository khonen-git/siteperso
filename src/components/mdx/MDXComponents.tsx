'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MathBlock, MathInline } from '@/components/features/knowledge/math/MathBlock';
import { CodeBlock } from '@/components/features/knowledge/math/CodeBlock';
import { MdxCard } from '@/components/mdx/MdxCard';
import { MdxDistributionVisualizer } from '@/components/mdx/MdxDistributionVisualizer';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

// Composants spécifiques aux projets
export function TechnologiesSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}

export function Technology({ 
  name, 
  description 
}: { 
  name: string; 
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="mb-2 font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function ProjectImages({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 grid gap-8">
      {children}
    </div>
  );
}

export function ProjectImage({ 
  url, 
  caption 
}: { 
  url: string; 
  caption: string;
}) {
  return (
    <div className="space-y-2">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={url}
          alt={caption}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {caption}
      </p>
    </div>
  );
}

// Composants de base pour le MDX
const baseComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-8 mb-4 text-2xl font-bold">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mt-6 mb-3 text-xl font-bold">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-4 list-disc pl-5 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-4 list-decimal pl-5 space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mb-4 pl-4 border-l-4 border-primary/50 italic">{children}</blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-primary underline hover:text-primary/80 transition-colors">{children}</a>
  ),
  hr: () => <hr className="my-6 border-gray-300 dark:border-gray-700" />,
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="mb-4 p-4 rounded bg-muted/70 font-mono text-sm overflow-x-auto">{children}</pre>
  ),
  // Composants de table
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 overflow-x-auto">
      <Table>{children}</Table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <TableHeader>{children}</TableHeader>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <TableBody>{children}</TableBody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <TableRow>{children}</TableRow>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <TableHead>{children}</TableHead>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <TableCell>{children}</TableCell>
  ),
};

// Composants spécifiques au MDX
const MDXComponents = {
  ...baseComponents,
  // Composants de projet
  TechnologiesSection,
  Technology,
  ProjectImages,
  ProjectImage,
  // Composants de knowledge
  MathBlock,
  MathInline,
  CodeBlock,
  MdxCard,
  MdxDistributionVisualizer,
  // Composants UI
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};

export default MDXComponents;