import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Callout, Section } from '@/components/docs-shell'
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
  title: 'Solora Tierly — Help & Documentation',
  description:
    'How Solora Tierly applies quantity breaks at checkout, how to set it up on your theme, and what to check when a volume discount is not applying.',
  alternates: { canonical: '/tierly/docs' },
  openGraph: {
    title: 'Solora Tierly: Quantity Breaks — Help & Documentation | Solora',
    description:
      'How Solora Tierly applies quantity breaks at checkout, how to set it up on your theme, and what to check when a volume discount is not applying.',
    url: '/tierly/docs',
    images: [siteConfig.ogImage],
  },
}

const chapters = [
  { id: 'how-it-works', label: 'How Tierly works' },
  { id: 'setup', label: 'Add it to your theme' },
  { id: 'first-offer', label: 'Create your first offer' },
  { id: 'storefront', label: 'Where shoppers see it' },
  { id: 'appearance', label: 'Make it match your theme' },
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
      'If the table lands in the wrong place, set the Product page and Cart page CSS selectors under Placement — .product-form and .cart__footer are typical. Leave them blank to auto-detect.',
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

const blockSettings: { title: string; text: ReactNode }[] = [
  {
    title: 'Layout',
    text: (
      <>
        Render the tiers as a <strong className="font-semibold text-foreground">Table</strong> or as{' '}
        <strong className="font-semibold text-foreground">Cards (bundle picker)</strong>. A table
        reads like a price list; cards read like a choice between packs. Same data either way, so
        try both and keep whichever suits the product.
      </>
    ),
  },
  {
    title: 'Accent colour & corner radius',
    text: 'One colour drives the highlighted row, the Best value badge and the countdown, so the block picks up your brand without any CSS. Corner radius runs from 0 to 24px — square it off or round it to match your buttons.',
  },
  {
    title: 'Clickable tiers',
    text: 'On by default: clicking a tier sets the quantity field to that tier minimum, so a shopper reaches the saving in one tap. Turn it off if your theme uses an unusual quantity input. It applies to the price table and the vintage embed — the cart upsell has no equivalent.',
  },
  {
    title: '“Ends in” countdown',
    text: 'Appears on its own whenever the offer has an end date, so there is nothing to switch on. The prefix and the d / h / m unit letters are text settings, so it reads correctly in any language.',
  },
  {
    title: 'Every label is a text field',
    text: (
      <>
        Buy, Save, /ea, /item, Best value, the heading and all the cart-upsell wording are text
        settings —{' '}
        <strong className="font-semibold text-foreground">
          this is also how you translate the storefront
        </strong>
        . Tierly&rsquo;s admin is available in English, 日本語, Français, Deutsch, Español and
        Português (Brasil), set under Settings → Language or following your Shopify Admin, but that
        setting does <strong className="font-semibold text-foreground">not</strong> translate the
        storefront blocks. They render exactly what you type into these fields.
      </>
    ),
  },
  {
    title: 'Cart upsell',
    text: 'The cart block carries its own heading, accent colour and corner radius, plus a Show total savings toggle so the cart can mirror the figure shoppers meet at checkout.',
  },
]

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'The price on my product page did not change',
    a: 'That is expected. Tierly never rewrites your product price — the tier ladder is shown by the price table block, and the actual discount is applied by Shopify at checkout. Add the product to the cart at a qualifying quantity and you will see the discount line appear.',
  },
  {
    q: 'The discount is not applied at checkout',
    a: (
      <>
        Work down this list — it is ordered by how often each one turns out to be the cause.
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            The offer is set to{' '}
            <strong className="font-semibold text-foreground">Active</strong>, and if you gave it a
            schedule, today falls inside the start and end dates.
          </li>
          <li>The cart quantity has actually reached the first tier.</li>
          <li>
            The product is inside the offer target and not in its exclusions. A collection target
            only covers products currently in that collection.
          </li>
          <li>
            Another automatic product discount is winning.{' '}
            <strong className="font-semibold text-foreground">
              Combine with other product discounts
            </strong>{' '}
            is off by default — see the stacking section above.
          </li>
          <li>
            Another offer is overriding this one. Open{' '}
            <strong className="font-semibold text-foreground">
              &ldquo;Which offer applies?&rdquo;
            </strong>{' '}
            on the dashboard to see which.
          </li>
          <li>
            The checkout discount itself is missing.{' '}
            <strong className="font-semibold text-foreground">Store health</strong> says so, and{' '}
            <strong className="font-semibold text-foreground">
              Settings → Troubleshooting → Reconnect storefront
            </strong>{' '}
            rebuilds it.
          </li>
        </ol>
      </>
    ),
  },
  {
    q: 'The block is on my product page but shows nothing',
    a: 'In the theme editor — and only there, never for shoppers — Tierly prints the reason it rendered nothing, so you rarely have to guess. It will tell you that no pricing rules have been published to the store yet, that this product has no rule of its own and no store-wide rule covers it, that the product is excluded from your store-wide rule, that the end date has already passed, or that the tiers cannot be shown in the currency the storefront is currently displaying. On a vintage theme it also reports when it could not read the product on the page, when every tier works out at or above the current price, and when the page is neither a product nor a cart page.',
  },
  {
    q: 'The price table block does not appear in the theme editor',
    a: 'App blocks only show on Online Store 2.0 themes, and only after the app is installed on the store. If the Apps group is missing when you click Add block, your theme is a vintage 1.0 theme — use the app embed route instead.',
  },
  {
    q: 'Some tiers vanish when a shopper switches currency',
    a: 'Percentage tiers convert cleanly, so they follow the shopper into any currency you sell in through Shopify Markets. Fixed amount off and fixed price per item cannot — $5 off must never quietly become ¥5 off. So whenever the storefront is showing a currency other than your own, Tierly hides those tiers, both on the price table and at checkout. An offer built entirely from amount or fixed-price tiers therefore shows those shoppers nothing at all. If you sell across currencies, build the ladder from percentage tiers.',
  },
  {
    q: 'The Tierly discount disappeared from my Shopify Discounts list',
    a: (
      <>
        Every offer you run is applied through a single automatic discount in your Shopify admin,
        called{' '}
        <strong className="font-semibold text-foreground">Tierly volume pricing</strong>. Deleting
        it stops every offer at once. Tierly notices and rebuilds it on its own, and{' '}
        <strong className="font-semibold text-foreground">
          Settings → Troubleshooting → Reconnect storefront
        </strong>{' '}
        forces it immediately — recreating the discount and re-pushing your live offers. The badge
        beside that button tells you whether it is currently working, and a rebuild that fails shows
        you the actual error rather than a generic message.
      </>
    ),
  },
  {
    q: 'A collection I target changed — do I need to re-save the offer?',
    a: 'No. Tierly listens for collection updates and resyncs targeting on its own. Products added to the collection start qualifying without any action from you.',
  },
  {
    q: 'Does Tierly slow my storefront down?',
    a: 'It depends which path your theme uses, and neither one blocks the page. On an Online Store 2.0 theme the price table block is rendered server-side in Liquid, so it arrives with the rest of the page and causes no layout shift. On a vintage theme the app embed loads a small deferred script that reads your product and cart JSON after the page has painted, so the table appears a moment after everything else. Either way there is no blocking third-party script on your product pages.',
  },
  {
    q: 'What happens to my discounts if I uninstall the app?',
    a: 'The Shopify Function is removed with the app, so volume discounts stop applying immediately and your products return to their normal prices. Your store data is scheduled for deletion — see the privacy policy.',
  },
]

