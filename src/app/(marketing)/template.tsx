'use client'

import { useEffect, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

// Set once hydration has happened at least once in this tab, so the very
// first page load (SSR or not) never plays the entrance animation - that
// gated the LCP element behind opacity:0 until JS loaded, adding 1-2s+ to
// LCP under throttled mobile. Real client-side navigations (Link clicks)
// still get the transition, since by then the page is already interactive.
let hasHydratedOnce = false

export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()
  const [animateEntrance] = useState(
    () => typeof window !== 'undefined' && hasHydratedOnce
  )

  useEffect(() => {
    hasHydratedOnce = true
  }, [])

  return (
    <m.div
      initial={animateEntrance && !shouldReduceMotion ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  )
}
