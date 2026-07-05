import Link from 'next/link'

import { Brand } from '@/components/brand'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#apps', label: 'Apps' },
  { href: '/#features', label: 'Why Solora' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Brand />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${siteConfig.email}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Contact
        </a>
      </div>
    </header>
  )
}
