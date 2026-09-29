import { fit } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

export default function Fit() {
  return (
    <Section id="para-quem">
      <SectionHead eyebrow="Para quem é" title="Feito para quem quer" muted="postar, não só assistir" />
      <div className="fit">
        <div className="fit-col yes">
          <h3>É para você se</h3>
          <ul>
            {fit.yes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="fit-col no">
          <h3>Não é para você se</h3>
          <ul>
            {fit.no.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
