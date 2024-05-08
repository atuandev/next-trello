import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { db } from './db'
import { auth, currentUser } from '@clerk/nextjs'

interface Props {
  entityId: string
  entityTitle: string
  entityType: ENTITY_TYPE
  action: ACTION
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth()
    const user = await currentUser()

    if (!user || !orgId) {
      throw new Error('User not found!')
    }

    const { entityId, entityTitle, entityType, action } = props

    await db.auditLog.create({
      data: {
        orgId,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + ' ' + user?.lastName,
        entityId,
        entityTitle,
        entityType,
        action
      }
    })
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error)
  }
}
