import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Saf statik çıktı: sunucu gerektirmez, Vercel'e de GitHub Pages'e de taşınır.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
