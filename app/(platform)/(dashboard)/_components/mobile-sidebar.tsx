'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'
import { ModeToggle } from '@/components/mode-toggle'
import { Logo } from '@/components/logo'
import Image from 'next/image'
import Link from 'next/link'

export function MobileSidebar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  const onOpen = useMobileSidebar(state => state.onOpen)
  const onClose = useMobileSidebar(state => state.onClose)
  const isOpen = useMobileSidebar(state => state.isOpen)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isMounted) return null

  return (
    <>
      <Button
        className='block md:hidden mr-2'
        onClick={onOpen}
        variant='ghost'
        size='sm'
      >
        <Menu className='size-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='p-2 pt-10'>
          <Link href='/'>
            <div className='absolute top-2 left-2 px-1 cursor-pointer'>
              <Image
                src='/logo.svg'
                alt='Logo'
                width={30}
                height={30}
                style={{ width: 30, height: 30 }}
              />
            </div>
          </Link>
          <Sidebar storageKey='t-sidebar-mobile-key' />
          <span className='flex items-center font-medium text-sm gap-2 absolute bottom-2 left-2 md:hidden'>
            <ModeToggle />
          </span>
        </SheetContent>
      </Sheet>
    </>
  )
}
