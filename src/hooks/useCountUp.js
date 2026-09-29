import { useEffect, useRef, useState } from 'react'

const DURATION = 2400

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// Dispara uma vez quando o elemento aparece na tela e devolve o progresso (0 → 1).
// Com movimento reduzido ou sem IntersectionObserver, começa já em 1.
export function useRevealProgress(threshold = 0.4) {
  const ref = useRef(null)
  const skip = prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  const [progress, setProgress] = useState(skip ? 1 : 0)
  const [started, setStarted] = useState(skip)

  useEffect(() => {
    if (skip || !ref.current) return
    let frame
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        setStarted(true)
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / DURATION)
          setProgress(1 - Math.pow(1 - p, 3)) // ease-out
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold }
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [skip, threshold])

  return { ref, progress, started }
}

// Formata o valor intermediário de 1.000 em 1.000 ("1 mil", "2 mil"...).
// No fim da animação mostra o texto final ("1 mi", "147,1 mil").
export function formatCount(target, progress, finalText) {
  if (progress >= 1) return finalText
  const value = Math.floor((target * progress) / 1000) * 1000
  return value < 1000 ? '0' : `${(value / 1000).toLocaleString('pt-BR')} mil`
}
