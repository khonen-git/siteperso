import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getProjects } from '@/lib/projects/content';

function resolveLocale(searchParams: URLSearchParams): string {
  const requested = searchParams.get('locale');
  return requested && hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
}

export async function GET(request: NextRequest) {
  const locale = resolveLocale(request.nextUrl.searchParams);

  try {
    const projects = getProjects(locale);

    if (projects.length === 0) {
      return NextResponse.json(
        {
          error: 'Aucun projet valide trouvé',
          projects: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(projects);
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la lecture des projets:', err);
    return NextResponse.json(
      {
        error: 'Erreur lors du chargement des projets',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
