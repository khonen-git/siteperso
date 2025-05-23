'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

// Composant pour une section de technologies
export function TechnologiesSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}

// Composant pour une technologie individuelle
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

// Composant pour une section d'images
export function ProjectImages({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 grid gap-8">
      {children}
    </div>
  );
}

// Composant pour une image individuelle
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

// Mapping des composants pour MDX
const MDXComponents = {
  TechnologiesSection,
  Technology,
  ProjectImages,
  ProjectImage,
  // Styler les éléments HTML standards
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
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-muted/50">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-gray-200 dark:border-gray-800">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="p-2 text-left font-bold">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="p-2">{children}</td>
  ),
};

export default MDXComponents; 