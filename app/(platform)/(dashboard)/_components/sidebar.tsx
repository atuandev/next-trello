'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { NavItem, Organization } from './nav-item'

type SidebarProps = {
  storageKey?: string
}

export function Sidebar({ storageKey = 't-sidebar-state' }: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )
  const { organization: activeOrg, isLoaded: isLoadedOrg } = useOrganization()
  const { userMemberships, isLoaded: isLoadedList } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key] === true) {
        acc.push(key)
      }
      return acc
    },
    []
  )

  const onExpand = (id: string) => {
    setExpanded(curr => ({
      ...curr,
      [id]: !expanded[id]
    }))
  }

  if (!isLoadedOrg || !isLoadedList || userMemberships.isLoading) {
    return (
      <>
        <div className='flex items-center justify-between mb-2'>
          <Skeleton className='h-10 w-[50%]' />
          <Skeleton className='h-10 w-12' />
        </div>
        <div className='space-y-2'>
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    )
  }

  return (
    <>
      <div className='font-medium text-sm flex items-center mb-1'>
        <span className='pl-1'>Workspaces</span>
        <Button
          asChild
          type='button'
          size='icon'
          variant='ghost'
          className='ml-auto'
        >
          <Link href='/select-org'>
            <Plus className='size-4' />
          </Link>
        </Button>
      </div>
      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {userMemberships.data.map(org => (
          <NavItem
            key={org.organization.id}
            org={org.organization as Organization}
            isActive={activeOrg?.id === org.organization.id}
            isExpanded={expanded[org.organization.id]}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}
