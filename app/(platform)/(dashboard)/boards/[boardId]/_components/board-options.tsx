'use client'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'

interface BoardOptionsProps {
  id: string
}

export function BoardOptions({ id }: BoardOptionsProps) {
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
      <PopoverTrigger>
        <Button variant='transparent' className='size-auto p-2'>
          <MoreHorizontal className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-3' side='bottom' align='start'>
        <PopoverClose>
          <Button
            variant='ghost'
            className='size-auto p-2 absolute top-2 right-2 text-neutralForeground'
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>
        <div className='text-sm font-medium text-center text-neutralForeground pb-4'>
          Board action
        </div>
        <Button
          variant='ghost'
          onClick={onDeleteBoard}
          disabled={isLoading}
          className='rounded-none w-full h-auto justify-start p-2 px-5 text-sm font-normal active:scale-100'
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}
