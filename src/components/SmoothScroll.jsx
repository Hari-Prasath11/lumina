import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext({ lenis: null, scrollTo: () => {} })

export const useSmoothScroll = () => useContext(LenisContext)

/**
 * Wraps the app in a Lenis smooth-scroll instance and exposes an
 * imperative `scrollTo`. Automatically disabled for users who prefer
 * reduced motion (falls back to native smooth scroll).
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    lenisRef.current = instance
    setLenis(instance)

    let frame
    const raf = (time) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.4, ...options })
    } else if (typeof target === 'number') {
      // Native fallback (reduced motion): numeric target = pixel offset.
      window.scrollTo({ top: target, behavior: 'smooth' })
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>{children}</LenisContext.Provider>
  )
}
