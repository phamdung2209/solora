import Link from 'next/link'

import { Brand } from '@/components/brand'
import { siteConfig } from '@/lib/site'

const footerSections = [
  {
    title: 'Product',
    links: [
      { href: '/#apps', label: 'Apps' },
      { href: '/#features', label: 'Why Solora' },
      { href: '/tierly/privacy', label: 'Tierly' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/tierly/privacy', label: 'Tierly privacy' },
      { href: '/tierly/terms', label: 'Tierly terms' },
    ],
  },
]

export const SiteFooter = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background-subtle">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <Brand />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Focused, privacy-first apps for Shopify merchants. Built by{' '}
              {siteConfig.legalEntity}.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. Not affiliated with Shopify Inc.
          </p>
          <p>Made for merchants who care about performance.</p>
        </div>
      </div>
    </footer>
  )
}
