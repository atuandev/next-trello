'use client'

import { Copy, MoreHorizontal, Plus, Trash, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { List } from '@prisma/client'
import { FormSubmit } from '@/components/form/form-submit'
import { Separator } from '@/components/ui/separator'
import { deleteList } from '@/actions/delete-list'
import { ElementRef, useRef, useState } from 'react'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'
import { copyList } from '@/actions/copy-list'
import AlertDialogDeleteList from './alert-dialog-delete-list'

interface ListOptionsProps {
  list: List
  onAddCard: () => void
}

export function ListOptions({ list, onAddCard }: ListOptionsProps) {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const [open, setOpen] = useState(false)

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: data => {
      toast.success(`List "${data.title}" deleted`)
    },
    onError: error => {
      toast.error(error)
    }
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: data => {
      toast.success(`List "${data.title}" copied`)
    },
    onError: error => {
      toast.error(error)
    }
  })

  const onDeleteList = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    closeRef.current?.click()
    executeDelete({ id, boardId })
  }

  const onCopyList = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    closeRef.current?.click()
    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='size-auto p-2'>
          <MoreHorizontal className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutralForeground pb-4'>
          List action
        </div>
        <PopoverClose asChild>
          <Button
            variant='ghost'
            ref={closeRef}
            className='size-auto p-2 absolute top-2 right-2 text-neutralForeground'
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>

        <Button
          variant='ghost'
          onClick={onAddCard}
          className='rounded-none w-full h-auto justify-start p-2 px-5 text-sm font-normal active:scale-100'
        >
          <Plus className='size-4 mr-2' />
          Add card
        </Button>

        <form action={onCopyList}>
          <input hidden name='id' id='id' value={list.id} readOnly />
          <input
            hidden
            name='boardId'
            id='boardId'
            value={list.boardId}
            readOnly
          />
          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto justify-start p-2 px-5 text-sm font-normal active:scale-100'
          >
            <Copy className='size-4 mr-2' />
            Copy list
          </FormSubmit>
        </form>

        <Separator />

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className='w-full' asChild>
            <Button
              variant='ghost'
              className='rounded-none w-full h-auto justify-start p-2 px-5 text-sm font-normal active:scale-100 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-500'
            >
              <Trash className='size-4 mr-2' />
              Delete list
            </Button>
          </AlertDialogTrigger>
          <AlertDialogDeleteList
            list={list}
            onDeleteList={onDeleteList}
            setOpen={setOpen}
          />
        </AlertDialog>
      </PopoverContent>
    </Popover>
  )
}
