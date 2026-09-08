import Image from 'next/image'
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
      'Quantity breaks and bundle discounts are calculated and applied for you at checkout — no coupon codes, no manual work.',
  },
  {
    icon: CodeOffIcon,
    title: 'No theme code required',
    description:
      'Configure offers and bundles from a clean admin. Storefront pricing and bundle blocks display through Shopify blocks — nothing to edit in Liquid.',
  },
  {
    icon: LayersIcon,
    title: 'Built to work together',
    description:
      'Run Tierly and Mixly side by side — each app detects the other, points you at the one stacking setting to turn on, and then volume breaks and bundle discounts combine at checkout.',
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
      'See what your offers and bundles actually earned, from aggregated daily order figures — never individual customer records.',
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
    tagline: 'Buy-more-save-more pricing that lifts average order value.',
    mark: '◆',
    icon: '/solora-tierly.png',
    status: 'live',
    pricing: 'Free: 1 active offer · Pro: $9.99/mo or $99/yr',
    description:
      'Automatic quantity breaks and tiered pricing — applied at checkout, no code. Lifts average order value.',
    links: [
      { href: 'https://apps.shopify.com/solora-tierly', label: 'Install on Shopify' },
      { href: '/tierly/docs', label: 'Documentation' },
      { href: '/tierly/privacy', label: 'Privacy' },
      { href: '/tierly/terms', label: 'Terms' },
    ],
  },
  {
    name: 'Mixly',
    tagline: 'Product bundles that discount what is already in the cart.',
    mark: '◈',
    icon: '/solora-mixly.png',
    status: 'beta',
    pricing: 'Free: 1 active bundle · Pro: $12.99/mo or $129/yr',
    description:
      'Frequently Bought Together, Build Your Own, and BOGO bundles — discounted at checkout without creating a single new product, variant, or SKU.',
    links: [
      { href: `mailto:${siteConfig.email}?subject=Mixly early access`, label: 'Request early access' },
      { href: '/mixly/docs', label: 'Documentation' },
      { href: '/mixly/privacy', label: 'Privacy' },
      { href: '/mixly/terms', label: 'Terms' },
    ],
  },
  {
    name: 'FeedGuard',
    tagline: 'Product feed monitor',
    mark: '🛡',
    icon: undefined,
    status: 'soon',
    pricing: '',
    description:
      'Monitors your Google & Meta product feeds and alerts you the moment listings get disapproved — before you lose sales.',
    links: [],
  },
]

const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Shopify apps studio
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Sell more per order, automatically
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Solora builds focused, reliable apps for Shopify merchants. Tierly applies
              quantity breaks at checkout; Mixly discounts product bundles without creating a
              single new SKU. Simple, fast, and privacy-first.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#apps"
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
              >
                Explore our apps
                <ArrowRightIcon />
              </Link>
              <a
                href="https://apps.shopify.com/solora-tierly"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Install Tierly on Shopify
              </a>
            </div>
          </div>

          {/* Pricing-tier hero visual */}
          <div className="mx-auto mt-16 max-w-2xl">
            <Card className="overflow-hidden p-1.5">
              <div className="rounded-lg bg-muted/60 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Volume pricing · Tierly</p>
                  <span className="rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
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
                        'flex items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm shadow-sm',
                        index === 2 && 'ring-1 ring-ring',
                      )}
                    >
                      <span className="flex items-center gap-2.5 font-medium text-foreground">
                        <CheckIcon className="size-4 text-muted-foreground" />
                        {tier.qty}
                      </span>
                      <span className="font-semibold text-foreground">{tier.save}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-14 border-b">
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
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 transition-colors hover:bg-accent/40">
                <span className="inline-grid size-10 place-items-center rounded-lg border bg-muted text-foreground">
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
      <section id="apps" className="scroll-mt-14 border-b bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our apps</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Focused tools for growing Shopify stores. More on the way.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {apps.map((app) => (
              <Card key={app.name} className="flex flex-col p-7">
                <div className="flex items-center gap-4">
                  {app.icon ? (
                    <Image
                      src={app.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-xl"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="grid size-12 place-items-center rounded-xl bg-primary text-xl text-primary-foreground"
                    >
                      {app.mark}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{app.name}</h3>
                      {app.status === 'beta' && (
                        <span className="rounded-full border bg-background px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                          In beta
                        </span>
                      )}
                      {app.status === 'soon' && (
                        <span className="rounded-full border bg-background px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
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
                {app.status !== 'soon' && (
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    {app.pricing}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                  {app.status !== 'soon' ? (
                    app.links.map((link) =>
                      /^(https?|mailto):/.test(link.href) ? (
                        <a
                          key={link.href}
                          href={link.href}
                          {...(link.href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="text-foreground underline-offset-4 transition-colors hover:underline"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-foreground underline-offset-4 transition-colors hover:underline"
                        >
                          {link.label}
                        </Link>
                      ),
                    )
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
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Card className="p-10 text-center md:p-14">
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
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
              >
                <MailIcon />
                Get in touch
              </a>
              <Link
                href="/privacy"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
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
