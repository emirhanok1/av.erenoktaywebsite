import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [state, setState] = useState({
    scrollY: 0,
    scrollPercent: 0,
  })

  useEffect(() => {
    let ticking = false

    const update = () => {
      const el = document.documentElement
      const scrollY = window.pageYOffset
      const scrollPercent = Math.min(
        100,
        (el.scrollTop / 
          (el.scrollHeight - el.clientHeight)
        ) * 100
      )
      setState({ scrollY, scrollPercent })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener(
      'scroll', onScroll, { passive: true }
    )
    update()
    return () => 
      window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
