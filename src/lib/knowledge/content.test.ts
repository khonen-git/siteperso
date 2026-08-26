jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localePrefix: 'always',
  },
}));

import { listKnowledgeSlugs, resolveKnowledgeFilePath } from './content';
import { routing } from '@/i18n/routing';

describe('resolveKnowledgeFilePath', () => {
  it('resolves a known index.mdx', () => {
    const filePath = resolveKnowledgeFilePath('fr', ['quantitative-finance']);
    expect(filePath).toBeTruthy();
    expect(filePath?.replace(/\\/g, '/')).toMatch(
      /knowledge\/quantitative-finance\/index\.mdx$/
    );
  });

  it('resolves a nested slug', () => {
    const filePath = resolveKnowledgeFilePath('fr', [
      'probability',
      'stochastic-processes',
    ]);
    expect(filePath).toBeTruthy();
  });

  it('returns null for a missing slug', () => {
    expect(
      resolveKnowledgeFilePath('fr', ['does-not-exist', 'article'])
    ).toBeNull();
  });
});

describe('listKnowledgeSlugs', () => {
  it('returns a non-empty list for fr', () => {
    const slugs = listKnowledgeSlugs('fr');
    expect(slugs.length).toBeGreaterThan(0);
  });

  it('maps index.mdx to the parent path', () => {
    const slugs = listKnowledgeSlugs('fr');
    expect(slugs).toEqual(
      expect.arrayContaining([
        ['quantitative-finance'],
        ['probability', 'stochastic-processes'],
      ])
    );
  });
});

describe('generateStaticParams shape (knowledge)', () => {
  it('covers at least a sample of fr slugs', () => {
    const params = routing.locales.flatMap((locale) =>
      listKnowledgeSlugs(locale).map((slug) => ({
        locale,
        slug,
      }))
    );
    const frSlugs = listKnowledgeSlugs('fr');

    expect(params.length).toBeGreaterThan(0);

    for (const slug of frSlugs.slice(0, 20)) {
      expect(params).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ locale: 'fr', slug }),
        ])
      );
    }
  });
});
