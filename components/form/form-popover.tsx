'use client'

import { X } from 'lucide-react'
import { toast } from 'sonner'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { FormPicker } from './form-picker'
import { ElementRef, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0
}: FormPopoverProps) => {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: data => {
      toast.success('Board created successfully', {
        description: 'Start adding tasks to your board now.'
      })
      closeRef.current?.click()
      router.push(`/boards/${data.id}`)
    },
    onError: error => {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string

    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className='w-80 pt-3'
      >
        <div className='text-sm font-medium text-center text-neutralForeground pb-4'>
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutralForeground'
            variant='ghost'
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>
        <form className='space-y-4' action={onSubmit}>
          <div className='space-y-4'>
            <FormPicker id='image' errors={fieldErrors} />
            <FormInput id='title' label='Board title' errors={fieldErrors} />
          </div>
          <FormSubmit className='w-full text-white'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
