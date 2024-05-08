'use client'

import { useQuery } from '@tanstack/react-query'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/use-card-modal'
import { fetcher } from '@/lib/fetcher'
import { CardWithList } from '@/types'
import { Header } from './header'

export function CardModal() {
  const id = useCardModal(state => state.id)
  const isOpen = useCardModal(state => state.isOpen)
  const onClose = useCardModal(state => state.onClose)

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <Header card={cardData} /> : <Header.Skeleton />}
      </DialogContent>
    </Dialog>
  )
}
