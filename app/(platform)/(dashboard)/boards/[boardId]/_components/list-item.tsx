'use client'

import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { ListWithCards } from '@/types'
import { ListHeader } from './list-header'
import { CardForm } from './card-form'
import { CardItem } from './card-item'

interface ListItemProps {
  index: number
  list: ListWithCards
}

export function ListItem({ index, list }: ListItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [isEditing, setIsEditing] = useState(false)

  const disableEditing = () => {
    setIsEditing(false)
  }

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  return (
    <li className='shrink-0 h-full w-[272px] select-none'>
      <div className='w-full rounded-md bg-[#f1f2f4]/90 dark:bg-slate-950/90 p-2 shadow-md'>
        <ListHeader list={list} onAddCard={enableEditing} />
        <ol
          className={cn(
            'm-1 py-0.5 px-1 flex flex-col gap-y-2',
            list.cards.length > 0 ? 'mt-2' : 'mt-0'
          )}
        >
          {list.cards.map(card => (
            <CardItem card={card} index={index} key={card.id} />
          ))}
        </ol>
        <CardForm
          ref={textareaRef}
          listId={list.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  )
}
