import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowRightIcon,
  BoltIcon,
  ChartIcon,
  CheckIcon,
  CodeOffIcon,
  FeatherIcon,
  LayersIcon,
  MailIcon,
  ShieldIcon,
} from '@/components/icons'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: BoltIcon,
    title: 'Applied automatically at checkout',
    description:
      'Quantity breaks and tiered discounts are calculated and applied for you at checkout — no manual coupons, no missed carts.',
  },
  {
    icon: CodeOffIcon,
    title: 'No theme code required',
    description:
      'Configure offers from a clean admin. Storefront pricing displays through Shopify blocks — nothing to edit in Liquid.',
  },
  {
    icon: LayersIcon,
    title: 'Tiered & wholesale pricing',
    description:
      'Build volume breaks, bulk deals, and wholesale tiers with flexible targeting by product, collection, or customer.',
  },
  {
    icon: ShieldIcon,
    title: 'Privacy-first by design',
    description:
      'We store your configuration and aggregated stats — never your customers’ personal data. Tokens are encrypted at rest.',
  },
  {
    icon: ChartIcon,
    title: 'Clear analytics',
    description:
      'See how volume pricing lifts average order value with a dashboard built on aggregated order figures.',
  },
  {
    icon: FeatherIcon,
    title: 'Fast & lightweight',
    description:
      'Engineered to stay out of the way — quick to set up, quick to load, and gentle on your storefront performance.',
  },
]

const apps = [
  {
    name: 'Tierly',
    tagline: 'Volume & tiered pricing',
    mark: '◆',
    available: true,
    description:
      'Automatic quantity breaks, tiered and wholesale pricing — applied at checkout, no code. Lifts average order value.',
    links: [
      { href: '/tierly/privacy', label: 'Privacy' },
      { href: '/tierly/terms', label: 'Terms' },
    ],
  },
  {
    name: 'FeedGuard',
    tagline: 'Product feed monitor',
    mark: '🛡',
    available: false,
    description:
      'Monitors your Google & Meta product feeds and alerts you the moment listings get disapproved — before you lose sales.',
    links: [],
  },
]

const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,color-mix(in_oklab,var(--color-brand-500)_22%,transparent),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent"
        />
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-subtle px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Shopify apps studio
            </span>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Sell more with{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                automatic volume pricing
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Solora builds focused, reliable apps for Shopify merchants. Tierly applies
              quantity breaks and tiered discounts at checkout automatically — simple, fast,
              and privacy-first.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="#apps" className={cn(buttonVariants({ variant: 'gradient', size: 'lg' }))}>
                Explore our apps
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="/tierly/privacy"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Tierly privacy policy
              </Link>
            </div>
          </div>

          {/* Pricing-tier hero visual */}
          <div className="mx-auto mt-16 max-w-2xl">
            <Card className="overflow-hidden p-1.5 shadow-xl shadow-brand-950/5">
              <div className="rounded-[calc(1rem-2px)] bg-background-subtle p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Volume pricing</p>
                  <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-600 dark:text-brand-300">
                    Applied at checkout
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {[
                    { qty: 'Buy 3+', save: 'Save 10%' },
                    { qty: 'Buy 6+', save: 'Save 18%' },
                    { qty: 'Buy 12+', save: 'Save 25%' },
                  ].map((tier, index) => (
                    <li
                      key={tier.qty}
                      className={cn(
                        'flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm',
                        index === 2 && 'ring-1 ring-brand-500/40',
                      )}
                    >
                      <span className="flex items-center gap-2.5 font-medium text-foreground">
                        <CheckIcon className="size-4 text-brand-500" />
                        {tier.qty}
                      </span>
                      <span className="font-semibold text-brand-600 dark:text-brand-300">
                        {tier.save}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why merchants choose Solora
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for real merchant problems — thoughtful defaults, no bloat, and respect
              for your data.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 transition-shadow hover:shadow-md">
                <span className="inline-grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 dark:text-brand-300">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" className="scroll-mt-20 border-t border-border bg-background-subtle">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our apps</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Focused tools for growing Shopify stores. More on the way.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {apps.map((app) => (
              <Card key={app.name} className="flex flex-col p-7">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl text-white shadow-sm"
                  >
                    {app.mark}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{app.name}</h3>
                      {!app.available && (
                        <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{app.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {app.description}
                </p>
                <div className="mt-5 flex items-center gap-4 text-sm font-medium">
                  {app.available ? (
                    app.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-accent transition-colors hover:text-brand-500"
                      >
                        {link.label}
                      </Link>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Launching soon</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Card className="relative overflow-hidden border-brand-500/20 p-10 text-center md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_50%_0%,color-mix(in_oklab,var(--color-brand-500)_16%,transparent),transparent)]"
            />
            <h2 className="mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to lift your average order value?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
              Have a question or want early access to what we&rsquo;re building? We&rsquo;d
              love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(buttonVariants({ variant: 'gradient', size: 'lg' }))}
              >
                <MailIcon className="size-4" />
                Get in touch
              </a>
              <Link
                href="/privacy"
                className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
              >
                Read our policies
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}

export default HomePage
