import Link from 'next/link'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site'

interface BrandProps {
  className?: string
  /** Size of the logo mark in pixels. */
  size?: number
  href?: string
}

/**
 * Solora wordmark with a gradient "S" mark.
 */
export const Brand = ({ className, size = 32, href = '/' }: BrandProps) => {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className={cn(
        'group inline-flex items-center gap-2.5 font-bold tracking-tight text-foreground',
        className,
      )}
    >
      <span
        aria-hidden
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        className="grid place-items-center rounded-[0.6rem] bg-gradient-to-br from-brand-500 to-brand-700 font-black text-white shadow-sm transition-transform group-hover:scale-105"
      >
        S
      </span>
      <span className="text-[1.05rem]">Solora</span>
    </Link>
  )
}
