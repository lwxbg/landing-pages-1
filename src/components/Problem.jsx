import { errors } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

export default function Problem() {
  return (
    <Section id="problema">
      <SectionHead eyebrow="Seja sincero" title="Você posta, mas ninguém" muted="para pra assistir?">
        O problema quase nunca é a sua voz, a sua câmera ou o algoritmo. São três erros de edição que aparecem em
        quase todo vídeo que morre cedo.
      </SectionHead>
      <div className="errors">
        {errors.map((e) => (
          <article className="error" key={e.title}>
            <span className="tc">● {e.time}</span>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
            <p className="fix">
              <b>NO E-BOOK</b>
              {e.fix}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
