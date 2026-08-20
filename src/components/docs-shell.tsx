import { cn } from '@/lib/utils'

/**
 * Shared section + callout primitives for the app documentation pages.
 */
export const Section = ({
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

export const Callout = ({
  title,
  tone = 'note',
  children,
}: {
  title: string
  tone?: 'note' | 'warn'
  children: React.ReactNode
}) => (
  <div
    className={cn(
      'rounded-xl border-l-4 bg-muted/60 px-5 py-4',
      tone === 'warn' ? 'border-l-destructive' : 'border-l-foreground',
    )}
  >
    <p className="text-sm font-semibold text-foreground">{title}</p>
    <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{children}</div>
  </div>
)
