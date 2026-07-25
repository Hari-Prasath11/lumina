import { useEffect, useRef } from 'react'
import styles from './DotField.module.css'

// Iridescent tints reused near the cursor for a faint oil-slick shimmer.
const IRIS = ['#7fd7ff', '#ff9ad5', '#b0ffcf', '#ffe08a', '#c9b8ff']

/**
 * A fixed, site-wide interactive dot grid. At rest it's a barely-perceptible
 * texture; near the cursor, dots brighten, scale up, take on a faint iridescent
 * tint and drift toward the pointer. Redraws ONLY on pointer movement (no idle
 * loop), so it's effectively free when you're not interacting. Static grid for
 * reduced-motion / touch.
 */
export default function DotField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const noHover = window.matchMedia('(hover: none)').matches
    const interactive = !reduce && !noHover

    const GAP = 38
    const R = 190 // cursor influence radius
    const mouse = { x: -9999, y: -9999 }
    let w = 0
    let h = 0
    let raf = 0

    const draw = () => {
      raf = 0
      ctx.clearRect(0, 0, w, h)
      for (let y = GAP; y < h; y += GAP) {
        for (let x = GAP; x < w; x += GAP) {
          let r = 1
          let alpha = 0.08
          let ox = 0
          let oy = 0
          let color = '#ecebe6'

          if (interactive) {
            const dx = x - mouse.x
            const dy = y - mouse.y
            const dist = Math.hypot(dx, dy)
            if (dist < R) {
              const t = 1 - dist / R
              const e = t * t // ease so the bloom is tight
              r = 1 + e * 2.4
              alpha = 0.05 + e * 0.6
              const pull = e * 10
              ox = -(dx / (dist || 1)) * pull
              oy = -(dy / (dist || 1)) * pull
              if (t > 0.55) color = IRIS[(((x / GAP) | 0) + ((y / GAP) | 0)) % IRIS.length]
            }
          }

          ctx.globalAlpha = alpha
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      schedule()
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
      schedule()
    }

    resize()
    window.addEventListener('resize', resize)
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
