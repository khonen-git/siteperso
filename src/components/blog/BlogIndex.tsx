import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/types/blog';

interface BlogIndexProps {
  posts: BlogPost[];
}

export async function BlogIndex({ posts }: BlogIndexProps): Promise<React.JSX.Element> {
  const t = await getTranslations('blog');

  return (
    <div className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t('header.title')}
          </h1>
          <p className="text-muted-foreground">{t('header.description')}</p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">{t('empty')}</p>
        ) : (
          <ul className="mx-auto mt-16 max-w-3xl space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="rounded-lg border border-border/60 p-6 transition-colors hover:border-border hover:bg-muted/30">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{post.date}</time>
                    <span aria-hidden>·</span>
                    <span>{t(`kinds.${post.kind}`)}</span>
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-foreground/80">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-muted-foreground">{post.description}</p>
                  {post.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
