'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { ListWithCards } from '@/types'

import { updateListOrder } from '@/actions/update-list-order'
import { updateCardOrder } from '@/actions/update-card-order'
import { useAction } from '@/hooks/use-action'
import { ListForm } from './list-form'
import { ListItem } from './list-item'

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default function ListContainer({ lists, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(lists)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onError: error => {
      toast.error(error)
    }
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onError: error => {
      toast.error(error)
    }
  })

  useEffect(() => {
    setOrderedData(lists)
  }, [lists])

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result

    if (!destination) return

    // Drop in the same list
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Drop if user moves list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (list, index) => ({ ...list, order: index })
      )

      setOrderedData(items)
      executeUpdateListOrder({ items, boardId })
    }

    // Drop if user moves card
    if (type === 'card') {
      let newOrderedData = [...orderedData]

      // Source and destination list
      const sourceList = newOrderedData.find(
        list => list.id === source.droppableId
      )
      const destList = newOrderedData.find(
        list => list.id === destination.droppableId
      )

      if (!sourceList || !destList) return

      // Check if cards exist in source and destination list
      if (!sourceList.cards) return (sourceList.cards = [])
      if (!destList.cards) return (destList.cards = [])

      // Move card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        )

        reorderCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reorderCards

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({ items: reorderCards, boardId })
      } else {
        // Move card to another list
        // Remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // Assign new listId to moved card
        movedCard.listId = destination.droppableId

        // Add card to destination list
        destList.cards.splice(destination.index, 0, movedCard)

        // Update order of cards in source and destination list
        sourceList.cards.forEach((card, index) => {
          card.order = index
        })
        destList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({ items: destList.cards, boardId })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {provided => (
          <ol
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='flex gap-x-3 h-full scrollbar-thin'
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className='flex-shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
