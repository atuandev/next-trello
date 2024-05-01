'use client'

import { Plus, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { createList } from '@/actions/create-list'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { ListWrapper } from './list-wrapper'

export function ListForm() {
  const router = useRouter()
  const params = useParams()

  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus())
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: data => {
      toast.success(`List "${data.title}" created`)
      disableEditing()
      router.refresh()
    },
    onError: error => {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({ title, boardId })
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className='w-full p-3 bg-background/70 space-y-4 shadow-md rounded-md'
        >
          <FormInput
            id='title'
            placeholder='Enter list title...'
            ref={inputRef}
            errors={fieldErrors}
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
          />
          <input hidden value={params.boardId} name='boardId' readOnly />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} variant='ghost' size='sm'>
              <X className='size-4' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-background/60 hover:bg-background/50 transition p-3 flex items-center font-semibold text-sm'
      >
        <Plus className='size-4 mr-2' />
        Add a list
      </button>
    </ListWrapper>
  )
}
