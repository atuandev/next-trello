'use client'

import { Toaster } from '@/components/ui/sonner'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function PlatformLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined
      }}
    >
      <Toaster />
      {children}
    </ClerkProvider>
  )
}
