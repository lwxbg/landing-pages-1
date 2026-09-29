import { site } from '../content.js'
import { BuyButton } from './ui.jsx'

export default function Nav() {
  return (
    <nav className="nav" id="nav">
      <div className="wrap">
        <a className="brand" href="#topo">
          <img src="logo.png" alt="Logo: águia branca em círculo preto" />
          {site.brand}
        </a>
        <BuyButton small className="nav-cta">Quero o e-book</BuyButton>
      </div>
    </nav>
  )
}
