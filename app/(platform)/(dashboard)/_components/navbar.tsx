'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

import { FormPopover } from '@/components/form/form-popover'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from './mobile-sidebar'

export function Navbar() {
  return (
    <nav className='fixed top-0 z-50 h-14 w-full px-4 border-b shadow-sm bg-background flex items-center'>
      <MobileSidebar />
      <div className='flex items-center gap-x-4'>
        {/* Desktop screen */}
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <FormPopover align='start' side='bottom' sideOffset={16}>
          <Button
            variant='primary'
            size='sm'
            className='rounded-sm hidden md:block h-auto py-1.5 px-2 dark:text-foreground'
          >
            Create
          </Button>
        </FormPopover>

        {/* Mobile screen */}
        <FormPopover align='start' side='bottom' sideOffset={16}>
          <Button
            variant='primary'
            size='sm'
            className='rounded-sm block md:hidden'
          >
            <Plus className='size-4' />
          </Button>
        </FormPopover>
      </div>

      <div className='ml-auto flex items-center gap-x-2'>
        <span className='hidden md:block'>
          <ModeToggle />
        </span>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='/organizations/:id'
          afterSelectOrganizationUrl='/organizations/:id'
          afterLeaveOrganizationUrl='/select-org'
          appearance={{
            elements: {
              rootBox: 'flex justify-center items-center',
              organizationSwitcherPopoverCard: 'dark:bg-[#0f172a]'
            }
          }}
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              rootBox: 'size-[30px]',
              userButtonPopoverCard: 'dark:bg-[#0f172a]'
            }
          }}
        />
      </div>
    </nav>
  )
}
