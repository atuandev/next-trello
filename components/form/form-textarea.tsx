'use client'

import { KeyboardEventHandler, forwardRef } from 'react'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { FormErrors } from './form-errors'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

interface FormTextareaProps {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onClick?: () => void
  onBlur?: () => void
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onClick,
      onBlur,
      onKeyDown
    },
    ref
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className='space-y-2 w-full'>
        <div className='space-y-1 w-full'>
          {label ? (
            <Label
              htmlFor={id}
              className='text-xs font-semibold text-neutralForeground'
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            ref={ref}
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            className={cn(
              'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
              className
            )}
            defaultValue={defaultValue}
            onClick={onClick}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            aria-describedby={`${id}-errors`}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
