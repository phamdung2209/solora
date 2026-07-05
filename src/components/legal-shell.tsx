import Link from 'next/link'

import { ArrowRightIcon } from '@/components/icons'

interface LegalShellProps {
  title: string
  /** Optional "Last updated" date line. */
  updated?: string
  /** Optional back-link shown above the title. */
  back?: { href: string; label: string }
  /** Apply legal prose typography to children. Defaults to true. */
  prose?: boolean
  children: React.ReactNode
}

/**
 * Shared container + typography for legal / policy pages.
 */
export const LegalShell = ({
  title,
  updated,
  back,
  prose = true,
  children,
}: LegalShellProps) => {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      {back && (
        <Link
          href={back.href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightIcon className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          {back.label}
        </Link>
      )}
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {updated && (
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: <strong className="font-semibold text-foreground">{updated}</strong>
        </p>
      )}
      <div className={prose ? 'prose-legal mt-10' : 'mt-10'}>{children}</div>
    </article>
  )
}

interface HubItemProps {
  href: string
  title: string
  description: string
}

/** A single row in a policy hub list. */
export const HubItem = ({ href, title, description }: HubItemProps) => (
  <Link
    href={href}
    className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:bg-background-subtle"
  >
    <span>
      <span className="block font-semibold text-foreground">{title}</span>
      <span className="mt-0.5 block text-sm text-muted-foreground">{description}</span>
    </span>
    <ArrowRightIcon className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
  </Link>
)
