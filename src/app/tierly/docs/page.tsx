import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import {
  ArrowRightIcon,
  BoltIcon,
  CartIcon,
  ChartIcon,
  CheckIcon,
  ChevronDownIcon,
  LayersIcon,
  LifeBuoyIcon,
  MailIcon,
  SlidersIcon,
} from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tierly — Help & Documentation',
  description:
    'How Tierly works, how to set it up on your theme, and what to check when a volume discount is not applying.',
  alternates: { canonical: '/tierly/docs' },
  openGraph: {
    title: 'Tierly — Help & Documentation | Solora',
    description:
      'How Tierly works, how to set it up on your theme, and what to check when a volume discount is not applying.',
    url: '/tierly/docs',
  },
}

const chapters = [
  { id: 'how-it-works', label: 'How Tierly works' },
  { id: 'setup', label: 'Add it to your theme' },
  { id: 'first-offer', label: 'Create your first offer' },
  { id: 'storefront', label: 'Where shoppers see it' },
  { id: 'stacking', label: 'Other discounts' },
  { id: 'plans', label: 'Free vs Pro' },
  { id: 'analytics', label: 'Reading your analytics' },
  { id: 'troubleshooting', label: 'Discount not applying?' },
]

const highlights = [
  {
    icon: BoltIcon,
    href: '#how-it-works',
    title: 'How it works',
    text: 'The one thing to understand before you start.',
  },
  {
    icon: LayersIcon,
    href: '#setup',
    title: 'Setup',
    text: 'Add the price table to your product page.',
  },
  {
    icon: LifeBuoyIcon,
    href: '#troubleshooting',
    title: 'Troubleshooting',
    text: 'Discount not showing at checkout? Start here.',
  },
]

const steps = [
  {
    title: 'You build a tier ladder',
    text: 'In the Tierly admin you set the quantity breaks — buy 3 save 10%, buy 6 save 18%, and so on — and choose which products they apply to.',
  },
  {
    title: 'Shoppers see the ladder on the product page',
    text: 'The Tierly price table block renders the tiers with real per-unit prices, so the incentive to add more is visible before the cart.',
  },
  {
    title: 'Shopify applies the discount at checkout',
    text: 'Tierly runs as a Shopify Function. When the cart quantity reaches a tier, the discount is applied automatically — no codes for the shopper to enter, nothing for you to approve.',
  },
]

const setupPaths = [
  {
    icon: LayersIcon,
    badge: 'Most themes',
    title: 'Online Store 2.0 themes',
    note: 'Dawn, Refresh, Sense, and almost every theme sold since 2021.',
    steps: [
      'In your Shopify admin go to Online Store → Themes → Customize.',
      'Switch the top template selector to Products → Default product.',
      'Click Add block in the product information area, open the Apps group, and pick Tierly price table.',
      'Drag it where you want it — just under the quantity selector works well — then Save.',
      'Optional: on the Cart template, add the Tierly cart upsell block to nudge shoppers who are one unit away from the next tier.',
    ],
  },
  {
    icon: SlidersIcon,
    badge: 'Vintage themes',
    title: 'Online Store 1.0 themes',
    note: 'Older themes such as Debut, Brooklyn, or a heavily customised build that cannot host app blocks.',
    steps: [
      'Go to Online Store → Themes → Customize.',
      'Open App embeds in the left sidebar.',
      'Toggle on Tierly (vintage themes), then Save.',
      'The price table is inserted into your product and cart pages automatically — there is no block to position.',
    ],
  },
]

const tierTypes = [
  {
    title: 'Percentage off',
    text: 'Buy 6 or more, save 15%. The most common ladder and the easiest for shoppers to parse.',
  },
  {
    title: 'Fixed amount off',
    text: 'Buy 6 or more, take $5 off each unit. Useful when your margin is a flat figure rather than a ratio.',
  },
  {
    title: 'Fixed price per item',
    text: 'Buy 12 or more, pay $19 each. Best for wholesale-style pricing where the target price matters more than the saving.',
  },
]

