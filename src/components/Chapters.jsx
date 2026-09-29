import { chapters } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

export default function Chapters() {
  return (
    <Section id="conteudo">
      <SectionHead eyebrow="O que tem dentro" title="7 capítulos," muted="zero enrolação" />
      <div className="chapters">
        {chapters.map((c) => (
          <div className="chapter" key={c.n}>
            <span className="n">{c.n}</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="pg">pág. {c.page}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
