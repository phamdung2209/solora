import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

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
        images: [{ url: '/og-solora.png', width: 1200, height: 630, alt: 'Solora' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Solora — Focused apps for Shopify merchants',
        description: siteConfig.description,
        images: ['/og-solora.png'],
    },
    icons: {
        icon: [{ url: '/favicon.png', type: 'image/png' }],
    },
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
    width: 'device-width',
    initialScale: 1,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <body className="min-h-dvh font-sans antialiased">
                <SiteHeader />
                <main className="min-h-[60vh]">{children}</main>
                <SiteFooter />
            </body>
        </html>
    )
}

export default RootLayout
