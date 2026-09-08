import type { Metadata } from 'next'
import Link from 'next/link'

import { Callout, Section } from '@/components/docs-shell'
import { ArrowRightIcon, CheckIcon, MailIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tierly — Pricing',
  description:
    'Tierly pricing: a free plan with one always-on volume offer, and a Pro plan at $9.99/mo or $99/yr with unlimited offers, scheduling and analytics.',
  alternates: { canonical: '/tierly/pricing' },
  openGraph: {
    title: 'Tierly — Pricing | Solora',
    description:
      'Tierly pricing: a free plan with one always-on volume offer, and a Pro plan at $9.99/mo or $99/yr with unlimited offers, scheduling and analytics.',
    url: '/tierly/pricing',
    images: [siteConfig.ogImage],
  },
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    features: [
      '1 active offer',
      'Percentage, fixed and per-item tiers',
      'Product and collection targeting',
      'Storefront price table and cart upsell',
      'Automatic checkout discounts',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    cadence: 'per month, or $99/yr',
    features: [
      'Unlimited active offers',
      'Offer scheduling (start and end dates)',
      'Variant-level targeting',
      'Analytics, including per-offer revenue',
      'Priority live chat support',
      '7-day free trial',
    ],
    featured: true,
  },
]

const TierlyPricingPage = () => (
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
              Simple pricing for Tierly
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          One free offer, forever, or unlimited offers on Pro. No usage fees, no revenue
          share — just a flat monthly or yearly price billed through Shopify.
        </p>
      </div>
    </section>

    <div className="mx-auto max-w-3xl space-y-14 px-6 py-16">
      <Section
        id="plans"
        eyebrow="Plans"
        title="Free vs Pro"
        lead="The free plan is a real plan, not a trial — one active volume offer runs indefinitely, with the storefront price table and the automatic checkout discount included."
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
        lead="Billing runs entirely through Shopify — Tierly never touches your card."
      >
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Upgrading to Pro creates a charge through{' '}
            <strong className="font-semibold text-foreground">Shopify&rsquo;s Billing API</strong>.
            You approve it once in your Shopify admin, and from then on it lands on your regular
            Shopify bill alongside your theme and other app charges — Tierly never sees your card
            details.
          </p>
          <p>
            The price is flat: <strong className="font-semibold text-foreground">$9.99/mo or
            $99/yr</strong>, with no usage fees and no revenue share, whichever cadence you pick.
            Pro starts with a{' '}
            <strong className="font-semibold text-foreground">7-day free trial</strong>, available{' '}
            <strong className="font-semibold text-foreground">once per store</strong> — switching
            between monthly and yearly, or resubscribing later, does not start a new one.
          </p>
          <p>
            Switching cadence takes effect at your next renewal rather than immediately. Cancel
            whenever you like; Shopify prorates the period you have already paid for.
          </p>
        </div>
      </Section>

      <Section
        id="downgrading"
        eyebrow="Switching plans"
        title="Downgrading never deletes anything"
        lead="Moving back to Free pauses offers — it does not remove them."
      >
        <Callout title="What happens when you downgrade">
          Free runs one active offer, so Tierly keeps one running and pauses the rest. Two
          things are Pro-only — scheduling and variant-level targeting — so if every one of
          your active offers uses one of them, there is no Free-eligible offer to keep and all
          of them pause until you upgrade or edit one. Nothing is deleted either way: your
          offers, their targeting and your statistics stay put, and resubscribing reactivates
          what was paused.
        </Callout>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Analytics is a Pro feature, but the numbers keep accruing on Free — the dashboard is
          locked, not switched off. Upgrade later and the history is there.
        </p>
      </Section>

      <section className="border-t pt-14 text-center">
        <h2 className="mx-auto max-w-md text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to try Tierly?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Install from the Shopify App Store, or read the docs to see how volume pricing works
          before you pick a plan.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://apps.shopify.com/solora-tierly"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
          >
            Install on Shopify
          </a>
          <Link
            href="/tierly/docs"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Documentation
          </Link>
          <a
            href={`mailto:${siteConfig.email}?subject=Tierly pricing question`}
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

export default TierlyPricingPage
