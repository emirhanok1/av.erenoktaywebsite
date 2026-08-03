import Link from 'next/link'
import { Phone, MapPin, Mail } from 'lucide-react'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white/85 pt-6 md:pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-12 pb-5 md:pb-10 text-center md:text-left">
          
          {/* COLUMN 1: BRAND */}
          <div className="space-y-2 md:space-y-5 flex flex-col items-center md:items-start">
            <Link href={ROUTES.HOME} className="flex items-center gap-3 md:gap-4 outline-none">
              <div className="relative w-8 h-8 md:w-11 md:h-11 border-[1.5px] border-white/70 flex items-center justify-center">
                <div className="absolute inset-1 border border-white/30" />
                <span className="font-heading italic font-medium text-sm md:text-lg text-white relative z-10">E·O</span>
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="font-heading font-medium text-sm md:text-lg tracking-[0.08em] text-white">EREN OKTAY</span>
                <span className="text-[8px] md:text-[10px] tracking-[0.32em] text-white/85 uppercase mt-0.5">Hukuk Bürosu</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm hidden md:block">
              İcra, kira ve ceza hukuku başta olmak üzere profesyonel hukuki danışmanlık hizmeti.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-2 md:space-y-5">
            <h4 className="text-white font-semibold text-xs tracking-[0.22em] uppercase hidden md:block">Hızlı Linkler</h4>
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 md:flex-col md:space-y-3 md:gap-0">
              {[
                { label: 'Anasayfa', href: ROUTES.HOME },
                { label: 'Hakkımızda', href: ROUTES.ABOUT },
                { label: 'Duyurular', href: ROUTES.NEWS },
                { label: 'Pratik Bilgiler', href: ROUTES.ARTICLES },
                { label: 'Hesaplama Araçları', href: ROUTES.TOOLS },
                { label: 'S.S.S.', href: ROUTES.FAQ },
                { label: 'İletişim', href: ROUTES.CONTACT },
                { label: 'KVKK', href: ROUTES.PRIVACY },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[11px] md:text-sm hover:text-accent flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-1.5 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 hidden md:block" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT & HOURS */}
          <div className="space-y-2 md:space-y-5 flex flex-col items-center md:items-start">
            <h4 className="text-white font-semibold text-xs tracking-[0.22em] uppercase hidden md:block">İletişim</h4>
            
            <div className="space-y-1 md:space-y-4 text-[11px] md:text-sm text-center md:text-left flex flex-col items-center md:items-start leading-tight md:leading-normal">
              
              <div className="flex gap-3 md:gap-4 items-center md:items-start">
                <MapPin size={16} className="text-accent shrink-0 hidden md:block mt-0.5" />
                <div>
                  <p>Aşağı Öveçler Mahallesi, 1331. Cadde No: 3/3, Çankaya / Ankara</p>
                </div>
              </div>
              
              <div className="flex gap-3 md:gap-4 items-center md:items-start">
                <Phone size={16} className="text-accent shrink-0 hidden md:block mt-0.5" />
                <div>
                  <p>+90 507 400 71 40</p>
                </div>
              </div>
              
              <div className="flex gap-3 md:gap-4 items-center md:items-start">
                <Mail size={16} className="text-accent shrink-0 hidden md:block mt-0.5" />
                <div>
                  <a href={`mailto:${SITE.email}`} className="hover:text-accent transition-colors">
                    {SITE.email}
                  </a>
                </div>
              </div>
              
              <div className="pt-0.5 md:pt-3 text-[11px] md:text-sm text-white/90">
                <p>Pzt - Cum 09:00 - 18:00</p>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 py-4 text-center text-[10px] md:text-xs opacity-85">
          <p>© 2026 Eren Oktay Hukuk Bürosu. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
