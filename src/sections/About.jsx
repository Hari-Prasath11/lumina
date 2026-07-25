import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { EASE, viewportOnce } from '../lib/motion'
import { stats } from '../data/content'
import styles from './About.module.css'

/**
 * Single stat: a big Syne number that counts up from 0 → value the first
 * time it scrolls into view (rAF, easeOutCubic). Reduced motion renders the
 * final value immediately. An sr-only sibling always carries the true value
 * with its suffix + label for assistive tech.
 */
function Stat({ value, suffix, label, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    const node = ref.current
    if (!node) return

    let raf = 0
    let started = false
    const duration = 1400

    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setDisplay(Math.round(value * eased))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            run()
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(node)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, reduce])

  return (
    <motion.li
      ref={ref}
      className={styles.stat}
      data-cursor="Stat"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
    >
      <span className={styles.figure} aria-hidden="true">
        <span className={styles.num}>{display}</span>
        <span className={styles.suffix}>{suffix}</span>
      </span>
      <span className="sr-only">
        {value}
        {suffix} — {label}
      </span>
      <span className={styles.label} aria-hidden="true">
        {label}
      </span>
    </motion.li>
  )
}

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <SectionHeading index="01" eyebrow="About" title="Who I am" highlight="I am" />

        <Reveal as="p" className={styles.lead} data-cursor="About">
          Full-stack developer with nearly two years building{' '}
          <span className="text-gradient">scalable, AI-powered</span> web applications
          across seven-plus products — from architecture through production. I care about
          clean, efficient solutions to real problems.
        </Reveal>

        <Reveal as="ul" className={styles.stats} amount={0.25}>
          {stats.map((s, i) => (
            <Stat
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              index={i}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
