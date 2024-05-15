'use client'

import Image from 'next/image'
import { toast } from 'sonner'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'

export function ProModal() {
  const { isOpen, onClose } = useProModal()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: data => {
      window.location.href = data
    },
    onError: error => {
      toast.error(error)
    }
  })

  const handleClick = () => {
    execute({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md p-0 overflow-hidden'>
        <div className='aspect-video relative flex items-center justify-center'>
          <Image src='/hero.svg' alt='Hero' fill priority />
        </div>
        <div className='text-neutralForeground mx-auto space-y-4 p-6'>
          <h2 className='font-semibold text-xl tracking-wider'>
            Upgrade to WorkFlow Today!
          </h2>
          <p className='text-xs font-semibold text-neutralForeground tracking-wide'>
            Explore the best features of WorkFlow.
          </p>
          <div className='pl-4'>
            <ul className='text-sm list-disc'>
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            className='w-full tracking-wide'
            variant='primary'
            disabled={isLoading}
            onClick={handleClick}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
