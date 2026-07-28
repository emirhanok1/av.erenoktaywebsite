'use client'

import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  useEffect(() => {
    const show = () => setVisible(true)
    const timer = setTimeout(show, 2000)
    window.addEventListener('scroll', show, { once: true, passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', show)
    }
  }, [])

  if (!visible) return null

  return (
    <m.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-whatsapp w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center lg:bottom-8 lg:right-8 group drop-shadow-md"
      aria-label="WhatsApp ile iletişim kurun"
      title="WhatsApp ile iletişim"
    >
      <MessageCircle size={28} fill="currentColor" />
      <span className="absolute right-full mr-4 bg-navy text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden lg:block">
        WhatsApp ile iletişim
      </span>
    </m.a>
  )
}
