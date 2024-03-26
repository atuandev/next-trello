'use client'

import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'

import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'

export default function OrganizationPage() {
  const { execute, fieldErrors, isLoading } = useAction(createBoard, {
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
        <FormInput
          id='title'
          label='Title'
          errors={fieldErrors}
          disabled={isLoading}
        />
        <FormSubmit>Save</FormSubmit>
      </form>
    </div>
  )
}
