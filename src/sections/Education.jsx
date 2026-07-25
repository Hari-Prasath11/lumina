import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { education, certifications, workshops } from '../data/content'
import styles from './Education.module.css'

const EASE = [0.22, 1, 0.36, 1]

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}
const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/* A hairline-separated list of credentials (certifications or workshops). */
function CredentialBlock({ label, items }) {
  const reduce = useReducedMotion()

  return (
    <Reveal className={styles.block} amount={0.2}>
      <span className={styles.blockLabel}>{label}</span>
      <motion.ul
        className={styles.rows}
        variants={reduce ? undefined : listContainer}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      >
        {items.map((item) => (
          <motion.li
            key={item.name}
            className={styles.row}
            variants={reduce ? undefined : listItem}
            data-cursor="↗"
          >
            <span className={styles.rowName}>{item.name}</span>
            <span className={styles.rowMeta}>
              {item.issuer && <span className={styles.rowIssuer}>{item.issuer}</span>}
              {item.year && <span className={styles.rowYear}>{item.year}</span>}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </Reveal>
  )
}

export default function Education() {
  const reduce = useReducedMotion()

  return (
    <section id="education" className={`section ${styles.wrap}`}>
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Education & Learning"
          title="Foundations and continued learning"
          highlight="learning"
        />

        <div className={styles.grid}>
          {/* LEFT — formal education as an airy hairline list */}
          <div className={styles.eduCol}>
            <span className={styles.blockLabel}>Academics</span>
            <motion.ol
              className={styles.eduList}
              variants={reduce ? undefined : listContainer}
              initial={reduce ? undefined : 'hidden'}
              whileInView={reduce ? undefined : 'show'}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            >
              {education.map((edu) => (
                <motion.li
                  key={edu.degree}
                  className={styles.eduItem}
                  variants={reduce ? undefined : listItem}
                  data-cursor="Edu"
                >
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  <p className={styles.school}>{edu.school}</p>
                  <p className={styles.eduMeta}>
                    <span className={styles.period}>{edu.period}</span>
                    {edu.detail && (
                      <>
                        <span className={styles.sep} aria-hidden="true">
                          /
                        </span>
                        <span className={styles.detail}>{edu.detail}</span>
                      </>
                    )}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* RIGHT — stacked minimal credential blocks */}
          <div className={styles.side}>
            <CredentialBlock label="Certifications" items={certifications} />
            <CredentialBlock label="Workshops & Training" items={workshops} />
          </div>
        </div>
      </div>
    </section>
  )
}
