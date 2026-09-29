import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Callout, Section } from '@/components/docs-shell'
import { Figure } from '@/components/figure'
import { ArrowRightIcon, BoltIcon, ChevronDownIcon, LayersIcon, LifeBuoyIcon, MailIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Combined Listings — Help & Documentation',
  description:
    'How Combined Listings links products into one listing, how to turn it on in your theme, and what to check when swatches do not appear.',
  alternates: { canonical: '/combined-listings/docs' },
  openGraph: {
    title: 'Combined Listings — Help & Documentation | Solora',
    description:
      'How Combined Listings links products into one listing, how to turn it on in your theme, and what to check when swatches do not appear.',
    url: '/combined-listings/docs',
    images: [siteConfig.ogImage],
  },
}

const chapters = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'setup', label: 'Turn it on in your theme' },
  { id: 'first-group', label: 'Create your first group' },
  { id: 'auto-group', label: 'Group a catalogue by rule' },
  { id: 'csv', label: 'Import and export' },
  { id: 'variant-images', label: 'Variant images' },
  { id: 'appearance', label: 'Swatch appearance' },
  { id: 'card-per-variant', label: 'One card per variant' },
  { id: 'themes', label: 'Supported themes' },
  { id: 'plans', label: 'Plans' },
  { id: 'remove', label: 'Removing the app' },
  { id: 'troubleshooting', label: 'Swatches not showing?' },
]

const highlights = [
  {
    icon: BoltIcon,
    href: '#how-it-works',
    title: 'How it works',
    text: 'The one idea behind combined listings.',
  },
  {
    icon: LayersIcon,
    href: '#setup',
    title: 'Setup',
    text: 'Turn on the app embed in your theme.',
  },
  {
    icon: LifeBuoyIcon,
    href: '#troubleshooting',
    title: 'Troubleshooting',
    text: 'No swatches on your storefront? Start here.',
  },
]

const setupSteps: ReactNode[] = [
  'In the app, open Home and follow the setup checklist.',
  <>
    On Turn on the app embed, click{' '}
    <strong className="font-semibold text-foreground">Open theme editor</strong>. In{' '}
    <strong className="font-semibold text-foreground">App embeds</strong>, switch on Combined
    Listings and save.
  </>,
  'Optional: add the Combined Listings app block to your product template if you want to choose exactly where the row sits.',
]

const firstGroupSteps: ReactNode[] = [
  <>
    Open Groups and click <strong className="font-semibold text-foreground">Create group</strong>.
  </>,
  <>
    Enter a <strong className="font-semibold text-foreground">Title</strong>. The{' '}
    <strong className="font-semibold text-foreground">Handle</strong> fills itself and{' '}
    <strong className="font-semibold text-foreground">Option name</strong> starts as Color.
  </>,
  <>
    Under <strong className="font-semibold text-foreground">Members</strong>, click{' '}
    <strong className="font-semibold text-foreground">Add products</strong> and pick the products
    that belong together.
  </>,
  <>
    For each member, enter its{' '}
    <strong className="font-semibold text-foreground">Option value</strong> (for example Red),
    choose a <strong className="font-semibold text-foreground">Swatch type</strong> — a colour, an
    image, or text — and set the swatch.
  </>,
  <>
    Click <strong className="font-semibold text-foreground">Save</strong>. The swatch data is
    written to each member product within seconds.
  </>,
]

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'I created a group but see no swatches.',
    a: 'Check that the Combined Listings app embed is switched on in your live theme (Home → setup checklist shows its state), then reload the product page.',
  },
  {
    q: 'The row appears but in an odd spot.',
    a: 'Set Custom mount selector in the app embed, or add the app block to your product template and drag it where you want it.',
  },
  {
    q: "Stock doesn't show on swatches.",
    a: (
      <>
        Stock and prices come from your store&rsquo;s Storefront API. They appear once the app
        has created its storefront token, which happens the first time you save your{' '}
        <strong className="font-semibold text-foreground">Appearance</strong> or{' '}
        <strong className="font-semibold text-foreground">Card per variant</strong> settings.
      </>
    ),
  },
  {
    q: 'Swatches disappeared after I filtered or sorted a collection.',
    a: 'Some themes reload the product grid without a page load. Reload the page to redraw them, and email us with your theme’s name so we can add support.',
  },
  {
    q: 'How do I get help?',
    a: (
      <>
        Email{' '}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-medium text-foreground underline"
        >
          {siteConfig.email}
        </a>
        .
      </>
    ),
  },
]

