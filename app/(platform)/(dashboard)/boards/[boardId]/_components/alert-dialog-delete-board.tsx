import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

interface AlertDialogDeleteBoardProps {
  onDeleteBoard: () => void
  setOpen: (open: boolean) => void
  isLoading: boolean
}

export default function AlertDialogDeleteBoard({
  onDeleteBoard,
  setOpen,
  isLoading
}: AlertDialogDeleteBoardProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure to delete this board</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your board
          and remove all your card from board.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isLoading} onClick={() => setOpen(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          disabled={isLoading}
          onClick={onDeleteBoard}
          className='bg-rose-600 hover:bg-rose-600/90'
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
