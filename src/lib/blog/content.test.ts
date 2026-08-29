jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localePrefix: 'always',
  },
}));

import fs from 'fs';
import path from 'path';
import { getBlogPost, getBlogPosts } from './content';

const RESEARCH_SLUGS = [
  'compression-expansion',
  'multi-scale-countertrend',
  'hmm-slope-denoise',
  'tr8dr-trend-labels',
  'stoch-event-sampling',
] as const;

const RESEARCH_PROTOCOLS: Record<(typeof RESEARCH_SLUGS)[number], string> = {
  'multi-scale-countertrend': 'docs/research/01_multi_scale_countertrend.md',
  'hmm-slope-denoise': 'docs/research/02_hmm_slope_denoise.md',
  'tr8dr-trend-labels': 'docs/research/03_tr8dr_trend_labels.md',
  'compression-expansion': 'docs/research/04_compression_expansion.md',
  'stoch-event-sampling': 'docs/research/05_stoch_event_context.md',
};

const RESEARCH_FIGURES: Record<(typeof RESEARCH_SLUGS)[number], string[]> = {
  'compression-expansion': ['CompressionV1V1bFigure', 'CompressionAblationFigure'],
  'multi-scale-countertrend': ['MultiScaleGatesFigure', 'MultiScaleEvNetFigure'],
  'hmm-slope-denoise': ['HmmCifFigure', 'HmmAucOnsetMidFigure'],
  'tr8dr-trend-labels': ['Tr8drDeltaHitFigure', 'Tr8drValidOosFigure'],
  'stoch-event-sampling': ['StochSamplingBiasFigure', 'StochAucRawVsAltFigure'],
};

function visibleResearchPosts(locale: string) {
  return getBlogPosts(locale).filter(
    (post) =>
      post.kind === 'research' && post.visible !== false && !post.slug.startsWith('template-')
  );
}

describe('blog content loader', () => {
  it('returns sorted posts with required fields', () => {
    const posts = getBlogPosts('fr');
    expect(posts.length).toBeGreaterThanOrEqual(5);
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
    const post = getBlogPost('fr', 'stoch-event-sampling');
    expect(post).not.toBeNull();
    expect(post?.post.kind).toBe('research');
    expect(post?.source.length).toBeGreaterThan(0);
  });

  it('returns null for a missing slug', () => {
    expect(getBlogPost('fr', 'does-not-exist')).toBeNull();
  });

  it('returns sorted posts with required fields for en', () => {
    const posts = getBlogPosts('en');
    expect(posts.length).toBeGreaterThanOrEqual(5);
    expect(posts[0].date >= posts[posts.length - 1].date).toBe(true);
  });

  it('loads an en post by slug', () => {
    const post = getBlogPost('en', 'stoch-event-sampling');
    expect(post).not.toBeNull();
    expect(post?.post.kind).toBe('research');
    expect(post?.source.length).toBeGreaterThan(0);
  });
});

describe('blog research series (eurusd-lab)', () => {
  it.each(['fr', 'en'] as const)('exposes the five research slugs for %s', (locale) => {
    const slugs = visibleResearchPosts(locale).map((post) => post.slug);
    for (const slug of RESEARCH_SLUGS) {
      expect(slugs).toContain(slug);
    }
  });

  it.each(['fr', 'en'] as const)('keeps FR/EN parity on research slugs for %s', (locale) => {
    const slugs = visibleResearchPosts(locale)
      .map((post) => post.slug)
      .filter((slug) => RESEARCH_SLUGS.includes(slug as (typeof RESEARCH_SLUGS)[number]))
      .sort();

    expect(slugs).toEqual([...RESEARCH_SLUGS].sort());
  });

  it.each(['fr', 'en'] as const)('tags research posts with eurusd-lab for %s', (locale) => {
    for (const slug of RESEARCH_SLUGS) {
      const post = getBlogPost(locale, slug);
      expect(post?.post.tags).toContain('eurusd-lab');
    }
  });

  it.each(['fr', 'en'] as const)(
    'links each research article to an existing protocol file for %s',
    (locale) => {
      for (const slug of RESEARCH_SLUGS) {
        const post = getBlogPost(locale, slug);
        expect(post).not.toBeNull();

        const protocolPath = RESEARCH_PROTOCOLS[slug];
        expect(post?.source).toContain(protocolPath);
        expect(fs.existsSync(path.join(process.cwd(), protocolPath))).toBe(true);
      }
    }
  );

  it.each(['fr', 'en'] as const)(
    'embeds expected figure components in research MDX for %s',
    (locale) => {
      for (const slug of RESEARCH_SLUGS) {
        const post = getBlogPost(locale, slug);
        for (const figure of RESEARCH_FIGURES[slug]) {
          expect(post?.source).toContain(`<${figure}`);
        }
      }
    }
  );
});
