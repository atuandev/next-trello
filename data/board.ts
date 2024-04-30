import { db } from '@/lib/db'

export async function getAllBoards(orgId: string) {
  return await db.board.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getBoardById(boardId: string, orgId: string) {
  return await db.board.findUnique({
    where: {
      id: boardId,
      orgId
    }
  })
}
