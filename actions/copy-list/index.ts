'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { CopyListSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { id, boardId } = data

  let list

  try {
    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      include: {
        cards: true
      }
    })

    if (!listToCopy) return { error: 'List not found!' }

    const newOrder = lastList ? lastList.order + 1 : 1
    const newTitle = 'Copy of ' + listToCopy.title
    // copy list
    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: newTitle,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map(card => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      },
      include: {
        cards: true
      }
    })

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE
    })

  } catch (error) {
    console.error(error)
    return {
      error: 'Failed to copy list!'
    }
  }

  revalidatePath(`/boards/${boardId}`)
  return { data: list }
}

export const copyList = createSafeAction(CopyListSchema, handler)
