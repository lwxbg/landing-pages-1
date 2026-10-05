import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import BeforeAfter from './components/BeforeAfter.jsx'
import Method from './components/Method.jsx'
import HookPicker from './components/HookPicker.jsx'
import Chapters from './components/Chapters.jsx'
import Sample from './components/Sample.jsx'
import TimeCompare from './components/TimeCompare.jsx'
import Fit from './components/Fit.jsx'
import Author from './components/Author.jsx'
import Offer from './components/Offer.jsx'
import Guarantee from './components/Guarantee.jsx'
import Faq from './components/Faq.jsx'
import { FinalCta, Footer, MobileBar } from './components/Footer.jsx'
import { usePageEffects } from './hooks/usePageEffects.js'

export default function App() {
  usePageEffects()

  return (
    <>
      <div className="progress" id="progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <BeforeAfter />
        <Method />
        <HookPicker />
        <Chapters />
        <Sample />
        <TimeCompare />
        <Fit />
        <Author />
        <Offer />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
