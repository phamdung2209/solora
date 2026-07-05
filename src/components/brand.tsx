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
 * Solora wordmark with a neutral "S" mark.
 */
export const Brand = ({ className, size = 30, href = '/' }: BrandProps) => {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className={cn(
        'group inline-flex items-center gap-2.5 font-semibold tracking-tight text-foreground',
        className,
      )}
    >
      <span
        aria-hidden
        style={{ width: size, height: size, fontSize: size * 0.52 }}
        className="grid place-items-center rounded-md bg-primary font-bold text-primary-foreground shadow-sm"
      >
        S
      </span>
      <span className="text-[1.05rem]">Solora</span>
    </Link>
  )
}
