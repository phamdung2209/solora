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
  lastUpdated: {
    tierlyPrivacy: 'July 15, 2026',
    tierlyTerms: 'July 5, 2026',
    mixlyPrivacy: 'August 30, 2026',
    mixlyTerms: 'September 7, 2026',
  },
  ogImage: { url: '/og-solora.png', width: 1200, height: 630, alt: 'Solora' },
} as const

export type SiteConfig = typeof siteConfig
