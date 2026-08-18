import Link from 'next/link'
import { AnimatedReveal } from '@/features/home/components/AnimatedReveal'

interface BreadcrumbItem {
  name: string
  path: string
}

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
  breadcrumb: BreadcrumbItem[]
}

export default function PageHero({ eyebrow, title, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative bg-navy pt-32 pb-16 text-white text-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, rgba(201,168,76,0.07) 0px, rgba(201,168,76,0.07) 1px, transparent 1px, transparent 48px)',
        }}
      />
      <div className="container relative">
        <AnimatedReveal>
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-5">
            {breadcrumb.map((item, i) => (
              <span key={item.path}>
                {i > 0 && <span className="mx-2 text-white/30">/</span>}
                {i === breadcrumb.length - 1 ? (
                  <span className="text-white/70">{item.name}</span>
                ) : (
                  <Link href={item.path} className="hover:text-gold-300 transition-colors">
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <span className="text-accent font-heading font-medium tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-4 mb-5">
            <span className="w-9 h-[1px] bg-accent inline-block" />
            {eyebrow}
            <span className="w-9 h-[1px] bg-accent inline-block" />
          </span>

          <h1 className="font-heading text-3xl md:text-4xl text-white">{title}</h1>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-11 bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0" />
            <div className="h-px w-11 bg-gold/50" />
          </div>

          {description && (
            <p className="text-white/70 mt-6 max-w-2xl mx-auto text-sm md:text-base">{description}</p>
          )}
        </AnimatedReveal>
      </div>
    </section>
  )
}
