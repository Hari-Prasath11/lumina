import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Cursor-follow glow for any element marked data-spotlight. */
export function useSpotlight() {
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return
    const onMove = (e) => {
      const el = e.target.closest?.('[data-spotlight]')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}

/* Fade/slide sections in as they enter the viewport. */
export function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const els = document.querySelectorAll('[data-reveal]')
    document.documentElement.classList.add('reveal-ready')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* Counts a stat like "1,500+" up from zero when it scrolls into view. */
export function CountUp({ value }) {
  const match = value.match(/^([\d,]+)(.*)$/)
  const target = match ? Number(match[1].replace(/,/g, '')) : 0
  const suffix = match ? match[2] : ''
  const ref = useRef(null)
  const [n, setN] = useState(target)

  useEffect(() => {
    if (!match || prefersReducedMotion()) return
    setN(0)
    const el = ref.current
    let raf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1600
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur)
          const eased = 1 - Math.pow(1 - p, 4)
          setN(Math.round(target * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!match) return value
  return (
    <span ref={ref}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

/* Slight 3D tilt toward the cursor. */
export function Tilt({ children, className, max = 7 }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (prefersReducedMotion()) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.setProperty('--ry', `${x * max * 2}deg`)
    ref.current.style.setProperty('--rx', `${-y * max * 2}deg`)
    ref.current.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    ref.current.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }
  const onLeave = () => {
    ref.current.style.setProperty('--ry', '0deg')
    ref.current.style.setProperty('--rx', '0deg')
  }
  return (
    <figure ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </figure>
  )
}
