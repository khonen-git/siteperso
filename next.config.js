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
    return [
      // Legacy page → contenu MDX équivalent
      {
        source: '/:locale/knowledge/mathematics/statistics/statistical-hypothesis-test',
        destination: '/:locale/knowledge/mathematics/statistics/inductive/statistical-tests',
        permanent: true,
      },
      // PR2 — décommenter lors de la migration des chemins MDX
      // { source: '/:locale/knowledge/programming/:path*', destination: '/:locale/knowledge/engineering/:path*', permanent: true },
      // { source: '/:locale/knowledge/finance/:path*', destination: '/:locale/knowledge/quantitative-finance/:path*', permanent: true },
      // { source: '/:locale/knowledge/data-science/:path*', destination: '/:locale/knowledge/machine-learning/:path*', permanent: true },
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