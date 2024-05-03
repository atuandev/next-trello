'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { UpdateListOrderSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { items, boardId } = data

  let lists

  try {
    const transaction = items.map(list =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId
          }
        },
        data: {
          order: list.order
        }
      })
    )

    lists = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to update list order!'
    }
  }

  revalidatePath(`/boards/${boardId}`)
  return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrderSchema, handler)
