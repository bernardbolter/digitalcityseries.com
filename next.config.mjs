import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.digitalcityseries.com',
        pathname: '/bolter/wp-content/uploads/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig);