import { useState } from 'react'
import { motion } from 'framer-motion'
import Magnetic from '../components/Magnetic'
import { useSmoothScroll } from '../components/SmoothScroll'
import { profile } from '../data/content'
import styles from './Hero.module.css'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}
const nameLine = {
  hidden: { y: '116%' },
  show: { y: 0, transition: { duration: 1.05, ease: EASE } },
}
const cutoutV = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.5 } },
}

export default function Hero({ ready = true }) {
  const { scrollTo } = useSmoothScroll()
  const [hasCutout, setHasCutout] = useState(true)

  return (
    <section id="hero" className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
      >
        <motion.div className={styles.eyebrow} variants={fade}>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            Available for work
          </span>
          <span className={styles.loc}>{profile.location}</span>
        </motion.div>

        {/* Centered wordmark with the portrait perched on the H of "Hari" */}
        <div className={styles.stage}>
          <h1 className={styles.name}>
            <span className={styles.firstLine}>
              <motion.img
                className={styles.cutout}
                src="/hari-cutout.webp"
                alt="Hari Prasath"
                variants={cutoutV}
                onError={() => setHasCutout(false)}
                style={hasCutout ? undefined : { display: 'none' }}
                data-cursor="That's me"
              />
              <span className={styles.nameMask}>
                <motion.span className={styles.nameLine} variants={nameLine}>
                  Hari
                </motion.span>
              </span>
            </span>

            <span className={styles.nameMask}>
              <motion.span className={styles.nameLine} variants={nameLine}>
                Prasath
              </motion.span>
            </span>
          </h1>
        </div>

        <motion.div className={styles.footer} variants={fade}>
          <div className={styles.meta}>
            <span className={styles.role}>{profile.role}</span>
            <span className={styles.sep} aria-hidden="true">
              /
            </span>
            <span className={styles.tagline}>Scalable, AI-powered web apps, end to end.</span>
          </div>

          <div className={styles.actions}>
            <Magnetic strength={0.3}>
              <button
                className="btn btn--primary"
                onClick={() => scrollTo('#projects', { offset: -20 })}
                data-cursor="Explore"
              >
                View my work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn btn--ghost" href={`mailto:${profile.email}`} data-cursor="Email">
                Get in touch
              </a>
            </Magnetic>
          </div>

          <div className={styles.socials}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
            >
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
