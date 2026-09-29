import { useState } from 'react'
import { hooks } from '../content.js'
import { Section } from './ui.jsx'

export default function HookPicker() {
  const [i, setI] = useState(0)
  const [text, type] = hooks[i]

  return (
    <Section id="teste">
      <div className="picker">
        <div>
          <span className="eyebrow">Teste agora · Gancho do capítulo 2</span>
          {/* key força a animação a rodar de novo a cada sorteio */}
          <p className="picker-quote flash" key={i} aria-live="polite">
            "{text}"
          </p>
          <p className="picker-type">Tipo: {type}</p>
        </div>
        <div>
          <button type="button" className="btn" onClick={() => setI((i + 1) % hooks.length)}>
            Sortear outro gancho
          </button>
          <p className="picker-count">
            {i + 1} de {hooks.length} da amostra · 50 no e-book
          </p>
        </div>
      </div>
    </Section>
  )
}
