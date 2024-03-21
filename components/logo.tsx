import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

const headingFont = localFont({
  src: '../public/fonts/font.woff2'
})

export function Logo() {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition hidden gap-x-2 md:flex items-center'>
        <Image src='/logo.svg' alt='Logo' width={30} height={30} />
        <p
          className={cn('text-lg text-neutral-700 dark:text-white pt-1', headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  )
}
