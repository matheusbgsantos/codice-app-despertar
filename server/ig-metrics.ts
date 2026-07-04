// Métricas do Instagram + Funil do Arquivo pro painel-ig.html
// Portado da função Netlify em 04/07/2026 (Netlify estourou o limite; painel passou a rodar aqui).
// Tokens em variáveis de ambiente do Railway (IG_TOKEN, CLARITY_TOKEN) — nunca expostos ao navegador.
import { Router } from "express";

const IG_ID = "17841425466010118";
const V = "v21.0";
const BASE = `https://graph.facebook.com/${V}`;

// palavra-chave → página de entrega (atualizar ao criar campanha nova)
const CAMPANHAS: Record<string, string> = {
  arca: "/arca-materia",
  olho: "/satelite-materia",
  "528": "/frequencia", sono: "/frequencia",
  enoque: "/enoque", // prefixo: soma enoque-materia + enoque-express
  desperta: "/codice"
};

let cache: { ts: number; body: any } = { ts: 0, body: null };
let clarityCache: { ts: number; mapa: Record<string, number> | null } = { ts: 0, mapa: null };

async function j(url: string) { const r = await fetch(url); return r.json() as any; }

async function claritySessoes(): Promise<Record<string, number> | null> {
  const CT = process.env.CLARITY_TOKEN;
  if (!CT) return null;
  if (clarityCache.mapa && Date.now() - clarityCache.ts < 1800000) return clarityCache.mapa;
  try {
    const r = await fetch("https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1&dimension1=URL", { headers: { Authorization: "Bearer " + CT } });
    if (!r.ok) return clarityCache.mapa; // rate limit: usa o último bom
    const d = await r.json() as any;
    const mapa: Record<string, number> = {};
    for (const m of d) {
      if (m.metricName === "Traffic") {
        for (const i of m.information || []) {
          const u = (i.Url || "")
            .replace("https://arquivosoculto.com.br", "")
            .replace("https://arquivo.arquivosoculto.com.br", "")
            .replace("https://codice-app-production.up.railway.app", "")
            .split("?")[0].replace(".html", "");
          mapa[u] = (mapa[u] || 0) + parseInt(i.totalSessionCount || 0, 10);
        }
      }
    }
    clarityCache = { ts: Date.now(), mapa };
    return mapa;
  } catch (e) { return clarityCache.mapa; }
}

export const igMetricsRouter = Router();

igMetricsRouter.get("/", async (_req, res) => {
  const TOKEN = process.env.IG_TOKEN;
  if (!TOKEN) return res.status(500).json({ erro: "IG_TOKEN não configurado no Railway" });
  if (cache.body && Date.now() - cache.ts < 60000) return res.json(cache.body);

  try {
    const conta = await j(`${BASE}/${IG_ID}?fields=username,followers_count&access_token=${TOKEN}`);
    const medias = await j(`${BASE}/${IG_ID}/media?fields=id,caption,timestamp,like_count,comments_count,thumbnail_url&limit=3&access_token=${TOKEN}`);

    // processa os 3 posts EM PARALELO (métricas + funil de palavra-chave em cada um)
    const posts = await Promise.all((medias.data || []).map(async (m: any) => {
      const ins = await j(`${BASE}/${m.id}/insights?metric=reach,views,shares,saved,comments,likes,total_interactions,ig_reels_avg_watch_time&access_token=${TOKEN}`);
      const met: Record<string, any> = {};
      for (const d of ins.data || []) met[d.name] = d.values && d.values[0] ? d.values[0].value : null;

      let pedidos = 0, entregues = 0, palavra: string | null = null, varreduraCompleta = true;
      const contagem: Record<string, number> = {};
      let url: string | null = `${BASE}/${m.id}/comments?fields=text,username,replies.limit(10){username,text}&limit=100&access_token=${TOKEN}`;
      let pages = 0;
      while (url && pages < 10) {
        const c = await j(url);
        for (const com of c.data || []) {
          if (com.username !== "codice.oculto") {
            for (const p of Object.keys(CAMPANHAS)) {
              if (new RegExp("\\b" + p + "\\b", "i").test(com.text || "")) { contagem[p] = (contagem[p] || 0) + 1; break; }
            }
          }
          for (const r of (com.replies && com.replies.data) || []) {
            if (r.username === "codice.oculto" && /direct/i.test(r.text || "")) entregues++;
          }
        }
        url = c.paging && c.paging.next ? c.paging.next : null;
        pages++;
      }
      if (url) varreduraCompleta = false; // tinha mais páginas: números são "pelo menos"
      palavra = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a])[0] || null;
      pedidos = palavra ? contagem[palavra] : 0;

      return {
        id: m.id, caption: (m.caption || "").slice(0, 90), timestamp: m.timestamp,
        thumb: m.thumbnail_url || null,
        likes: m.like_count, comentarios: m.comments_count,
        reach: met.reach, views: met.views, shares: met.shares, saves: met.saved,
        interacoes: met.total_interactions, watch_ms: met.ig_reels_avg_watch_time,
        palavra, pedidos, entregues, varreduraCompleta
      };
    }));

    // cliques por campanha (Clarity, atraso de 1-3h; cache 30min pra respeitar limite da API)
    const mapa = await claritySessoes();
    let cliquesNota = mapa ? "Clarity · atraso de até 3h" : "sem dado";
    for (const p of posts) {
      p.cliques = (p.palavra && CAMPANHAS[p.palavra] && mapa)
        ? Object.keys(mapa).filter(u => u.startsWith(CAMPANHAS[p.palavra!])).reduce((s, u) => s + mapa[u], 0)
        : null;
    }

    const body = { atualizado: new Date().toISOString(), seguidores: conta.followers_count, posts, cliques: posts[0] ? posts[0].cliques : null, cliquesNota };
    cache = { ts: Date.now(), body };
    return res.json(body);
  } catch (e) {
    return res.status(500).json({ erro: String(e).slice(0, 200) });
  }
});