const CombinedListingsDocsPage = () => (
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
            src="/solora-combined-listings.png"
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
              Getting the most out of Combined Listings
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A combined listing is a set of separate products that shoppers browse as one, linked by
          a group and shown as swatches. Nothing in your catalogue is edited — products, prices
          and inventory stay exactly as they are. Everything below follows from that.
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
          title="How it works"
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              A combined listing is a set of separate products — say a Red tee, a Blue tee and a
              Black tee — that shoppers browse as one. Combined Listings links them with a group:
              each member product gets a swatch, and every product page, collection card and
              search result in the group shows the whole row. Clicking a swatch opens that
              colour&rsquo;s own product page.
            </p>
            <p>
              Your products stay separate products with their own inventory, reviews and URLs;
              the app adds only a small metafield to each member so your storefront can draw the
              row.
            </p>
          </div>

          <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
            <Figure
              src="/guides/combined-listings/pdp-swatches.webp"
              width={1200}
              height={750}
              alt="A Classic Tee - Red product page with Red, Blue, Black and Sand swatches. The shopper clicks Blue and the Classic Tee - Blue page opens, then clicks Black."
              caption="On a product page, each swatch opens that colour's own product. The ringed swatch is the one you are on."
            />
            <Figure
              src="/guides/combined-listings/collection-swatches.webp"
              width={1200}
              height={750}
              alt="A New in collection of a tee, a hoodie, a tote and a cap, each card with its own row of colour swatches. The shopper clicks Navy under the hoodie and the Everyday Hoodie - Navy page opens."
              caption="Collection and search cards get their own row, so shoppers can jump to a colour straight from the grid."
            />
          </div>

          <div className="mt-8">
            <Callout title="Nothing in your catalogue is edited">
              Combined Listings never changes titles, variants, images, prices or inventory, and
              never edits theme files.
            </Callout>
          </div>
        </Section>

        <Section id="setup" eyebrow="Setup" title="Turn it on in your theme">
          <ol className="space-y-5">
            {setupSteps.map((step, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {idx + 1}
                </span>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Turn on the app embed on every theme; on older (vintage) themes that cannot hold app
            blocks it is the only option.
          </p>

          <Figure
            className="mt-8"
            src="/guides/combined-listings/theme-editor.webp"
            width={1200}
            height={750}
            alt="A theme editor with App embeds open. The cursor switches on Combined Listings, clicks Save, and a row of colour swatches appears on the product page in the preview."
            caption="In App embeds, switch on Combined Listings and save. The swatch row shows up on your product pages straight away."
          />

          <div className="mt-6">
            <Callout title="Swatch row in the wrong place?">
              In the app embed&rsquo;s settings, enter a CSS selector in{' '}
              <strong className="font-semibold text-foreground">Custom mount selector</strong>.
              The row is placed right after the first element that matches.
            </Callout>
          </div>
        </Section>

        <Section id="first-group" eyebrow="Groups" title="Create your first group">
          <ol className="space-y-5">
            {firstGroupSteps.map((step, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {idx + 1}
                </span>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <Callout title="A product can be in one group at a time">
              Adding a product that already belongs to another group is blocked, so a storefront
              never shows two rows for one product.
            </Callout>
          </div>
        </Section>

        <Section id="auto-group" eyebrow="Groups" title="Group a catalogue by rule">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Auto-group builds groups from products that match a rule: a Title prefix (everything
            before a separator becomes the group), a Tag prefix such as color:, or a Metafield key
            such as custom.family. Click{' '}
            <strong className="font-semibold text-foreground">Preview rule</strong> to see the
            groups, conflicts and duplicates before anything is created. A saved rule keeps
            working: a product you add later joins its group on its own.
          </p>
        </Section>

        <Section id="csv" eyebrow="Groups" title="Import and export">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Import / export moves groups in and out as a CSV file.{' '}
            <strong className="font-semibold text-foreground">Export CSV</strong> gives every
            group&rsquo;s handle, title, option and members, ready to edit and re-import. Imports
            run in the background; when one finishes you see how many rows were imported and can
            download an error report for the rest.
          </p>
        </Section>

        <Section id="variant-images" eyebrow="Gallery" title="Variant images">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Variant images shows only the photos that belong to the selected variant. Choose a
            product, then pick photos per variant, or use{' '}
            <strong className="font-semibold text-foreground">Auto-match by alt text</strong> or{' '}
            <strong className="font-semibold text-foreground">Auto-match by filename</strong>.
            Variants with no image selected fall back to the theme&rsquo;s normal gallery.
          </p>

          <Figure
            className="mt-6"
            src="/guides/combined-listings/variant-images.webp"
            width={1200}
            height={750}
            alt="An All-Mountain Snowboard product page with a four-photo gallery. Picking the Midnight design swaps the gallery to the four Midnight photos, then picking Ember swaps it to the Ember photos."
            caption="Pick a design and the gallery keeps only that variant's photos: Aurora, then Midnight, then Ember."
          />

          <div className="mt-6">
            <Callout tone="warn" title="Theme support">
              Gallery filtering works on Dawn and themes built like it. On Horizon, Shopify&rsquo;s
              newer default theme, the gallery is a slideshow that already moves the selected
              variant&rsquo;s image to the front, so Combined Listings leaves it alone.
            </Callout>
          </div>
        </Section>

        <Section id="appearance" eyebrow="Design" title="Swatch appearance">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Appearance sets the{' '}
            <strong className="font-semibold text-foreground">Swatch shape</strong> (Circle, Square
            or Rounded), the size, the corner radius, and what happens to a swatch once every
            variant it represents is sold out:{' '}
            <strong className="font-semibold text-foreground">No change</strong>,{' '}
            <strong className="font-semibold text-foreground">Dim</strong>,{' '}
            <strong className="font-semibold text-foreground">Strike through</strong>, or{' '}
            <strong className="font-semibold text-foreground">Hide</strong>. The live preview
            shows your swatches on a sample product page, drawn by the storefront code.
          </p>

          <Figure
            className="mt-6"
            src="/guides/combined-listings/swatch-appearance.webp"
            width={1200}
            height={750}
            alt="The same product page shown five times: circle, square and rounded swatches, then the sold-out Sand swatch drawn with a strike through and then dimmed. A label on the photo names each setting."
            caption="Circle, Square and Rounded, then a sold-out colour shown with Strike through and with Dim. Each step is labelled on the image."
          />
        </Section>

        <Section id="card-per-variant" eyebrow="Collections" title="One card per variant">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Card per variant shows one collection and search card per value of an option — one
            card per colour, for example — instead of one card per product. Choose the{' '}
            <strong className="font-semibold text-foreground">Option to explode</strong> and the{' '}
            <strong className="font-semibold text-foreground">Max cards per product</strong>.
          </p>

          <div className="mt-6">
            <Callout tone="warn" title="This changes how the collection page behaves">
              The theme&rsquo;s product count and its &ldquo;Showing 1–24 of N&rdquo; text no
              longer match the number of cards, and a collection sorted by price is no longer
              strictly in price order. It is off until you switch it on.
            </Callout>
          </div>
        </Section>

        <Section id="themes" eyebrow="Themes" title="Supported themes">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Combined Listings finds the variant picker, gallery and product cards on its own. It
            has a profile for Dawn, places the row under the variant picker on Horizon, and falls
            back to the add-to-cart form on other themes. If the row lands somewhere odd, use{' '}
            <strong className="font-semibold text-foreground">Custom mount selector</strong> (see
            Setup) or add the app block, or email us with your theme&rsquo;s name.
          </p>
        </Section>

        <Section id="plans" eyebrow="Billing" title="Plans">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every feature is on every plan, including Free. Plans differ only in how many groups
            you can create: Free 10, Starter 200, Growth 1,000, Pro unlimited.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Full details live on the{' '}
            <Link href="/combined-listings/pricing" className="font-medium text-foreground underline">
              pricing page
            </Link>
            .
          </p>

          <div className="mt-6">
            <Callout title="Changing plans never deletes anything">
              A plan&rsquo;s limit only stops new groups from being created. Groups you already
              have keep showing and stay editable.
            </Callout>
          </div>
        </Section>

        <Section id="remove" eyebrow="Data" title="Removing the app">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Uninstalling turns the storefront code off straight away. The swatch data the app
            wrote stays on your products as ordinary metafields in the solora_cl namespace, and
            your shop keeps its solora_cl.settings metafield, which holds the storefront token,
            because an uninstalled app can no longer reach your store. To leave nothing behind,
            first open{' '}
            <strong className="font-semibold text-foreground">
              Settings → Remove app data
            </strong>{' '}
            in the app, type{' '}
            <strong className="font-semibold text-foreground">REMOVE</strong> and confirm: it
            deletes every group, rule, variant-image mapping and appearance setting, plus the
            swatch data on your products and the shop metafield, and revokes the storefront
            token. Your products, images and variants are not touched.
          </p>
        </Section>

        <Section id="troubleshooting" eyebrow="Troubleshooting" title="Common questions">
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
              Combined Listings is built by a small team at {siteConfig.legalEntity}. Send us your
              store domain and what you expected to happen, and we will look at the actual group.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/combined-listings/pricing"
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
              >
                See pricing
              </Link>
              <a
                href={`mailto:${siteConfig.email}?subject=Combined Listings question`}
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                <MailIcon />
                Email support
              </a>
            </div>
          </Card>
        </section>
      </div>
    </div>
  </>
)

export default CombinedListingsDocsPage
