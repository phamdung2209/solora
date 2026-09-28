import type { Metadata } from 'next'
import Link from 'next/link'

import { Callout, Section } from '@/components/docs-shell'
import { ArrowRightIcon, CheckIcon, MailIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Combined Listings — Pricing',
  description:
    'Combined Listings pricing: every feature on every plan, from a free plan with 10 groups to Pro with unlimited groups at $39.99/mo.',
  alternates: { canonical: '/combined-listings/pricing' },
  openGraph: {
    title: 'Combined Listings — Pricing | Solora',
    description:
      'Combined Listings pricing: every feature on every plan, from a free plan with 10 groups to Pro with unlimited groups at $39.99/mo.',
    url: '/combined-listings/pricing',
    images: [siteConfig.ogImage],
  },
}

const plans = [
  { name: 'Free', price: '$0', cadence: 'forever', features: ['10 groups', 'Every feature included'], featured: false },
  { name: 'Starter', price: '$9.99', cadence: 'per month', features: ['200 groups', 'Every feature included', '7-day free trial'], featured: false },
  { name: 'Growth', price: '$19.99', cadence: 'per month', features: ['1,000 groups', 'Every feature included', '7-day free trial'], featured: false },
  { name: 'Pro', price: '$39.99', cadence: 'per month', features: ['Unlimited groups', 'Every feature included', '7-day free trial'], featured: false },
]

const CombinedListingsPricingPage = () => (
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
            ◇
          </span>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Pricing
            </span>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple pricing for Combined Listings
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Every swatch, gallery and collection feature is on every plan, including Free. Plans
          differ only in how many groups you can create, and are billed monthly through Shopify.
        </p>
      </div>
    </section>

    <div className="mx-auto max-w-3xl space-y-14 px-6 py-16">
      <Section
        id="plans"
        eyebrow="Plans"
        title="Four plans, one difference"
        lead="The free plan is a real plan, not a trial — up to 10 groups with every feature, indefinitely."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map(({ name, price, cadence, features, featured }) => (
            <Card key={name} className={cn('p-6', featured && 'ring-1 ring-ring')}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold">{name}</h3>
                {featured && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-primary-foreground">
                    Most popular
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
        lead="Billing runs entirely through Shopify — Combined Listings never touches your card."
      >
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Choosing a paid plan creates a charge through{' '}
            <strong className="font-semibold text-foreground">Shopify&rsquo;s Billing API</strong>.
            You approve it once in your Shopify admin, and from then on it lands on your regular
            Shopify bill alongside your theme and other app charges.
          </p>
          <p>
            Prices are flat: <strong className="font-semibold text-foreground">$9.99, $19.99 or
            $39.99 a month</strong>, with no usage fees and no revenue share. Your first paid plan
            starts with a <strong className="font-semibold text-foreground">7-day free trial</strong>.
            Switching between paid plans does not start another one.
          </p>
        </div>
      </Section>

      <Section
        id="downgrading"
        eyebrow="Switching plans"
        title="Changing plans never deletes anything"
        lead="A plan's limit only stops new groups from being created."
      >
        <Callout title="What happens when you downgrade or cancel">
          Moving to a lower paid plan takes effect at your next billing cycle. Cancelling moves
          you to Free straight away and Shopify credits the unused part of the period. Either
          way, every group you already have keeps showing on your storefront and stays editable;
          you just can&rsquo;t add new groups until you are under the new limit.
        </Callout>
      </Section>

      <section className="border-t pt-14 text-center">
        <h2 className="mx-auto max-w-md text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to try Combined Listings?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Read the docs to see exactly how groups and swatches work before you pick a plan, or
          email us if you have a question about billing.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/combined-listings/docs"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
          >
            Documentation
          </Link>
          <a
            href={`mailto:${siteConfig.email}?subject=Combined Listings pricing question`}
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

export default CombinedListingsPricingPage
