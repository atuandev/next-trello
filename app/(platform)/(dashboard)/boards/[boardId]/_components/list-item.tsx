'use client'

import { useOptimistic, useRef, useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { cn } from '@/lib/utils'
import { ListWithCards } from '@/types'
import { ListHeader } from './list-header'
import { CardForm } from './card-form'
import { CardItem } from './card-item'
import { Card } from '@prisma/client'

interface ListItemProps {
  index: number
  list: ListWithCards
}

export function ListItem({ index, list }: ListItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [optimisticCards, setOptimisticCards] = useOptimistic(
    list.cards,
    (state, newCards: Card) => [...state, newCards]
  )

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
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='shrink-0 h-full w-[272px] select-none'
        >
          <div
            {...provided.dragHandleProps}
            className='w-full rounded-md bg-[#f1f2f4]/90 dark:bg-slate-950/90 p-2 shadow-md'
          >
            <ListHeader list={list} onAddCard={enableEditing} />
            <Droppable droppableId={list.id} type='card'>
              {provided => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'py-0.5 px-1 flex flex-col gap-y-2 max-h-[calc(100vh-350px)] overflow-y-auto scrollbar-thin',
                    list.cards.length > 0 ? 'mt-2' : 'mt-0'
                  )}
                >
                  {optimisticCards.map((card, index) => (
                    <CardItem card={card} index={index} key={card.id} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              ref={textareaRef}
              listId={list.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              setOptimisticCards={setOptimisticCards}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}
