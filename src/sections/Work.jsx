import { featured, projects } from '../data/content'
import Section from './Section'
import { ArrowUpRight } from './icons'

function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Tech stack">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

/* Illustrative preview of Glide's live patient queue. */
function QueuePreview() {
  return (
    <div className="queue" aria-hidden="true">
      <div className="queue__head">
        <span className="queue__live">
          <span className="queue__pulse" /> Live queue
        </span>
        <span className="queue__doc">General OPD · Room 2</span>
      </div>
      <div className="queue__now">
        <span className="queue__label">Now serving</span>
        <span className="queue__token">#23</span>
        <span className="queue__bar">
          <span />
        </span>
      </div>
      <ul className="queue__list">
        <li>
          <span className="queue__t">#24</span>
          <span>Next up</span>
          <span className="queue__eta">~6 min</span>
        </li>
        <li>
          <span className="queue__t">#25</span>
          <span>Waiting at home</span>
          <span className="queue__eta">~14 min</span>
        </li>
        <li>
          <span className="queue__t">#26</span>
          <span>Booked on WhatsApp</span>
          <span className="queue__eta">~22 min</span>
        </li>
      </ul>
    </div>
  )
}

export default function Work() {
  return (
    <Section id="work" index="01" eyebrow="Selected work" title="Things I’ve built">
      <article className="feature" data-reveal data-spotlight>
        <div className="feature__main">
          <div className="feature__meta">
            <span className="badge">Featured</span>
            <span className="muted">{featured.role}</span>
          </div>
          <h3 className="feature__name">
            <img className="feature__logo" src={featured.logo} alt="" width="52" height="52" />
            {featured.name}
          </h3>
          <p className="feature__tagline">{featured.tagline}</p>
          <p className="feature__desc">{featured.description}</p>
          <Tags items={featured.stack} />
          <a className="btn btn--primary btn--arrow feature__cta" href={featured.url} target="_blank" rel="noreferrer">
            Visit {featured.urlLabel} <ArrowUpRight />
          </a>
        </div>

        <div className="feature__side">
          <QueuePreview />
          <ol className="feature__points">
            {featured.highlights.map((h, i) => (
              <li key={h.title}>
                <span className="feature__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{h.title}</h4>
                  <p>{h.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </article>

      <ul className="cards">
        {projects.map((p) => (
          <li key={p.name} className="card" data-reveal data-spotlight>
            <span className="card__kind">{p.kind}</span>
            <h3 className="card__name">{p.name}</h3>
            <p className="card__desc">{p.description}</p>
            <Tags items={p.stack} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
