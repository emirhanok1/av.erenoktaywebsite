'use client'

import { Phone, MessageCircle } from 'lucide-react'

export default function StickyCTABar() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden flex bg-white border-t-2 border-accent">
      <a
        href="tel:+902125550000"
        className="flex-1 min-h-[56px] bg-secondary text-white flex items-center justify-center gap-3 text-sm font-semibold tracking-wide active:bg-navy transition-colors"
      >
        <Phone size={18} />
        <span>Hemen Ara</span>
      </a>
      <div className="w-px bg-white/10" />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[56px] bg-[#25D366] text-white flex items-center justify-center gap-3 text-sm font-semibold tracking-wide active:bg-[#1ebd5e] transition-colors"
      >
        <MessageCircle size={18} fill="currentColor" />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}
