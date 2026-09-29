import { sampleHooks, sampleFeatures } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

export default function Sample() {
  return (
    <Section id="amostra">
      <SectionHead eyebrow="Amostra grátis" title="Uma página" muted="do capítulo 2" />
      <div className="sample">
        <article className="page">
          <span className="folio">pág. 15</span>
          <span className="eyebrow">Gancho tipo · Provocação</span>
          <h3>A pessoa fica para provar que você está errado</h3>
          <ol>
            {sampleHooks.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ol>
          <p className="tip">
            <b>Na edição:</b> coloque o gancho em texto grande no centro da tela nos primeiros 2 segundos, antes da
            fala começar.
          </p>
        </article>
        <div className="sample-list">
          {sampleFeatures.map(([title, text]) => (
            <div key={title}>
              <b>{title}</b>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
