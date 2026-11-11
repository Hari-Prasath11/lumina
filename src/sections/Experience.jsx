import { experience } from '../data/content'
import Section from './Section'
import { ArrowUpRight } from './icons'

export default function Experience() {
  return (
    <Section id="experience" index="02" eyebrow="Experience" title="Where I’ve worked" className="section--alt">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company} className="job" data-reveal data-spotlight>
            <div className="job__aside">
              {job.logo ? (
                <img className="job__logo job__logo--img" src={job.logo} alt="" width="48" height="48" />
              ) : (
                <span className="job__logo" aria-hidden="true">
                  {job.initials}
                </span>
              )}
              <div>
                <h3 className="job__company">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noreferrer">
                      {job.company} <ArrowUpRight />
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <p className="job__about">{job.about}</p>
              </div>
            </div>

            <div className="job__roles">
              {job.roles.map((role) => (
                <div key={role.title} className="role">
                  <div className="role__head">
                    <h4 className="role__title">{role.title}</h4>
                    <span className="role__period">{role.period}</span>
                  </div>
                  <ul className="role__points">
                    {role.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
