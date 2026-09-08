import type { Metadata } from 'next'
import Link from 'next/link'

import { Callout, Section } from '@/components/docs-shell'
import { ArrowRightIcon, CheckIcon, MailIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Mixly — Pricing',
  description:
    'Mixly pricing: a free plan with one always-on bundle, and a Pro plan at $12.99/mo or $129/yr with unlimited bundles and analytics.',
  alternates: { canonical: '/mixly/pricing' },
  openGraph: {
    title: 'Mixly — Pricing | Solora',
    description:
      'Mixly pricing: a free plan with one always-on bundle, and a Pro plan at $12.99/mo or $129/yr with unlimited bundles and analytics.',
    url: '/mixly/pricing',
    images: [siteConfig.ogImage],
  },
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    features: [
      '1 active bundle',
      'Frequently Bought Together bundles',
      'Full storefront blocks on product and cart',
      'Automatic checkout discounts',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    price: '$12.99',
    cadence: 'per month, or $129/yr',
    features: [
      'Unlimited active bundles',
      'All three bundle types',
      'Bundle analytics',
      'Priority support',
      '7-day free trial',
    ],
    featured: true,
  },
]

const MixlyPricingPage = () => (
  <>
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,var(--muted)_0%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 md:pt-20">
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
            ◈
          </span>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Pricing
            </span>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple pricing for Mixly
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          One free bundle, forever, or unlimited bundles on Pro. No usage fees, no revenue
          share — just a flat monthly or yearly price billed through Shopify.
        </p>
      </div>
    </section>

    <div className="mx-auto max-w-3xl space-y-14 px-6 py-16">
      <Section
        id="plans"
        eyebrow="Plans"
        title="Free vs Pro"
        lead="The free plan is a real plan, not a trial — one active Frequently Bought Together bundle runs indefinitely, with the storefront blocks and the automatic checkout discount included."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map(({ name, price, cadence, features, featured }) => (
            <Card key={name} className={cn('p-6', featured && 'ring-1 ring-ring')}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold">{name}</h3>
                {featured && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-primary-foreground">
                    Most complete
                  </span>
                )}
              </div>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight">{price}</span>
                <span className="text-sm text-muted-foreground">{cadence}</span>
              </p>
              <ul className="mt-5 space-y-2.5 border-t pt-5 text-sm">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="billing"
        eyebrow="Billing"
        title="How billing works"
        lead="Billing runs entirely through Shopify — Mixly never touches your card."
      >
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Upgrading to Pro creates a charge through{' '}
            <strong className="font-semibold text-foreground">Shopify&rsquo;s Billing API</strong>.
            You approve it once in your Shopify admin, and from then on it lands on your regular
            Shopify bill alongside your theme and other app charges — Mixly never sees your card
            details.
          </p>
          <p>
            The price is flat: <strong className="font-semibold text-foreground">$12.99/mo or
            $129/yr</strong>, with no usage fees and no revenue share, whichever cadence you pick.
            Both cadences start with a{' '}
            <strong className="font-semibold text-foreground">7-day free trial</strong>, so you can
            try every Pro feature before the first charge.
          </p>
        </div>
      </Section>

      <Section
        id="downgrading"
        eyebrow="Switching plans"
        title="Downgrading never deletes anything"
        lead="Moving back to Free pauses bundles — it does not remove them."
      >
        <Callout title="What happens when you downgrade">
          Free runs one active bundle. Move back to it and Mixly keeps one running, pauses the
          rest, and names on your home screen exactly which ones it paused. Nothing is removed —
          the setup and the statistics stay put, and switching a bundle back on is one click once
          you return to Pro.
        </Callout>
      </Section>

      <section className="border-t pt-14 text-center">
        <h2 className="mx-auto max-w-md text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to try Mixly?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Read the docs to see exactly how bundles work before you pick a plan, or email us if
          you have a question about billing.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/mixly/docs"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
          >
            Documentation
          </Link>
          <a
            href={`mailto:${siteConfig.email}?subject=Mixly pricing question`}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            <MailIcon />
            Email us
          </a>
        </div>
      </section>
    </div>
  </>
)

export default MixlyPricingPage
