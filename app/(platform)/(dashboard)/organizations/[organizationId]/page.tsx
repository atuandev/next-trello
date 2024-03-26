'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

export default function OrganizationPage() {
  const { execute } = useAction(createBoard, {
    onSuccess: data => {
      console.log(data)
    },
    onError: error => {
      console.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({ title })
  }

  return (
    <div>
      <form action={onSubmit}>
        <input type='text' name='title' className='border' />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}
