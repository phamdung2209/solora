import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Pin the workspace root so an unrelated lockfile in a parent directory
  // (e.g. a home-directory yarn.lock) is never inferred as the root.
  turbopack: {
    root: path.join(__dirname),
  },
}

export default nextConfig
