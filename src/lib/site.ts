/**
 * Central site metadata reused across pages and structured data.
 */
export const siteConfig = {
  name: 'Solora',
  legalEntity: 'Solora Commerce',
  domain: 'solora.dungpv.id.vn',
  url: 'https://solora.dungpv.id.vn',
  email: 'hank@dungpv.id.vn',
  description:
    'Solora builds focused, high-quality apps for Shopify merchants — starting with Tierly, automatic volume and tiered pricing applied at checkout.',
  lastUpdated: 'July 6, 2026',
} as const

export type SiteConfig = typeof siteConfig
