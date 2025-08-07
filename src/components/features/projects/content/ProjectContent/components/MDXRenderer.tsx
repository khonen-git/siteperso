import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXComponents from '@/components/mdx/MDXComponents';

interface MDXRendererProps {
  content: MDXRemoteSerializeResult;
  className?: string;
}

export function MDXRenderer({ content, className }: MDXRendererProps) {
  return (
    <div className={className}>
      <MDXRemote {...content} components={MDXComponents} />
    </div>
  );
}