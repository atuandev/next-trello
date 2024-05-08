'use client'

import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'

interface DescriptionProps {
  card: CardWithList
}

export function Actions({ card }: DescriptionProps) {
  const params = useParams()
  const { onClose: onCloseModal } = useCardModal()

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: data => {
        toast.success(`Card ${data.title} copied`)
        onCloseModal()
      },
      onError: error => {
        toast.error(error)
      }
    }
  )

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: data => {
        toast.success(`Card ${data.title} deleted`)
        onCloseModal()
      },
      onError: error => {
        toast.error(error)
      }
    }
  )

  const onCopy = () => {
    const boardId = params.boardId as string

    executeCopy({ id: card.id, boardId })
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    executeDelete({ id: card.id, boardId })
  }

  return (
    <div className='space-y-2 mt-2'>
      <p className='text-xs font-semibold'>Actions</p>
      <Button
        variant='gray'
        size='inline'
        className='w-full justify-start'
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className='size-4 mr-2' />
        Copy
      </Button>
      <Button
        variant='gray'
        size='inline'
        className='w-full justify-start'
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className='size-4 mr-2' />
        Delete
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200 dark:bg-slate-500' />
      <Skeleton className='w-full h-8 bg-neutral-200 dark:bg-slate-500' />
      <Skeleton className='w-full h-8 bg-neutral-200 dark:bg-slate-500' />
    </div>
  )
}