const faqs = [
  {
    q: 'The price on my product page did not change',
    a: 'That is expected. Tierly never rewrites your product price — the tier ladder is shown by the price table block, and the actual discount is applied by Shopify at checkout. Add the product to the cart at a qualifying quantity and you will see the discount line appear.',
  },
  {
    q: 'The discount is not applied at checkout',
    a: 'Work down this list in order: (1) the offer is Active, not draft or paused; (2) if you set a schedule, today falls inside the start and end dates; (3) the product you are testing is actually inside the offer target — a collection target only covers products currently in that collection; (4) the cart quantity has reached the first tier; (5) another automatic discount is winning — see the stacking section above.',
  },
  {
    q: 'The price table block does not appear in the theme editor',
    a: 'App blocks only show on Online Store 2.0 themes, and only after the app is installed on the store. If the Apps group is missing when you click Add block, your theme is a vintage 1.0 theme — use the app embed route instead.',
  },
  {
    q: 'A collection I target changed — do I need to re-save the offer?',
    a: 'No. Tierly listens for collection updates and resyncs targeting on its own. Products added to the collection start qualifying without any action from you.',
  },
  {
    q: 'Does Tierly slow my storefront down?',
    a: 'The price table is rendered server-side in Liquid, so it arrives with the page and causes no layout shift. There is no blocking third-party script on your product pages.',
  },
  {
    q: 'What happens to my discounts if I uninstall the app?',
    a: 'The Shopify Function is removed with the app, so volume discounts stop applying immediately and your products return to their normal prices. Your store data is scheduled for deletion — see the privacy policy.',
  },
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    features: [
      '1 active offer',
      'All three tier types',
      'Product & collection targeting',
      'Automatic checkout discounts',
      'Storefront price table',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    cadence: 'per month, or $99/yr',
    features: [
      'Unlimited active offers',
      'Offer scheduling (start & end dates)',
      'Analytics dashboard',
      'Priority live chat support',
      '7-day free trial',
    ],
    featured: true,
  },
]

const Section = ({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  lead?: string
  children: React.ReactNode
}) => (
  <section id={id} className="scroll-mt-24 border-t pt-14 first:border-t-0 first:pt-0">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {eyebrow}
    </p>
    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    {lead && (
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>
    )}
    <div className="mt-8">{children}</div>
  </section>
)

const Callout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border-l-4 border-l-foreground bg-muted/60 px-5 py-4">
    <p className="text-sm font-semibold text-foreground">{title}</p>
    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{children}</p>
  </div>
)

