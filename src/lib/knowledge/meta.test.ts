jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localePrefix: 'always',
  },
}));

import { isKnowledgeDraft, clearKnowledgeDraftCache } from './meta';

describe('isKnowledgeDraft', () => {
  beforeEach(() => {
    clearKnowledgeDraftCache();
  });

  it('detects auto-generated stub pages', () => {
    expect(isKnowledgeDraft('fr', ['tools', 'git-github'])).toBe(true);
    expect(isKnowledgeDraft('en', ['tools', 'git-github'])).toBe(true);
  });

  it('keeps pages with real content', () => {
    expect(isKnowledgeDraft('fr', ['probability', 'distributions', 'normal'])).toBe(false);
    expect(isKnowledgeDraft('fr', ['statistics', 'inference'])).toBe(false);
  });

  it('treats missing pages as draft', () => {
    expect(isKnowledgeDraft('fr', ['does-not-exist'])).toBe(true);
  });
});
