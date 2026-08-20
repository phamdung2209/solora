import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

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
  PackageIcon,
  SlidersIcon,
} from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Mixly — Help & Documentation',
  description:
    'How Mixly bundles work, how to add the bundle block to your theme, and what to check when a bundle discount is not applying at checkout.',
  alternates: { canonical: '/mixly/docs' },
  openGraph: {
    title: 'Mixly — Help & Documentation | Solora',
    description:
      'How Mixly bundles work, how to add the bundle block to your theme, and what to check when a bundle discount is not applying at checkout.',
    url: '/mixly/docs',
  },
}

const chapters = [
  { id: 'how-it-works', label: 'How Mixly works' },
  { id: 'bundle-types', label: 'The three bundle types' },
  { id: 'discounts', label: 'Discount modes' },
  { id: 'setup', label: 'Add it to your theme' },
  { id: 'first-bundle', label: 'Create your first bundle' },
  { id: 'storefront', label: 'Where shoppers see it' },
  { id: 'priority', label: 'When bundles overlap' },
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
    text: 'Add the bundle block to your product page.',
  },
  {
    icon: LifeBuoyIcon,
    href: '#troubleshooting',
    title: 'Troubleshooting',
    text: 'Bundle discount not showing at checkout? Start here.',
  },
]

const steps = [
  {
    title: 'You define a bundle rule',
    text: 'In the Mixly admin you pick the products that belong together, choose the kind of bundle, and set the discount shoppers get for taking it. That rule is the whole bundle — there is nothing else to build.',
  },
  {
    title: 'Shoppers see the offer on your storefront',
    text: 'The Mixly block on your product page shows the bundle with real prices, the total, and what the shopper saves — with one button that adds every product in it to the cart.',
  },
  {
    title: 'Shopify applies the discount at checkout',
    text: 'Mixly runs as a Shopify Function. Once the cart holds the qualifying products the discount is applied automatically — no code for the shopper to enter, nothing for you to approve.',
  },
]

const bundleTypes = [
  {
    admin: 'Frequently Bought Together',
    description: 'Bundle complementary products together with one discount.',
    example: 'e.g. buy a phone case + screen protector, save 10%.',
    requirement: 'Needs at least one product. Available on every plan, including Free.',
  },
  {
    admin: 'Build Your Own',
    description: 'Let customers pick their own combination from an eligible set.',
    example: 'e.g. pick any 3 shirts from this collection, get 15% off.',
    requirement: 'Needs a list of eligible products and a Minimum items of 2 or more.',
  },
  {
    admin: 'BOGO',
    description: 'Discount or free item when customers buy the required items.',
    example: 'e.g. buy a jacket, get a hat free.',
    requirement:
      'Splits its products into Customer buys and Customer gets, and needs at least one of each.',
  },
]

const typeNames = [
  { admin: 'Frequently Bought Together', editor: 'Frequently bought together' },
  { admin: 'Build Your Own', editor: 'Mix & match' },
  { admin: 'BOGO', editor: 'Buy X get Y' },
]

const discountModes = [
  {
    title: 'Percentage off',
    text: 'A share taken off the qualifying products. Capped at 100 — Mixly will not let you save a value above it.',
  },
  {
    title: 'Fixed amount off',
    text: "A flat amount taken off the qualifying items' total. Useful when your margin is a flat figure rather than a ratio.",
  },
  {
    title: 'Fixed bundle price',
    text: "The bundle's total price — not a per-item price. Set 49 on a three-product bundle and the shopper pays 49 for all three.",
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
      'Click Add block in the product information area, open the Apps group, and pick Mixly bundle offer.',
      'Drag it where you want it — just under the add-to-cart button works well — then Save.',
      'Optional: switch the template selector to Cart, add the Mixly cart bundle block, and set Maximum offers to show (1 to 3, two by default).',
    ],
  },
  {
    icon: SlidersIcon,
    badge: 'Vintage themes',
    title: 'Online Store 1.0 themes',
    note: 'Older themes such as Debut or Brooklyn, and heavily customised builds that cannot host app blocks.',
    steps: [
      'Go to Online Store → Themes → Customize.',
      'Open App embeds in the left sidebar.',
      'Toggle on Mixly (vintage themes), then Save.',
      'Mixly inserts itself after your add-to-cart form and your cart form automatically — there is no block to position.',
      'If it lands in the wrong place, put a CSS selector in Product page: CSS selector to insert after (for example .product-form) or the matching Cart page field (for example .cart__footer).',
      'Leaving the embed on while you switch to a newer theme is safe: it hides itself on any page where a Mixly app block is already rendering.',
    ],
  },
]

