import React from 'react';
import Image from 'next/image';
import { MathBlock, MathInline } from '@/components/features/knowledge/math/MathBlock';
import { CodeBlock } from '@/components/features/knowledge/math/CodeBlock';
import { MdxCard } from '@/components/mdx/MdxCard';
import { MdxDistributionVisualizer } from '@/components/mdx/MdxDistributionVisualizer';
import { MdxNormalDistributionVisualizer } from '@/components/mdx/MdxNormalDistributionVisualizer';
import { ConsoleOutput } from '@/components/mdx/ConsoleOutput';
import { CommandSwitch } from '@/components/mdx/CommandSwitch';
import { NotaBene } from '@/components/mdx/NotaBene';
import { InfoTooltip, InfoTooltipProvider } from '@/components/mdx/InfoTooltip';
import { TermTip } from '@/components/mdx/TermTip';
import { OptionPayoffVisualizer } from '@/components/mdx/OptionPayoffVisualizer';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Link } from '@/i18n/navigation';
import {
  CompressionAblationFigure,
  CompressionV1V1bFigure,
} from '@/components/blog/figures/CompressionExpansionFigures';
import { HmmAucOnsetMidFigure, HmmCifFigure } from '@/components/blog/figures/HmmSlopeFigures';
import {
  MultiScaleEvNetFigure,
  MultiScaleGatesFigure,
} from '@/components/blog/figures/MultiScaleFigures';
import { StochAucRawVsAltFigure } from '@/components/blog/figures/StochAucRawVsAltFigure';
import { StochSamplingBiasFigure } from '@/components/blog/figures/StochSamplingBiasFigure';
import {
  Tr8drDeltaHitFigure,
  Tr8drValidOosFigure,
} from '@/components/blog/figures/Tr8drTrendFigures';

function textFromNode(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join('');
  if (React.isValidElement(node)) return textFromNode(node.props.children);
  return '';
}

function headingId(children: React.ReactNode): string {
  const raw = textFromNode(children).trim().toLowerCase();
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function ProjectImages({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid gap-8">{children}</div>;
}

export function ProjectImage({ url, caption }: { url: string; caption: string }) {
  const isSvg = url.toLowerCase().endsWith('.svg');

  return (
    <figure className="not-prose my-6 space-y-2">
      <div
        className={
          isSvg
            ? 'overflow-hidden rounded-lg border border-border/60 bg-background'
            : 'relative aspect-[16/9] w-full overflow-hidden rounded-lg'
        }
      >
        {isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" role="presentation" className="mx-auto block w-full max-w-3xl" />
        ) : (
          <Image src={url} alt={caption} fill className="object-cover" />
        )}
      </div>
      <figcaption className="text-center text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

const baseComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 id={headingId(children)} className="mt-8 mb-4 text-3xl font-bold">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 id={headingId(children)} className="mt-8 mb-4 text-2xl font-bold">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 id={headingId(children)} className="mt-6 mb-3 text-xl font-bold">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-4 list-disc space-y-2 pl-5">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mb-4 border-l-4 border-primary/50 pl-4 italic">{children}</blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-primary underline transition-colors hover:text-primary/80">
      {children}
    </a>
  ),
  hr: () => <hr className="my-6 border-gray-300 dark:border-gray-700" />,
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="mb-4 overflow-x-auto rounded bg-muted/70 p-4 font-mono text-sm">{children}</pre>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 overflow-x-auto">
      <Table>{children}</Table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => <TableHeader>{children}</TableHeader>,
  tbody: ({ children }: { children: React.ReactNode }) => <TableBody>{children}</TableBody>,
  tr: ({ children }: { children: React.ReactNode }) => <TableRow>{children}</TableRow>,
  th: ({ children }: { children: React.ReactNode }) => <TableHead>{children}</TableHead>,
  td: ({ children }: { children: React.ReactNode }) => <TableCell>{children}</TableCell>,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="not-prose my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        role="presentation"
        className="mx-auto block w-full max-w-3xl rounded-lg border border-border/60"
      />
      {alt ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">{alt}</figcaption>
      ) : null}
    </figure>
  ),
};

const MDXComponents = {
  ...baseComponents,
  Link,
  ProjectImages,
  ProjectImage,
  MathBlock,
  MathInline,
  CodeBlock,
  MdxCard,
  MdxDistributionVisualizer,
  MdxNormalDistributionVisualizer,
  ConsoleOutput,
  CommandSwitch,
  NotaBene,
  InfoTooltip,
  InfoTooltipProvider,
  TermTip,
  OptionPayoffVisualizer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StochSamplingBiasFigure,
  StochAucRawVsAltFigure,
  MultiScaleGatesFigure,
  MultiScaleEvNetFigure,
  HmmCifFigure,
  HmmAucOnsetMidFigure,
  Tr8drDeltaHitFigure,
  Tr8drValidOosFigure,
  CompressionV1V1bFigure,
  CompressionAblationFigure,
};

export default MDXComponents;
