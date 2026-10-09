// Kit Berçário Pronto: vídeo gamificado (missão das 3 estrelas), botões de compra, barra de compra fixa
// e notificação de compra.
// Textos e preço ficam no index.html. As opções que mudam o comportamento ficam aqui em cima.
// O Pixel da Meta é configurado no pixel.js.
(function () {
  'use strict';

  // ===== Opções =====

  // Segundos de vídeo assistido para ganhar a 3ª estrela e completar a missão.
  var SEGUNDOS_DA_MISSAO = 40;

  // Segundos até a barra de compra fixa aparecer sozinha (ela também aparece assim que a pessoa rola a página).
  var SEGUNDOS_ATE_A_BARRA = 3;

  // Sites de checkout aceitos nos botões de compra (mesma lista de src/security.js).
  // Um link de fora dessa lista é ignorado e o botão só leva até a oferta.
  var CHECKOUTS_ACEITOS = [
    'cakto.com.br',
    'pay.kiwify.com.br',
    'kiwify.app',
    'pay.hotmart.com',
    'go.hotmart.com',
    'pay.eduzz.com',
    'sun.eduzz.com'
  ];

  // Notificação de compra no canto inferior esquerdo. Use só vendas reais (veja na Cakto) e só o primeiro nome.
  // Para acrescentar uma venda, copie uma linha e troque o nome, o kit e a data/hora da compra.
  var VENDAS_REAIS = [
    { nome: 'Angela', kit: 'Kit Berçário Pronto', quando: '2026-10-05T12:05' },
    { nome: 'Sabrina', kit: 'Kit Berçário Pronto', quando: '2026-10-05T11:06' },
    { nome: 'Elaine', kit: 'Kit Berçário Pronto', quando: '2026-10-05T11:01' },
    { nome: 'Maria das Dores', kit: 'Kit Berçário Pronto', quando: '2026-10-05T10:49' },
    { nome: 'Eloina', kit: 'Kit Berçário Pronto', quando: '2026-10-05T09:19' },
    { nome: 'Eline', kit: 'Kit Berçário Pronto', quando: '2026-10-05T07:40' },
    { nome: 'Christian', kit: 'Kit Berçário Pronto', quando: '2026-10-05T06:07' },
    { nome: 'Flavia', kit: 'Kit Berçário Pronto', quando: '2026-10-04T22:20' }
  ];

  // Segundos até a primeira notificação, tempo que cada uma fica na tela e intervalo até a próxima.
  var SEGUNDOS_ATE_A_PRIMEIRA_VENDA = 6;
  var SEGUNDOS_DA_VENDA_NA_TELA = 5;
  var SEGUNDOS_ENTRE_VENDAS = 4;

  // Parâmetros do anúncio que são repassados para o checkout (para a venda ser atribuída à campanha).
  var PARAMETROS_DE_RASTREIO = /^(utm_[a-z_]+|src|sck|fbclid|gclid|ttclid|xcod)$/i;

  // ===== Utilidades =====

  function paraCada(seletor, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(seletor), fn);
  }

  function mostrar(nome, visivel) {
    paraCada('[data-if="' + nome + '"]', function (el) { el.hidden = !visivel; });
  }

  function videoTocando() {
    var v = document.getElementById('kbp-video');
    return !!v && !v.paused && !v.ended;
  }

  // ===== Eventos do Pixel da Meta (o pixel em si é carregado pelo pixel.js) =====

  function evento(nome, personalizado) {
    if (typeof window.fbq !== 'function') { return; }
    window.fbq(personalizado ? 'trackCustom' : 'track', nome);
  }

  // ===== Botões de compra =====

  function checkoutSeguro(href) {
    try {
      var url = new URL(href, window.location.href);
      var aceito = CHECKOUTS_ACEITOS.some(function (h) {
        return url.hostname === h || url.hostname.slice(-(h.length + 1)) === '.' + h;
      });
      return url.protocol === 'https:' && aceito ? url : null;
    } catch (erro) {
      return null;
    }
  }

  var rastreio = [];
  try {
    new URLSearchParams(window.location.search).forEach(function (valor, chave) {
      if (PARAMETROS_DE_RASTREIO.test(chave)) { rastreio.push([chave, valor]); }
    });
  } catch (erro) { /* navegador antigo: segue sem repassar os parâmetros */ }

  paraCada('a.kbp-buy', function (a) {
    var url = checkoutSeguro(a.getAttribute('href') || '');
    if (!url) { a.setAttribute('href', '#oferta'); return; }
    rastreio.forEach(function (par) {
      if (!url.searchParams.has(par[0])) { url.searchParams.set(par[0], par[1]); }
    });
    a.setAttribute('href', url.toString());
    a.addEventListener('click', function () { evento('InitiateCheckout'); });
  });

  // ===== Barra de compra fixa =====
  // Aparece depois de alguns segundos (ou assim que a pessoa rola a página) e some
  // sempre que um dos botões de compra da própria página está visível na tela.

  var barraDeCompra = document.getElementById('kbp-bar');
  if (barraDeCompra && 'IntersectionObserver' in window) {
    var barraLiberada = false;
    var botoesNaTela = [];

    var atualizarBarra = function () {
      barraDeCompra.classList.toggle('kbp-bar-on', barraLiberada && botoesNaTela.length === 0);
    };
    var liberarBarra = function () {
      if (barraLiberada) { return; }
      barraLiberada = true;
      atualizarBarra();
    };

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        var posicao = botoesNaTela.indexOf(entrada.target);
        if (entrada.isIntersecting && posicao === -1) { botoesNaTela.push(entrada.target); }
        if (!entrada.isIntersecting && posicao !== -1) { botoesNaTela.splice(posicao, 1); }
      });
      atualizarBarra();
    }, { threshold: 0.5 });
    paraCada('a.kbp-cta', function (a) { observador.observe(a); });

    barraDeCompra.hidden = false;
    setTimeout(liberarBarra, SEGUNDOS_ATE_A_BARRA * 1000);
    window.addEventListener('scroll', function () { if (window.scrollY > 120) { liberarBarra(); } }, { passive: true });
  }

  // ===== Notificação de compra =====
  // Mostra as vendas de VENDAS_REAIS, uma de cada vez, com há quanto tempo a compra foi feita.

  function haQuantoTempo(quando) {
    var minutos = Math.floor((Date.now() - new Date(quando).getTime()) / 60000);
    if (!(minutos >= 0)) { return ''; }
    if (minutos < 60) { return minutos <= 1 ? 'agora há pouco' : 'há ' + minutos + ' minutos'; }
    var horas = Math.floor(minutos / 60);
    if (horas < 24) { return horas === 1 ? 'há 1 hora' : 'há ' + horas + ' horas'; }
    var dias = Math.floor(horas / 24);
    return dias === 1 ? 'ontem' : 'há ' + dias + ' dias';
  }

  var caixaDeVenda = document.getElementById('kbp-venda');
  if (caixaDeVenda && VENDAS_REAIS.length) {
    var vendaNome = caixaDeVenda.querySelector('.kbp-venda-nome');
    var vendaKit = caixaDeVenda.querySelector('.kbp-venda-kit');
    var vendaQuando = caixaDeVenda.querySelector('.kbp-venda-quando');
    var proximaVenda = 0;
    var vendasFechadas = false;

    var mostrarVenda = function () {
      if (vendasFechadas) { return; }
      // Enquanto o vídeo está tocando, a notificação espera, para não cobrir as estrelas da missão.
      if (videoTocando()) { setTimeout(mostrarVenda, 1000); return; }
      var venda = VENDAS_REAIS[proximaVenda];
      proximaVenda = (proximaVenda + 1) % VENDAS_REAIS.length;
      vendaNome.textContent = venda.nome;
      vendaKit.textContent = venda.kit;
      vendaQuando.textContent = haQuantoTempo(venda.quando);
      caixaDeVenda.hidden = false;
      requestAnimationFrame(function () { caixaDeVenda.classList.add('kbp-venda-on'); });
      setTimeout(function () {
        caixaDeVenda.classList.remove('kbp-venda-on');
        setTimeout(mostrarVenda, SEGUNDOS_ENTRE_VENDAS * 1000);
      }, SEGUNDOS_DA_VENDA_NA_TELA * 1000);
    };

    caixaDeVenda.querySelector('.kbp-venda-fechar').addEventListener('click', function () {
      vendasFechadas = true;
      caixaDeVenda.classList.remove('kbp-venda-on');
    });
    setTimeout(mostrarVenda, SEGUNDOS_ATE_A_PRIMEIRA_VENDA * 1000);
  }

  // ===== Vídeo gamificado =====

  var video = document.getElementById('kbp-video');
  var botao = document.getElementById('kbp-toggle');
  if (!video || !botao) { return; }

  // Dentro do bloco do vídeo: a notificação de compra também é um role="status".
  var statusEl = document.querySelector('#video [role="status"]');
  var rotuloEl = document.querySelector('[data-play-label]');
  var barra = document.querySelector('[data-fill]');
  var estrelasEl = document.querySelector('[data-stars-label]');
  var confete = document.getElementById('kbp-confetti');

  var OURO = '#F0BA42';
  var APAGADA = '#DCCFEC';
  var MARCA_ACESA = '#D9951A';
  var CORES_DO_CONFETE = ['#F0BA42', '#E88F6C', '#7D58A6', '#8A9B48', '#F2A7A0'];

  var estado = { iniciou: false, tocando: false, terminou: false, assistido: 0, completa: false, falhou: false };
  var estrelasNaTela = -1;
  var relogioDoConfete = null;

  function atualizarEstrelas(total) {
    for (var i = 1; i <= 3; i++) {
      (function (n) {
        var ganhou = total >= n;
        paraCada('[data-star="' + n + '"]', function (el) {
          el.setAttribute('fill', ganhou ? OURO : APAGADA);
          el.setAttribute('stroke', ganhou ? OURO : APAGADA);
        });
        paraCada('[data-mark="' + n + '"]', function (el) { el.style.background = ganhou ? MARCA_ACESA : ''; });
        if (ganhou) { paraCada('[data-pop="' + n + '"]', function (el) { el.classList.add('kbp-pop'); }); }
        mostrar('got' + n, ganhou);
        mostrar('lock' + n, !ganhou);
      })(i);
    }
    if (estrelasEl) { estrelasEl.setAttribute('aria-label', total + ' de 3 estrelas'); }
  }

  function desenhar() {
    var proporcao = estado.completa ? 1 : Math.max(0, Math.min(1, estado.assistido / SEGUNDOS_DA_MISSAO));
    var estrelas = estado.completa ? 3 : Math.min(2, Math.floor(proporcao * 3 + 0.0001));
    var faltam = Math.max(1, Math.ceil(SEGUNDOS_DA_MISSAO - estado.assistido));
    var relogio = Math.floor(faltam / 60) + ':' + ('0' + (faltam % 60)).slice(-2);

    var status = 'Toque no vídeo para começar a missão.';
    if (estado.completa) { status = 'Missão completa! Você viu 3 páginas reais do kit.'; }
    else if (estado.falhou) { status = 'Não foi possível carregar o vídeo. Veja as páginas do kit mais abaixo.'; }
    else if (estado.tocando) { status = 'Faltam ' + relogio + ' para a 3ª estrela.'; }
    else if (estado.iniciou) { status = 'Vídeo pausado. Faltam ' + relogio + ' para a 3ª estrela.'; }

    var rotulo = 'Toque para assistir';
    if (estado.terminou) { rotulo = 'Assistir de novo'; }
    else if (estado.iniciou) { rotulo = 'Continuar assistindo'; }

    if (statusEl && statusEl.textContent !== status) { statusEl.textContent = status; }
    if (rotuloEl && rotuloEl.textContent !== rotulo) { rotuloEl.textContent = rotulo; }
    botao.setAttribute('aria-label', rotulo);
    if (barra) { barra.style.width = (proporcao * 100).toFixed(1) + '%'; }
    mostrar('showHint', !estado.tocando);

    if (estrelas !== estrelasNaTela) {
      estrelasNaTela = estrelas;
      atualizarEstrelas(estrelas);
    }
  }

  function soltarConfete() {
    if (!confete) { return; }
    confete.textContent = '';
    for (var i = 0; i < 20; i++) {
      var peca = document.createElement('div');
      peca.className = 'kbp-confetti';
      peca.style.position = 'absolute';
      peca.style.top = '0';
      peca.style.left = ((i * 53 + 7) % 100) + '%';
      peca.style.width = (8 + (i % 3) * 3) + 'px';
      peca.style.height = (10 + (i % 4) * 3) + 'px';
      peca.style.borderRadius = i % 2 ? '50%' : '3px';
      peca.style.background = CORES_DO_CONFETE[i % 5];
      peca.style.animationDelay = ((i % 7) * 0.11).toFixed(2) + 's';
      confete.appendChild(peca);
    }
    confete.hidden = false;
    clearTimeout(relogioDoConfete);
    relogioDoConfete = setTimeout(function () { confete.hidden = true; confete.textContent = ''; }, 3200);
  }

  function completar() {
    if (estado.completa) { return; }
    estado.completa = true;
    paraCada('[data-pulse-when-done]', function (el) { el.classList.add('kbp-pulse'); });
    soltarConfete();
    evento('VideoCompleto', true);
  }

  function avancar(segundos) {
    if (segundos > estado.assistido) {
      estado.assistido = segundos;
      if (segundos >= SEGUNDOS_DA_MISSAO) { completar(); }
    }
    desenhar();
  }

  // Em internet lenta ou com a economia de dados do celular ligada, nada do vídeo é baixado
  // antes de a pessoa tocar nele.
  function conexaoLenta() {
    var conexao = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return !!conexao && (conexao.saveData === true || /2g|3g/.test(conexao.effectiveType || ''));
  }

  // O vídeo só começa a ser preparado depois que a página terminou de carregar,
  // para não disputar a conexão com o que aparece primeiro na tela.
  function prepararVideo() {
    if (estado.iniciou || video.preload !== 'none' || conexaoLenta()) { return; }
    video.preload = 'metadata';
  }
  if (document.readyState === 'complete') { setTimeout(prepararVideo, 1500); }
  else { window.addEventListener('load', function () { setTimeout(prepararVideo, 1500); }); }

  // As páginas reveladas pelas estrelas são baixadas quando o vídeo começa, para aparecerem na hora.
  // Trocar para "eager" faz o navegador baixar na hora o formato que ele mesmo escolheu (WebP ou JPG).
  function aquecerImagens() {
    paraCada('[data-if^="got"] img', function (img) { img.loading = 'eager'; });
  }

  video.addEventListener('play', function () {
    if (!estado.iniciou) { evento('VideoInicio', true); aquecerImagens(); }
    estado.iniciou = true; estado.tocando = true; estado.terminou = false;
    // Se uma notificação de compra estiver na tela, ela sai para não cobrir o vídeo.
    if (caixaDeVenda) { caixaDeVenda.classList.remove('kbp-venda-on'); }
    desenhar();
  });
  video.addEventListener('pause', function () { estado.tocando = false; desenhar(); });
  video.addEventListener('ended', function () {
    estado.tocando = false; estado.terminou = true;
    avancar(SEGUNDOS_DA_MISSAO);
  });
  video.addEventListener('timeupdate', function () { avancar(video.currentTime || 0); });
  video.addEventListener('error', function () { estado.falhou = true; estado.tocando = false; desenhar(); });

  botao.addEventListener('click', function () {
    if (video.paused || video.ended) {
      if (video.ended) { video.currentTime = 0; }
      var promessa = video.play();
      if (promessa && promessa.catch) { promessa.catch(function () {}); }
    } else {
      video.pause();
    }
  });

  desenhar();
})();