const productRules = [
  'Every bundle needs at least one product, and every quantity is a whole number of 1 or more.',
  'Each product appears once. Add the same one twice and Mixly merges the entries; add both a single variant and the whole product and the whole product wins.',
  'A BOGO bundle needs at least one product on the Customer buys side and one on the Customer gets side.',
  'A Build Your Own bundle needs a Minimum items of 2 or more — one item is not a combination.',
]

const firstBundleCards: { title: string; body: ReactNode; rules?: string[]; footer?: string }[] = [
  {
    title: '1. Give it a name shoppers can read',
    body: (
      <>
        The name is not just for you. It doubles as the{' '}
        <strong className="font-semibold text-foreground">checkout label</strong> shoppers see next
        to their discount on the order summary, so{' '}
        <em>Summer skincare set</em> reads a lot better there than{' '}
        <em>fbt test 2</em>.
      </>
    ),
  },
  {
    title: '2. Pick the bundle type',
    body: (
      <>
        Frequently Bought Together for a fixed set of products, Build Your Own when shoppers choose
        their own combination from an eligible list, BOGO when buying one thing unlocks another. On
        the Free plan only Frequently Bought Together is available.
      </>
    ),
  },
  {
    title: '3. Add the products',
    body: (
      <>
        Use Add products to pick whole products or specific variants. A few rules Mixly enforces as
        you go:
      </>
    ),
    rules: productRules,
    footer:
      'If one of these products is later deleted from your store, Mixly flags it on your home screen and names both the bundle and the missing product. A bundle that can still discount something keeps running with fewer products; one that cannot is paused rather than left to fail quietly at checkout.',
  },
  {
    title: '4. Set the discount, then watch the preview',
    body: (
      <>
        Choose a mode and a value. The{' '}
        <strong className="font-semibold text-foreground">Live preview</strong> beside the form is
        not a mockup — it builds a real checkout order summary from the actual prices of the
        products you added, showing the line items, the total savings and the total a shopper will
        pay. When the number looks right, set the bundle to{' '}
        <strong className="font-semibold text-foreground">Active</strong>.
      </>
    ),
  },
]

const storefrontSpots: { icon: typeof LayersIcon; title: string; text: ReactNode }[] = [
  {
    icon: LayersIcon,
    title: 'Product page',
    text: 'The bundle offer block lists every product in the bundle, badges the one being viewed as This item, and shows the total next to what the shopper saves. One button adds the whole bundle to the cart. On a Build Your Own bundle it also counts how many more products are needed to unlock the offer.',
  },
  {
    icon: CartIcon,
    title: 'Cart page',
    text: 'The optional cart bundle block surfaces the offers this cart is closest to completing — up to three, two by default — so a shopper one product short can finish the bundle without going back to browsing.',
  },
  {
    icon: BoltIcon,
    title: 'Checkout',
    text: (
      <>
        The discount appears as its own line on the order summary, carrying the{' '}
        <strong className="font-semibold text-foreground">name you gave the bundle</strong>. There
        is nothing for the shopper to type and nothing for you to approve.
      </>
    ),
  },
]

const blockReasons = [
  'Nothing published yet. Open Mixly and save a bundle.',
  'No bundle is live. Activate one in Mixly.',
  'This product is in no bundle. Add it in Mixly.',
  'Its bundle is another type. Set “Bundle type to show” to “Any”.',
  'Fixed-amount bundles cannot show in this currency. Switch the bundle to a percentage.',
  'A product in the bundle is unavailable — deleted, or not published to the Online Store sales channel.',
  'The discount saves nothing at this price. Raise it in Mixly.',
  'No live bundle applies to this product.',
  'Cart is empty. Add a product to preview this.',
  'No live bundle applies to this cart.',
  'Shows on product and cart pages only.',
  'Buy X get Y shows on the product page, not the cart, on vintage themes.',
]

