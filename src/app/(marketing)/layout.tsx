import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import WhatsAppButton from '@/components/common/WhatsAppButton'
import StickyCTABar from '@/components/common/StickyCTABar'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
