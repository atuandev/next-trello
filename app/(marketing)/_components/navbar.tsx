import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Navbar() {
  return (
    <div className='fixed top-0 w-full bg-background h-14 px-4 border-b shadow-sm flex items-center'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='md:space-x-4 md:w-auto flex items-center justify-between w-full'>
          <ModeToggle />
          <div className='space-x-2'>
            <Button size='sm' variant='outline' asChild>
              <Link href='/sign-in'>Login</Link>
            </Button>
            <Button size='sm' asChild>
              <Link href='/sign-up'>Get Workflow for free</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
