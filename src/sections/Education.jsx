import { certifications, education } from '../data/content'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" index="04" eyebrow="Education" title="Learning" className="section--alt">
      <div className="edu-grid">
        <div className="panel" data-reveal>
          <span className="panel__label">Degree</span>
          <h3 className="panel__title">{education.degree}</h3>
          <p className="muted">{education.school}</p>
          <div className="panel__foot">
            <span>{education.period}</span>
            <span className="badge">{education.detail}</span>
          </div>
        </div>

        <div className="panel" data-reveal>
          <span className="panel__label">Certifications</span>
          <ul className="certs">
            {certifications.map((c) => (
              <li key={c.name}>
                <span>{c.name}</span>
                <span className="muted">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
