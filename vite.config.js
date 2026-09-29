import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Caminhos relativos: o site funciona tanto na raiz de um domínio (Vercel/Netlify)
  // quanto dentro de uma subpasta (GitHub Pages: usuario.github.io/nome-do-repositorio/).
  base: './',
  build: {
    // Não publica os arquivos .map, que revelariam o código-fonte original.
    sourcemap: false,
  },
})
