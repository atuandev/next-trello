'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { CopyCardSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { id, boardId } = data

  let card

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        }
      }
    })
    if (!cardToCopy) return { error: 'Card not found!' }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1
    const newTitle = 'Copy of ' + cardToCopy.title
    // copy card
    card = await db.card.create({
      data: {
        title: newTitle,
        description: cardToCopy.description,
        listId: cardToCopy.listId,
        order: newOrder
      }
    })

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE
    })

  } catch (error) {
    console.error(error)
    return {
      error: 'Failed to copy card!'
    }
  }

  revalidatePath(`/boards/${boardId}`)
  return { data: card }
}

export const copyCard = createSafeAction(CopyCardSchema, handler)
