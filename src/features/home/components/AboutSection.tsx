import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedReveal } from './AnimatedReveal'
import { ROUTES } from '@/constants/routes'

const HIGHLIGHTS = [
  'İlkeli Yaklaşım',
  'Sektörel Tecrübe',
  'Şeffaf Süreç',
  'Müvekkil Odaklı Çalışma'
]

export default function AboutSection() {
  return (
    <section className="bg-[#f8f9fa] py-20 lg:py-[120px] overflow-hidden" aria-labelledby="about-title">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-10">
            <AnimatedReveal>
              <span className="text-gold-700 font-heading font-semibold tracking-[0.2em] text-xs uppercase flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-accent inline-block" />
                HAKKIMIZDA
              </span>
              
              <h2 id="about-title" className="text-3xl md:text-4xl lg:text-[42px] font-heading text-navy mb-8 leading-[1.2]">
                Sessiz bir prestijin,<br />
                <em className="text-accent italic font-light">kararlı bir savunmanın</em> adresi.
              </h2>

              <blockquote className="border-l-2 border-accent pl-6 py-2 mb-8">
                <p className="font-heading text-xl md:text-2xl italic text-navy/80 leading-relaxed">
                  &quot;Hukuk, sadece ihtilafları çözmek için değil, geleceği güvenle inşa etmek için vardır.&quot;
                </p>
              </blockquote>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Eren Oktay Hukuk Bürosu, kuruluşundan bu yana şeffaflık, güven ve profesyonellik ilkelerinden taviz vermeden müvekkillerine hizmet sunmaktadır. Karmaşık hukuki sorunların çözümünde, salt teorik bilgiyle değil, sektörel dinamiklere hakim pratik bir vizyonla hareket ediyoruz.
                </p>
                <p>
                  Yerli ve yabancı müvekkillerimize, uluslararası standartlarda hukuki danışmanlık hizmeti sunarken, her bir dosyanın özgünlüğüne uygun, kişiselleştirilmiş stratejiler geliştiriyoruz.
                </p>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 my-10">
                {HIGHLIGHTS.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-none bg-accent rotate-45 shrink-0" />
                    <span className="font-heading text-navy font-medium opacity-90">{item}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={ROUTES.ABOUT}
                className="inline-flex items-center gap-3 text-navy font-bold tracking-widest text-sm uppercase group hover:text-accent transition-colors"
              >
                <span>Daha Fazla Bilgi Edinin</span>
                <div className="w-8 h-[1px] bg-navy group-hover:bg-accent transition-colors" />
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedReveal>
          </div>

          {/* Right Visual Image */}
          <AnimatedReveal delay={0.3} className="relative lg:pl-10 mt-12 lg:mt-0">
            {/* Portrait container without overflow hidden so overlays can pop out */}
            <div className="relative w-full aspect-[4/5]">
              {/* Image Container with overflow hidden */}
              <div className="relative w-full h-full overflow-hidden">
                {/* The Main Image Placeholder/Content */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--navy-light)_0%,var(--navy)_100%)]">
                  {/* Optional Pattern Overlay */}
                </div>
              </div>

              {/* Overlay Card Bottom Left - stays fixed relative to container */}
              <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-navy border-b-4 border-accent p-6 md:p-8 shadow-2xl z-20 w-[85%] md:w-[75%] max-w-[340px]">
                <p className="font-heading italic text-white/90 text-sm md:text-base leading-relaxed mb-4">
                  &quot;Müvekkillerimizin hedefleri, bizim hukuki pusulamızdır.&quot;
                </p>
                <div className="text-white text-xs tracking-widest uppercase font-semibold">
                  Eren Oktay <span className="text-accent opacity-70 ml-2">Kurucu Avukat</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Background Square */}
            <div className="absolute -bottom-10 right-0 w-3/4 h-3/4 border-2 border-accent/20 -z-10 transform translate-x-4 lg:translate-x-10 translate-y-4 lg:translate-y-10" />
          </AnimatedReveal>

        </div>
      </div>
    </section>
  )
}
