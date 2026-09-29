import { site, proofStats, pinnedVideos } from '../content.js'
import { useRevealProgress, formatCount } from '../hooks/useCountUp.js'
import { Section } from './ui.jsx'

// Forma aproximada do gráfico do painel do TikTok (views por dia, últimos 365 dias).
const CHART_PATH =
  'M0,130 L480,130 L486,126 L490,128 L500,129 L540,129 L546,126 L552,106 L556,82 L558,86 L562,110 L566,112 L570,98 L574,110 L578,120 L586,122 L592,116 L594,114 L596,30 L600,40'

export default function Author() {
  const { ref, progress, started } = useRevealProgress()

  return (
    <Section id="autor">
      <div className="author">
        <img src="logo.png" alt={`Logo da ${site.brand}`} />
        <div className="author-text">
          <span className="eyebrow">Quem escreveu</span>
          <h2>
            Feito por quem <span>edita todo dia</span>
          </h2>
          <p>
            Eu comecei o <strong>{site.brand}</strong> editando cortes motivacionais no celular, sem curso e sem
            computador. Durante meses os vídeos não passavam de poucas views. Quando eu entendi a estrutura, o perfil
            passou de <strong>1 milhão de visualizações</strong>.
          </p>
          <p>
            Este e-book é o caderno que eu queria ter tido no começo: tudo o que eu testei, organizado para você não
            perder os meses que eu perdi.
          </p>
          <span className="signature">— {site.brand}</span>
        </div>
      </div>

      <div className="proof">
        <span className="eyebrow">Painel do TikTok · últimos 365 dias</span>
        <div className="proof-stats" ref={ref}>
          {proofStats.map((s) => (
            <div key={s.label}>
              <b>{formatCount(s.count, progress, s.value)}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={`chart ${started ? 'play' : 'armed'}`}>
          <div className="marker" aria-hidden="true">
            <span>jul 2026 · a virada</span>
          </div>
          <svg
            viewBox="0 0 600 160"
            preserveAspectRatio="none"
            role="img"
            aria-label="Visualizações por dia: quase zero até julho de 2026, depois picos de 45 mil, 30 mil, quase 100 mil e 70 mil em setembro"
          >
            {[10, 50, 90, 130].map((y) => (
              <line key={y} x1="0" y1={y} x2="600" y2={y} className="grid" />
            ))}
            <path className="area" d={`${CHART_PATH} L600,130 Z`} />
            <path className="line" d={CHART_PATH} />
          </svg>
          <div className="chart-axis">
            <span>set 2025</span>
            <span>jan 2026</span>
            <span>mai 2026</span>
            <span>set 2026</span>
          </div>
        </div>

        <div className="top-videos">
          <span className="eyebrow">Vídeos fixados no perfil</span>
          <div className="tv-row">
            {pinnedVideos.map((v) => (
              <img key={v.src} src={v.src} alt={`Vídeo fixado com ${v.views} visualizações`} loading="lazy" />
            ))}
          </div>
          <p>Os três são analisados, cena por cena, no capítulo 7.</p>
        </div>
      </div>
    </Section>
  )
}
