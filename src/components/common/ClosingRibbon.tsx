import { ArrowRight } from 'lucide-react'
import { AnimatedReveal } from '@/features/home/components/AnimatedReveal'

interface ClosingRibbonProps {
  quote: string
  ctaText: string
}

export default function ClosingRibbon({ quote, ctaText }: ClosingRibbonProps) {
  return (
    <section className="relative bg-navy overflow-hidden py-16 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, rgba(201,168,76,0.07) 0px, rgba(201,168,76,0.07) 1px, transparent 1px, transparent 48px)',
        }}
      />
      <AnimatedReveal className="relative container mx-auto px-4">
        <p className="font-heading italic text-accent text-lg md:text-xl mb-5">{quote}</p>
        <a
          href="https://wa.me/905074007140"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-semibold text-sm border-b border-gold pb-1 hover:text-gold transition-colors"
        >
          {ctaText}
          <ArrowRight size={16} className="text-accent" />
        </a>
      </AnimatedReveal>
    </section>
  )
}
