/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static HTML export
  output: "export",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Disable strict mode for development
  reactStrictMode: false,

  // Enable minification
  swcMinify: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
