'use client'

import { m } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

export function HeadingUnderline() {
  const { ref, isVisible, shouldReduceMotion } = useReveal(0)

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      className="h-[2px] w-12 bg-accent mt-4 origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isVisible ? 1 : 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 320, damping: 16, delay: 0.15 }
      }
    />
  )
}
