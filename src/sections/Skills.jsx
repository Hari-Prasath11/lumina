import { skills } from '../data/content'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" index="03" eyebrow="Skills" title="My toolkit">
      <div className="skill-cols" data-reveal>
        {skills.map((s, i) => (
          <div key={s.group} className="skill-col">
            <span className="skill-col__num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="skill-col__title">{s.group}</h3>
            <ul className="skill-col__list">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
