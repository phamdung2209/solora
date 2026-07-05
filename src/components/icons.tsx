import type { SVGProps } from 'react'

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const BoltIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
)

export const CodeOffIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
    <path d="m14.5 4-5 16" />
  </svg>
)

export const ShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const ChartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M3 3v18h18" />
    <path d="M7 15l3-3 3 2 4-5" />
  </svg>
)

export const LayersIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
)

export const FeatherIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5Z" />
    <path d="M16 8 2 22" />
    <path d="M17.5 15H9" />
  </svg>
)

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
)
