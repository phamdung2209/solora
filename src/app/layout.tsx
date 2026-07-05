import type { Metadata, Viewport } from 'next'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Solora — Focused apps for Shopify merchants',
    template: '%s · Solora',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'Shopify apps',
    'volume pricing',
    'tiered pricing',
    'quantity breaks',
    'Tierly',
    'Solora',
    'wholesale pricing',
  ],
  authors: [{ name: siteConfig.legalEntity, url: siteConfig.url }],
  creator: siteConfig.legalEntity,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Solora — Focused apps for Shopify merchants',
    description: siteConfig.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solora — Focused apps for Shopify merchants',
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#08080c' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

export default RootLayout
