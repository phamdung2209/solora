/**
 * Central site metadata reused across pages and structured data.
 */
export const siteConfig = {
  name: 'Solora',
  legalEntity: 'Solora Commerce',
  domain: 'solora.dungpv.id.vn',
  url: 'https://solora.dungpv.id.vn',
  email: 'support@dungpv.id.vn',
  description:
    'Solora builds focused, high-quality apps for Shopify merchants — Tierly for automatic volume pricing, Mixly for product bundles, both applied at checkout.',
  lastUpdated: 'August 30, 2026',
} as const

export type SiteConfig = typeof siteConfig
