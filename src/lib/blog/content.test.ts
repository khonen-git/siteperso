jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localePrefix: 'always',
  },
}));

import { getBlogPost, getBlogPosts, listBlogFileNames } from './content';

describe('blog content loader', () => {
  it('lists template posts for fr', () => {
    const files = listBlogFileNames('fr');
    expect(files).toEqual(
      expect.arrayContaining(['template-pensee.mdx', 'template-recherche.mdx'])
    );
  });

  it('returns sorted posts with required fields', () => {
    const posts = getBlogPosts('fr');
    expect(posts.length).toBeGreaterThanOrEqual(2);
    expect(posts[0].date >= posts[posts.length - 1].date).toBe(true);
    expect(posts[0]).toEqual(
      expect.objectContaining({
        slug: expect.any(String),
        title: expect.any(String),
        kind: expect.stringMatching(/^(thought|research)$/),
      })
    );
  });

  it('loads a post by slug', () => {
    const post = getBlogPost('fr', 'template-pensee');
    expect(post).not.toBeNull();
    expect(post?.post.kind).toBe('thought');
    expect(post?.source.length).toBeGreaterThan(0);
  });

  it('returns null for a missing slug', () => {
    expect(getBlogPost('fr', 'does-not-exist')).toBeNull();
  });
});
