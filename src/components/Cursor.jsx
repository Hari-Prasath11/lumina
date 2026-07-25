import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.css'

/**
 * Custom trailing cursor: a precise dot + a lerping ring that expands
 * over interactive elements. Add `data-cursor="Label"` to any element to
 * show a label inside the ring. Hidden entirely on touch devices.
 */
export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...target }
    let raf
    let running = false

    // Self-halting lerp loop: stops once the ring settles, restarts on move.
    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16
      ring.y += (target.y - ring.y) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      if (Math.abs(target.x - ring.x) < 0.1 && Math.abs(target.y - ring.y) < 0.1) {
        running = false
        return
      }
      raf = requestAnimationFrame(loop)
    }
    const startLoop = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      setVisible(true)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      }
      startLoop()
    }

    const onOver = (e) => {
      const el = e.target.closest?.(
        'a, button, [data-cursor], input, textarea, [role="button"]'
      )
      if (el) {
        setHovering(true)
        setLabel(el.getAttribute('data-cursor') || '')
      } else {
        setHovering(false)
        setLabel('')
      }
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className={`${styles.root} cursor-root`} aria-hidden="true" data-visible={visible}>
      <div
        ref={ringRef}
        className={styles.ring}
        data-hover={hovering}
        data-pressed={pressed}
        data-labeled={!!label}
      >
        <span className={styles.ringVisual} />
        {label && <span className={styles.label}>{label}</span>}
      </div>
      <div ref={dotRef} className={styles.dot} data-hover={hovering} />
    </div>
  )
}
