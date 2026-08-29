jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localePrefix: 'always',
  },
}));

import { getProject, getProjects, listProjectFileNames } from './content';
import { isValidProjectFrontmatter } from './validation';
import { routing } from '@/i18n/routing';

describe('isValidProjectFrontmatter', () => {
  it('accepts complete frontmatter', () => {
    expect(
      isValidProjectFrontmatter({
        id: 1,
        title: 'Test',
        description: 'Desc',
        image: '/img.png',
        date: '2024-01',
        category: 'Data',
        tags: ['Python'],
      })
    ).toBe(true);
  });

  it('rejects incomplete frontmatter', () => {
    expect(isValidProjectFrontmatter({ title: 'Only title' })).toBe(false);
    expect(isValidProjectFrontmatter(null)).toBe(false);
  });
});

describe('getProjects', () => {
  it('returns visible projects sorted with link and slug', () => {
    const projects = getProjects('fr');

    expect(projects.length).toBeGreaterThan(0);
    expect(projects.every((p) => p.visible !== false)).toBe(true);
    expect(projects[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        slug: expect.any(String),
        link: expect.stringMatching(/^\/projects\//),
      })
    );

    for (let i = 1; i < projects.length; i += 1) {
      const prev = projects[i - 1];
      const curr = projects[i];
      if (prev.importance !== curr.importance) {
        expect(prev.importance).toBeGreaterThanOrEqual(curr.importance);
      } else {
        expect(new Date(prev.date).getTime()).toBeGreaterThanOrEqual(new Date(curr.date).getTime());
      }
    }
  });
});

describe('getProject', () => {
  it('loads an existing project with MDX source', () => {
    const project = getProject('fr', 'oc1-project');

    expect(project).not.toBeNull();
    expect(project?.project.slug).toBe('oc1-project');
    expect(project?.project.title).toBeTruthy();
    expect(project?.source.length).toBeGreaterThan(0);
  });

  it('returns null for a missing slug', () => {
    expect(getProject('fr', 'does-not-exist-project')).toBeNull();
  });

  it('loads website-creation with importance and references', () => {
    const project = getProject('fr', 'website-creation');
    expect(project?.project.importance).toBe(5);
    expect(project?.project.relatedReferences).toEqual(
      expect.arrayContaining(['nextjs', 'react', 'typescript'])
    );
  });

  it('parses oc4-project after YAML fix', () => {
    const project = getProject('fr', 'oc4-project');
    expect(project).not.toBeNull();
    expect(project?.project.tags).toContain('Python');
  });
});

describe('listProjectFileNames / generateStaticParams shape', () => {
  it('lists MDX files for fr', () => {
    const files = listProjectFileNames('fr');
    expect(files.some((f) => f === 'oc1-project.mdx')).toBe(true);
  });

  it('matches expected generateStaticParams coverage', () => {
    const params = routing.locales.flatMap((locale) =>
      listProjectFileNames(locale).map((fileName) => ({
        locale,
        slug: fileName.replace(/\.mdx$/, ''),
      }))
    );
    const frSlugs = listProjectFileNames('fr').map((f) => f.replace(/\.mdx$/, ''));

    expect(params.length).toBeGreaterThan(0);
    for (const slug of frSlugs) {
      expect(params).toEqual(
        expect.arrayContaining([expect.objectContaining({ locale: 'fr', slug })])
      );
    }
  });
});
