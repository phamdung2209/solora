import type { Metadata } from 'next'
import Link from 'next/link'

import { Callout, Section } from '@/components/docs-shell'
import { ArrowRightIcon, CheckIcon, LayersIcon, LifeBuoyIcon, MailIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Support',
  description:
    'How to get help with Tierly or Mixly — live chat inside the app, email, and the docs for both apps.',
  alternates: { canonical: '/support' },
  openGraph: {
    title: 'Support | Solora',
    description:
      'How to get help with Tierly or Mixly — live chat inside the app, email, and the docs for both apps.',
    url: '/support',
    images: [siteConfig.ogImage],
  },
}

const docsLinks = [
  {
    icon: LayersIcon,
    href: '/tierly/docs',
    title: 'Tierly docs',
    text: 'Setup, storefront behaviour, and troubleshooting.',
  },
  {
    icon: LayersIcon,
    href: '/mixly/docs',
    title: 'Mixly docs',
    text: 'Setup, storefront behaviour, and troubleshooting.',
  },
]

const emailChecklist = [
  'Your store’s .myshopify.com domain',
  'Which app: Tierly or Mixly',
  'What you expected to happen, and what happened instead',
  'Whether it shows up on the storefront, or only in the Shopify admin',
]

const SupportPage = () => (
  <>
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,var(--muted)_0%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 md:pt-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightIcon className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary text-2xl text-primary-foreground shadow-sm"
          >
            <LifeBuoyIcon className="size-7" />
          </span>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Support
            </span>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Get help with Tierly or Mixly
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Most questions are already answered in the docs. For everything else, here is the
          fastest way to reach us.
        </p>
      </div>
    </section>

    <div className="mx-auto max-w-3xl space-y-14 px-6 py-16">
      <Section
        id="how-to-get-help"
        eyebrow="Start here"
        title="How to get help"
        lead="Two ways to reach us, in the order that gets you an answer fastest."
      >
        <ol className="space-y-5">
          <li className="flex gap-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              1
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-7">Live chat inside the app</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                If Tierly or Mixly is already installed on your store, open the app from your
                Shopify admin and use the chat bubble in the corner. It reaches us directly and
                is the fastest way to get an answer.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              2
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-7">Email</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Not installed yet, or can&rsquo;t get to the chat? Email us and we will take it
                from there.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-3')}
              >
                <MailIcon />
                {siteConfig.email}
              </a>
            </div>
          </li>
        </ol>
      </Section>

      <Section
        id="docs"
        eyebrow="Documentation"
        title="Check the docs first"
        lead="Most of the tickets we get are already answered here."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {docsLinks.map(({ icon: Icon, href, title, text }) => (
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
      </Section>

      <Section
        id="what-to-include"
        eyebrow="Emailing us"
        title="What to include when you email us"
        lead="These four details let us look at the actual issue without a back-and-forth."
      >
        <ul className="space-y-2.5 text-sm">
          {emailChecklist.map((item) => (
            <li key={item} className="flex gap-2.5">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="feature-requests"
        eyebrow="Feature requests"
        title="Have an idea for a feature?"
        lead="Both apps have a way to tell us directly, without emailing support."
      >
        <Callout title="Use the Feature Requests board in the app">
          Tierly and Mixly each have a Feature Requests board built into the app itself — open
          the app from your Shopify admin, post your idea or vote on someone else&rsquo;s, and
          the ones merchants want most are what we build next.
        </Callout>
      </Section>
    </div>
  </>
)

export default SupportPage
