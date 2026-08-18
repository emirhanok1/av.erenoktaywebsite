'use client'

import { useReveal } from '../hooks/useReveal'

interface ScribbleUnderlineProps {
  children: string
}

export function ScribbleUnderline({ children }: ScribbleUnderlineProps) {
  const { ref, isVisible } = useReveal(0)

  return (
    <span ref={ref} className="relative inline-block">
      <em className="text-gold-700 italic font-normal">{children}</em>
      <svg
        aria-hidden="true"
        viewBox="0 0 170 14"
        preserveAspectRatio="none"
        className="absolute -left-[4%] w-[108%] h-[0.55em] -bottom-[0.42em] overflow-visible pointer-events-none"
      >
        <path
          d="M3,11 Q30,9 60,11 T120,10.5 T165,12"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength="100"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: isVisible ? 0 : 100,
            transition: 'stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
          }}
        />
      </svg>
    </span>
  )
}
