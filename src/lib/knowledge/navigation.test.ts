import {
  filterNavigationTree,
  hrefToKnowledgeSlug,
  clearFilteredNavigationCache,
} from './navigation';
import { isKnowledgeDraft } from './meta';

jest.mock('@/config/knowledge', () => ({
  getNavigationData: jest.fn(),
}));

jest.mock('./meta', () => ({
  isKnowledgeDraft: jest.fn(),
}));

const mockedIsDraft = isKnowledgeDraft as jest.MockedFunction<typeof isKnowledgeDraft>;

describe('hrefToKnowledgeSlug', () => {
  it('parses a nested knowledge href', () => {
    expect(hrefToKnowledgeSlug('/knowledge/probability/distributions/normal')).toEqual([
      'probability',
      'distributions',
      'normal',
    ]);
  });

  it('returns empty array for the knowledge root href', () => {
    expect(hrefToKnowledgeSlug('/knowledge/')).toEqual([]);
  });
});

describe('filterNavigationTree', () => {
  beforeEach(() => {
    mockedIsDraft.mockReset();
    clearFilteredNavigationCache();
  });

  it('removes draft leaf nodes', () => {
    mockedIsDraft.mockImplementation((_locale, slug) => slug[0] === 'tools');

    const filtered = filterNavigationTree(
      [
        { title: 'Outils', href: '/knowledge/tools' },
        { title: 'Probabilités', href: '/knowledge/probability' },
      ],
      'fr'
    );

    expect(filtered).toEqual([{ title: 'Probabilités', href: '/knowledge/probability' }]);
  });

  it('keeps a draft hub when it has published children', () => {
    mockedIsDraft.mockImplementation((_locale, slug) => slug.join('/') === 'quantitative-finance');

    const filtered = filterNavigationTree(
      [
        {
          title: 'Finance quantitative',
          href: '/knowledge/quantitative-finance',
          children: [
            {
              title: 'Marchés',
              href: '/knowledge/quantitative-finance/markets-products/asset-classes',
            },
          ],
        },
      ],
      'fr'
    );

    expect(filtered).toEqual([
      {
        title: 'Finance quantitative',
        children: [
          {
            title: 'Marchés',
            href: '/knowledge/quantitative-finance/markets-products/asset-classes',
          },
        ],
      },
    ]);
  });
});
