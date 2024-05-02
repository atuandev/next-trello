import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

const headingFont = localFont({
  src: '../public/fonts/ProtestRiot-Regular.ttf'
})

export function Logo() {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition hidden gap-x-2 md:flex items-center'>
        <Image
          src='/logo.svg'
          alt='Logo'
          width={30}
          height={30}
          style={{ width: 30, height: 30 }}
        />
        <p
          className={cn(
            'text-lg text-neutralForeground pt-1',
            headingFont.className
          )}
        >
          WorkFlow
        </p>
      </div>
    </Link>
  )
}
