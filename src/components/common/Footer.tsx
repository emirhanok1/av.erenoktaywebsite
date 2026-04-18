import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const SOCIAL_ICONS = [
  { 
    name: 'Facebook', 
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  },
  { 
    name: 'Instagram', 
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-18 11.6 7.2.1 11.6-4.1 11.6-4.1-3.4-1-4.8-2.7-5.4-4 .7.2 1.2 0 1.2 0-3.3-1.1-4.7-3.9-4.8-5.3.7.4 1.2.5 1.7.5-3.3-2.3-1.6-5.8-1.5-6 3.9 4.6 9.1 5.3 9.1 5.3-1.5-6.8 6.4-9.3 10-5.8 1.4-.2 2.8-.8 2.8-.8-1.2 1.8-2.1 2.3-2.1 2.3 1.2-.2 2.5-.7 2.5-.7-.7 1.1-2 2.4-2 2.4z" />
      </svg>
    )
  },
  { 
    name: 'Linkedin', 
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
]

export default function Footer() {
  return (
    <footer className="bg-secondary text-white/70 pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* COLUMN 1: BRAND */}
          <div className="space-y-6">
            <Link href={ROUTES.HOME} className="flex items-center gap-4 outline-none">
              <div className="relative w-11 h-11 border-[1.5px] border-white/70 flex items-center justify-center">
                <div className="absolute inset-1 border border-white/30" />
                <span className="font-heading italic font-medium text-lg text-white relative z-10">E·O</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-medium text-lg tracking-[0.08em] text-white">EREN OKTAY</span>
                <span className="text-[10px] tracking-[0.32em] text-white/50 uppercase mt-0.5">Hukuk Bürosu</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Eren Oktay Hukuk Bürosu olarak, ticaret hukuku ve aile hukuku başta olmak üzere geniş bir yelpazede profesyonel hukuki danışmanlık hizmeti sunuyoruz.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {SOCIAL_ICONS.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-navy transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-xs tracking-[0.22em] uppercase">Hızlı Linkler</h4>
            <ul className="space-y-4">
              {[
                { label: 'Anasayfa', href: ROUTES.HOME },
                { label: 'Hakkımızda', href: ROUTES.ABOUT },
                { label: 'Duyurular', href: ROUTES.NEWS },
                { label: 'Pratik Bilgiler', href: ROUTES.ARTICLES },
                { label: 'S.S.S.', href: ROUTES.FAQ },
                { label: 'İletişim', href: ROUTES.CONTACT },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-accent flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-1.5 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: WORKING HOURS */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-xs tracking-[0.22em] uppercase">Çalışma Saatleri</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Pazartesi - Cuma</span>
                <span className="text-white">09:00 - 18:30</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Cumartesi</span>
                <span className="text-white">10:00 - 14:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Pazar</span>
                <span className="text-accent italic font-medium">Kapalı</span>
              </li>
            </ul>
            <p className="text-xs italic opacity-60">* Randevu için lütfen iletişime geçiniz.</p>
          </div>

          {/* COLUMN 4: CONTACT */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-xs tracking-[0.22em] uppercase">İletişim Bilgileri</h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <MapPin size={18} className="text-accent shrink-0 mt-1" />
                <div className="space-y-1 text-sm">
                  <span className="text-[11px] font-bold tracking-widest text-accent uppercase block">Adres</span>
                  <p>Merkez Mahallesi, No: 123, Kat: 5, PK: 34000 Şişli / İstanbul</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} className="text-accent shrink-0 mt-1" />
                <div className="space-y-1 text-sm">
                  <span className="text-[11px] font-bold tracking-widest text-accent uppercase block">Telefon</span>
                  <p>+90 212 555 00 00</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={18} className="text-accent shrink-0 mt-1" />
                <div className="space-y-1 text-sm">
                  <span className="text-[11px] font-bold tracking-widest text-accent uppercase block">Email</span>
                  <p>info@erenoktayhukuk.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 py-8 flex flex-col md:row justify-between items-center gap-4 text-[12.5px] opacity-40">
          <p>© {new Date().getFullYear()} Av. Eren Oktay Hukuk Bürosu. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href={ROUTES.PRIVACY} className="hover:text-accent transition-colors underline-offset-4 hover:underline">
              KVKK Aydınlatma Metni
            </Link>
            <span>Tasarım: Gemini Deepmind</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
