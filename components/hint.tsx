import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'

interface HintProps {
  children: React.ReactNode
  description: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  sideOffset?: number
}

export function Hint({
  children,
  description,
  side = 'bottom',
  sideOffset = 0
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className='text-xs max-w-[220px] break-words'
          sideOffset={sideOffset}
          side={side}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
