import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'
import { useSmoothScroll } from '../components/SmoothScroll'
import Magnetic from '../components/Magnetic'
import styles from './Contact.module.css'

const EASE = [0.22, 1, 0.36, 1]
const viewportOnce = { once: true, margin: '-80px' }

function IconTop() {
  return (
    <svg
      className={styles.topIcon}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 12V2M7 2L2.5 6.5M7 2l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Contact() {
  const { scrollTo } = useSmoothScroll()
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)

  // Cleanup any pending 'Copied' reset on unmount.
  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current)
    }
  }, [])

  const copyEmail = async () => {
    if (!navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      if (copyTimer.current) clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — mailto still works */
    }
  }

  const telHref = `tel:${profile.phone.replace(/\s/g, '')}`

  const anim = (delay = 0, y = 26) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: viewportOnce,
          transition: { duration: 0.9, ease: EASE, delay },
        }

  return (
    <section id="contact" className={`section ${styles.wrap}`}>
      <div className="container">
        <span className="eyebrow">
          <span className={styles.index}>06</span>
          Contact
        </span>

        {/* Oversized CTA headline */}
        <motion.h2 className={styles.cta} {...anim(0, 34)}>
          Let&rsquo;s build{' '}
          <span className="text-gradient-warm">something great.</span>
        </motion.h2>

        <motion.p className={styles.lead} {...anim(0.08)}>
          Have a product to ship, a team to strengthen, or an idea worth
          prototyping? I&rsquo;m always open to a good conversation.
        </motion.p>

        {/* Oversized magnetic email — the focal element */}
        <motion.div className={styles.emailWrap} {...anim(0.14)}>
          <Magnetic strength={0.25} className={styles.magnet}>
            <a
              className={styles.email}
              href={`mailto:${profile.email}`}
              data-cursor="Email"
              aria-label={`Email ${profile.name} at ${profile.email}`}
            >
              {profile.email}
            </a>
          </Magnetic>

          <button
            type="button"
            className={styles.copy}
            onClick={copyEmail}
            data-cursor="Copy"
            aria-label="Copy email address to clipboard"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <span className={styles.srStatus} role="status" aria-live="polite">
            {copied ? 'Email copied to clipboard' : ''}
          </span>
        </motion.div>

        {/* Minimal link row divided by hairlines */}
        <motion.ul className={styles.links} {...anim(0.2, 20)}>
          <li className={styles.linkItem}>
            <a
              className={styles.link}
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              aria-label="LinkedIn (opens in a new tab)"
            >
              LinkedIn
            </a>
          </li>
          <li className={styles.linkItem}>
            <a
              className={styles.link}
              href={`mailto:${profile.email}`}
              data-cursor="Email"
            >
              Email
            </a>
          </li>
          <li className={styles.linkItem}>
            <a className={styles.link} href={telHref} data-cursor="Call">
              {profile.phone}
            </a>
          </li>
          <li className={styles.linkItem}>
            <span className={styles.meta}>{profile.location}</span>
          </li>
        </motion.ul>
      </div>

      {/* ── Footer bar ── */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <p className={styles.footerLeft}>
            <span className={styles.footerName}>{profile.name}</span>
            <span className={styles.dot} aria-hidden="true">
              /
            </span>
            <span>&copy; 2026</span>
          </p>

          <div className={styles.footerRight}>
            <span className={styles.built}>Built with React + Three.js</span>
            <Magnetic strength={0.3} className={styles.magnet}>
              <button
                type="button"
                className={styles.top}
                onClick={() => scrollTo(0)}
                data-cursor="Top"
                aria-label="Back to top"
              >
                Back to top
                <IconTop />
              </button>
            </Magnetic>
          </div>
        </div>
      </footer>
    </section>
  )
}
