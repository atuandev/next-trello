'use client'

import { updateList } from '@/actions/update-list'
import { FormInputOptimistic } from '@/components/form/form-input-optimistic'
import { useAction } from '@/hooks/use-action'
import { ListWithCards } from '@/types'
import { List } from '@prisma/client'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import { ListOptions } from './list-options'

interface ListHeaderProps {
  list: ListWithCards
  onAddCard: () => void
}

export function ListHeader({ list, onAddCard }: ListHeaderProps) {
  const [title, setTitle] = useState(list.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data: List) => {
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
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    if (title === list.title) return disableEditing()

    execute({ title, id, boardId })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  useEventListener('keydown', onKeyDown)

  return (
    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className='flex-1 px-[2px]'>
          <input hidden name='id' id='id' value={list.id} readOnly />
          <input
            hidden
            name='boardId'
            id='boardId'
            value={list.boardId}
            readOnly
          />
          <FormInputOptimistic
            id='title'
            ref={inputRef}
            defaultValue={title}
            placeholder='Enter list title...'
            onBlur={onBlur}
            className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-background'
            errors={fieldErrors}
          />
          <button type='submit' hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className='w-full text-sm px-2.5 pb-1 pt-[4.5px] h-7 font-medium border-transparent truncate'
        >
          {title}
        </div>
      )}
      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  )
}
