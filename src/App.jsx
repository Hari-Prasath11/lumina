import Header from './sections/Header'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'
import { useReveal, useSpotlight } from './sections/fx'

export default function App() {
  useReveal()
  useSpotlight()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
