'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Clock, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'
import { SITE } from '@/constants/site'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
  const { scrollY, scrollPercent } = useScrollPosition()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const TOPBAR_HEIGHT = 40

  const TRANSPARENT_HERO_ROUTES = [
    '/',
    '/duyurular',
    '/pratik-bilgiler',
    '/sss',
    '/iletisim',
    '/kvkk',
  ]

  const hasTransparentHero = TRANSPARENT_HERO_ROUTES.includes(pathname)
  const isScrolled = scrollY > 60
  const showTransparent = hasTransparentHero && !isScrolled

  return (
    <>
      {/* PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 h-[2px] z-modal transition-[width] duration-150 pointer-events-none"
        style={{ 
          width: `${scrollPercent}%`,
          backgroundColor: '#c9a84c'
        }}
      />

      {/* TOP BAR */}
      <div 
        id="topbar"
        className={cn(
          "fixed top-0 z-topbar w-full bg-secondary text-white/80 py-2.5 text-xs hidden md:block transition-all duration-300",
          isScrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+905074007140" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={14} className="text-accent" />
              <span>+90 507 400 71 40</span>
            </a>

            <div className="flex items-center gap-2">
              <Clock size={14} className="text-accent" />
              <span>Pzt - Cum 09:00 - 18:00</span>
            </div>
          </div>
          {/* Diller kaldirildi */}
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={cn(
          'fixed left-0 right-0 z-header w-full transition-all duration-300',
          !showTransparent
            ? 'bg-white border-b border-border shadow-sm py-3'
            : 'bg-transparent border-b border-transparent py-5'
        )}
        style={{
          top: isScrolled ? '0px' : `${TOPBAR_HEIGHT}px`
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* LOGO */}
          <Link href={ROUTES.HOME} className="group flex items-center gap-4 outline-none">
            <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <Image
                src={SITE.logo}
                alt="Eren Oktay Hukuk Bürosu"
                width={44}
                height={41}
                priority
                className={cn(
                  "transition-all duration-300",
                  showTransparent ? "brightness-0 invert" : ""
                )}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={cn(
                'font-heading font-medium text-lg tracking-[0.08em] transition-colors duration-300',
                !showTransparent ? 'text-navy' : 'text-white'
              )}>EREN OKTAY</span>
              <span className={cn(
                "text-[10px] tracking-[0.32em] uppercase mt-0.5 transition-colors duration-300",
                !showTransparent ? "text-muted-foreground" : "text-white/60"
              )}>Hukuk Bürosu</span>
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
                  !showTransparent
                    ? pathname === item.href
                      ? 'text-navy after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                      : 'text-foreground hover:text-navy'
                    : pathname === item.href
                      ? 'text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                      : 'text-white/90 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & MOBILE TRIGGER */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/905074007140"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group hidden sm:flex rounded-none px-6 py-6 text-xs font-semibold tracking-widest uppercase items-center gap-3 transition-colors duration-300",
                !showTransparent 
                  ? "bg-navy hover:bg-secondary text-white" 
                  : "bg-transparent border border-accent text-white hover:bg-accent hover:text-navy"
              )}>
              <div className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                !showTransparent ? "bg-accent" : "bg-accent group-hover:bg-navy"
              )} />
              İletişime Geç
            </a>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "lg:hidden p-0 w-8 h-8 flex items-center justify-center outline-none transition-colors duration-300",
                    !showTransparent ? "text-navy" : "text-white"
                  )}
                  aria-label="Menüyü aç"
                >
                  <Menu size={32} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-navy border-white/10 p-0">
                <SheetHeader className="p-6 border-b border-white/10 text-left">
                  <SheetTitle className="text-white font-heading text-xl tracking-wider">
                    Menü
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Site navigasyon menüsü
                  </SheetDescription>
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
                    <a
                      href="https://wa.me/905074007140"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-accent hover:bg-accent-dark text-navy rounded-none py-7 text-sm font-bold tracking-widest uppercase flex items-center justify-center"
                    >
                      İletişime Geç
                    </a>
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
