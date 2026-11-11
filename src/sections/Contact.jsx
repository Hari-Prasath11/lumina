import { profile } from '../data/content'
import { ArrowUpRight, GitHub, LinkedIn, Mail } from './icons'

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="cta" data-reveal data-spotlight>
          <span className="eyebrow eyebrow--light">
            <span className="eyebrow__index">05</span>
            Contact
          </span>
          <h2 id="contact-title" className="cta__title">
            Let’s build something useful together.
          </h2>
          <p className="cta__lead">
            Open to full-stack and product engineering roles, collaborations, and conversations about
            Glide. Email is the fastest way to reach me.
          </p>
          <div className="cta__actions">
            <a className="btn btn--light" href={`mailto:${profile.email}`}>
              <Mail /> {profile.email}
            </a>
            <a className="btn btn--outline-light" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
              {profile.phone}
            </a>
          </div>
          <ul className="cta__links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn /> {profile.linkedinHandle} <ArrowUpRight />
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitHub /> {profile.githubHandle} <ArrowUpRight />
              </a>
            </li>
          </ul>
        </div>

        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
