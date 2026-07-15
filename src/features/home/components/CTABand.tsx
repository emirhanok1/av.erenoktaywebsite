import React from 'react'
import { buttonVariants } from '@/components/ui/button'

export default function CTABand() {
  return (
    <section className="relative bg-navy py-[70px] overflow-hidden" aria-label="İletişime Geçin">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c9a84c 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Text */}
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl lg:text-[32px] font-heading text-white leading-snug">
              Hukuki meseleniz için{' '}
              <em className="text-accent italic font-light">öngörülebilir bir yol haritası</em>{' '}
              mı arıyorsunuz?
            </h3>
          </div>

          {/* Right Button */}
          <div className="shrink-0">
            <a 
              href="https://wa.me/905074007140"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'default', className: "bg-accent hover:bg-white text-navy font-bold tracking-widest uppercase px-10 py-7 rounded-none transition-colors border border-accent inline-flex items-center justify-center" })}
            >
              İletişime Geçin
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
