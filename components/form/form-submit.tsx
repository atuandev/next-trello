'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'destructive'
    | 'ghost'
    | 'link'
  size?: 'sm' | 'lg' | 'default' | 'icon'
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  size = 'sm',
  variant = 'primary'
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      className={cn(className)}
      size={size}
      disabled={disabled || pending}
      variant={variant}
    >
      {children}
    </Button>
  )
}
