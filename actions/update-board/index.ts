'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { UpdateBoardSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { title, id } = data

  let board

  try {
    board = await db.board.update({
      where: {
        id,
        orgId
      },
      data: {
        title
      }
    })
  } catch (error) {
    return {
      error: 'Failed to update board!'
    }
  }

  revalidatePath(`/boards/${board.id}`)
  return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoardSchema, handler)
