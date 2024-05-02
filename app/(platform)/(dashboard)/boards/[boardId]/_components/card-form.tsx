'use client'

import { KeyboardEventHandler, forwardRef, useRef } from 'react'
import { Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormSubmit } from '@/components/form/form-submit'
import { useAction } from '@/hooks/use-action'
import { createCard } from '@/actions/create-card'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface CardFormProps {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const formRef = useRef<HTMLFormElement>(null)
    const params = useParams()

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: data => {
        toast.success(`Card "${data.title}" created`)
      },
      onError: error => {
        toast.error(error)
      }
    })

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string
      const listId = formData.get('listId') as string
      const boardId = params.boardId as string
      
      disableEditing()

      execute({ title, listId, boardId })
    }

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing()
      }
    }

    useEventListener('keydown', onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className='m-1 py-0.5 px-1 space-y-4'
        >
          <FormTextarea
            id='title'
            ref={ref}
            onKeyDown={onTextareaKeyDown}
            placeholder='Enter a title for this card...'
            errors={fieldErrors}
          />
          <input hidden name='listId' id='listId' value={listId} readOnly />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} variant='ghost' size='sm'>
              <X className='size-4' />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className='pt-2 px-2'>
        <Button
          variant='ghost'
          onClick={enableEditing}
          className='h-auto w-full px-2 py-1.5 justify-start text-muted-foreground text-sm active:scale-100'
        >
          <Plus className='size-4 mr-2' />
          Add a card
        </Button>
      </div>
    )
  }
)

CardForm.displayName = 'CardForm'
