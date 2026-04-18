'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Mail, Clock, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const NAV_ITEMS = [
  { label: 'Anasayfa', href: ROUTES.HOME },
  { label: 'Hakkımızda', href: ROUTES.ABOUT },
  { label: 'Duyurular', href: ROUTES.NEWS },
  { label: 'Pratik Bilgiler', href: ROUTES.ARTICLES },
  { label: 'S.S.S.', href: ROUTES.FAQ },
  { label: 'İletişim', href: ROUTES.CONTACT },
]

export default function Header() {
  const scrollY = useScrollPosition()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isScrolled = scrollY > 50

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-secondary text-white/80 py-2.5 text-xs hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+902125550000" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={14} className="text-accent" />
              <span>+90 212 555 00 00</span>
            </a>
            <a href="mailto:info@erenoktayhukuk.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail size={14} className="text-accent" />
              <span>info@erenoktayhukuk.com</span>
            </a>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-accent" />
              <span>Pzt - Cum 09:00 - 18:30</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-accent transition-colors text-accent font-medium">TR</span>
            <span className="opacity-30">/</span>
            <span className="cursor-pointer hover:text-accent transition-colors">EN</span>
            <span className="opacity-30">/</span>
            <span className="cursor-pointer hover:text-accent transition-colors">DE</span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 bg-white border-b',
          isScrolled ? 'py-3 shadow-md' : 'py-5 shadow-none'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* LOGO */}
          <Link href={ROUTES.HOME} className="group flex items-center gap-4 outline-none">
            <div className="relative w-11 h-11 border-[1.5px] border-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="absolute inset-1 border border-navy" />
              <span className="font-heading italic font-medium text-lg text-navy relative z-10">E·O</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-medium text-lg tracking-[0.08em] text-navy">EREN OKTAY</span>
              <span className="text-[10px] tracking-[0.32em] text-muted-foreground uppercase mt-0.5">Hukuk Bürosu</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors relative py-1',
                  pathname === item.href
                    ? 'text-navy after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                    : 'text-foreground hover:text-navy'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & MOBILE TRIGGER */}
          <div className="flex items-center gap-4">
            <Button className="hidden sm:flex bg-navy hover:bg-secondary text-white rounded-none px-6 py-6 text-xs font-semibold tracking-widest uppercase items-center gap-3">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              Randevu Al
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden text-navy p-0 w-8 h-8 flex items-center justify-center outline-none"
                  aria-label="Menüyü aç"
                >
                  <Menu size={32} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-secondary text-white border-none p-0 w-80">
                <SheetHeader className="p-6 border-b border-white/10 text-left">
                  <SheetTitle className="text-white font-heading text-xl tracking-wider">Menü</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <nav className="flex flex-col p-6 gap-2">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'py-4 text-base font-medium border-b border-white/5 tracking-wider transition-colors',
                          pathname === item.href ? 'text-accent' : 'text-white/80 hover:text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-6 mt-auto">
                    <Button className="w-full bg-accent hover:bg-accent-dark text-navy rounded-none py-7 text-sm font-bold tracking-widest uppercase">
                      Randevu Al
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
