'use client'

import { useRef, useState } from 'react'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { CardWithList } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { updateCard } from '@/actions/update-card'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'
import { FormInputOptimistic } from '@/components/form/form-input-optimistic'

interface HeaderProps {
  card: CardWithList
}

export const Header = ({ card }: HeaderProps) => {
  const queryClient = useQueryClient()
  const params = useParams()

  const inputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(card.title)

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['card', card.id]
      })
      queryClient.invalidateQueries({
        queryKey: ['card-logs', card.id]
      })
      toast.success(`Card "${data.title}" updated`)
      setTitle(data.title)
    },
    onError: error => {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = params.boardId as string
    const id = card.id

    if (title === card.title) return

    execute({ title, id, boardId })
  }

  return (
    <div className='w-full flex items-start gap-x-3 mb-6'>
      <Layout className='size-5 mt-1 text-neutralForeground' />
      <div className='w-full'>
        <form action={onSubmit}>
          <FormInputOptimistic
            id='title'
            ref={inputRef}
            defaultValue={title}
            onBlur={onBlur}
            className='font-semibold text-xl px-1 text-neutralForeground bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-background focus-visible:border-input mb-0.5 truncate'
            errors={fieldErrors}
          />
        </form>
        <p className='text-sm text-muted-foreground'>
          in list <span className='underline'>{card.list.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className='w-full flex items-start gap-x-3 mb-6'>
      <Skeleton className='size-6 mt-1 bg-neutral-200 dark:bg-slate-500' />
      <div>
        <Skeleton className='w-24 h-6 mb-1 bg-neutral-200 dark:bg-slate-500' />
        <Skeleton className='w-12 h-4 bg-neutral-200 dark:bg-slate-500' />
      </div>
    </div>
  )
}
