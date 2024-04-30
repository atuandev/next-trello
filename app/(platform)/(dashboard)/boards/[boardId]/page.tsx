import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { getAllLists } from '@/data/list'
import ListContainer from './_components/list-container'

interface BoardIdProps {
  params: { boardId: string }
}

export default async function BoardId({ params }: BoardIdProps) {
  const { orgId } = auth()
  if (!orgId) redirect('/select-org')

  const { boardId } = params
  const lists = await getAllLists({ boardId, orgId })

  return (
    <div className='h-full p-4 overflow-x-auto'>
      <ListContainer lists={lists} boardId={boardId} />
    </div>
  )
}
