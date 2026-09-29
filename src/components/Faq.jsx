import { faq } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

export default function Faq() {
  return (
    <Section id="duvidas">
      <SectionHead eyebrow="Dúvidas" title="Perguntas frequentes" />
      <div className="faq">
        {faq.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
