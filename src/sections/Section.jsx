export default function Section({ id, index, label, title, children }) {
  return (
    <section id={id} className="ed-section" aria-labelledby={`${id}-title`}>
      <div className="ed-wrap">
        <header className="ed-head" data-reveal>
          <span className="ed-label">
            <span>{index}</span> {label}
          </span>
          <h2 id={`${id}-title`} className="ed-title">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}
