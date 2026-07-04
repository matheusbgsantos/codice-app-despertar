// tracking-only.js — Clarity + contagem de visita no Supabase, SEM popup de captura.
// Usar nas páginas de OFERTA e PRESENTE (onde o popup de e-mail atrapalharia a conversão).
(function () {
  // Microsoft Clarity
  (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "x9h7c74lg1");

  // Registra a visita (pageview) no Supabase pra contar no painel
  var SUPABASE_URL = "https://nbizxbdugsmeoudkwtot.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_MITJbApeJTSHm41YW8a50A_DnbYUWPI";
  try {
    fetch(SUPABASE_URL + "/rest/v1/pageviews", {
      method: "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY, "Content-Type": "application/json", "Prefer": "return-minimal" },
      body: JSON.stringify({ path: location.pathname, ref: document.referrer || null })
    }).catch(function () {});
  } catch (e) {}
})();
