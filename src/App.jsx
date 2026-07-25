import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import DotField from './components/DotField'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
        <DotField />
        <Cursor />
        <ScrollProgress />
        <div className="grain" aria-hidden="true" />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <Hero ready={loaded} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
      </SmoothScroll>
    </MotionConfig>
  )
}
