import { site, price } from '../content.js'
import { BuyButton, Section } from './ui.jsx'

export function FinalCta() {
  return (
    <Section className="final-section">
      <div className="final">
        <span className="eyebrow rec">Seu próximo vídeo começa aqui</span>
        <h2>Pare de postar no escuro.</h2>
        <p>Por menos que um lanche, você leva o método, os ganchos e os roteiros para editar o próximo vídeo hoje.</p>
        <BuyButton>Quero o código por R$ {price.now}</BuyButton>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <a className="brand" href="#topo">
          <img src="logo.png" alt="" />
          {site.brand}
        </a>
        <span>
          © {site.year} {site.brand} · Todos os direitos reservados
        </span>
      </div>
    </footer>
  )
}

export function MobileBar() {
  return (
    <div className="mobile-bar" id="mobile-bar">
      <span className="price-note">R$ {price.now} · acesso imediato</span>
      <BuyButton small>Comprar</BuyButton>
    </div>
  )
}
