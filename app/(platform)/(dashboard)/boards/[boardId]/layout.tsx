import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import { BoardNavbar } from './_components/board-navbar'
import { getBoardById } from '@/data/board'

export async function generateMetadata({
  params
}: {
  params: { boardId: string }
}) {
  const { orgId } = auth()
  if (!orgId)
    return {
      title: 'Board'
    }

  const { boardId } = params
  const board = await getBoardById(boardId, orgId)
  return {
    title: board?.title || 'Board'
  }
}

export default async function BoardIdLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { boardId: string }
}) {
  const { orgId } = auth()
  if (!orgId) redirect('/select-org')

  const { boardId } = params

  const board = await getBoardById(boardId, orgId)
  if (!board) notFound()

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className='relative size-full bg-cover bg-center bg-no-repeat'
    >
      <BoardNavbar board={board} />
      <div className='absolute inset-0 bg-black/20' />
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  )
}
