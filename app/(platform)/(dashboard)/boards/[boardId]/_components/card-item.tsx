'use client'

import { cn } from '@/lib/utils'
import { Card } from '@prisma/client'
import { useTheme } from 'next-themes'

interface CardItemProps {
  card: Card
  index: number
}

export function CardItem({ card, index }: CardItemProps) {
  const { theme } = useTheme()

  return (
    <li
      role='button'
      className={cn(
        'truncate border-2 border-transparent hover:border-foreground px-2 py-2 rounded-md text-sm shadow-sm',
        theme === 'dark' ? 'dark:bg-slate-800' : 'bg-white'
      )}
    >
      {card.title}
    </li>
  )
}
