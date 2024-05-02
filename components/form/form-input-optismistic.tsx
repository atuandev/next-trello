'use client'

import { forwardRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FormErrors } from './form-errors'

type FormInputProps = {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
}

export const FormInputOptimistic = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = '',
      onBlur
    },
    ref
  ) => {
    return (
      <div className='space-y-2'>
        <div className='space-y-1'>
          {label ? (
            <Label
              htmlFor={id}
              className='text-xs font-semibold text-neutralForeground'
            >
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            ref={ref}
            className={cn('text-sm px-2 py-1 h-7', className)}
            defaultValue={defaultValue}
            onBlur={onBlur}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormInputOptimistic.displayName = 'FormInputOptimistic'
