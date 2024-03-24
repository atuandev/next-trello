import { Button } from '@/components/ui/button'
import { Medal } from 'lucide-react'
import Link from 'next/link'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const headingFont = localFont({
  src: '../../public/fonts/font.woff2'
})

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function MarketingPage() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <div
        className={cn(
          'flex justify-center items-center flex-col gap-4',
          headingFont.className
        )}
      >
        <div className='flex items-center gap-2 border p-4 shadow-sm bg-amber-100 text-amber-700 rounded-full uppercase'>
          <Medal className='size-6' />
          No 1 task management
        </div>
        <h1 className='text-3xl md:text-6xl text-center text-neutral-800 dark:text-slateForeground'>
          Taskify helps team move
        </h1>
        <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white p-4 mt-2 rounded-md w-fit'>
          work foward.
        </div>
      </div>

      <div
        className={cn(
          'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique —
        accomplish it all with Taskify.
      </div>

      <Button className='mt-6' size='lg' asChild>
        <Link href='/sign-up'>Get Taskify for free</Link>
      </Button>
    </div>
  )
}
