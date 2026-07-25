import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sections, profile } from '../data/content'
import { useSmoothScroll } from './SmoothScroll'
import Magnetic from './Magnetic'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { scrollTo } = useSmoothScroll()
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef(null)
  const overlayRef = useRef(null)

  // Elevate nav after leaving the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Mobile menu: lock scroll, make background inert, trap focus, Escape to close.
  useEffect(() => {
    if (!menuOpen) return
    const main = document.getElementById('main')
    document.documentElement.style.overflow = 'hidden'
    main?.setAttribute('inert', '')

    // Move focus into the dialog.
    const first = overlayRef.current?.querySelector('a, button')
    first?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      main?.removeAttribute('inert')
      burgerRef.current?.focus()
    }
  }, [menuOpen])

  const go = (id) => {
    setMenuOpen(false)
    scrollTo(`#${id}`, { offset: id === 'hero' ? 0 : -20 })
  }

  return (
    <>
      <header className={styles.nav} data-scrolled={scrolled}>
        <div className={styles.inner}>
          <Magnetic strength={0.4}>
            <button className={styles.logo} onClick={() => go('hero')} aria-label="Back to top">
              <span className={styles.logoMark}>HP</span>
            </button>
          </Magnetic>

          <nav className={styles.links} aria-label="Primary">
            {sections.map((s) => (
              <Magnetic key={s.id} strength={0.25}>
                <button
                  className={styles.link}
                  data-active={active === s.id}
                  onClick={() => go(s.id)}
                >
                  <span className={styles.dot} />
                  {s.label}
                </button>
              </Magnetic>
            ))}
          </nav>

          <div className={styles.right}>
            <Magnetic strength={0.3}>
              <a
                className={`btn btn--primary ${styles.cta}`}
                href={`mailto:${profile.email}`}
                data-cursor="Say hi"
              >
                Let's talk
              </a>
            </Magnetic>

            <button
              ref={burgerRef}
              className={styles.burger}
              data-open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={overlayRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className={styles.overlayLinks}>
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button onClick={() => go(s.id)}>
                    <span className={styles.overlayIndex}>0{i + 1}</span>
                    {s.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.a
              className={styles.overlayContact}
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
