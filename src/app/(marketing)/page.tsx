import { Metadata } from 'next'
import { getActiveSlides } from '@/services/slides'
import { getLegalServiceSchema } from '@/lib/schemas/legal-service'
import { JsonLd } from '@/components/JsonLd'

import HeroSlider from '@/features/home/components/HeroSlider'
import TrustBar from '@/features/home/components/TrustBar'
import ServicesSection from '@/features/home/components/ServicesSection'
import AboutSection from '@/features/home/components/AboutSection'
import CTABand from '@/features/home/components/CTABand'

// Revalidate home page every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Avukat Eren Oktay — Hukuk Bürosu',
  description: 'Eren Oktay Hukuk Bürosu olarak, ticaret hukuku ve aile hukuku başta olmak üzere geniş bir yelpazede profesyonel hukuki danışmanlık hizmeti sunuyoruz.',
  openGraph: {
    title: 'Avukat Eren Oktay — Hukuk Bürosu',
    description: 'Eren Oktay Hukuk Bürosu olarak, ticaret hukuku ve aile hukuku başta olmak üzere geniş bir yelpazede profesyonel hukuki danışmanlık hizmeti sunuyoruz.',
    url: 'https://erenokay.av.tr',
    siteName: 'Eren Oktay Hukuk Bürosu',
    locale: 'tr_TR',
    type: 'website',
  },
}

export default async function HomePage() {
  const slides = await getActiveSlides()
  const schema = getLegalServiceSchema()

  return (
    <>
      <JsonLd data={schema} />
      <div className="flex flex-col w-full overflow-hidden">
        <HeroSlider slides={slides} />
        <TrustBar />
        <ServicesSection />
        <AboutSection />
        <CTABand />
      </div>
    </>
  )
}
