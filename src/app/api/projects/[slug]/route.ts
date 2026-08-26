import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getProject, serializeProjectSource } from '@/lib/projects/content';

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
    const projectData = getProject(locale, slug);

    if (!projectData) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    const frontmatter = {
      id: projectData.project.id,
      title: projectData.project.title,
      description: projectData.project.description,
      image: projectData.project.image,
      date: projectData.project.date,
      category: projectData.project.category,
      tags: projectData.project.tags,
      visible: projectData.project.visible,
    };

    const content = await serializeProjectSource(projectData.source, frontmatter);

    return NextResponse.json({
      slug,
      frontmatter,
      content,
    });
  } catch (error) {
    console.error(`Erreur lors du chargement du projet ${slug}:`, error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement du projet' },
      { status: 500 }
    );
  }
}
