'use client'

import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'

import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'

interface ActivityProps {
  items: AuditLog[]
}

export function Activity({ items }: ActivityProps) {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <ActivityIcon className='size-5 mt-0.5 text-neutralForeground' />
      <div className='w-full'>
        <p className='font-semibold text-neutralForeground mb-2'>Activity</p>
        <div className='space-y-1'>
          {items.map(item => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

Activity.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='size-6 bg-neutral-200 dark:bg-slate-500' />
      <div className='w-full'>
        <Skeleton className='w-24 h-6 mb-2 bg-neutral-200 dark:bg-slate-500' />
        <Skeleton className='w-full h-10 bg-neutral-200 dark:bg-slate-500' />
      </div>
    </div>
  )
}
