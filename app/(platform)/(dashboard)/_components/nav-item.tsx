'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

type NavItemProps = {
  isExpanded: boolean
  isActive: boolean
  org: Organization
  onExpand: (id: string) => void
}

export function NavItem({ isExpanded, isActive, org, onExpand }: NavItemProps) {
  const router = useRouter()
  const pathname = usePathname()
  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='size-4 mr-2' />,
      href: `/organizations/${org.id}`
    },
    {
      label: 'Activity',
      icon: <Activity className='size-4 mr-2' />,
      href: `/organizations/${org.id}/activity`
    },
    {
      label: 'Settings',
      icon: <Settings className='size-4 mr-2' />,
      href: `/organizations/${org.id}/settings`
    },
    {
      label: 'Billing',
      icon: <CreditCard className='size-4 mr-2' />,
      href: `/organizations/${org.id}/billing`
    }
  ]

  const onClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={org.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(org.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutralForeground rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive &&
            !isExpanded &&
            'bg-sky-500/10 text-sky-700 dark:text-sky-500 dark:bg-sky-500/20'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='size-7 relative'>
            <Image
              src={org.imageUrl}
              alt='Organization'
              className='rounded-sm object-cover'
              sizes='28px'
              fill
            />
          </div>
          <span className='font-medium text-sm'>{org.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutralForeground dark:bg-slate-900/30 rounded-md'>
        {routes.map(route => (
          <Button
            key={route.href}
            size='sm'
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              pathname === route.href &&
                'bg-sky-500/10 text-sky-700 dark:text-sky-500 dark:bg-sky-500/20'
            )}
            variant='ghost'
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='size-10 relative shrink-0'>
        <Skeleton className='h-full w-full absolute' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  )
}
