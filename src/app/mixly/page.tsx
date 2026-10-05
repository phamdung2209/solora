import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Figure } from '@/components/figure'
import { ArrowRightIcon, CheckIcon, LayersIcon, LifeBuoyIcon, ShieldIcon } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mixly',
  description: 'Product bundles that discount what is already in the cart.',
  alternates: { canonical: '/mixly' },
  openGraph: {
    title: 'Mixly | Solora',
    description: 'Product bundles that discount what is already in the cart.',
    url: '/mixly',
    images: [siteConfig.ogImage],
  },
}

const pages = [
  {
    icon: LifeBuoyIcon,
    href: '/mixly/docs',
    title: 'Documentation',
    text: 'Setup, storefront behaviour, and troubleshooting.',
  },
  {
    icon: LayersIcon,
    href: '/mixly/pricing',
    title: 'Pricing',
    text: 'Plans and how billing works.',
  },
  {
    icon: ShieldIcon,
    href: '/mixly/privacy',
    title: 'Privacy policy',
    text: 'What Mixly stores and how it is handled.',
  },
  {
    icon: CheckIcon,
    href: '/mixly/terms',
    title: 'Terms of service',
    text: 'The terms that apply when you use Mixly.',
  },
]

const MixlyPage = () => (
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

      <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_30rem] lg:gap-14">
        <div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src="/solora-mixly.png"
              alt=""
              width={64}
              height={64}
              className="size-16 rounded-2xl border shadow-sm"
            />
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <span className="size-1.5 rounded-full bg-primary" />
                Overview
              </span>
              <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Mixly
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Product bundles that discount what is already in the cart.
          </p>
        </div>

        <Figure
          src="/guides/mixly/bundle-offer.webp"
          width={1200}
          height={750}
          alt="A tee product page with a Mixly bundle of the tee, a tote and a sticker pack at 15% off. The shopper clicks Add bundle to cart and the cart opens with all three."
          priority
        />
      </div>

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

export default MixlyPage
