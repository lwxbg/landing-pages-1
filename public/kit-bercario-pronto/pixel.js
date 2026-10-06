// Pixel da Meta. Fica num arquivo separado e é carregado no topo da página (antes de fontes,
// imagens, vídeo e do app.js) para a visita ser registrada o quanto antes.
(function () {
  'use strict';

  // ID do Pixel da Meta (só números). Vazio = nenhum pixel é carregado.
  var META_PIXEL_ID = '1355836776679945';

  if (!/^\d{8,20}$/.test(META_PIXEL_ID)) { return; }

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
})();