const combineDefaults: { label: string; state: 'On' | 'Off'; text: string }[] = [
  {
    label: 'Order discounts',
    state: 'On',
    text: 'Cart-total discounts, like $10 off the order, apply alongside volume pricing.',
  },
  {
    label: 'Other product discounts',
    state: 'Off',
    text: 'Off by default so a product is never discounted twice by accident. Turn it on if you run another product-level automatic discount — including a bundle app — and want both to apply.',
  },
  {
    label: 'Shipping discounts',
    state: 'On',
    text: 'Free or reduced shipping applies alongside volume pricing.',
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
      'Product & collection targeting, with exclusions',
      'Automatic checkout discounts',
      'Storefront price table & cart upsell',
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
      'Variant-level targeting',
      'Analytics, including per-offer revenue',
      'Priority live chat support',
      '7-day free trial',
    ],
    featured: true,
  },
]

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
            <p className="mt-3 text-sm text-muted-foreground">
              Listed on the Shopify App Store as{' '}
              <strong className="font-semibold text-foreground">
                Solora Tierly: Quantity Breaks
              </strong>
              .
            </p>
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
          lead="Installing the app is enough for discounts to apply at checkout. Adding the block is what makes the savings visible on the product page — and that is where the extra units come from. The Finish setup checklist on your dashboard has an “Add it for me” button that opens the theme editor in the right place, and the Store health card afterwards tells you whether the block is on your published theme."
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

          <div className="mt-4">
            <Callout tone="warn" title="Enable one path, not both">
              On an Online Store 2.0 theme, use the app blocks. The vintage embed exists for themes
              that cannot host them. If both end up switched on, Tierly suppresses the embed so
              nothing renders twice.
            </Callout>
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
                on their own. On Pro you can go finer and target{' '}
                <strong className="font-semibold text-foreground">individual variants</strong>, for
                when only the 500ml size should carry a volume break.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Targeting all products or collections also reveals an{' '}
                <strong className="font-semibold text-foreground">Exclude products</strong> picker,
                so you can carve out the items that should never be discounted without rebuilding
                the offer around them.
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
                without you having to remember to switch it off. Give it an end date and the price
                table adds an{' '}
                <strong className="font-semibold text-foreground">&ldquo;Ends in&rdquo;</strong>{' '}
                countdown on its own.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Set a <strong className="font-semibold text-foreground">Checkout label</strong>{' '}
                while you are here. It is both what shoppers read on the order summary and what
                per-offer analytics attributes to.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-semibold">
                4. When two offers cover the same product
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Only one ladder ever applies to a product, and it is resolved the same way every
                time:{' '}
                <strong className="font-semibold text-foreground">
                  most specific wins — variant, then product, then collection, then all products
                </strong>
                . Only when two offers are equally specific does{' '}
                <strong className="font-semibold text-foreground">Priority</strong> break the tie,
                higher winning (0&ndash;1000; leave it at 0 unless offers actually overlap), and
                after that the most recently created offer.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You never have to guess:{' '}
                <strong className="font-semibold text-foreground">
                  &ldquo;Which offer applies?&rdquo;
                </strong>{' '}
                on the dashboard tells you the answer for any product, and shows what it overrode.
              </p>
            </Card>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Building a lot of these at once?{' '}
            <strong className="font-semibold text-foreground">Import CSV</strong> on the offers page
            brings ladders in as paused drafts for you to review before anything goes live, and{' '}
            <strong className="font-semibold text-foreground">Export CSV</strong> takes them back
            out.
          </p>
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
                  text: (
                    <>
                      The discount appears as a line on the order summary, labelled{' '}
                      <strong className="font-semibold text-foreground">
                        &ldquo;Volume discount — 6+&rdquo;
                      </strong>{' '}
                      by default. Set a{' '}
                      <strong className="font-semibold text-foreground">Checkout label</strong> on
                      the offer to say something better — &ldquo;Bulk savings unlocked 🎉&rdquo; —
                      and Shopify appends the amount itself. Your offer{' '}
                      <em>name</em> is never shown to shoppers; it is for you.
                    </>
                  ),
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
          id="appearance"
          eyebrow="Appearance"
          title="Make it match your theme"
          lead="The blocks ship deliberately neutral so they inherit your theme rather than fight it. Every visual and textual choice is a theme setting you change in Online Store → Themes → Customize — no code, no support ticket."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {blockSettings.map(({ title, text }) => (
              <div key={title} className="rounded-lg border bg-muted/40 p-4">
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="stacking"
          eyebrow="Discounts"
          title="Working alongside your other discounts"
          lead="Shopify decides which automatic discount wins when several could apply. Tierly gives you the controls that decision depends on."
        >
          <div className="space-y-4">
            <Callout
              tone="warn"
              title="&ldquo;Combine with other product discounts&rdquo; starts off"
            >
              Tierly ships with that one switch off so a product cannot be discounted twice by
              accident. If you run another automatic product discount and expect both to apply,
              turn it on in{' '}
              <strong className="font-semibold text-foreground">
                Settings → Discount stacking
              </strong>
              . This is the most common reason a discount a merchant expected to stack does not.
            </Callout>

            <Card className="p-6">
              <h3 className="text-base font-semibold">Combine-with settings</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Settings gives you one switch per discount category. These are the defaults:
              </p>
              <ul className="mt-5 space-y-3 border-t pt-5">
                {combineDefaults.map(({ label, state, text }) => (
                  <li key={label} className="flex gap-3">
                    <span
                      className={cn(
                        'mt-0.5 h-fit shrink-0 rounded-full border px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide',
                        state === 'On'
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {state}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <strong className="font-semibold text-foreground">{label}.</strong> {text}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t pt-5 text-sm leading-relaxed text-muted-foreground">
                Turn a category off and Shopify will pick only one of the two — which one depends
                on your other discount&rsquo;s own combine settings, so check both sides.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-semibold">Also running Mixly?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Mixly, our bundle app, ships with{' '}
                <strong className="font-semibold text-foreground">
                  Combine with product discounts
                </strong>{' '}
                on. Tierly&rsquo;s equivalent switch is off. If you run both, turn Tierly&rsquo;s on
                — otherwise a shopper who qualifies for a bundle{' '}
                <em>and</em> a quantity break only gets one of them. Mixly&rsquo;s Settings page
                links merchants straight to this section for exactly this reason.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                <Link
                  href="/mixly/docs#stacking"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  How stacking works in Mixly
                </Link>
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

          <div className="mt-4">
            <Callout title="Downgrading pauses offers — it never deletes them">
              Move back to Free and nothing is removed. Tierly keeps one Free-eligible offer
              running, pauses the rest, and the dashboard tells you which ones. An offer using a
              Pro-only trait — a schedule, or variant-level targeting — is never the one kept, and
              its dates are preserved rather than stripped, so a Black Friday ladder does not come
              back running all year round. If every active offer uses a Pro trait, they all pause
              until you upgrade or edit one.
            </Callout>
          </div>
        </Section>

        <Section
          id="analytics"
          eyebrow="Analytics"
          title="Reading your analytics"
          lead="Available on Pro. The dashboard answers one question: is volume pricing actually lifting your order value?"
        >
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex gap-3.5">
                <span className="mt-0.5 inline-grid size-9 shrink-0 place-items-center rounded-lg border bg-muted text-foreground">
                  <ChartIcon className="size-4.5" />
                </span>
                <div className="min-w-0 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Tierly counts orders, units sold, discount given and revenue over a window you
                    choose —{' '}
                    <strong className="font-semibold text-foreground">7, 30 or 90 days</strong> —
                    attributed to orders where a volume discount applied. Each figure is shown
                    against the previous window of the same length. Two derived numbers sit
                    underneath:{' '}
                    <strong className="font-semibold text-foreground">average order value</strong>,
                    and{' '}
                    <strong className="font-semibold text-foreground">return on discount</strong>{' '}
                    (revenue earned per $1 given back).
                  </p>
                  <p>
                    <strong className="font-semibold text-foreground">By offer.</strong> Tierly
                    also keeps a daily rollup per offer. Attribution runs off the{' '}
                    <strong className="font-semibold text-foreground">checkout label</strong>: give
                    an offer a custom label and its orders are counted against it. An offer with no
                    custom label still counts in your store totals but cannot be separated out — it
                    shares the default{' '}
                    <strong className="font-semibold text-foreground">
                      &ldquo;Volume discount — N+&rdquo;
                    </strong>{' '}
                    line with every other unlabelled offer.
                  </p>
                  <p>
                    Figures are stored as{' '}
                    <strong className="font-semibold text-foreground">daily totals</strong> — per
                    store, and per offer for labelled offers. No individual customer or order
                    records are kept. They update as each order&rsquo;s webhook arrives, so give a
                    fresh order a few moments.
                  </p>
                </div>
              </div>
            </Card>
            <Callout title="Label an offer before you need the data">
              Attribution is recorded when the order comes in and cannot be backfilled — an offer
              you label today will not gain last month&rsquo;s orders.
            </Callout>
          </div>
        </Section>

        <Section
          id="troubleshooting"
          eyebrow="Troubleshooting"
          title="Common questions"
          lead="Nearly every support ticket we see is one of these."
        >
          <div className="divide-y rounded-xl border bg-card">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">{a}</div>
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
              domain and what you expected to happen, and we will look at the actual offer. If it is
              not a problem but something you wish Tierly did, open{' '}
              <strong className="font-semibold text-foreground">Feature Requests</strong> in the app
              — you can suggest it there and vote on what other merchants have already asked for.
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
