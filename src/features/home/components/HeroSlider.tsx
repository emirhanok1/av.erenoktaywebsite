'use client'

import React, { useCallback, useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Slide } from '@/services/slides'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

interface HeroSliderProps {
  slides: Slide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const autoplay = useMemo(
    () => Autoplay({ delay: 7000, stopOnInteraction: false }),
    []
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    // Keyboard navigation
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') emblaApi.scrollPrev()
      if (e.key === 'ArrowRight') emblaApi.scrollNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [emblaApi, onSelect])

  if (!slides || slides.length === 0) return null

  return (
    <section
      className="relative bg-navy w-full overflow-hidden"
      aria-label="Öne çıkan başlıklar"
      aria-roledescription="carousel"
    >
      {/* Embla viewport — overflow-hidden must be on THIS div */}
      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex">
          {slides.map((slide, index) => {
            const isFirst = index === 0
            const words = slide.title.split(' ')
            const lastWord = words.pop()
            const titleStart = words.join(' ')

            return (
              <div
                key={slide.id}
                /* Each slide takes up 100% of the viewport width */
                className="flex-none w-full min-w-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${slides.length}`}
              >
                {/* Slide inner: aspect + min-height */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7] min-h-[580px] flex items-center">

                  {/* Right half background image (desktop only) */}
                  <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block z-0">
                    {slide.image_url ? (
                      <Image
                        src={slide.image_url}
                        alt={slide.title}
                        fill
                        priority={isFirst}
                        sizes="(max-width: 768px) 0vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      /* Diagonal-line pattern placeholder when no image */
                      <div
                        className="w-full h-full opacity-10"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 1px, transparent 8px)',
                        }}
                      />
                    )}
                    {/* Gradient fade from left so text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
                  </div>

                  {/* Left-to-right overlay for mobile */}
                  <div className="absolute inset-0 bg-navy/85 lg:bg-transparent z-0" />

                  {/* Text content */}
                  <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
                    <div className="max-w-2xl lg:w-1/2 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left py-16 lg:py-24">
                      {/* Kicker */}
                      <span className="text-accent font-heading font-medium tracking-[0.2em] text-xs uppercase flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-accent inline-block shrink-0" />
                        {slide.subtitle || 'KURUMSAL HUKUK · TECRÜBELİ EKİP'}
                      </span>

                      {/* H1 */}
                      <h1 className="text-white text-4xl md:text-5xl lg:text-[56px] font-heading leading-[1.1] tracking-tight">
                        {titleStart}{' '}
                        {lastWord && (
                          <em className="text-accent italic font-light">{lastWord}</em>
                        )}
                      </h1>

                      {/* Lede */}
                      <p className="text-white/75 text-base md:text-lg font-sans leading-relaxed max-w-xl">
                        Ticari anlaşmazlıklardan şirket birleşmelerine kadar geniş bir alanda
                        öngörülebilir ve sonuç odaklı stratejiler sunuyoruz.
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
                        <Link
                          href={ROUTES.CONTACT}
                          className={cn(
                            buttonVariants({ variant: 'default' }),
                            'bg-accent hover:bg-white text-navy font-bold tracking-wider uppercase px-8 py-4 rounded-none w-full sm:w-auto transition-colors text-sm'
                          )}
                        >
                          Randevu Al
                        </Link>
                        <Link
                          href="#services-title"
                          className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'border-white/40 hover:border-white text-white bg-transparent hover:bg-white/10 font-bold tracking-wider uppercase px-8 py-4 rounded-none w-full sm:w-auto transition-colors text-sm'
                          )}
                        >
                          Hizmetlerimiz
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls bar */}
      <div className="absolute bottom-6 left-0 right-0 z-30 pointer-events-none">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">

          {/* Dot indicators */}
          <div className="flex gap-2 pointer-events-auto" role="tablist" aria-label="Slide seçimi">
            {slides.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
                aria-label={`${index + 1}. slide`}
                className={cn(
                  'h-1.5 transition-all duration-500 rounded-full',
                  index === selectedIndex
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                )}
              />
            ))}
          </div>

          {/* Counter + arrows */}
          <div className="flex items-center gap-5 pointer-events-auto">
            <div className="hidden sm:block text-white/50 font-heading font-medium tracking-widest text-sm select-none tabular-nums">
              <span className="text-white">{String(selectedIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1.5">/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                aria-label="Önceki slayt"
                className="min-w-[44px] min-h-[44px] w-11 h-11 border border-white/25 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-navy transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Sonraki slayt"
                className="min-w-[44px] min-h-[44px] w-11 h-11 border border-white/25 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-navy transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
