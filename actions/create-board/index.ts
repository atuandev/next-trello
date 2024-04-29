'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { CreateBoardSchema } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
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
  } catch (error) {
    return {
      error: 'Failed to create board!'
    }
  }

  revalidatePath(`/boards/${board.id}`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoardSchema, handler)
