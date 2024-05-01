import { Board } from '@prisma/client'
import { BoardTitleForm } from './board-title-form'
import { BoardOptions } from './board-options'

interface BoardNavbarProps {
  board: Board
}

export async function BoardNavbar({ board }: BoardNavbarProps) {
  return (
    <>
      <div className='w-full h-14 z-0 bg-black/30 fixed top-14 backdrop-blur-sm' />
      <div className='w-full h-14 z-40 fixed top-14 text-white flex items-center px-6 gap-x-4'>
        <BoardTitleForm board={board} />
        <div className='ml-auto'>
          <BoardOptions id={board.id} />
        </div>
      </div>
    </>
  )
}
