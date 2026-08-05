import { Metadata } from 'next'
import { getActiveSlides } from '@/services/slides'
import { getPosts } from '@/services/posts'
import { getLegalServiceSchema } from '@/lib/schemas/legal-service'
import { JsonLd } from '@/components/JsonLd'

import HeroSlider from '@/features/home/components/HeroSlider'
import TrustBar from '@/features/home/components/TrustBar'
import ServicesSection from '@/features/home/components/ServicesSection'
import AboutSection from '@/features/home/components/AboutSection'
import RecentNewsSection from '@/features/home/components/RecentNewsSection'
import CTABand from '@/features/home/components/CTABand'

// Revalidate home page every hour
export const revalidate = 3600

import { SITE } from '@/constants/site'

export const metadata: Metadata = {
  title: 'Avukat Eren Oktay — Hukuk Bürosu',
  description: SITE.description,
  openGraph: {
    title: 'Avukat Eren Oktay — Hukuk Bürosu',
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'website',
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
}

export default async function HomePage() {
  const [slides, allPosts] = await Promise.all([getActiveSlides(), getPosts()])
  const recentPosts = allPosts.slice(0, 3)
  const schema = getLegalServiceSchema()

  return (
    <>
      <JsonLd data={schema} />
      <div className="flex flex-col w-full overflow-hidden">
        <HeroSlider slides={slides} />
        <TrustBar />
        <ServicesSection />
        <RecentNewsSection posts={recentPosts} />
        <AboutSection />
        <CTABand />
      </div>
    </>
  )
}
