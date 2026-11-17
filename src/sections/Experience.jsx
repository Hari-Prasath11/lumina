import { experience } from '../data/content'
import Section from './Section'
import { ArrowUpRight } from './icons'

export default function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" title="Where I’ve worked">
      <ol className="ed-jobs">
        {experience.map((job) => (
          <li key={job.company} className="ed-job" data-reveal>
            <div className="ed-job__aside">
              <h3 className="ed-job__company">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noreferrer">
                    {job.company} <ArrowUpRight />
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="ed-job__about">{job.about}</p>
            </div>
            <div className="ed-job__roles">
              {job.roles.map((role) => (
                <div key={role.title} className="ed-role">
                  <div className="ed-role__head">
                    <h4>{role.title}</h4>
                    <span>{role.period}</span>
                  </div>
                  <ul>
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
