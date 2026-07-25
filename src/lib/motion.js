// Shared Framer Motion variants. Import these instead of redefining
// per-component so timing/easing stays consistent site-wide.

const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
}

// Parent container that staggers its children (which should use fadeUp/etc.)
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// Default viewport config for whileInView — reveal once, a bit early.
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' }

export { EASE }
