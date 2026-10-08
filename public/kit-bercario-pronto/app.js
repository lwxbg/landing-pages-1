// Kit Berçário Pronto: botões de compra, barra de compra fixa e notificação de compra.
// Textos e preço ficam no index.html. As opções que mudam o comportamento ficam aqui em cima.
// O Pixel da Meta é configurado no pixel.js.
(function () {
  'use strict';

  // ===== Opções =====

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
})();
