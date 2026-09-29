import { price } from '../content.js'
import { Section } from './ui.jsx'

export default function Guarantee() {
  return (
    <Section id="garantia">
      <div className="guarantee-box">
        <div className="seal" aria-hidden="true">
          <div className="seal-inner">
            <b>{price.guaranteeDays}</b>
            <span>
              dias de
              <br />
              garantia
            </span>
          </div>
        </div>
        <div>
          <h2>
            O risco <span>é todo meu</span>
          </h2>
          <p>
            Leia o e-book, aplique em um vídeo e veja a diferença. Se não gostar por qualquer motivo, é só pedir o
            reembolso em até {price.guaranteeDays} dias. Você recebe 100% do valor de volta, sem perguntas.
          </p>
        </div>
      </div>
    </Section>
  )
}
