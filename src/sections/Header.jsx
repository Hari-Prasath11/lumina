import { Fragment } from 'react'
import { profile } from '../data/content'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="main-header">
      <a href="#intro" className="brand">
        Hari Prasath
      </a>
      <nav className="header-nav" aria-label="Primary">
        {links.map((l, i) => (
          <Fragment key={l.href}>
            {i > 0 && <span className="nav-dot" aria-hidden="true" />}
            <a href={l.href} className="nav-link">
              {l.label}
            </a>
          </Fragment>
        ))}
      </nav>
      <div className="header-actions">
        <a href={profile.resume} className="nav-link header-resume" target="_blank" rel="noreferrer">
          Résumé
        </a>
        <a href={`mailto:${profile.email}`} className="contact-btn">
          Contact <span className="btn-circle" />
        </a>
      </div>
    </header>
  )
}
