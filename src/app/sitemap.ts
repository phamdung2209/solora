import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

const routes = [
  '',
  '/support',
  '/privacy',
  '/terms',
  '/tierly',
  '/tierly/docs',
  '/tierly/pricing',
  '/tierly/privacy',
  '/tierly/terms',
  '/mixly',
  '/mixly/docs',
  '/mixly/pricing',
  '/mixly/privacy',
  '/mixly/terms',
  '/combined-listings',
  '/combined-listings/docs',
  '/combined-listings/pricing',
  '/combined-listings/privacy',
  '/combined-listings/terms',
]

const sitemap = (): MetadataRoute.Sitemap =>
  routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }))

export default sitemap
