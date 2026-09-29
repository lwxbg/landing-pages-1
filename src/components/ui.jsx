import { site } from '../content.js'
import { safeCheckoutUrl } from '../security.js'

const checkoutUrl = safeCheckoutUrl(site.checkoutUrl)

// Botão de compra: vai para o checkout se houver um link válido, senão rola até a oferta.
export function BuyButton({ children, small = false, className = '' }) {
  const href = checkoutUrl || '#oferta'
  const external = Boolean(checkoutUrl)
  return (
    <a
      className={`btn ${small ? 'sm' : ''} ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {!small && <span className="arrow">→</span>}
    </a>
  )
}

export function SectionHead({ eyebrow, title, muted, children }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {title}
        {muted && <> <span>{muted}</span></>}
      </h2>
      {children && <p>{children}</p>}
    </div>
  )
}

export function Section({ id, children, className = '' }) {
  return (
    <section className={`section ${className}`.trim()} id={id}>
      <div className="wrap">{children}</div>
    </section>
  )
}
