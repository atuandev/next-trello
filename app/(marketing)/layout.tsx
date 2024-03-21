import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

export default function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full bg-slateBackground'>
      <Navbar />
      <main className='pt-40 pb-20 bg-slateBackground'>{children}</main>
      <Footer />
    </div>
  )
}
