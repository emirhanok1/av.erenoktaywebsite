'use client'

import React from 'react'
import { m } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

interface AnimatedRevealProps {
  children: React.ReactNode
  className?: string
  role?: string
  delay?: number
}

export function AnimatedReveal({ children, className, role, delay = 0 }: AnimatedRevealProps) {
  const { ref, motionProps } = useReveal()

  return (
    <m.div
      ref={ref}
      className={className}
      role={role}
      initial={motionProps.initial}
      animate={motionProps.animate}
      transition={{ ...motionProps.transition, delay }}
    >
      {children}
    </m.div>
  )
}
