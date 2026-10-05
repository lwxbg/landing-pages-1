// Kit Berçário Pronto: vídeo gamificado (missão das 3 estrelas), botões de compra e Pixel da Meta.
// Textos e preço ficam no index.html. As opções que mudam o comportamento ficam aqui em cima.
(function () {
  'use strict';

  // ===== Opções =====

  // Segundos de vídeo assistido para ganhar a 3ª estrela e completar a missão.
  var SEGUNDOS_DA_MISSAO = 40;

  // ID do Pixel da Meta (só números). Vazio = nenhum pixel é carregado.
  var META_PIXEL_ID = '1355836776679945';

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

  // Parâmetros do anúncio que são repassados para o checkout (para a venda ser atribuída à campanha).
  var PARAMETROS_DE_RASTREIO = /^(utm_[a-z_]+|src|sck|fbclid|gclid|ttclid|xcod)$/i;

  // ===== Utilidades =====

  function paraCada(seletor, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(seletor), fn);
  }

  function mostrar(nome, visivel) {
    paraCada('[data-if="' + nome + '"]', function (el) { el.hidden = !visivel; });
  }

  // ===== Pixel da Meta =====

  function evento(nome, personalizado) {
    if (typeof window.fbq !== 'function') { return; }
    window.fbq(personalizado ? 'trackCustom' : 'track', nome);
  }

  if (/^\d{8,20}$/.test(META_PIXEL_ID)) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) { return; }
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) { f._fbq = n; }
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
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

  // ===== Vídeo gamificado =====

  var video = document.getElementById('kbp-video');
  var botao = document.getElementById('kbp-toggle');
  if (!video || !botao) { return; }

  var statusEl = document.querySelector('[role="status"]');
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

  video.addEventListener('play', function () {
    if (!estado.iniciou) { evento('VideoInicio', true); }
    estado.iniciou = true; estado.tocando = true; estado.terminou = false;
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