const stackingSettings: { label: string; state: 'On' | 'Off'; text: string }[] = [
  {
    label: 'Combine with product discounts',
    state: 'On',
    text: 'Other product discounts, including volume pricing apps, can apply alongside a bundle discount.',
  },
  {
    label: 'Combine with order discounts',
    state: 'On',
    text: 'Cart-level discounts, such as $10 off the order, can apply alongside a bundle discount.',
  },
  {
    label: 'Combine with shipping discounts',
    state: 'On',
    text: 'Free or discounted shipping can apply alongside a bundle discount.',
  },
]

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

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'The price on my product page did not change',
    a: 'That is expected. Mixly never rewrites your product prices — the bundle block shows what the combination costs, and the actual discount is applied by Shopify at checkout. Add the bundle to the cart and you will see the discount line appear.',
  },
  {
    q: 'The Mixly block is on my theme but shows nothing',
    a: 'Open the theme editor and look at the spot where the block sits. Mixly prints a short note there — visible only in the editor — naming the exact reason: no bundle saved yet, no bundle live, this product is in no bundle, the block is filtered to a different bundle type, a product in the bundle is unavailable, the discount saves nothing at that price, or the cart currency does not match. Fix what the note names and the block appears.',
  },
  {
    q: 'The discount is not applying at checkout',
    a: 'Work down this list in order: (1) the bundle is Active, not paused; (2) the cart really does hold every required product at the required quantity — a Build Your Own bundle needs its Minimum items, a BOGO needs at least one Buy product and one Get product; (3) the home screen says the checkout discount is live, not pending, off or gone; (4) if the bundle uses a fixed amount or a fixed bundle price, the shopper is checking out in the same currency your bundles were priced in; (5) the fixed price you set is genuinely lower than the products already cost; (6) another automatic discount is winning — see the stacking section above.',
  },
  {
    q: 'My home screen says the checkout discount is pending, turned off, or gone',
    a: 'Mixly creates one automatic discount in Shopify the first time you activate a bundle, and every bundle you run flows through that single discount. If it is deleted or switched off in Shopify → Discounts, every bundle stops discounting at once. The Bundle status panel on the home screen flags it, and Reconnect discount recreates it in one click.',
  },
  {
    q: 'I do not see the Order column on my bundles list',
    a: 'It only appears when two or more active bundles cover the same product or variant. With no overlap, order could not change what a shopper gets, so Mixly leaves the column out rather than asking you to rank things that never compete.',
  },
  {
    q: 'I deleted a product that was in a bundle',
    a: 'Mixly notices and tells you on the home screen, naming the bundle and the missing product. If the bundle can still discount something without it, it keeps running with fewer products. If it cannot — a Frequently Bought Together bundle that lost one of its required products, for instance — Mixly pauses it rather than letting it silently fail. Edit the bundle, swap in another product, then reactivate.',
  },
  {
    q: 'My theme uses a cart drawer instead of a cart page',
    a: 'The cart bundle block is a theme app block enabled on the Cart page template only, so a slide-out drawer will not show it. Everything else is unaffected: the product-page block still renders and the discount still applies at checkout. Shoppers who navigate to /cart directly will see it.',
  },
  {
    q: 'What happens to my bundles if I uninstall Mixly?',
    a: (
      <>
        The Shopify Function is removed with the app, so bundle discounts stop applying immediately
        and the storefront blocks stop rendering. Your store data is queued for deletion — see the{' '}
        <Link href="/mixly/privacy" className="font-medium text-foreground underline">
          privacy policy
        </Link>{' '}
        for exactly what is removed and when.
      </>
    ),
  },
]

