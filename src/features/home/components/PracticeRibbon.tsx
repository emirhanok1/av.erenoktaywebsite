import { AnimatedReveal } from './AnimatedReveal'

const AREAS = ['İcra ve İflas Hukuku', 'Sigorta Tahkim Hukuku', 'Ceza Hukuku']

export default function PracticeRibbon() {
  return (
    <section
      aria-label="Uzmanlık alanlarımız"
      className="relative w-full bg-navy overflow-hidden border-y border-accent/30 py-14 md:border-none md:py-24 md:[clip-path:polygon(0_16%,100%_0%,100%_84%,0%_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, rgba(201,168,76,0.08) 0px, rgba(201,168,76,0.08) 1px, transparent 1px, transparent 52px)',
        }}
      />

      <AnimatedReveal className="relative container mx-auto px-4 text-center">
        <p className="font-heading italic text-accent text-lg md:text-xl mb-6 md:mb-7">
          Her dosya, kendi stratejisini hak eder.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-x-6">
          {AREAS.map((area, i) => (
            <div key={area} className="flex items-center gap-4 md:gap-6">
              {i > 0 && <span className="w-1.5 h-1.5 bg-accent rotate-45 shrink-0" aria-hidden="true" />}
              <span className="uppercase tracking-[0.18em] text-xs md:text-sm font-heading font-medium text-white/90">
                {area}
              </span>
            </div>
          ))}
        </div>
      </AnimatedReveal>
    </section>
  )
}
