import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { experience } from '../data/content'
import styles from './Experience.module.css'

const EASE = [0.22, 1, 0.36, 1]

const pointsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}
const pointItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function Row({ job }) {
  const reduce = useReducedMotion()

  const pointsMotion = reduce
    ? {}
    : {
        variants: pointsContainer,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '0px 0px -12% 0px' },
      }

  return (
    <Reveal as="li" className={styles.row} amount={0.15} data-cursor="Role">
      {/* LEFT — period + status */}
      <div className={styles.meta}>
        <span className={styles.period}>{job.period}</span>
        {job.current && (
          <span className={styles.nowPill}>
            <span className={styles.nowDot} aria-hidden="true" />
            Now
          </span>
        )}
      </div>

      {/* RIGHT — role, company, summary, points, stack */}
      <div className={styles.body}>
        <h3 className={styles.role}>{job.role}</h3>
        <p className={styles.company}>{job.company}</p>
        <p className={styles.summary}>{job.summary}</p>

        <motion.ul className={styles.points} {...pointsMotion}>
          {job.points.map((point, i) => (
            <motion.li
              key={i}
              className={styles.point}
              variants={reduce ? undefined : pointItem}
            >
              <span className={styles.bullet} aria-hidden="true">
                —
              </span>
              <span>{point}</span>
            </motion.li>
          ))}
        </motion.ul>

        <p className={styles.stack} aria-label="Technologies used">
          {job.stack.join(', ')}
        </p>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.wrap}`}>
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I've made impact"
          highlight="impact"
        />

        <ol className={styles.list}>
          {experience.map((job) => (
            <Row key={job.id} job={job} />
          ))}
        </ol>
      </div>
    </section>
  )
}
