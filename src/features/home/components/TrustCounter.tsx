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
    if (!isInView) return

    if (shouldReduceMotion) {
      setCount(end)
      return
    }

    let start = 0
    const duration = 1800 // ms
    const steps = 60
    const increment = end / steps
    const intervalMs = duration / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [isInView, end, shouldReduceMotion])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center text-center space-y-2"
    >
      <div className="flex items-end leading-none">
        <span className="font-heading text-[42px] font-medium text-navy leading-none">
          {count}
        </span>
        <span className="font-heading text-[32px] font-medium text-accent leading-none mb-0.5">
          {suffix}
        </span>
      </div>
      <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}
