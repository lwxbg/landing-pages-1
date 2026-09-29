// Todo o texto, preço e link da página fica aqui.
// Para mudar algo na landing page, edite só este arquivo.

export const site = {
  brand: 'Jornada de Aprendizado',
  handle: '@jornadadeaprendizado',
  product: 'O Código do Vídeo Motivacional',
  // Cole aqui o link de checkout da Kiwify/Hotmart/Eduzz (precisa começar com https://).
  // Vazio ou de outro site = botões só levam até a oferta. Lista de sites aceitos: src/security.js
  checkoutUrl: '',
  year: 2026,
}

export const price = {
  from: 'R$ 47,00',
  now: '19,90',
  installments: 'ou 3x de R$ 7,29 no cartão',
  guaranteeDays: 7,
}

export const heroSpecs = [
  { value: '50', label: 'ganchos prontos' },
  { value: '10', label: 'roteiros' },
  { value: '7', label: 'capítulos' },
  { value: '1 mi', label: 'views no perfil' },
]

export const errors = [
  {
    time: '00:00 – 00:03',
    title: 'Começa devagar',
    text: 'Logo, introdução, "fala galera". Nos primeiros 3 segundos a pessoa já foi embora.',
    fix: '50 ganchos para abrir o vídeo no impacto.',
  },
  {
    time: '00:03 – 00:40',
    title: 'Música no lugar errado',
    text: 'A trilha não acompanha a emoção. A virada chega e nada muda no som.',
    fix: 'Qual tipo de música usar em cada parte e onde cortar na batida.',
  },
  {
    time: '00:40 – 00:45',
    title: 'Termina sem soco',
    text: 'O vídeo acaba sem uma frase que a pessoa queira salvar ou mandar para alguém.',
    fix: 'Como escrever a frase final que gera salvamento e compartilhamento.',
  },
]

export const diffRows = [
  ['Abertura', 'Sem texto na tela', 'Gancho grande em 2s'],
  ['Legenda', 'Pequena, embaixo', 'No centro, palavra destacada'],
  ['Música', 'Mesmo volume do início ao fim', 'Sobe na virada'],
  ['Cortes', 'Clipes longos', 'Corte no ritmo da batida'],
  ['Final', 'Acaba do nada', 'Frase-soco em tela preta'],
]

export const timeline = [
  { range: '0–3s', name: 'Gancho', span: 3 },
  { range: '3–15s', name: 'Tensão', span: 12, text: 'A dor que a pessoa sente' },
  { range: '15–40s', name: 'Virada', span: 25, text: 'A mudança de mentalidade. A música sobe e os cortes ficam mais rápidos.' },
  { range: '40–45s', name: 'Soco', span: 5 },
]

export const hooks = [
  ['Ninguém vai vir te salvar.', 'provocação'],
  ['Você não está cansado. Está sem propósito.', 'provocação'],
  ['Quanto tempo mais você vai adiar?', 'pergunta'],
  ['Daqui a 1 ano você vai desejar ter começado hoje.', 'choque'],
  ['Se você sente que está ficando pra trás, assiste até o final.', 'identificação'],
  ['Todo mundo quer o resultado. Ninguém quer a rotina.', 'provocação'],
  ['O que você faria se ninguém estivesse olhando?', 'pergunta'],
  ['Esse vídeo não é pra quem já desistiu.', 'identificação'],
]

export const chapters = [
  { n: 'CAP 1', title: 'Anatomia do viral', text: 'A estrutura gancho, tensão, virada e soco, explicada parte por parte, com exemplo.', page: '1' },
  { n: 'CAP 2', title: '50 ganchos', text: 'Frases de abertura separadas por tipo: provocação, pergunta, choque e identificação.', page: '2' },
  { n: 'CAP 3', title: 'A trilha certa', text: 'Que tipo de música usar em cada emoção e como cortar no ritmo da batida.', page: '3' },
  { n: 'CAP 4', title: 'Legenda que prende', text: 'Fonte, tamanho, cor e a palavra que precisa de destaque em cada frase.', page: '3' },
  { n: 'CAP 5', title: '10 roteiros prontos', text: 'Modelos para preencher. Você escolhe um, edita e posta no mesmo dia.', page: '4' },
  { n: 'CAP 6', title: 'Material sem strike', text: 'Onde achar clipes, falas e músicas, e o que evitar para não perder a conta.', page: '3' },
  { n: 'CAP 7', title: 'Bastidores', text: 'Os 3 vídeos fixados do perfil, com mais de 440 mil views somadas, analisados: gancho, frase final e por que funcionaram.', page: '4' },
  { n: 'BÔNUS', title: 'Minha edição e rotina', text: 'Os ajustes exatos que eu uso no CapCut, meus horários de postagem, checklist de 10 itens e 30 ideias de vídeo.', page: '5' },
]

