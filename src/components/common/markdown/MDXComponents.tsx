import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdxCard } from './components/MdxCard';
import { MdxCode } from './components/MdxCode';
import { MdxHeading } from './components/MdxHeading';
import { DistributionVisualizer } from '@/components/features/knowledge/visualization/DistributionVisualizer';
import { MathBlock, MathInline } from '@/components/features/knowledge/math/MathBlock';
import { cn } from '@/lib/utils';

/**
 * MDXComponents - Mapping des composants pour le rendu MDX
 * Fournit des composants enrichis pour le contenu markdown
 */
const MDXComponents = {
  // Composants personnalisés
  MdxCard,
  MathBlock,
  MathInline,
  DistributionVisualizer,

  // Composants de base enrichis
  h1: (props: any) => <MdxHeading level={1} {...props} />,
  h2: (props: any) => <MdxHeading level={2} {...props} />,
  h3: (props: any) => <MdxHeading level={3} {...props} />,
  h4: (props: any) => <MdxHeading level={4} {...props} />,
  h5: (props: any) => <MdxHeading level={5} {...props} />,
  h6: (props: any) => <MdxHeading level={6} {...props} />,

  // Éléments de texte
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  
  a: ({ href = "", ...props }) => {
    const isExternal = href.startsWith('http');
    const Component = isExternal ? 'a' : Link;
    return (
      <Component
        href={href}
        className="font-medium underline underline-offset-4 hover:text-primary"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },

  // Listes
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),

  // Code
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),

  // Bloc de code
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <MdxCode className={className} {...props} />
  ),

  // Images
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // Remplacer par Image de Next.js si nécessaire
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),

  // Tableaux
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t p-0 even:bg-muted", className)} {...props} />
  ),
  
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
};

export default MDXComponents;