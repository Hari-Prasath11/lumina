import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

/**
 * Drop-in scroll reveal. Renders a motion element that fades/slides in
 * when it enters the viewport (once). Respects reduced-motion.
 *
 *   <Reveal>…</Reveal>                       // single fade-up
 *   <Reveal stagger>{items.map(...)}</Reveal> // stagger direct children
 *
 * Use `as` to change the element, `delay` to offset, `variants` to override.
 */
export default function Reveal({
  as = 'div',
  children,
  stagger: doStagger = false,
  delay = 0,
  amount,
  variants,
  className,
  style,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    )
  }

  const resolved =
    variants || (doStagger ? stagger(0.09, delay) : { ...fadeUp })

  // Apply a manual delay when not staggering.
  if (!doStagger && !variants && delay) {
    resolved.show = { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } }
  }

  return (
    <MotionTag
      className={className}
      style={style}
      variants={resolved}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, ...(amount ? { amount } : {}) }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
