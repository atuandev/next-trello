import { FormSubmit } from '@/components/form/form-submit'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { List } from '@prisma/client'
import { useFormStatus } from 'react-dom'

interface AlertDialogDeleteListProps {
  list: List
  onDeleteList: (formData: FormData) => void
  setOpen: (open: boolean) => void
}

export default function AlertDialogDeleteList({
  list,
  onDeleteList,
  setOpen
}: AlertDialogDeleteListProps) {
  const { pending } = useFormStatus()

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure to delete this list</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your list
          and remove all your card from list.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form action={onDeleteList}>
        <AlertDialogFooter>
          <input hidden name='id' id='id' value={list.id} readOnly />
          <input
            hidden
            name='boardId'
            id='boardId'
            value={list.boardId}
            readOnly
          />
          <AlertDialogCancel disabled={pending} onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <FormSubmit
            disabled={pending}
            size='default'
            className='bg-rose-600 hover:bg-rose-600/90'
          >
            Delete
          </FormSubmit>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  )
}
