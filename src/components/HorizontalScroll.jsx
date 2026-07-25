import { useEffect, useRef } from 'react'
import { useSmoothScroll } from './SmoothScroll'
import styles from './HorizontalScroll.module.css'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

/**
 * Pins a full-height viewport and pans its track horizontally as the user
 * scrolls vertically (1px ≈ 1px). Falls back to a native horizontal swipe on
 * touch / narrow screens AND under prefers-reduced-motion — no pinning.
 *
 * Perf: progress is derived from window.scrollY against a cached document
 * offset, so the per-frame path never forces a reflow. Keyboard: focusing a
 * link inside the panned track scrolls the pin to reveal it.
 */
export default function HorizontalScroll({ children, className }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const mqMobile = window.matchMedia('(max-width: 900px), (pointer: coarse)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isStatic = () => mqMobile.matches || mqReduce.matches

    let raf = 0
    let maxX = 0
    let wrapTop = 0
    let scrollable = 1

    const update = () => {
      raf = 0
      if (isStatic()) return
      const progress = clamp((window.scrollY - wrapTop) / scrollable, 0, 1)
      track.style.transform = `translate3d(${(-progress * maxX).toFixed(2)}px, 0, 0)`
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const layout = () => {
      if (isStatic()) {
        wrap.style.height = ''
        track.style.transform = ''
        if (barRef.current) barRef.current.style.transform = 'scaleX(0)'
        return
      }
      maxX = Math.max(0, track.scrollWidth - window.innerWidth)
      wrapTop = window.scrollY + wrap.getBoundingClientRect().top
      wrap.style.height = `${window.innerHeight + maxX}px`
      scrollable = maxX || 1
      update()
    }

    // Keyboard: reveal a focused link that lives in the transform-panned track.
    const onFocusIn = (e) => {
      if (isStatic() || !maxX) return
      const el = e.target
      if (!el || !track.contains(el)) return
      const left = el.getBoundingClientRect().left
      const targetLeft = window.innerWidth * 0.2
      const delta = left - targetLeft
      if (Math.abs(delta) < 8) return
      scrollTo(clamp(window.scrollY + delta, wrapTop, wrapTop + maxX))
    }

    layout()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', layout)
    mqMobile.addEventListener('change', layout)
    mqReduce.addEventListener('change', layout)
    wrap.addEventListener('focusin', onFocusIn)
    const ro = new ResizeObserver(layout)
    ro.observe(track)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', layout)
      mqMobile.removeEventListener('change', layout)
      mqReduce.removeEventListener('change', layout)
      wrap.removeEventListener('focusin', onFocusIn)
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrollTo])

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className || ''}`}>
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>
          {children}
        </div>
        <div className={styles.progress} aria-hidden="true">
          <div ref={barRef} className={styles.bar} />
        </div>
      </div>
    </div>
  )
}
