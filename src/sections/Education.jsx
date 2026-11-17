import { certifications, education } from '../data/content'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" index="04" label="Education" title="Learning">
      <div className="ed-cols ed-cols--2">
        <div className="ed-col" data-reveal>
          <span className="ed-kicker">Degree · {education.period}</span>
          <h3 className="ed-col__title ed-col__title--lg">{education.degree}</h3>
          <p className="ed-col__text">
            {education.school} · {education.detail}
          </p>
        </div>
        <div className="ed-col" data-reveal>
          <span className="ed-kicker">Certifications</span>
          <ul className="ed-rows">
            {certifications.map((c) => (
              <li key={c.name}>
                <span>{c.name}</span>
                <span>{c.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
