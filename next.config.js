/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static exports
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    unoptimized: true, // Required for static export
    domains: ['www.bernardbolter.com'], // Allow images from this domain
  },
}

module.exports = nextConfig
