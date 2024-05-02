'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { useAction } from '@/hooks/use-action'
import { Board } from '@prisma/client'

import { updateBoard } from '@/actions/update-board'
import { Button } from '@/components/ui/button'
import { FormInputOptimistic } from '@/components/form/form-input-optismistic'

interface BoardTitleFormProps {
  board: Board
}

export function BoardTitleForm({ board }: BoardTitleFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(board.title)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const { execute } = useAction(updateBoard, {
    onSuccess: data => {
      toast.success(`Renamed to "${data.title}"`)
      setTitle(data.title)
      disableEditing()
    },
    onError: error => {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    // Do nothing if the title is the same
    if (title === board.title) return disableEditing()

    execute({ title, id: board.id })
  }

  // Submit the form when on blur the input
  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef}>
        <FormInputOptimistic
          id='title'
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={title}
          className='text-lg font-bold bg-transparent px-2 py-1 h-7  focus-visible:outline-none focus-visible:ring-transparent sm:border-none'
        />
      </form>
    )
  }

  return (
    <Button
      variant='transparent'
      className='font-bold text-lg size-auto py-1 px-2 active:scale-100'
      onClick={enableEditing}
    >
      {title}
    </Button>
  )
}
