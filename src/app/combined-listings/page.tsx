import type { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRightIcon, CheckIcon, LayersIcon, LifeBuoyIcon, ShieldIcon } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Combined Listings',
  description: 'Colour swatches that link separate products into one listing.',
  alternates: { canonical: '/combined-listings' },
  openGraph: {
    title: 'Combined Listings | Solora',
    description: 'Colour swatches that link separate products into one listing.',
    url: '/combined-listings',
    images: [siteConfig.ogImage],
  },
}

const pages = [
  {
    icon: LifeBuoyIcon,
    href: '/combined-listings/docs',
    title: 'Documentation',
    text: 'Setup, groups, themes and troubleshooting.',
  },
  {
    icon: LayersIcon,
    href: '/combined-listings/pricing',
    title: 'Pricing',
    text: 'Plans and how billing works.',
  },
  {
    icon: ShieldIcon,
    href: '/combined-listings/privacy',
    title: 'Privacy policy',
    text: 'What Combined Listings stores and how it is handled.',
  },
  {
    icon: CheckIcon,
    href: '/combined-listings/terms',
    title: 'Terms of service',
    text: 'The terms that apply when you use Combined Listings.',
  },
]

const CombinedListingsPage = () => (
  <section className="relative overflow-hidden border-b">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,var(--muted)_0%,transparent_70%)]"
    />
    <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-20">
      <Link
        href="/#apps"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowRightIcon className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
        All Solora apps
      </Link>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        <span
          aria-hidden
          className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary text-2xl text-primary-foreground shadow-sm"
        >
          ◇
        </span>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            Overview
          </span>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Combined Listings
          </h1>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Colour swatches that link separate products into one listing.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {pages.map(({ icon: Icon, href, title, text }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full p-5 transition-colors group-hover:bg-accent/50">
              <span className="inline-grid size-9 place-items-center rounded-lg border bg-muted text-foreground">
                <Icon className="size-4.5" />
              </span>
              <p className="mt-3.5 flex items-center gap-1.5 text-sm font-semibold">
                {title}
                <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

export default CombinedListingsPage
