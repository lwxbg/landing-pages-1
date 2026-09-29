// Domínios de checkout aceitos nos botões de compra.
// Se um link de fora dessa lista for colado em content.js, os botões
// ignoram o link e só levam até a oferta, em vez de mandar o cliente
// para um site desconhecido.
const ALLOWED_CHECKOUT_HOSTS = ['pay.kiwify.com.br', 'kiwify.app', 'pay.hotmart.com', 'go.hotmart.com', 'pay.eduzz.com', 'sun.eduzz.com']

export function safeCheckoutUrl(raw) {
  if (!raw) return null
  try {
    const url = new URL(raw)
    const allowed = ALLOWED_CHECKOUT_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))
    if (url.protocol === 'https:' && allowed) return url.toString()
  } catch {
    // link malformado: cai no aviso abaixo
  }
  if (import.meta.env.DEV) {
    console.warn(`[segurança] checkoutUrl ignorado: "${raw}". Use um link https da Kiwify, Hotmart ou Eduzz.`)
  }
  return null
}
