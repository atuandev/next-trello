'use client'

import { useEffect, useState } from 'react'

import { ListWithCards } from '@/types'

import { ListForm } from './list-form'
import { ListItem } from './list-item'

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}

export default function ListContainer({ lists, boardId }: ListContainerProps) {
  const [orderData, setOrderData] = useState(lists)

  useEffect(() => {
    setOrderData(lists)
  }, [lists])

  return (
    <ol className='flex gap-x-3 h-full'>
      {orderData.map((list, index) => (
        <ListItem key={list.id} index={index} list={list} />
      ))}
      <ListForm />
      <div className='flex-shrink-0 w-1' />
    </ol>
  )
}
