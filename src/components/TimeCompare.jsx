import { timeCompare } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

function Column({ title, data, variant }) {
  return (
    <div className={`time-col ${variant}`}>
      <h3>{title}</h3>
      <div className="steps">
        {data.steps.map(([label, time]) => (
          <div className="step" key={label}>
            <span>{label}</span>
            <span>{time}</span>
          </div>
        ))}
      </div>
      <div className="total">
        <span>Total</span>
        <b>{data.total}</b>
      </div>
    </div>
  )
}

export default function TimeCompare() {
  return (
    <Section id="tempo">
      <SectionHead eyebrow="Quanto tempo você gasta hoje" title="Menos tempo pensando," muted="mais tempo postando">
        Uma estimativa de um vídeo de 45 segundos, do zero até publicar.
      </SectionHead>
      <div className="time">
        <Column title="Sem método" data={timeCompare.without} variant="bad" />
        <Column title="Com o código" data={timeCompare.with} variant="good" />
      </div>
    </Section>
  )
}
