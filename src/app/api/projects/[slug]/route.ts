import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { resolveProjectFilePath } from '@/lib/projects/content';

function resolveLocale(searchParams: URLSearchParams): string {
  const requested = searchParams.get('locale');
  return requested && hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const locale = resolveLocale(request.nextUrl.searchParams);

  try {
    const fullPath = resolveProjectFilePath(locale, slug);

    if (!fullPath) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
      scope: data,
    });

    return NextResponse.json({
      slug,
      frontmatter: data,
      content: mdxSource,
    });
  } catch (error) {
    console.error(`Erreur lors du chargement du projet ${slug}:`, error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement du projet' },
      { status: 500 }
    );
  }
}
