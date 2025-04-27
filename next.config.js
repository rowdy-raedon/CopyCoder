/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Generate static HTML
  images: {
    unoptimized: true, // Disable image optimization
  },
  // Disable static optimization to prevent SSR issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
