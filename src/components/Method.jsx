import { timeline } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

const ticks = ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40']

export default function Method() {
  return (
    <Section id="metodo">
      <SectionHead eyebrow="O método" title="Todo vídeo que viraliza tem a mesma timeline">
        São 45 segundos divididos em 4 partes. O e-book mostra o que colocar em cada uma, com exemplos prontos.
      </SectionHead>
      <p className="swipe">Arraste para o lado para ver a timeline inteira →</p>
      <div
        className="timeline"
        role="img"
        aria-label="Timeline de edição: gancho de 0 a 3 segundos, tensão de 3 a 15, virada de 15 a 40, frase-soco de 40 a 45"
      >
        <div className="ruler">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="track" style={{ gridTemplateColumns: timeline.map((c) => `${c.span}fr`).join(' ') }}>
          <div className="playhead" />
          {timeline.map((c, i) => (
            <div className={`clip c${i + 1}`} key={c.name}>
              <small>{c.range}</small>
              <b>{c.name}</b>
              {c.text && <p>{c.text}</p>}
            </div>
          ))}
        </div>
        <div className="wave" aria-hidden="true" />
      </div>
      <p className="tl-caption">Os 3 primeiros segundos decidem se a pessoa fica. É por isso que o e-book tem 50 ganchos.</p>
    </Section>
  )
}
