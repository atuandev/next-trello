'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { hasAvailableCount, increaseAvailableCount } from '@/lib/org-limit'

import { CreateBoardSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const canCreateBoard = await hasAvailableCount()

  if (!canCreateBoard) {
    return {
      error: 'You have reached the limit of free boards. Please upgrade to create more!'
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split('|')

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  ) {
    return {
      error: 'Missing fields. Failed to create board'
    }
  }

  let board

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUserName
      }
    })

    await increaseAvailableCount()

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE
    })

  } catch (error) {
    return {
      error: 'Failed to create board!'
    }
  }

  revalidatePath(`/boards/${board.id}`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoardSchema, handler)
