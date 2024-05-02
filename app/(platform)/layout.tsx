import { Toaster } from '@/components/ui/sonner'

export default function PlatformLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  )
}
