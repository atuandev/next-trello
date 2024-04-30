'use client'

import { deleteBoard } from '@/actions/delete-board'

import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { MoreHorizontal, Trash, X } from 'lucide-react'
import { toast } from 'sonner'
import AlertDialogDeleteBoard from './alert-dialog-delete-board'
import { useState } from 'react'

interface BoardOptionsProps {
  id: string
}

export function BoardOptions({ id }: BoardOptionsProps) {
  const [open, setOpen] = useState(false)

  const { execute, isLoading } = useAction(deleteBoard, {
    onError: error => {
      toast.error(error)
    }
  })

  const onDeleteBoard = () => {
    execute({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='transparent' className='size-auto p-2'>
          <MoreHorizontal className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutralForeground pb-4'>
          Board action
        </div>
        <PopoverClose asChild>
          <Button
            variant='ghost'
            className='size-auto p-2 absolute top-2 right-2 text-neutralForeground'
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className='w-full' asChild>
            <Button
              variant='ghost'
              disabled={isLoading}
              className='rounded-none w-full h-auto justify-start p-2 px-5 text-sm font-normal active:scale-100'
            >
              <Trash className='size-4 mr-2' />
              Delete this board
            </Button>
          </AlertDialogTrigger>
          <AlertDialogDeleteBoard
            onDeleteBoard={onDeleteBoard}
            setOpen={setOpen}
            isLoading={isLoading}
          />
        </AlertDialog>
      </PopoverContent>
    </Popover>
  )
}
