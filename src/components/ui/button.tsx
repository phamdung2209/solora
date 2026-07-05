import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-accent-foreground shadow-sm hover:opacity-90 hover:shadow-md',
        gradient:
          'bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-sm hover:shadow-lg hover:brightness-110',
        outline:
          'border border-border bg-card text-foreground hover:bg-background-subtle',
        ghost: 'text-muted-foreground hover:bg-background-subtle hover:text-foreground',
        link: 'text-accent underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-5',
        lg: 'h-12 px-7 text-[0.95rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}

export { Button, buttonVariants }
