'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { redirect } from 'next/navigation'
import { DeleteBoardSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { id } = data

  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId
      }
    })

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE
    })

  } catch (error) {
    return {
      error: 'Failed to delete board!'
    }
  }

  revalidatePath(`/organizations/${orgId}`)
  redirect(`/organizations/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler)
