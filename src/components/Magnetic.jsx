import { useRef } from 'react'

/**
 * Wraps children so they're magnetically pulled toward the cursor on
 * hover. Great for buttons and nav links. No-op under reduced motion.
 */
export default function Magnetic({ children, strength = 0.35, className, as = 'div', ...rest }) {
  const ref = useRef(null)
  const Tag = as

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: 'inline-flex',
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
