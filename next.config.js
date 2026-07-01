const createMDX = require('@next/mdx');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const locale = ':locale';
    const permanent = true;

    return [
      {
        source: `/${locale}/knowledge/mathematics/statistics/statistical-hypothesis-test`,
        destination: `/${locale}/knowledge/statistics/inference/statistical-tests`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/statistics/inductive/statistical-tests`,
        destination: `/${locale}/knowledge/statistics/inference/statistical-tests`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/statistics/inductive/statistical-tests/:path*`,
        destination: `/${locale}/knowledge/statistics/inference/statistical-tests/:path*`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/statistics/descriptive/:path*`,
        destination: `/${locale}/knowledge/statistics/descriptive/:path*`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/statistics/inductive/fundamentals`,
        destination: `/${locale}/knowledge/statistics/inference/fundamentals`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/probability/distributions/continuous/normal`,
        destination: `/${locale}/knowledge/probability/distributions/normal`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/programming/:path*`,
        destination: `/${locale}/knowledge/engineering/:path*`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/finance/asset-classes`,
        destination: `/${locale}/knowledge/quantitative-finance/markets-products/asset-classes`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/finance/contract-types`,
        destination: `/${locale}/knowledge/quantitative-finance/markets-products/contract-types`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/finance/options`,
        destination: `/${locale}/knowledge/quantitative-finance/options-derivatives/options`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/finance/black-scholes`,
        destination: `/${locale}/knowledge/quantitative-finance/options-derivatives/black-scholes`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/finance/volatility`,
        destination: `/${locale}/knowledge/quantitative-finance/volatility/implied-vs-realized`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/data-science/cross-validation`,
        destination: `/${locale}/knowledge/machine-learning/general-concepts/cross-validation`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/data-science/machine-learning/supervised/random-forest`,
        destination: `/${locale}/knowledge/machine-learning/classical-models/random-forest`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/data-science/machine-learning/supervised/xgboost`,
        destination: `/${locale}/knowledge/machine-learning/classical-models/xgboost`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/data-science/machine-learning/unsupervised/hmm`,
        destination: `/${locale}/knowledge/quantitative-finance/financial-econometrics/regimes-hmm`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/data-science/:path*`,
        destination: `/${locale}/knowledge/machine-learning/:path*`,
        permanent,
      },
      // PR3 — probabilités : ancien arbre profond
      {
        source: `/${locale}/knowledge/mathematics/probability/fundamentals/principles/axioms`,
        destination: `/${locale}/knowledge/probability/fundamentals#cadre-axiomatique`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/probability/fundamentals/principles/space`,
        destination: `/${locale}/knowledge/probability/fundamentals#espace-probabilisable`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/probability/fundamentals/principles/expectation`,
        destination: `/${locale}/knowledge/probability/fundamentals#esperance`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/probability/fundamentals/:path*`,
        destination: `/${locale}/knowledge/probability/fundamentals`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/mathematics/probability/distributions/continuous/:path*`,
        destination: `/${locale}/knowledge/probability/distributions/continuous-univariate`,
        permanent,
      },
      // PR3 — statistiques : aplatissement inférence
      {
        source: `/${locale}/knowledge/statistics/inference/fundamentals`,
        destination: `/${locale}/knowledge/statistics/inference`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/statistics/inference/statistical-tests/parametric`,
        destination: `/${locale}/knowledge/statistics/inference/statistical-tests`,
        permanent,
      },
      {
        source: `/${locale}/knowledge/statistics/inference/statistical-tests/non-parametric`,
        destination: `/${locale}/knowledge/statistics/inference/statistical-tests`,
        permanent,
      },
    ];
  },
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // Évite des vendor-chunks OpenTelemetry cassés en dev (peer optionnel de Next.js)
  serverExternalPackages: ['@opentelemetry/api'],
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {}
  }
};

module.exports = withNextIntl(withMDX(nextConfig)); 