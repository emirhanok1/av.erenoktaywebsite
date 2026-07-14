import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import StickyCTABar from '@/components/common/StickyCTABar'
import dynamic from 'next/dynamic'

const WhatsAppButton = dynamic(
  () => import('@/components/common/WhatsAppButton'),
  { ssr: false }
)

import { MotionProvider } from '@/components/common/MotionProvider'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <StickyCTABar />
        {/* Mobilde footer altı boşluk (sticky bar için) */}
        <div className="h-[56px] lg:hidden" />
      </div>
    </MotionProvider>
  )
}
