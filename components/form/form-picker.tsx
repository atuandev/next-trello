'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CircleCheck, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import { FormErrors } from './form-errors'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus()

  const [images, setImages] = useState<Array<Record<string, any>>>([])
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9
        })

        if (!result || !result.response) {
          console.error('Fail to load images from Unsplash')
        }

        const newImages = result.response as Array<Record<string, any>>
        setImages(newImages)
      } catch (error) {
        console.error(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='size-6 text-primary animate-spin' />
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map(image => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50'
            )}
            onClick={() => {
              if (pending) return
              setSelectedImageId(image.id)
            }}
          >
            <input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              disabled={pending}
              checked={selectedImageId === image.id}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              readOnly
            />
            <Image
              fill
              src={image.urls.thumb}
              alt='Unsplash Image'
              sizes='auto'
            />
            {selectedImageId === image.id && (
              <div className='absolute inset-y-0 size-full bg-black/30 flex items-center justify-center'>
                <CircleCheck className='size-5 text-white' />
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate hover:underline p-1 text-white bg-black/50'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  )
}
