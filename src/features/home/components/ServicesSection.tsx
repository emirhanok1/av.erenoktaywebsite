import React from 'react'
import Link from 'next/link'
import { Scale, Umbrella, Gavel, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedReveal } from './AnimatedReveal'
import { HeadingUnderline } from './HeadingUnderline'
import { ScribbleUnderline } from './ScribbleUnderline'

const SERVICES = [
  {
    id: 1,
    title: 'İcra ve İflas Hukuku',
    icon: <Scale className="text-accent" strokeWidth={1.5} size={28} />,
    items: ['Dosyadan haciz kaldırma', 'İcra takibi', 'Ödeme emri itirazları'],
  },
  {
    id: 2,
    title: 'Sigorta Tahkim Hukuku',
    icon: <Umbrella className="text-accent" strokeWidth={1.5} size={28} />,
    items: ['Sigorta tahkim başvuruları', 'Değer kaybı tazminatı', 'Hasar ve poliçe itirazları'],
  },
  {
    id: 3,
    title: 'Ceza Hukuku',
    icon: <Gavel className="text-accent" strokeWidth={1.5} size={28} />,
    items: ['Ceza davaları', 'Soruşturma ve kovuşturma', 'Sanık ve mağdur vekilliği'],
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 lg:py-[120px] overflow-hidden" aria-labelledby="services-title">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <AnimatedReveal className="max-w-2xl mb-16 lg:mb-24">
          <span className="text-gold-700 font-heading font-semibold tracking-[0.2em] text-xs uppercase flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-accent inline-block" />
            UZMANLIK ALANLARIMIZ
          </span>
          <h2 id="services-title" className="text-3xl md:text-4xl lg:text-5xl font-heading text-navy mb-6 leading-tight">
            Karmaşık Hukuki Süreçlerde <br className="hidden md:block" />
            <ScribbleUnderline>Stratejik</ScribbleUnderline> Danışmanlık
          </h2>
          <HeadingUnderline />
          <p className="text-muted-foreground text-lg leading-relaxed mt-6">
            Müvekkillerimizin hukuki haklarını korumak ve ticari başarılarını güvence altına almak için proaktif ve sonuç odaklı çözümler üretiyoruz.
          </p>
        </AnimatedReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-gray-200">
          {SERVICES.map((service, index) => (
            <AnimatedReveal 
              key={service.id} 
              delay={index * 0.15} 
              className="group border-r border-b border-gray-200 p-8 lg:p-[44px_38px] hover:bg-gray-50 transition-colors duration-500 relative flex flex-col h-full overflow-hidden"
            >
              {/* Üst altın çizgi */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              {/* Number */}
              <div className="text-accent/60 font-heading text-sm tracking-widest mb-8">
                0{service.id} <span className="opacity-50">/</span> HİZMET
              </div>

              {/* Icon Box */}
              <div className="w-14 h-14 border border-accent/30 rounded-lg flex items-center justify-center mb-8 bg-white transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:-translate-y-1 group-hover:-rotate-[4deg]">
                {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, {
                  className: cn(
                    (service.icon as React.ReactElement<{ className?: string }>).props.className,
                    "group-hover:text-navy"
                  )
                })}
              </div>

              {/* Title */}
              <h3 className="text-[23px] font-heading text-navy mb-8 leading-tight">
                {service.title}
              </h3>

              {/* List */}
              <ul className="mt-auto space-y-4 pt-8 border-t border-gray-100 mb-12">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Footer Link */}
              <Link 
                href="/iletisim" 
                className="inline-flex items-center gap-3 text-navy font-semibold text-xs tracking-widest uppercase mt-auto group/link"
              >
                <span>Detaylı Bilgi</span>
                <ArrowRight 
                  size={16} 
                  className="text-accent transition-all duration-300 group-hover:text-gold group-hover:translate-x-1.5" 
                />
              </Link>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