export const sampleHooks = [
  '"Você não está cansado. Você está sem propósito."',
  '"Ninguém vai vir te salvar."',
  '"Todo mundo quer o resultado. Ninguém quer a rotina."',
  '"Você tem tempo pra rolar o feed, mas não pra mudar de vida?"',
]

export const sampleFeatures = [
  ['Pronto para copiar', 'Cada gancho funciona sozinho. É só escolher e colar na legenda do CapCut.'],
  ['Com dica de edição', 'Toda página diz como aquilo aparece na tela, não só o que escrever.'],
  ['Direto ao ponto', 'São 5 páginas, tudo em listas e tabelas. Dá para consultar com o CapCut aberto do lado.'],
]

export const timeCompare = {
  without: {
    steps: [
      ['Pensar no que falar', '40 min'],
      ['Procurar música e clipes', '30 min'],
      ['Editar testando no escuro', '50 min'],
      ['Escrever legenda e hashtags', '10 min'],
    ],
    total: '2h10',
  },
  with: {
    steps: [
      ['Escolher um roteiro pronto', '5 min'],
      ['Usar a lista de trilhas e fontes', '10 min'],
      ['Editar seguindo a timeline', '20 min'],
      ['Rodar o checklist e postar', '5 min'],
    ],
    total: '40 min',
  },
}

export const fit = {
  yes: [
    'Quer começar um perfil de motivação ou de cortes',
    'Já posta, mas os vídeos param em 200 views',
    'Trava na hora de escrever a primeira frase',
    'Edita no CapCut pelo celular',
  ],
  no: [
    'Procura um curso técnico de edição avançada',
    'Quer resultado sem postar com frequência',
    'Só quer ler frases para se motivar',
  ],
}

// Números reais do painel do TikTok (últimos 365 dias).
export const proofStats = [
  // count = número usado na animação; value = texto final exibido
  { count: 1000000, value: '1 mi', label: 'visualizações de vídeo' },
  { count: 147100, value: '147,1 mil', label: 'curtidas' },
  { count: 7000, value: '7 mil', label: 'compartilhamentos' },
  { count: 4400, value: '4,4 mil', label: 'visitas ao perfil' },
]

export const pinnedVideos = [
  { src: 'video1.png', views: '152,4 mil' },
  { src: 'video2.png', views: '128,5 mil' },
  { src: 'video3.png', views: '166,3 mil' },
]

export const offerItems = [
  { label: 'E-book completo, 7 capítulos', value: 'R$ 27' },
  { label: '50 ganchos prontos para copiar', value: 'incluso' },
  { label: '10 roteiros para preencher', value: 'incluso' },
  { label: 'Minha edição no CapCut: ajustes exatos', value: 'incluso', bonus: true },
  { label: 'Checklist de postagem', value: 'R$ 9', bonus: true },
  { label: 'Calendário de 30 ideias de vídeo', value: 'R$ 11', bonus: true },
  { label: 'Atualizações futuras', value: 'grátis' },
]

export const faq = [
  ['Como recebo o e-book?', 'Assim que o pagamento é aprovado, o link de download chega no seu e-mail. No Pix isso leva poucos minutos.'],
  ['Preciso saber editar?', 'Não. O e-book mostra o que colocar no vídeo. Se você sabe cortar um clipe e escrever um texto no CapCut, já consegue aplicar.'],
  ['Serve para perfil de cortes?', 'Sim. A estrutura de gancho, tensão, virada e soco funciona tanto para vídeos autorais quanto para cortes de podcasts e palestras.'],
  ['Funciona para Reels e Shorts também?', 'Sim. O formato vertical e a lógica de prender nos primeiros segundos são os mesmos no TikTok, no Instagram e no YouTube Shorts.'],
  ['Preciso de computador?', 'Não. Tudo foi pensado para o CapCut no celular, e o PDF abre em qualquer celular.'],
  ['O acesso expira?', 'Não. O PDF é seu para sempre, e as atualizações futuras chegam no mesmo e-mail sem custo extra.'],
  ['E se eu não gostar?', 'Você tem 7 dias para pedir o reembolso completo, sem precisar explicar o motivo.'],
]
