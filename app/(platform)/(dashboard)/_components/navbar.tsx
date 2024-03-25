'use client'

import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import MobileSidebar from './mobile-sidebar'

export function Navbar() {
  return (
    <nav className='fixed top-0 z-50 h-14 w-full px-4 border-b shadow-sm bg-background flex items-center'>
      <MobileSidebar />
      <div className='flex items-center gap-x-4'>
        {/* Desktop screen */}
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <Button
          variant='primary'
          size='sm'
          className='rounded-sm hidden md:block h-auto py-1.5 px-2 dark:text-foreground'
        >
          Create
        </Button>

        {/* Mobile screen */}
        <Button
          variant='primary'
          size='sm'
          className='rounded-sm block md:hidden'
        >
          <Plus className='size-4' />
        </Button>
      </div>

      <div className='ml-auto flex items-center gap-x-2'>
        <span className='hidden md:block'>
          <ModeToggle />
        </span>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='/organizations/:id'
          afterLeaveOrganizationUrl='/select-org'
          afterSelectOrganizationUrl='/organizations/:id'
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          }}
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              rootBox: {
                width: 30,
                height: 30
              }
            }
          }}
        />
      </div>
    </nav>
  )
}
