import { Hint } from '@/components/hint'
import { HelpCircle, User2 } from 'lucide-react'

export default function BoardList() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutralForeground'>
        <User2 className='size-6 mr-2' />
        Your boards
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        <div
          role='button'
          className='aspect-video relative w-full h-full bg-muted rounded-sm flex flex-col gap-1 items-center justify-center hover:opacity-75 transition'
        >
          <p className='text-sm'>Create new board</p>
          <span className='text-xs'>5 remaining</span>
          <Hint sideOffset={40} description='Free workspaces can have to 5 open boards. For unlimited boards upgrade this workspace.'>
            <HelpCircle className='absolute right-1.5 bottom-1.5 size-4' />
          </Hint>
        </div>
      </div>
    </div>
  )
}
