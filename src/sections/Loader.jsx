import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'

const MIN_MS = 2200
const STAGES = [
  [0, 'Casting bronze'],
  [40, 'Lighting the stage'],
  [80, 'Polishing details'],
  [100, 'Ready'],
]

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })
}

/* Full-screen preloader: counts 000 → 100 following real asset progress, then lifts away. */
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
      // time-based ceiling keeps the count smooth even when assets resolve instantly
      const timeCap = reduce ? 100 : Math.min(100, (elapsed / MIN_MS) * 100)
      const goal = Math.min(target.current, timeCap)
      value += (goal - value) * (reduce ? 1 : 0.08)
      if (goal - value < 0.4) value = goal
      value = Math.min(100, Math.max(0, value))
      setShown(Math.floor(value))
      if (value >= 100) {
        setPhase('leaving')
        setTimeout(
          () => {
            root.classList.remove('is-loading')
            root.classList.add('is-loaded')
          },
          reduce ? 0 : 650,
        )
        setTimeout(() => setPhase('gone'), reduce ? 50 : 1500)
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
  const label = ([...STAGES].reverse().find(([at]) => shown >= at) || STAGES[0])[1]

  return (
    <div className={`loader${phase === 'leaving' ? ' loader--leave' : ''}`} role="status" aria-live="polite">
      <div className="loader__glow" aria-hidden="true" />
      <div className="loader__grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="loader__top">
        <span>{profile.name}</span>
        <span>Portfolio · {new Date().getFullYear()}</span>
      </div>

      <div className="loader__center">
        <p className="loader__count" aria-label={`Loading ${shown} percent`}>
          {String(shown).padStart(3, '0')}
        </p>
        <p className="loader__label">{label}</p>
      </div>

      <div className="loader__bottom">
        <span>Full-stack engineer · Co-founder, Glide</span>
        <span>{shown}%</span>
      </div>
      <span className="loader__bar" style={{ transform: `scaleX(${shown / 100})` }} aria-hidden="true" />
    </div>
  )
}
