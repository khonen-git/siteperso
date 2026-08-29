'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/types/blog';

interface BlogPostLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export function BlogPostLayout({ post, children }: BlogPostLayoutProps): React.JSX.Element {
  const t = useTranslations('blog');

  return (
    <div className="min-h-screen bg-background">
      <section className="container py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            {t(`kinds.${post.kind}`)}
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mb-10 text-lg text-muted-foreground">{post.description}</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">{children}</div>

          <div className="mt-16 text-center">
            <Button asChild variant="outline">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('detail.backToList')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
