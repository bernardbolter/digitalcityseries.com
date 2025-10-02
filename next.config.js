/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static exports
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.digitalcityseries.com/bolter',
        pathname: '/wp-content/uploads/**',
      },
    ],
    domains: ['www.digitalcityseries.com/bolter'], // Allow images from this domain
  },
  // We'll implement i18n manually since Next.js i18n is not compatible with static exports
  env: {
    DEFAULT_LOCALE: 'en',
    SUPPORTED_LOCALES: 'en,fr,es,de,it,yue,sv,pt,da,lv,tr,hr,zh,th'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
