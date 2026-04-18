'use client'

import React, { useCallback, useEffect, useState } from 'react'
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 7000, stopOnInteraction: true }),
  ])
  
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
  }, [emblaApi, onSelect])

  if (!slides || slides.length === 0) return null

  return (
    <section className="relative bg-primary w-full overflow-hidden" aria-label="Öne çıkan başlıklar">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#1e3a5f_0%,#1e3a5f_50%,transparent_100%)] lg:bg-[linear-gradient(to_right,#1e3a5f_0%,#1e3a5f_60%,transparent_100%)] hidden md:block absolute inset-0 z-10" />
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7] min-h-[580px]">
          {slides.map((slide, index) => {
            const isFirst = index === 0
            // Highlight the first and last word or specific words as per "HTML referanstaki gibi italik vurgu"
            // For simplicity, let's wrap the last word in <em>
            const words = slide.title.split(' ')
            const lastWord = words.pop()
            const titleStart = words.join(' ')

            return (
              <div 
                className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center lg:justify-start" 
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${slides.length}`}
              >
                {/* Background Image Area (Right half on desktop) */}
                <div className="absolute inset-0 z-0 hidden lg:block lg:left-1/2 lg:w-1/2">
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
                    <div className="w-full h-full bg-navy-light [background-image:repeating-linear-gradient(45deg,var(--navy)__0,var(--navy)__2px,transparent_2px,transparent_8px)]" />
                  )}
                  {/* Overlay to blend image with background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="container mx-auto px-4 lg:px-8 relative z-20 w-full">
                  <div className="max-w-2xl lg:pr-12 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
                    <span className="text-accent font-heading font-medium tracking-[0.2em] text-xs uppercase uppercase flex items-center gap-4">
                      <span className="w-12 h-[1px] bg-accent inline-block" />
                      {slide.subtitle || 'KURUMSAL HUKUK · TECRÜBELİ EKİP'}
                    </span>
                    
                    <h1 className="text-white text-fluid-h1 font-heading leading-[1.1] tracking-tight">
                      {titleStart}{' '}
                      {lastWord && <em className="text-accent italic font-light">{lastWord}</em>}
                    </h1>
                    
                    <p className="text-white/78 text-lg font-sans leading-relaxed max-w-xl">
                      Ticari anlaşmazlıklardan şirket birleşmelerine kadar geniş bir alanda öngörülebilir ve sonuç odaklı stratejiler sunuyoruz.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                      <Link 
                        href={ROUTES.CONTACT}
                        className={buttonVariants({ variant: 'default', className: "bg-accent hover:bg-white text-navy font-bold tracking-wider uppercase px-8 min-h-[56px] rounded-none w-full sm:w-auto transition-colors" })}
                      >
                        Randevu Al
                      </Link>
                      <Link 
                        href="#services-title"
                        className={buttonVariants({ variant: 'outline', className: "border-white/30 hover:border-white text-white bg-transparent hover:bg-white/10 font-bold tracking-wider uppercase px-8 min-h-[56px] rounded-none w-full sm:w-auto transition-colors" })}
                      >
                        Hizmetlerimiz
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls Container */}
      <div className="absolute bottom-8 left-0 right-0 z-30 pointer-events-none">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-end">
          
          {/* Dots */}
          <div className="flex gap-2 pointer-events-auto">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Slide ${index + 1} seçimi`}
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-full",
                  index === selectedIndex 
                    ? "w-8 bg-accent" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>

          {/* Arrows & Counter */}
          <div className="flex items-center gap-6 pointer-events-auto">
            <div className="hidden sm:block text-white/50 font-heading font-medium tracking-widest text-sm select-none">
              <span className="text-white">{String(selectedIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                aria-label="Önceki slide"
                className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-navy transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Sonraki slide"
                className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-navy transition-all duration-300"
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
