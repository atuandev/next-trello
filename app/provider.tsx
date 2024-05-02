'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

import { ThemeProvider } from '@/components/theme-provider'

export default function PlatformLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  )
}
