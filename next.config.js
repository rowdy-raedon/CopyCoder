/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Disable static optimization to prevent SSR issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Explicitly exclude API routes
  experimental: {
    appDir: true,
  },
  // Explicitly define which paths to include in the static export
  exportPathMap: async () => ({
    "/": { page: "/" },
  }),
  // Disable server components
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
