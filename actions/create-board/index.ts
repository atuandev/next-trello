'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { CreateBoardSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { title } = data

  let board

  try {
    board = await db.board.create({
      data: {
        title
      }
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
