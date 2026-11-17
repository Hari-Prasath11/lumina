import { useEffect, useRef } from 'react'
import Header from './sections/Header'
import Intro from './sections/Intro'
import Work from './sections/Work'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'
import Loader from './sections/Loader'
import { useReveal } from './sections/fx'
import { createStage } from './three/stage'

function GridOverlay() {
  return (
    <>
      <div className="grid-horizontal-line" aria-hidden="true" />
      <div className="grid-lines" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="grid-line">
            <div className="grid-dot" />
            <div className="grid-dot" />
          </div>
        ))}
        <div className="grid-line story-progress-container">
          <div className="grid-dot" />
          <div className="grid-dot" />
          <div className="story-dashes">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="story-dash">
                <div className="story-dash-fill" id={`dash-fill-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const canvasRef = useRef(null)
  useReveal()

  useEffect(() => createStage(canvasRef.current), [])

  return (
    <>
      <Loader />
      <div className="cursor-inner" aria-hidden="true" />
      <div className="cursor-outer" aria-hidden="true" />
      <canvas id="webgl" ref={canvasRef} aria-hidden="true" />
      <GridOverlay />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Intro />
        <Work />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
