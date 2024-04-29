'use client'

import Image from 'next/image'
import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function Info() {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <Info.Skeleton />
  }

  return (
    <div className='flex items-center gap-4'>
      <div className='size-16 relative'>
        <Image
          src={organization?.imageUrl!}
          alt='Organization logo'
          fill
          className='rounded-md object-cover'
          sizes='64px'
        />
      </div>

      <div className='space-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        <div className='flex items-center gap-1 text-xs text-muted-foreground'>
          <CreditCard className='size-3' />
          Free
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className='flex items-center gap-4'>
      <div className='size-16 relative'>
        <Skeleton className='size-full absolute' />
      </div>

      <div className='space-y-2'>
        <Skeleton className='w-48 h-8' />
        <div className='flex items-center gap-2'>
          <Skeleton className='w-4 h-4' />
          <Skeleton className='w-24 h-4' />
        </div>
      </div>
    </div>
  )
}
