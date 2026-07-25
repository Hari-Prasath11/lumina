import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]='

/**
 * Decodes text from random characters (dev/terminal aesthetic). Reveals the
 * final string left-to-right over `duration` ms while not-yet-revealed
 * characters keep flickering through random charset glyphs each frame.
 *
 *   <ScrambleText text="About" />                 // scramble once in view
 *   <ScrambleText text="Contact" trigger="hover" as="h2" />
 *
 * Screen readers always get the real text (rendered in an .sr-only span);
 * the animating glyphs are aria-hidden. Respects reduced motion.
 */
export default function ScrambleText({
  text,
  as = 'span',
  trigger = 'view',
  className,
  duration = 900,
  charset = DEFAULT_CHARSET,
  ...rest
}) {
  const reduce = useReducedMotion()
  const rootRef = useRef(null)
  const glyphRef = useRef(null)
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const doneRef = useRef(false)

  const Tag = as

  useEffect(() => {
    const glyph = glyphRef.current
    if (!glyph) return

    const chars = charset && charset.length ? charset : DEFAULT_CHARSET
    const source = text ?? ''

    // Reduced motion (or empty): render the final text immediately.
    if (reduce) {
      glyph.textContent = source
      return
    }

    const cancel = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }

    const randomChar = () => chars[(Math.random() * chars.length) | 0]

    const frame = (ts) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      // Number of characters fully revealed (left-to-right).
      const revealed = Math.floor(progress * source.length)

      let out = ''
      for (let i = 0; i < source.length; i += 1) {
        const ch = source[i]
        // Preserve whitespace so layout/word-shape stays stable.
        if (ch === ' ' || ch === '\n' || ch === '\t') {
          out += ch
        } else if (i < revealed) {
          out += ch
        } else {
          out += randomChar()
        }
      }
      glyph.textContent = out

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        glyph.textContent = source
        rafRef.current = 0
        doneRef.current = true
      }
    }

    const play = () => {
      cancel()
      startRef.current = 0
      doneRef.current = false
      rafRef.current = requestAnimationFrame(frame)
    }

    // Seed with a scrambled state so there's no flash of final text.
    let seed = ''
    for (let i = 0; i < source.length; i += 1) {
      const ch = source[i]
      seed += ch === ' ' || ch === '\n' || ch === '\t' ? ch : randomChar()
    }
    glyph.textContent = seed

    if (trigger === 'hover') {
      const el = rootRef.current
      if (!el) return
      const onEnter = () => play()
      el.addEventListener('mouseenter', onEnter)
      return () => {
        el.removeEventListener('mouseenter', onEnter)
        cancel()
      }
    }

    // trigger === 'view': scramble once when scrolled into view.
    if (typeof IntersectionObserver === 'undefined') {
      play()
      return cancel
    }

    const el = rootRef.current
    if (!el) return cancel

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            obs.disconnect()
            play()
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancel()
    }
  }, [text, trigger, duration, charset, reduce])

  return (
    <Tag ref={rootRef} className={className} {...rest}>
      <span className="sr-only">{text}</span>
      <span ref={glyphRef} aria-hidden="true" style={{ fontVariantLigatures: 'none' }}>
        {text}
      </span>
    </Tag>
  )
}
