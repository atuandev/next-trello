'use client'

import { ListWithCards } from '@/types'
import ListForm from './list-form'
import { ListWrapper } from './list-wrapper'

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}

export default function ListContainer({ lists, boardId }: ListContainerProps) {
  return (
    <ol>
      <ListForm />
      <div className='flex-shrink-0 w-1' />
    </ol>
  )
}
