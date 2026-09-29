import { useEffect, useRef, useState } from 'react'
import { diffRows } from '../content.js'
import { Section, SectionHead } from './ui.jsx'

function safePlay(video) {
  const p = video?.play()
  if (p && p.catch) p.catch(() => {})
}

export default function BeforeAfter() {
  const [after, setAfter] = useState(true)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (after) safePlay(v)
    else v.pause()
  }, [after])

  function toggleSound() {
    const v = videoRef.current
    v.muted = !v.muted
    setMuted(v.muted)
    safePlay(v)
  }

  function togglePlay() {
    const v = videoRef.current
    if (v.paused) safePlay(v)
    else v.pause()
  }

  return (
    <Section id="antes-depois">
      <SectionHead eyebrow="Antes e depois" title="O mesmo vídeo," muted="editado com o código">
        Toque em "Antes" e "Depois" para ver a diferença nos primeiros segundos.
      </SectionHead>
      <div className="compare">
        <div className="phone-col">
          <div className="toggle" role="group" aria-label="Comparar edição">
            <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>
              Antes
            </button>
            <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>
              Depois
            </button>
          </div>

          <div className="phone">
            <div className="screen before shot" hidden={after}>
              <img src="antes.png" alt="Vídeo de um concorrente: pessoa falando, sem texto na tela" />
              <span className="chip">Sem gancho · sem legenda · sem trilha</span>
            </div>

            <div className="screen after video" hidden={!after}>
              <video
                ref={videoRef}
                src="exemplo.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onClick={togglePlay}
                aria-label="Vídeo de exemplo editado com o método"
              />
              <button type="button" className="sound" onClick={toggleSound} aria-label={muted ? 'Ativar som' : 'Desativar som'}>
                {muted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>

          <span className="illus">{after ? 'Vídeo real do perfil · toque no ícone para ouvir' : 'Concorrente que não aplica os fundamentos'}</span>
        </div>

        <div className="diff">
          <div className="diff-row head">
            <span className="k">Elemento</span>
            <span className="a">Antes</span>
            <span>Depois</span>
          </div>
          {diffRows.map(([k, a, b]) => (
            <div className="diff-row" key={k}>
              <span className="k">{k}</span>
              <span className="a">{a}</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
