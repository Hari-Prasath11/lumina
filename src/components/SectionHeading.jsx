import Reveal from './Reveal'
import ScrambleText from './ScrambleText'
import styles from './SectionHeading.module.css'

/**
 * Consistent section header: monospace index + eyebrow, then a large
 * display title (optionally with a gradient-highlighted fragment).
 *
 *   <SectionHeading index="01" eyebrow="About" title="Who I am" highlight="I am" />
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  highlight,
  align = 'left',
  reveal = true,
}) {
  // Split only on a real match; keeps the remainder intact if `highlight`
  // appears more than once, and falls back to plain text if it's absent.
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : null

  // `reveal={false}` renders statically (no whileInView gate) — used inside the
  // pinned horizontal track, where transform can trap the heading off-screen.
  const Wrapper = reveal ? Reveal : 'div'

  return (
    <Wrapper className={styles.head} data-align={align}>
      <span className="eyebrow">
        {index && <span className={styles.index}>{index}</span>}
        <ScrambleText text={eyebrow} />
      </span>
      <h2 className={styles.title}>
        {parts ? (
          <>
            {parts[0]}
            <span className="text-gradient">{highlight}</span>
            {parts.slice(1).join(highlight)}
          </>
        ) : (
          title
        )}
      </h2>
    </Wrapper>
  )
}
