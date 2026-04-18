'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface TrustCounterProps {
  end: number
  suffix?: string
  label: string
}

export function TrustCounter({ end, suffix = '', label }: TrustCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setCount(end)
      return
    }

    let start = 0
    const duration = 2000 // 2 seconds
    const increment = end / (duration / 16) // roughly 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, end, shouldReduceMotion])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center space-y-2 opacity-0 animate-in fade-in duration-1000 fill-mode-forwards">
      <div className="flex items-center">
        <span className="font-heading text-[42px] font-medium text-navy leading-none">
          {count}
        </span>
        <span className="font-heading text-[42px] font-medium text-accent leading-none">
          {suffix}
        </span>
      </div>
      <span className="text-[12px] font-bold tracking-[0.2em] text-muted-foreground uppercase uppercase">
        {label}
      </span>
    </div>
  )
}
