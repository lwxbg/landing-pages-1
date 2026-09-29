import { site, price, heroSpecs } from '../content.js'
import { BuyButton } from './ui.jsx'

export default function Hero() {
  return (
    <header className="hero" id="topo">
      <div className="wrap">
        <div className="hero-text">
          <span className="eyebrow rec">Preço de lançamento · E-book em PDF</span>
          <h1>
            O Código do Vídeo <span>Motivacional</span>
          </h1>
          <p className="lead">
            O método por trás dos vídeos que <strong>param o scroll</strong>. Ganchos, trilhas, legendas e roteiros
            prontos para você editar no CapCut e postar ainda hoje.
          </p>
          <div className="hero-cta">
            <BuyButton className="shine">Garantir por R$ {price.now}</BuyButton>
            <span className="price-note">acesso imediato no e-mail</span>
          </div>
          <div className="specs">
            {heroSpecs.map((s) => (
              <div key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cover-stage">
          <div className="cover-float">
            <div className="cover" id="cover" aria-label="Capa do e-book">
              <span className="cover-sub">{site.brand}</span>
              <img src="logo.png" alt="" />
              <div className="cover-title">
                O Código
                <br />
                do Vídeo
                <br />
                Motivacional
              </div>
              <span className="cover-sub">Ganchos · Trilhas · Roteiros</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
