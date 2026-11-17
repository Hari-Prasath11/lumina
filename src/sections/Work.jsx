import { featured, projects, stats } from '../data/content'
import Section from './Section'
import { CountUp } from './fx'
import { ArrowUpRight } from './icons'

export default function Work() {
  return (
    <Section id="work" index="01" label="Selected work" title="Things I’ve built">
      <article className="ed-feature" data-reveal>
        <div className="ed-feature__main">
          <div className="ed-feature__meta">
            <img src={featured.logo} alt="" width="44" height="44" />
            <span>
              Featured · {featured.role}
            </span>
          </div>
          <h3 className="ed-feature__name">{featured.name}</h3>
          <p className="ed-feature__tagline">{featured.tagline}</p>
          <p className="ed-feature__desc">{featured.description}</p>
          <ul className="ed-tags" aria-label="Tech stack">
            {featured.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a className="pill-btn pill-btn--light" href={featured.url} target="_blank" rel="noreferrer">
            Visit {featured.urlLabel} <ArrowUpRight />
          </a>
        </div>
        <ol className="ed-feature__points">
          {featured.highlights.map((h, i) => (
            <li key={h.title}>
              <span className="ed-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4>{h.title}</h4>
                <p>{h.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>

      <dl className="ed-stats" data-reveal>
        {stats.map((s) => (
          <div key={s.label}>
            <dd>
              <CountUp value={s.value} />
            </dd>
            <dt>{s.label}</dt>
          </div>
        ))}
      </dl>

      <ul className="ed-cols">
        {projects.map((p, i) => (
          <li key={p.name} className="ed-col" data-reveal>
            <span className="ed-num">{String(i + 2).padStart(2, '0')}</span>
            <span className="ed-kicker">{p.kind}</span>
            <h3 className="ed-col__title">{p.name}</h3>
            <p className="ed-col__text">{p.description}</p>
            <p className="ed-col__stack">{p.stack.join(' · ')}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
