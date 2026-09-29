import { price, offerItems } from '../content.js'
import { BuyButton, Section } from './ui.jsx'

export default function Offer() {
  return (
    <Section id="oferta">
      <div className="offer">
        <div>
          <span className="eyebrow">Tudo o que você recebe hoje</span>
          <ul>
            {offerItems.map((item) => (
              <li key={item.label}>
                <span>
                  {item.label}
                  {item.bonus && <span className="tag">bônus</span>}
                </span>
                <span>{item.value}</span>
              </li>
            ))}
            <li className="sum">
              <span>Valor total</span>
              <span>{price.from.replace(',00', '')}</span>
            </li>
          </ul>
        </div>
        <div className="buy">
          <span className="launch">Preço de lançamento</span>
          <span className="price-note">
            de <s>{price.from}</s> por
          </span>
          <div className="big-price">
            <sup>R$</sup>
            {price.now}
          </div>
          <span className="installments">{price.installments}</span>
          <BuyButton className="shine">Comprar agora</BuyButton>
          <div className="trust">
            <span>Pix</span>
            <span>Cartão</span>
            <span>Compra segura</span>
            <span>Acesso imediato</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
