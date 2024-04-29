import { db } from '@/lib/db'

export async function getBoardById(boardId: string, orgId: string) {
  return await db.board.findUnique({
    where: {
      id: boardId,
      orgId
    }
  })
}
