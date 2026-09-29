import Image from 'next/image'

import { cn } from '@/lib/utils'

export const Figure = ({
  src,
  width,
  height,
  alt,
  caption,
  priority = false,
  className,
}: {
  src: string
  width: number
  height: number
  alt: string
  caption?: React.ReactNode
  priority?: boolean
  className?: string
}) => (
  <figure className={cn('max-w-150', className)}>
    <div className="overflow-hidden rounded-xl border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.05),0_12px_32px_-16px_rgb(0_0_0/0.28)]">
      <picture>
        <source media="(prefers-reduced-motion: reduce)" srcSet={src.replace(/\.webp$/, '-still.webp')} />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 640px) 600px, 100vw"
          className="block h-auto w-full"
        />
      </picture>
    </div>
    {caption && (
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">{caption}</figcaption>
    )}
  </figure>
)
