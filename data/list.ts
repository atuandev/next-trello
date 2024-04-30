import { db } from '@/lib/db'

export async function getAllLists({
  boardId,
  orgId
}: {
  boardId: string
  orgId: string
}) {
  return await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId
      }
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: {
      order: 'asc'
    }
  })
}
