import { profile, stats } from '../data/content'
import { CountUp, Tilt } from './fx'
import { ArrowRight, Download, GitHub, LinkedIn, Mail, Pin } from './icons'

export default function Hero() {
  const words = profile.name.split(' ')
  return (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container">
        <div className="hero__grid">
          <div className="hero__text">
            <p className="pill">
              <span className="pill__dot" aria-hidden="true" />
              {profile.availability}
            </p>

            <h1 className="hero__name" aria-label={profile.name}>
              {words.map((w, i) => (
                <span key={w + i} className="word" aria-hidden="true">
                  <span style={{ animationDelay: `${0.12 + i * 0.12}s` }}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="hero__role">
              {profile.role} <span className="hero__amp">&amp;</span>{' '}
              <span className="shine">{profile.title}</span>
            </p>

            <p className="hero__summary">{profile.summary}</p>

            <div className="hero__actions">
              <a className="btn btn--primary btn--arrow" href="#work">
                View my work <ArrowRight />
              </a>
              <a className="btn" href={profile.resume} download>
                <Download /> Download résumé
              </a>
            </div>

            <ul className="socials" aria-label="Links">
              <li>
                <a href={`mailto:${profile.email}`} aria-label="Email">
                  <Mail />
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <LinkedIn />
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <GitHub />
                </a>
              </li>
              <li className="socials__loc">
                <Pin /> {profile.location}
              </li>
            </ul>
          </div>

          <Tilt className="portrait">
            <div className="portrait__card">
              <img src="/portrait.jpg" alt="Portrait of Hari Prasath P" width="480" height="480" />
              <span className="portrait__sheen" aria-hidden="true" />
            </div>
            <figcaption className="portrait__badge">
              <img className="portrait__badge-mark" src="/glide-logo.png" alt="" width="36" height="36" />
              <span>
                <strong>Co-Founder</strong>
                <span className="muted">Glide · glideapp.in</span>
              </span>
            </figcaption>
          </Tilt>
        </div>

        <dl className="stats" data-spotlight>
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dd>
                <CountUp value={s.value} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
