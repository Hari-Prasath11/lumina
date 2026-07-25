import HorizontalScroll from '../components/HorizontalScroll'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/content'
import styles from './Projects.module.css'

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12h16M14 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Panel({ project, index }) {
  const ordinal = String(index + 1).padStart(2, '0')
  return (
    <article className={styles.panel} style={{ '--accent': project.accent }} data-cursor="View">
      <div className={styles.head}>
        <span className={styles.ordinal}>{ordinal}</span>
        <span className={styles.year}>{project.year}</span>
      </div>

      <h3 className={styles.name}>{project.name}</h3>
      <p className={styles.tagline}>{project.tagline}</p>
      <p className={styles.desc}>{project.description}</p>

      <ul className={styles.highlights}>
        {project.highlights.map((h) => (
          <li key={h}>
            <span className={styles.dash} aria-hidden="true">
              —
            </span>
            {h}
          </li>
        ))}
      </ul>

      <div className={styles.stack}>{project.stack.join('   ·   ')}</div>
      <span className={styles.rule} aria-hidden="true" />
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={styles.wrap} aria-label="Selected work">
      <HorizontalScroll>
        {/* Title panel */}
        <div className={styles.titlePanel}>
          <SectionHeading
            index="03"
            eyebrow="Selected Work"
            title="Products I've shipped"
            highlight="shipped"
            reveal={false}
          />
          <p className={styles.hint}>
            <span className={styles.hintDot} aria-hidden="true" />
            Keep scrolling — the work pans across
            <ArrowRight />
          </p>
        </div>

        {projects.map((project, i) => (
          <Panel key={project.id} project={project} index={i} />
        ))}

        {/* End panel */}
        <div className={styles.endPanel}>
          <span className={styles.endEyebrow}>End of the reel</span>
          <p className={styles.endText}>
            Want the <span className="text-gradient">full story?</span>
          </p>
          <a className="btn btn--primary" href="#contact" data-cursor="Talk">
            Let&rsquo;s talk
            <ArrowRight />
          </a>
        </div>
      </HorizontalScroll>
    </section>
  )
}
