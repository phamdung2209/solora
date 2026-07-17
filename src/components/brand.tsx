import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site'

interface BrandProps {
    className?: string
    /** Rendered height of the logo lockup in pixels. */
    size?: number
    href?: string
}

/**
 * Solora logo lockup (mark + "solora" wordmark). The wordmark is baked into the image,
 * so no separate text is rendered next to it.
 */
export const Brand = ({ className, size = 40, href = '/' }: BrandProps) => {
    return (
        <Link
            href={href}
            aria-label={`${siteConfig.name} home`}
            className={cn('inline-flex items-center', className)}
        >
            <Image
                src="/solora-step-lockup-stacked-bg-removed.png"
                alt={siteConfig.name}
                width={741}
                height={554}
                priority
                style={{ height: size, width: 'auto' }}
                className="object-contain"
            />
        </Link>
    )
}
