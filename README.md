# Jornada de Aprendizado · Landing page

Página de vendas do e-book **O Código do Vídeo Motivacional**, feita em React + Vite.

## Rodar no seu computador

Precisa do [Node.js](https://nodejs.org) instalado (versão 18 ou mais nova).

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Mudar textos, preço e link de compra

Tudo fica em **`src/content.js`**. Não precisa mexer em mais nenhum arquivo.

- `checkoutUrl`: cole o link de checkout da Kiwify ou da Hotmart. Todos os botões de compra passam a abrir esse link.
- `price`: preço, preço riscado, parcelamento e dias de garantia.
- `proofStats` e `pinnedVideos`: números do painel do TikTok e capas dos vídeos fixados.

## Imagens e vídeo

Ficam na pasta **`public/`**:

| Arquivo | O que é |
|---|---|
| `logo.png` | Logo da águia |
| `video1.png`, `video2.png`, `video3.png` | Capas dos 3 vídeos fixados |
| `exemplo.mp4` | Vídeo que roda no celular do "Antes e depois" (máx. ~15 MB) |

Para trocar, substitua o arquivo mantendo o mesmo nome.

## Colocar no ar (grátis)

### Opção 1: GitHub Pages (já configurado)

O arquivo `.github/workflows/deploy.yml` monta e publica o site sozinho
toda vez que algo é enviado para a branch `main`.

1. No GitHub, crie um repositório **público** (ex.: `codigo-do-video-motivacional`).
2. Envie os arquivos desta pasta para ele (botão **Add file → Upload files**).
3. Vá em **Settings → Pages** e, em **Source**, escolha **GitHub Actions**.
4. Aguarde 1 a 2 minutos. O site fica em
   `https://SEU-USUARIO.github.io/codigo-do-video-motivacional/`.

### Opção 2: Vercel ou Netlify

1. Crie uma conta na [Vercel](https://vercel.com) ou na [Netlify](https://netlify.com).
2. Importe o repositório do GitHub.
   Configuração: comando de build `npm run build`, pasta de saída `dist`.
3. Pegue o link gerado e coloque na bio do TikTok.

A Vercel e a Netlify aplicam todos os cabeçalhos de segurança (`vercel.json` e `public/_headers`).
O GitHub Pages aplica só a proteção de scripts, que está no `index.html`.

## Segurança

A página não tem login, banco de dados nem formulário. O pagamento acontece
inteiro na Kiwify/Hotmart, então nenhum dado de cartão passa por aqui.

O que já está configurado:

- **Cabeçalhos de segurança** (`vercel.json` na Vercel, `public/_headers` na Netlify):
  - só roda script do próprio site (bloqueia script injetado);
  - o site não pode ser embutido em outra página (evita cópia/golpe com iframe);
  - HTTPS obrigatório;
  - câmera, microfone e localização bloqueados.
- **Link de compra protegido** (`src/security.js`): os botões só aceitam links `https`
  da Kiwify, Hotmart ou Eduzz.
- **Sem source maps** em produção (`vite.config.js`).

Checklist para você:

- [ ] Ative a verificação em duas etapas no TikTok, na Kiwify/Hotmart, no GitHub e na Vercel.
- [ ] Nunca coloque senha, token ou chave de API em nenhum arquivo deste projeto:
      tudo aqui fica público no navegador.
- [ ] Rode `npm run audit` de vez em quando para checar falhas nas dependências.
- [ ] Depois de publicar, teste o link em https://securityheaders.com (a meta é nota A).
- [ ] Se usar domínio próprio, ative o bloqueio de transferência no registrador.

**Atenção ao adicionar ferramentas de terceiros** (Pixel do TikTok, Google Analytics,
chat etc.): o cabeçalho `Content-Security-Policy` bloqueia scripts de fora.
Adicione o domínio da ferramenta em `script-src` e `connect-src`, nos dois arquivos.
Se for coletar dados de visitantes, a LGPD exige uma política de privacidade na página.

## Estrutura

```
src/
  content.js        ← todos os textos e números
  styles.css        ← visual da página
  App.jsx           ← ordem das seções
  components/       ← uma seção por arquivo
public/             ← logo, capas e vídeo
  kit-bercario-pronto/  ← segunda página (veja abaixo)
```

## Segunda página: Kit Berçário Pronto

Página estática (sem React) que fica em **`public/kit-bercario-pronto/`** e é publicada junto com o site,
no endereço `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/kit-bercario-pronto/`.

| Arquivo | O que mudar ali |
|---|---|
| `index.html` | Textos e a seção de oferta (`id="oferta"`), com duas opções: **Oferta simples** (R$ 19,90, link `pay.cakto.com.br/39zohzw_1164115`) e **Super Oferta** com os 3 kits (R$ 27,90, link `pay.cakto.com.br/cbemoi7_1178434`). Os outros botões da página e a barra fixa levam até essa seção |
| `pixel.js` | ID do Pixel da Meta (`META_PIXEL_ID`). É carregado no topo da página para registrar a visita o quanto antes |
| `app.js` | Vendas reais da notificação de compra (`VENDAS_REAIS`) e tempo até a barra de compra fixa aparecer (`SEGUNDOS_ATE_A_BARRA`) |
| `styles.css` | Visual e animações |
| `assets/` | Imagem do topo (`kits-topo.jpg`), capas dos kits (`capa.jpg`, `kit-datas.jpg`, `kit-planejamento.jpg`), páginas de exemplo do kit e fontes (`fontes/`, hospedadas aqui para a página abrir mais rápido) |

Os parâmetros do anúncio (`utm_*`, `fbclid`, `src`, `sck`) são repassados sozinhos para o checkout,
para a venda ser atribuída à campanha. O Pixel da Meta só é carregado se `META_PIXEL_ID` estiver
preenchido; o `index.html` dessa página já libera os domínios da Meta no `Content-Security-Policy`.
Na Vercel/Netlify, libere também em `vercel.json` e `public/_headers`.
