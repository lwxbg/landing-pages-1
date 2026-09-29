import { useEffect } from 'react'

// Seletores das partes que aparecem suavemente ao rolar a página.
const REVEAL_SELECTOR = [
  '.section-head',
  '.error',
  '.compare',
  '.timeline',
  '.picker',
  '.chapter',
  '.page',
  '.sample-list',
  '.time-col',
  '.fit-col',
  '.author',
  '.proof',
  '.offer',
  '.guarantee-box',
  '.faq details',
  '.final',
].join(',')

// Efeitos globais da página: barra de progresso, topo com sombra,
// barra de compra no celular, seções aparecendo e capa que inclina com o mouse.
export function usePageEffects() {
  useEffect(() => {
    const cleanups = []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasIO = 'IntersectionObserver' in window

    // Barra de progresso de leitura + sombra no topo
    const bar = document.getElementById('progress')
    const nav = document.getElementById('nav')
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`
        nav.classList.toggle('scrolled', window.scrollY > 10)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    cleanups.push(() => window.removeEventListener('scroll', onScroll))

    // Barra de compra no celular: some no topo e quando a oferta está na tela
    if (hasIO) {
      const mb = document.getElementById('mobile-bar')
      let heroVisible = true
      let offerVisible = false
      const update = () => mb.classList.toggle('away', heroVisible || offerVisible)
      const heroIO = new IntersectionObserver(([e]) => {
        heroVisible = e.isIntersecting
        update()
      })
      const offerIO = new IntersectionObserver(([e]) => {
        offerVisible = e.isIntersecting
        update()
      })
      heroIO.observe(document.getElementById('topo'))
      offerIO.observe(document.getElementById('oferta'))
      cleanups.push(() => heroIO.disconnect(), () => offerIO.disconnect())
    }

    if (!reduce && hasIO) {
      // Seções aparecem ao rolar. O que já está na tela ao carregar não é escondido.
      const revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return
            en.target.classList.add('reveal-in')
            revealIO.unobserve(en.target)
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return
        const index = Array.prototype.indexOf.call(el.parentNode.children, el)
        el.style.transitionDelay = `${(index % 4) * 80}ms`
        el.classList.add('reveal-armed')
        revealIO.observe(el)
      })
      cleanups.push(() => revealIO.disconnect())

      // Capa do e-book inclina acompanhando o mouse (só no computador)
      const cover = document.getElementById('cover')
      const stage = cover?.closest('.cover-stage')
      if (stage && window.matchMedia('(hover: hover)').matches) {
        const onMove = (ev) => {
          const r = stage.getBoundingClientRect()
          const x = (ev.clientX - r.left) / r.width - 0.5
          const y = (ev.clientY - r.top) / r.height - 0.5
          cover.style.transition = 'transform .15s ease-out'
          cover.style.transform = `rotateY(${-14 + x * 20}deg) rotateX(${3 - y * 12}deg)`
        }
        const onLeave = () => {
          cover.style.transition = ''
          cover.style.transform = ''
        }
        stage.addEventListener('pointermove', onMove)
        stage.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          stage.removeEventListener('pointermove', onMove)
          stage.removeEventListener('pointerleave', onLeave)
        })
      }
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])
}
