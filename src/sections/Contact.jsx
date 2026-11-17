import { profile } from '../data/content'
import { ArrowUpRight, Download, GitHub, LinkedIn } from './icons'

export default function Contact() {
  return (
    <section id="contact" className="ed-section ed-contact" aria-labelledby="contact-title">
      <div className="ed-wrap">
        <span className="ed-label" data-reveal>
          <span>05</span> Contact
        </span>
        <h2 id="contact-title" className="ed-contact__title" data-reveal>
          Let’s talk.
        </h2>
        <p className="ed-contact__lead" data-reveal>
          Open to full-stack and product engineering roles, collaborations and conversations about
          Glide. Email is the fastest way to reach me.
        </p>
        <div className="ed-contact__actions" data-reveal>
          <a className="pill-btn pill-btn--light pill-btn--lg" href={`mailto:${profile.email}`}>
            {profile.email} <span className="btn-circle" />
          </a>
          <a className="pill-btn pill-btn--lg" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
            {profile.phone}
          </a>
        </div>
        <ul className="ed-contact__links" data-reveal>
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
          <li>
            <a href={profile.resume} download>
              <Download /> Résumé (PDF)
            </a>
          </li>
        </ul>
        <footer className="ed-footer">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <a href="#intro">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
