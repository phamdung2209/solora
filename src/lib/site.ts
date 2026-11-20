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
    'Solora builds focused apps for Shopify merchants: Tierly for volume pricing, Mixly for product bundles and Combined Listings for swatches that link products. All three are on the Shopify App Store.',
  lastUpdated: {
    tierlyPrivacy: 'November 20, 2026',
    tierlyTerms: 'November 20, 2026',
    mixlyPrivacy: 'November 20, 2026',
    mixlyTerms: 'September 7, 2026',
    combinedListingsPrivacy: 'November 20, 2026',
    combinedListingsTerms: 'November 20, 2026',
  },
  ogImage: { url: '/og-solora.png', width: 1200, height: 630, alt: 'Solora' },
} as const

export type SiteConfig = typeof siteConfig
