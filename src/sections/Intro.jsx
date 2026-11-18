import { profile } from '../data/content'
import { ArrowRight, Download } from './icons'

/* Split a title into per-letter spans with a staggered blur-up reveal. */
function Title({ lines, nowrap = false }) {
  let n = 0
  return (
    <h2 className={`slide-title${nowrap ? ' slide-title--nowrap' : ''}`} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="slide-line" aria-hidden="true">
          {[...line].map((ch, ci) =>
            ch === ' ' ? (
              <span key={ci}> </span>
            ) : (
              <span key={ci} className="char" style={{ transitionDelay: `${n++ * 0.035}s` }}>
                {ch}
              </span>
            ),
          )}
        </span>
      ))}
    </h2>
  )
}

export default function Intro() {
  return (
    <section id="intro" className="intro" aria-label="Introduction">
      <div className="intro-stage">
        <h1 className="sr-only">
          {profile.name}, {profile.role} and {profile.title}
        </h1>

        <figure className="founder" aria-hidden="true">
          <span className="founder__light" />
          <img src={profile.founderPhoto} alt="" />
          <span className="founder__floor" />
        </figure>

        <div className="slide" id="slide-1">
          <Title lines={['Hari', 'Prasath']} />
          <div className="desc-row">
            <p className="slide-desc col-1">
              Full-stack engineer with 2+ years building scalable web applications across 8+
              products, in Python, FastAPI, Flask, Django and React on PostgreSQL and MongoDB.
            </p>
            <p className="slide-desc col-2">
              Co-founder of Glide, the WhatsApp-first clinic platform that lets patients skip
              crowded waiting halls. Based in Chennai, open to new opportunities.
            </p>
          </div>
        </div>

        <div className="slide" id="slide-2">
          <Title lines={['Building', 'Glide']} />
          <p className="slide-desc">
            Patients book tokens on WhatsApp in 6 Indian languages and wait at home on a live queue.
            Real-time queues, self-learning wait times and 1,500+ tests, built from zero by two
            people.
          </p>
        </div>

        <div className="slide" id="slide-3">
          <Title lines={['Full Stack']} nowrap />
          <p className="slide-desc">
            At Softborne I lead AI-powered workflows on Boombirds, design APIs in FastAPI, Flask and
            Node.js, and ship React + TypeScript front-ends for US enterprise clients.
          </p>
        </div>

        <div className="slide" id="slide-4">
          <Title lines={["Let's", 'Build']} />
          <p className="slide-desc">
            Open to full-stack and product engineering roles, collaborations and conversations about
            Glide. Keep scrolling for the full story.
          </p>
          <div className="slide-actions">
            <a className="pill-btn pill-btn--light" href={`mailto:${profile.email}`}>
              Get in touch <span className="btn-circle" />
            </a>
            <a className="pill-btn" href={profile.resume} download>
              <Download /> Résumé
            </a>
            <a className="pill-btn" href="#work">
              The work <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
