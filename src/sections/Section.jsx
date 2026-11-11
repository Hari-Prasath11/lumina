export default function Section({ id, index, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section__head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow__index">{index}</span>
            {eyebrow}
          </span>
          <h2 id={`${id}-title`} className="section__title">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}
