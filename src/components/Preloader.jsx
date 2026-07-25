import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import styles from './Preloader.module.css'

/**
 * Intro counter (0 → 100) with a name reveal, then a curtain wipe up.
 * Calls onComplete once the wipe finishes so the hero can take over.
 */
export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 500 : 1900
    let raf
    let start

    const tick = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => setLeaving(true), 260)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className={styles.root}
      initial={{ y: 0 }}
      animate={leaving ? { y: '-101%' } : { y: 0 }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) onComplete?.()
      }}
    >
      <div className={styles.top}>
        <span>PORTFOLIO</span>
        <span>©2026</span>
      </div>

      <div className={styles.center}>
        <motion.div
          className={styles.name}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {profile.name}
        </motion.div>
        <motion.span
          className={styles.role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {profile.role}
        </motion.span>
      </div>

      <div className={styles.bottom}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <span className={styles.count}>{count}</span>
      </div>
    </motion.div>
  )
}
