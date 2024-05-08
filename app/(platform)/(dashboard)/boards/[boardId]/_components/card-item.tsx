import { useCardModal } from '@/hooks/use-card-modal'
import { Draggable } from '@hello-pangea/dnd'

import { Card } from '@prisma/client'

interface CardItemProps {
  card: Card
  index: number
}

export function CardItem({ card, index }: CardItemProps) {
  const { onOpen } = useCardModal()

  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role='button'
          className={
            'truncate border-2 border-transparent hover:border-foreground px-2 py-2 rounded-md text-sm shadow-sm dark:bg-slate-800 bg-white flex flex-shrink-0'
          }
          onClick={() => onOpen(card.id)}
        >
          {card.title}
        </li>
      )}
    </Draggable>
  )
}
