'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { UpdateCardSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { id, boardId, ...values } = data

  let card

  try {
    card = await db.card.update({
      where: {
        id,
        list: { board: { orgId } }
      },
      data: {
        ...values
      }
    })
    
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE
    })

  } catch (error) {
    return {
      error: 'Failed to update card!'
    }
  }

  revalidatePath(`/boards/${boardId}`)
  return { data: card }
}

export const updateCard = createSafeAction(UpdateCardSchema, handler)