const MixlyDocsPage = () => (
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
              Documentation
            </span>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Getting the most out of Mixly
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A Mixly bundle is a rule, not a product. Nothing is created in your catalogue, no SKU is
          added, and the price on your product page never changes — Shopify applies the saving at
          checkout the moment a cart qualifies. Everything below follows from that.
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
          title="How Mixly works"
          lead="Mixly turns “these products go together” into an automatic checkout discount. Three moving parts, and only the first one needs your attention."
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
              Mixly does <strong className="font-semibold text-foreground">not</strong> create a
              bundle product. Nothing new appears in your product list, there is no bundle-level
              inventory to keep in sync, and the price shown on your product page never changes.
              Shoppers add your ordinary products to their cart; the saving appears in the cart and
              at checkout, once the cart matches the rule. This is how Shopify Functions work, and
              it is why shoppers never need a discount code.
            </Callout>
          </div>
        </Section>

        <Section
          id="bundle-types"
          eyebrow="Bundles"
          title="The three bundle types"
          lead="Every bundle is one of three shapes. Pick the one that matches how you want shoppers to combine things — the discount modes below work with all three."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {bundleTypes.map(({ admin, description, example, requirement }) => (
              <Card key={admin} className="flex flex-col p-6">
                <span className="inline-grid size-9 place-items-center rounded-lg border bg-muted text-foreground">
                  <PackageIcon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{admin}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
                  {example}
                </p>
                <p className="mt-5 border-t pt-5 text-sm leading-relaxed text-muted-foreground">
                  {requirement}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-6 rounded-lg border bg-muted/40 p-6">
            <h3 className="text-base font-semibold">The same three types, two sets of names</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              The theme editor labels the types with storefront-facing names rather than the ones
              in the Mixly admin. Nothing behaves differently — only the wording changes.
            </p>
            <div className="mt-5 grid gap-1 border-b pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-2">
              <span>Mixly admin</span>
              <span>Theme editor</span>
            </div>
            <ul className="divide-y text-sm">
              {typeNames.map(({ admin, editor }) => (
                <li key={admin} className="grid gap-1 py-2.5 sm:grid-cols-2">
                  <span className="font-medium text-foreground">{admin}</span>
                  <span className="text-muted-foreground">{editor}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t pt-5 text-sm leading-relaxed text-muted-foreground">
              The block&rsquo;s{' '}
              <strong className="font-semibold text-foreground">Bundle type to show</strong>{' '}
              dropdown uses those storefront names. Leave it on{' '}
              <strong className="font-semibold text-foreground">Any (first match)</strong> and no
              filter is applied — the block shows the first live bundle that covers the product,
              preferring a Frequently bought together bundle and falling back to any other type.
              Pick a specific type and the block will only ever render that one.
            </p>
          </div>
        </Section>

        <Section
          id="discounts"
          eyebrow="Discounts"
          title="Discount modes"
          lead="Three modes, and every bundle type can use any of them. The third one is the one merchants misread."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {discountModes.map(({ title, text }) => (
              <div key={title} className="rounded-lg border bg-muted/40 p-4">
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <Callout title="“Fixed bundle price” is the total, not the price per item">
              Mixly says so under the field —{' '}
              <em>the bundle&rsquo;s total price, not a per-item price</em> — and it is still the
              single most common misreading. If your three products normally come to $72 and you
              want the bundle at $59, enter{' '}
              <strong className="font-semibold text-foreground">59</strong>, not 19.67.
            </Callout>

            <Callout title="On a BOGO, 100% off means the Get item is free">
              A percentage discount on a BOGO bundle applies to the Customer gets side. Set it to
              100 and the shopper pays nothing for that item — that is how you build a true buy one,
              get one free offer. Anything below 100 discounts the Get item rather than giving it
              away.
            </Callout>

            <Callout tone="warn" title="Selling in more than one currency?">
              A money amount only means something in the currency it was set in, so when a
              shopper&rsquo;s cart currency differs from the one your bundles are priced in, Mixly
              hides the money-based bundles — fixed amount off and fixed bundle price — and the
              checkout Function will not apply them either. Percentage bundles are unaffected and
              work in every currency. The theme editor tells you plainly when this is what is
              happening:{' '}
              <em>
                Fixed-amount bundles cannot show in this currency. Switch the bundle to a
                percentage.
              </em>
            </Callout>

            <Callout title="A fixed price that saves nothing is flagged when you save">
              If the price you enter is not actually lower than what the products already cost,
              Mixly warns you:{' '}
              <em>
                This fixed price isn&rsquo;t lower than the items&rsquo; price, so the discount
                won&rsquo;t apply at checkout.
              </em>{' '}
              The bundle still saves — the warning is not a wall — but nothing will be discounted
              until you lower the price.
            </Callout>
          </div>
        </Section>

        <Section
          id="setup"
          eyebrow="Setup"
          title="Add it to your theme"
          lead="Activating a bundle is enough for the discount to apply at checkout. Adding the block is what makes the offer visible before the cart — and that is where the extra items come from."
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

          <div className="mt-6 space-y-4">
            <Callout tone="warn" title="Cart drawers are not supported">
              The cart bundle block is enabled on the{' '}
              <strong className="font-semibold text-foreground">Cart page template only</strong>. If
              your theme opens a slide-out drawer instead of navigating to a cart page, shoppers
              will not see it. Your product-page block and your checkout discount are unaffected —
              only the cart-side nudge goes missing.
            </Callout>

            <Callout title="On a vintage theme, Buy X get Y is product-page only">
              The vintage embed covers all three bundle types on the product page, but its cart
              nudge only handles Frequently bought together and Mix &amp; match. Mixly says as much
              in the theme editor:{' '}
              <em>Buy X get Y shows on the product page, not the cart, on vintage themes.</em>
            </Callout>

            <Callout title="Step 3 of the setup checklist never ticks on a vintage theme">
              The <strong className="font-semibold text-foreground">Finish setup</strong> checklist
              on your Mixly home screen has four steps, and step 3 —{' '}
              <em>Add Mixly to your product page</em> — checks for exactly one thing: the{' '}
              <strong className="font-semibold text-foreground">Mixly bundle offer</strong> app
              block being active on your theme. The vintage app embed is a different extension, so
              it does not count towards it. If you are on a vintage theme, expect step 3 to sit
              unticked forever even though everything is working. Trust step 4 instead — a real
              cart, with the discount showing at checkout — then dismiss the checklist.
            </Callout>
          </div>
        </Section>

        <Section
          id="first-bundle"
          eyebrow="Bundles"
          title="Create your first bundle"
          lead="Open Mixly from your Shopify admin and click Create bundle. Four decisions, and the preview shows you the result of all of them before you go live."
        >
          <div className="space-y-4">
            {firstBundleCards.map(({ title, body, rules, footer }) => (
              <Card key={title} className="p-6">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                {rules && (
                  <ul className="mt-5 space-y-2.5 border-t pt-5 text-sm">
                    {rules.map((rule) => (
                      <li key={rule} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {footer && (
                  <p className="mt-5 border-t pt-5 text-sm leading-relaxed text-muted-foreground">
                    {footer}
                  </p>
                )}
              </Card>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            From the bundles list you can pause, duplicate or delete any bundle. Pausing takes it
            off your storefront and out of checkout without losing the setup, and duplicating is the
            quickest way to build a second bundle from one that already works.
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
                  <p className="text-sm font-semibold">Frequently bought together</p>
                  <span className="rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    Applied at checkout
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {[
                    { name: 'Cotton crew tee', note: 'This item', price: '$28.00' },
                    { name: 'Everyday chinos', note: 'Sand, 32', price: '$54.00' },
                    { name: 'Canvas belt', note: 'Tan', price: '$18.00' },
                  ].map(({ name, note, price }) => (
                    <li
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-lg border bg-background px-4 py-3 text-sm shadow-sm"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <CheckIcon className="size-4 shrink-0 text-muted-foreground" />
                        <span className="truncate font-medium text-foreground">{name}</span>
                        <span className="truncate text-muted-foreground">{note}</span>
                      </span>
                      <span className="shrink-0 text-muted-foreground">{price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-1.5 border-t pt-4 text-sm">
                  <p className="flex items-center justify-between">
                    <span className="text-muted-foreground">You save 15% in total</span>
                    <span className="font-medium text-foreground">&minus;$15.00</span>
                  </p>
                  <p className="flex items-center justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold tracking-tight">$85.00</span>
                  </p>
                </div>
                <p className="mt-5 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
                  Add bundle to cart
                </p>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  An example of the bundle offer block on a product page.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              {storefrontSpots.map(({ icon: Icon, title, text }) => (
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

          <Card className="mt-4 p-6">
            <h3 className="text-base font-semibold">Making the block match your theme</h3>
            <div className="mt-1.5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Every Mixly block carries the same handful of appearance settings in the theme
                editor: an{' '}
                <strong className="font-semibold text-foreground">accent colour</strong>, a{' '}
                <strong className="font-semibold text-foreground">corner radius</strong> from 0 to
                24px, and switches for product images and the cart-progress line. Mixly picks a
                readable text colour against whichever accent you choose, so a dark brand colour
                does not leave you with unreadable buttons.
              </p>
              <p>
                Headings are per type — one for Frequently bought together, one for Mix &amp; match,
                one for Buy X get Y — so the wording can suit the offer rather than being one
                compromise across all three.
              </p>
              <p>
                Everything else the block says is a text field too, gathered under{' '}
                <strong className="font-semibold text-foreground">
                  Text (translate to your language)
                </strong>{' '}
                — Total, You save, Add bundle to cart, This item, free, the add-to-cart error
                message, and the rest. The block renders exactly what you type, so those fields are
                also how you translate the storefront into your shoppers&rsquo; language.
              </p>
            </div>
          </Card>

          <div className="mt-4">
            <Callout title="Why is my block showing nothing?">
              <p>
                Open the theme editor and look at where the block sits. Mixly prints a short note
                there tagged{' '}
                <strong className="font-semibold text-foreground">
                  Mixly &middot; only you can see this
                </strong>{' '}
                — it is invisible to shoppers — naming the exact reason it is empty. These are the
                reasons it can give:
              </p>
              <ul className="mt-3 space-y-1.5">
                {blockReasons.map((reason) => (
                  <li key={reason} className="flex gap-2.5">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                When a product in the bundle cannot be resolved, the note also names the handle that
                is blocking it, so you know which one to fix.
              </p>
            </Callout>
          </div>
        </Section>

        <Section
          id="priority"
          eyebrow="Overlap"
          title="When two bundles cover the same product"
          lead="Most stores never run into this. When you do, Mixly gives you an Order column — and it does much less than its name suggests."
        >
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-base font-semibold">The Order column appears on demand</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Your bundles list only grows an{' '}
                <strong className="font-semibold text-foreground">Order</strong> column once two or
                more <em>active</em> bundles cover the same product or variant. Until that happens,
                ordering could not change what any shopper gets, so the control stays hidden rather
                than inviting you to rank things that never compete. Once it appears, Move up and
                Move down set the order, and the list saves as you go.
              </p>
            </Card>

            <Callout tone="warn" title="Order is a tiebreaker, not a ranking">
              <p>Mixly says it plainly above the list:</p>
              <p className="mt-2 border-l-2 pl-3 italic">
                These bundles share products. Order only matters as a tiebreaker when two bundles
                would offer the exact same discount.
              </p>
              <p className="mt-3">
                A bundle sitting higher in the list does{' '}
                <strong className="font-semibold text-foreground">not</strong> automatically win.
                Shopify looks at what each bundle would actually take off the cart in front of it
                and applies the better deal for the shopper. Order only decides which one runs when
                the two would save exactly the same amount. So if a bundle keeps losing and you want
                it to win, make it the better offer — moving it up will not do it.
              </p>
            </Callout>
          </div>
        </Section>

        <Section
          id="stacking"
          eyebrow="Discounts"
          title="Working alongside your other discounts"
          lead="Shopify decides which automatic discounts can apply together. Mixly gives you the three switches that decision depends on, and ships with all of them on."
        >
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-base font-semibold">Discount stacking</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                In <strong className="font-semibold text-foreground">Settings → Discount stacking</strong>{' '}
                you choose which other Shopify discounts a Mixly bundle discount can combine with at
                checkout. All three start on, so out of the box a bundle stacks with everything:
              </p>
              <ul className="mt-5 space-y-3 border-t pt-5">
                {stackingSettings.map(({ label, state, text }) => (
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
                Turn a category off and Shopify will pick only one of the two — which one depends on
                the other discount&rsquo;s own combine settings, so check both sides. Your home
                screen summarises where you stand in a line reading{' '}
                <em>Combines with all other discounts</em> or naming the ones you kept.
              </p>
            </Card>

            <Callout title="Also running Tierly?">
              Mixly combines with other product discounts out of the box, but{' '}
              <strong className="font-semibold text-foreground">
                Tierly&rsquo;s equivalent setting is off by default
              </strong>
              . If you run both apps, turn on Tierly&rsquo;s{' '}
              <em>Combine with other product discounts</em> — otherwise Shopify picks one of the
              two and a shopper who qualifies for a bundle and a quantity break gets only one of
              them. Mixly will tell you in Settings when it detects this.{' '}
              <Link href="/tierly/docs#stacking" className="font-medium text-foreground underline">
                How stacking works in Tierly
              </Link>
              .
            </Callout>

            <Callout title="Testing tip">
              If a discount you expect is missing, temporarily pause your other automatic discounts
              and retest. If the bundle then applies, the conflict is a stacking rule rather than a
              problem with the bundle itself.
            </Callout>
          </div>
        </Section>

        <Section
          id="plans"
          eyebrow="Billing"
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

          <div className="mt-4">
            <Callout title="Downgrading never deletes anything">
              Free runs one active bundle. Move back to it and Mixly keeps one running, pauses the
              rest, and names on your home screen exactly which ones it paused. Nothing is removed —
              the setup and the statistics stay put, and switching a bundle back on is one click
              once you return to Pro. Shopify handles the billing throughout: you approve the charge
              in your admin and it lands on your regular Shopify bill, so Mixly never sees your card
              details. The price is flat, with no usage fees and no revenue share.
            </Callout>
          </div>
        </Section>

        <Section
          id="analytics"
          eyebrow="Analytics"
          title="Reading your analytics"
          lead="Available on Pro. The home screen answers one question: are your bundles actually bringing in more than they give away?"
        >
          <Card className="p-6">
            <div className="flex gap-3.5">
              <span className="mt-0.5 inline-grid size-9 shrink-0 place-items-center rounded-lg border bg-muted text-foreground">
                <ChartIcon className="size-4.5" />
              </span>
              <div className="min-w-0 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Over a window you choose —{' '}
                  <strong className="font-semibold text-foreground">7, 30 or 90 days</strong> —
                  Mixly shows bundle revenue, discount given, orders and units sold, plus your{' '}
                  <strong className="font-semibold text-foreground">best-selling combos</strong>,
                  each broken down by orders, units, revenue and the discount it gave away.
                </p>
                <p>
                  Two derived numbers sit underneath. The{' '}
                  <strong className="font-semibold text-foreground">return ratio</strong> tells you
                  what every $1.00 you gave back drove in sales, and{' '}
                  <strong className="font-semibold text-foreground">average order value</strong>{' '}
                  tells you whether bundles are lifting basket size or just discounting the same
                  baskets.
                </p>
                <p>
                  Figures are stored as{' '}
                  <strong className="font-semibold text-foreground">daily totals per bundle</strong>{' '}
                  — no individual customer or order records are kept, so there is nothing personal
                  in there to leak. Attribution happens when Shopify reports the order, so give a
                  fresh order a moment before you go looking for it.
                </p>
                <p>
                  On the Free plan the panel is locked rather than empty. Your data keeps
                  accumulating, and drops back into view the moment you upgrade — a downgrade hides
                  the numbers, it does not erase them.
                </p>
              </div>
            </div>
          </Card>
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
              Mixly is built by a small team at {siteConfig.legalEntity}. Send us your store domain
              and what you expected to happen, and we will look at the actual bundle.
            </p>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              If what you need is a feature rather than a fix, Mixly has a{' '}
              <strong className="font-semibold text-foreground">Feature Requests</strong> board
              built into the app — post your idea or vote on someone else&rsquo;s, and the ones
              merchants want most are what we build next.
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
                href="/mixly/privacy"
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

export default MixlyDocsPage
