import { skills } from '../data/content'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" index="03" label="Skills" title="My toolkit">
      <div className="ed-cols ed-cols--4">
        {skills.map((s, i) => (
          <div key={s.group} className="ed-col" data-reveal>
            <span className="ed-num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="ed-col__title">{s.group}</h3>
            <ul className="ed-list">
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
