import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'

const MIN_MS = 1400

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })
}

/* Minimal preloader: name + a thin line that fills with real asset progress, then fades away. */
export default function Loader() {
  const [shown, setShown] = useState(0)
  const [phase, setPhase] = useState('loading') // loading → leaving → gone
  const target = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    root.classList.add('is-loading')
    const start = performance.now()

    const tasks = [
      document.fonts ? document.fonts.ready : Promise.resolve(),
      preload(profile.founderPhoto),
      preload('/glide-logo.png'),
      new Promise((resolve) => {
        if (window.__stageReady) resolve()
        else window.addEventListener('stage:ready', resolve, { once: true })
      }),
    ]
    let done = 0
    tasks.forEach((t) =>
      t.then(() => {
        done += 1
        target.current = (done / tasks.length) * 100
      }),
    )
    // Never hang: assume ready after 8s
    const fallback = setTimeout(() => (target.current = 100), 8000)

    let raf = 0
    let value = 0
    const tick = (now) => {
      const elapsed = Math.max(0, now - start)
      const timeCap = reduce ? 100 : Math.min(100, (elapsed / MIN_MS) * 100)
      const goal = Math.min(target.current, timeCap)
      value += (goal - value) * (reduce ? 1 : 0.1)
      if (goal - value < 0.4) value = goal
      value = Math.min(100, Math.max(0, value))
      setShown(value)
      if (value >= 100) {
        setPhase('leaving')
        setTimeout(
          () => {
            root.classList.remove('is-loading')
            root.classList.add('is-loaded')
          },
          reduce ? 0 : 450,
        )
        setTimeout(() => setPhase('gone'), reduce ? 50 : 1200)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div className={`loader${phase === 'leaving' ? ' loader--leave' : ''}`} role="status" aria-label="Loading">
      <div className="loader__mark">
        <p className="loader__name">{profile.name}</p>
        <span className="loader__line" aria-hidden="true">
          <span style={{ transform: `scaleX(${shown / 100})` }} />
        </span>
      </div>
    </div>
  )
}
