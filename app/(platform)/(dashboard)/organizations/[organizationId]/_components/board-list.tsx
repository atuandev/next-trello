import { HelpCircle, User2 } from 'lucide-react'

import { Hint } from '@/components/hint'
import { FormPopover } from '@/components/form/form-popover'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

export async function BoardList() {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const boards = await db.board.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutralForeground'>
        <User2 className='size-6 mr-2' />
        Your boards
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {boards.map(board => (
          <Link
            key={board.id}
            href={`/boards/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className='relative group aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm size-full p-2 overflow-hidden'
          >
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
            <p className='relative text-white font-semibold'>{board.title}</p>
          </Link>
        ))}
        <FormPopover side='right' sideOffset={10}>
          <div
            role='button'
            className='aspect-video relative w-full h-full bg-muted rounded-sm flex flex-col gap-1 items-center justify-center hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs'>5 remaining</span>
            <Hint
              sideOffset={40}
              description='Free workspaces can have to 5 open boards. For unlimited boards upgrade this workspace.'
            >
              <HelpCircle className='absolute right-1.5 bottom-1.5 size-4' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
    </div>
  )
}
