'use client'

import { useRef, useState } from 'react'
import { AlignLeft } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { Skeleton } from '@/components/ui/skeleton'
import { CardWithList } from '@/types'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'
import { toast } from 'sonner'

interface DescriptionProps {
  card: CardWithList
}

export function Description({ card }: DescriptionProps) {
  const queryClient = useQueryClient()
  const params = useParams()

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['card', card.id]
      })
      queryClient.invalidateQueries({
        queryKey: ['card-logs', card.id]
      })
      toast.success(`Card ${data.title} updated`)
      disableEditing()
    },
    onError: error => {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string
    const boardId = params.boardId as string
    const id = card.id

    if (description === card.description) return

    execute({ id, description, boardId })
  }

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='size-5 mt-0.5 text-neutralForeground' />
      <div className='w-full'>
        <p className='font-semibold text-neutralForeground mb-2'>Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className='space-y-2'>
            <FormTextarea
              id='description'
              className='w-full mt-2'
              defaultValue={card.description || undefined}
              placeholder='Add a more detailed description...'
              ref={textareaRef}
              errors={fieldErrors}
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmit>Save</FormSubmit>
              <Button
                type='button'
                onClick={disableEditing}
                size='sm'
                variant='ghost'
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className='min-h-[78px] bg-neutral-200 hover:bg-neutral-300 dark:bg-slate-800 hover:dark:bg-slate-700 text-sm font-medium py-3 px-3.5 rounded-md'
            role='button'
          >
            {card.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='size-6 bg-neutral-200 dark:bg-slate-500' />
      <div className='w-full'>
        <Skeleton className='w-1/2 h-6 mb-2 bg-neutral-200 dark:bg-slate-500' />
        <Skeleton className='w-full h-[78px] bg-neutral-200 dark:bg-slate-500' />
      </div>
    </div>
  )
}
