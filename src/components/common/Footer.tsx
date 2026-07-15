import Link from 'next/link'
import { Phone, MapPin, Mail } from 'lucide-react'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'

const SOCIAL_ICONS = [
  { 
    name: 'Facebook', 
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  },
  { 
    name: 'Instagram', 
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  { 
    name: 'Twitter', 
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-18 11.6 7.2.1 11.6-4.1 11.6-4.1-3.4-1-4.8-2.7-5.4-4 .7.2 1.2 0 1.2 0-3.3-1.1-4.7-3.9-4.8-5.3.7.4 1.2.5 1.7.5-3.3-2.3-1.6-5.8-1.5-6 3.9 4.6 9.1 5.3 9.1 5.3-1.5-6.8 6.4-9.3 10-5.8 1.4-.2 2.8-.8 2.8-.8-1.2 1.8-2.1 2.3-2.1 2.3 1.2-.2 2.5-.7 2.5-.7-.7 1.1-2 2.4-2 2.4z" />
      </svg>
    )
  },
  { 
    name: 'Linkedin', 
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
]

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
            <div className="flex items-center gap-2 md:gap-3 pt-1 md:pt-2">
              {SOCIAL_ICONS.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-7 h-7 md:w-9 md:h-9 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-navy transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
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
