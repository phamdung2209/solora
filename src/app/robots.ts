import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${siteConfig.url}/sitemap.xml`,
})

export default robots