const TierlyDocsPage = () => (
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
          <Image
            src="/solora-tierly.png"
            alt=""
            width={64}
            height={64}
            className="size-16 rounded-2xl border shadow-sm"
          />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Documentation
            </span>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Getting the most out of Tierly
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Everything you need to set up volume pricing, understand where the discount shows up,
          and fix the handful of things that commonly trip merchants up. Most stores are live in
          under five minutes.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, href, title, text }) => (
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

    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[13rem_1fr] lg:gap-16">
      <aside className="hidden lg:block">
        <nav className="sticky top-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            On this page
          </p>
          <ul className="mt-4 space-y-1 border-l text-sm">
            {chapters.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="-ml-px block border-l border-transparent py-1.5 pl-4 text-muted-foreground transition-colors hover:border-l-foreground hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0 space-y-14">
        <Section
          id="how-it-works"
          eyebrow="Start here"
          title="How Tierly works"
          lead="Tierly turns a quantity ladder into an automatic discount. Three moving parts, and only the first one needs your attention."
        >
          <ol className="space-y-5">
            {steps.map(({ title, text }, idx) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-7">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <Callout title="The one thing merchants get wrong">
              Tierly does <strong className="font-semibold text-foreground">not</strong> rewrite
              the price shown on your product page. That price stays exactly as you set it in
              Shopify. The saving appears in the cart and at checkout, once the quantity reaches
              a tier. This is how Shopify Functions work, and it is why shoppers never need a
              discount code.
            </Callout>
          </div>
        </Section>

        <Section
          id="setup"
          eyebrow="Setup"
          title="Add it to your theme"
          lead="Installing the app is enough for discounts to apply at checkout. Adding the block is what makes the savings visible on the product page — and that is where the extra units come from."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {setupPaths.map(({ icon: Icon, badge, title, note, steps }) => (
              <Card key={title} className="flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-grid size-9 place-items-center rounded-lg border bg-muted text-foreground">
                    <Icon className="size-4.5" />
                  </span>
                  <span className="rounded-full border bg-background px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    {badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{note}</p>
                <ol className="mt-5 space-y-3 border-t pt-5">
                  {steps.map((step, idx) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed">
                      <span className="grid size-5 shrink-0 place-items-center rounded-md border bg-muted text-[0.7rem] font-semibold text-foreground">
                        {idx + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="first-offer"
          eyebrow="Offers"
          title="Create your first offer"
          lead="An offer is one tier ladder plus the products it applies to. Open Tierly from your Shopify admin and click Create offer."
        >
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-base font-semibold">1. Choose what it applies to</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Target all products, a hand-picked list, or entire collections. Collection
                targeting stays live: products you add to that collection later start qualifying
                on their own.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-semibold">2. Build the ladder</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Each tier is a minimum quantity plus a discount. Three tiers is the sweet spot —
                enough to create a ladder, few enough to read at a glance. Mark one as{' '}
                <strong className="font-semibold text-foreground">Best value</strong> to anchor
                the choice.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {tierTypes.map(({ title, text }) => (
                  <div key={title} className="rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-semibold">3. Activate it</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Save, then set the offer to Active. On Pro you can also give it a start and end
                date for a seasonal or flash sale — outside that window the offer sits idle
                without you having to remember to switch it off.
              </p>
            </Card>
          </div>
        </Section>

        <Section
          id="storefront"
          eyebrow="Storefront"
          title="Where shoppers see it"
          lead="Three touchpoints, each doing a different job."
        >
          <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
            <Card className="overflow-hidden p-1.5">
              <div className="rounded-lg bg-muted/60 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Buy more, save more</p>
                  <span className="rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    Applied at checkout
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {[
                    { qty: 'Buy 3+', unit: '$26.10 each', save: 'Save 10%', best: false },
                    { qty: 'Buy 6+', unit: '$23.78 each', save: 'Save 18%', best: false },
                    { qty: 'Buy 12+', unit: '$21.75 each', save: 'Save 25%', best: true },
                  ].map(({ qty, unit, save, best }) => (
                    <li
                      key={qty}
                      className={cn(
                        'flex items-center justify-between gap-3 rounded-lg border bg-background px-4 py-3 text-sm shadow-sm',
                        best && 'ring-1 ring-ring',
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <CheckIcon className="size-4 shrink-0 text-muted-foreground" />
                        <span className="truncate font-medium text-foreground">{qty}</span>
                        <span className="truncate text-muted-foreground">{unit}</span>
                      </span>
                      <span className="shrink-0 font-semibold text-foreground">{save}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  An example of the price table block on a product page.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              {[
                {
                  icon: LayersIcon,
                  title: 'Product page',
                  text: 'The price table shows every tier with its real per-unit price, and highlights the row the shopper currently qualifies for as they change the quantity.',
                },
                {
                  icon: CartIcon,
                  title: 'Cart',
                  text: 'The optional cart upsell block tells a shopper how many more units unlock the next tier — the moment they are most likely to add one.',
                },
                {
                  icon: BoltIcon,
                  title: 'Checkout',
                  text: 'The discount appears as a line on the order summary, labelled with the offer name so the shopper knows exactly what they earned.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="p-5">
                  <div className="flex gap-3.5">
                    <span className="mt-0.5 inline-grid size-9 shrink-0 place-items-center rounded-lg border bg-muted text-foreground">
                      <Icon className="size-4.5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-9">{title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {text}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="stacking"
          eyebrow="Discounts"
          title="Working alongside your other discounts"
          lead="Shopify decides which automatic discount wins when several could apply. Tierly gives you the controls that decision depends on."
        >
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-base font-semibold">Combine-with settings</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                In Settings you choose whether volume pricing may combine with order discounts,
                other product discounts, and shipping discounts. Turn a category off and Shopify
                will pick only one of the two — which one depends on your other discount&rsquo;s
                own combine settings, so check both sides.
              </p>
            </Card>
            <Callout title="Testing tip">
              If a discount you expect is missing, temporarily pause your other automatic
              discounts and retest. If Tierly then applies, the conflict is a stacking rule
              rather than a problem with the offer itself.
            </Callout>
          </div>
        </Section>

        <Section
          id="plans"
          eyebrow="Billing"
          title="Free vs Pro"
          lead="The free plan is a real plan, not a trial — one active offer runs indefinitely with automatic checkout discounts and the storefront price table included."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {plans.map(({ name, price, cadence, features, featured }) => (
              <Card
                key={name}
                className={cn('p-6', featured && 'ring-1 ring-ring')}
              >
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
          id="analytics"
          eyebrow="Analytics"
          title="Reading your analytics"
          lead="Available on Pro. The dashboard answers one question: is volume pricing actually lifting your order value?"
        >
          <Card className="p-6">
            <div className="flex gap-3.5">
              <span className="mt-0.5 inline-grid size-9 shrink-0 place-items-center rounded-lg border bg-muted text-foreground">
                <ChartIcon className="size-4.5" />
              </span>
              <div className="min-w-0 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Tierly counts orders, units sold, discount given, and revenue for the last 30
                  days, attributed to orders where a volume discount applied.
                </p>
                <p>
                  Figures are stored as{' '}
                  <strong className="font-semibold text-foreground">daily totals</strong> for
                  your store — no individual customer or order records are kept. They update as
                  orders come in rather than in real time, so give a fresh order a few moments to
                  appear.
                </p>
              </div>
            </div>
          </Card>
        </Section>

        <Section
          id="troubleshooting"
          eyebrow="Troubleshooting"
          title="Common questions"
          lead="Nearly every support ticket we see is one of these six."
        >
          <div className="divide-y rounded-xl border bg-card">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </Section>

        <section className="border-t pt-14">
          <Card className="p-8 text-center md:p-12">
            <span className="inline-grid size-11 place-items-center rounded-xl border bg-muted text-foreground">
              <LifeBuoyIcon className="size-5" />
            </span>
            <h2 className="mx-auto mt-5 max-w-md text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Still stuck? Talk to a human.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              Tierly is built by a small team at {siteConfig.legalEntity}. Send us your store
              domain and what you expected to happen, and we will look at the actual offer.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
              >
                <MailIcon />
                Email support
              </a>
              <Link
                href="/tierly/privacy"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Privacy policy
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  </>
)

export default TierlyDocsPage
