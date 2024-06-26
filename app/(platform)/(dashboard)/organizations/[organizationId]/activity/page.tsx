import { Separator } from '@/components/ui/separator'
import { Info } from '../_components/info'
import { ActivityList } from './_components/activity-list'
import { Suspense } from 'react'

export default function ActivityPage() {
  return (
    <div className='w-full'>
      <Info />
      <Separator className='my-4' />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}
