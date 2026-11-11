import { useEffect, useRef, useState } from 'react'
import { nav, profile } from '../data/content'
import { Moon, Sun } from './icons'

export default function Header() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)

  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  const isDark = theme === 'dark'

  const toggle = () => {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
    setTheme(next)
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="brand" aria-label={`${profile.name}, back to top`}>
          <span className="brand__mark">HP</span>
          <span className="brand__name">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="nav">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : undefined}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn--sm btn--primary" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </div>
      </div>
      <span ref={progressRef} className="progress" aria-hidden="true" />
    </header>
  )
}
