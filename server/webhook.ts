import { Router, Request, Response } from 'express';
import { addAuthorizedEmail, deactivateEmail, logWebhook, recordSale } from './db';

const webhookRouter = Router();

/**
 * Interface do payload da Kirvano
 */
interface KirvanoWebhookPayload {
  event: string;
  event_description: string;
  checkout_id: string;
  sale_id: string;
  payment_method: string;
  total_price: string;
  type: string;
  status: string;
  created_at: string;
  customer: {
    name: string;
    document: string;
    email: string;
    phone_number: string;
  };
  products?: Array<{
    id: string;
    name: string;
    offer_id: string;
    offer_name: string;
    description: string;
    price: string;
    photo: string;
    is_order_bump: boolean;
  }>;
}

/**
 * Endpoint para receber webhooks da Kirvano
 * POST /api/webhook/kirvano
 */
webhookRouter.post('/kirvano', async (req: Request, res: Response) => {
  try {
    const payload = req.body as KirvanoWebhookPayload;
    const token = req.headers['x-webhook-token'] || req.query.token;
    
    console.log('[Webhook] Received event:', payload.event);
    console.log('[Webhook] Customer email:', payload.customer?.email);

    // Validar token se configurado
    const expectedToken = process.env.KIRVANO_WEBHOOK_TOKEN;
    if (expectedToken && token !== expectedToken) {
      console.warn('[Webhook] Invalid token received');
      await logWebhook({
        event: payload.event || 'UNKNOWN',
        payload: JSON.stringify(req.body),
        customerEmail: payload.customer?.email,
        saleId: payload.sale_id,
        processed: false,
        errorMessage: 'Invalid webhook token',
      });
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Processar evento
    const customerEmail = payload.customer?.email;
    const customerName = payload.customer?.name;
    const saleId = payload.sale_id;
    const productName = payload.products?.[0]?.name || 'Produto Kirvano';

    if (!customerEmail) {
      console.warn('[Webhook] No customer email in payload');
      await logWebhook({
        event: payload.event,
        payload: JSON.stringify(req.body),
        customerEmail: null,
        saleId: saleId,
        processed: false,
        errorMessage: 'No customer email in payload',
      });
      return res.status(400).json({ error: 'No customer email provided' });
    }

    // Salva a venda pra análise de conversão (todos os eventos relevantes)
    // VALOR LÍQUIDO (o que o vendedor recebe) tem prioridade sobre o bruto.
    const valorLiquido = payload.my_commission ?? payload.commission ?? payload.seller_amount
      ?? payload.producer_amount ?? payload.net_amount ?? payload.total_price;
    try {
      await recordSale({
        saleId: saleId,
        event: payload.event,
        status: payload.status,
        customerEmail: customerEmail,
        customerName: customerName,
        customerPhone: payload.customer?.phone_number,
        productName: productName,
        paymentMethod: payload.payment_method,
        totalPrice: String(valorLiquido),
        bumps: payload.products?.filter((p) => p.is_order_bump).map((p) => p.name).join(", ") || null,
      });
    } catch (e) {
      console.error("[Webhook] recordSale falhou:", e);
    }

    switch (payload.event) {
      case 'SALE_APPROVED':
        try {
          await addAuthorizedEmail({
            email: customerEmail,
            name: customerName,
            saleId: saleId,
            productName: productName,
            accessType: 'lifetime',
            isActive: true,
            addedBy: 'webhook',
          });
          console.log('[Webhook] Email authorized:', customerEmail);
        } catch (authErr) {
          // NÃO deixa falhar a resposta — a venda já foi salva acima.
          console.error('[Webhook] addAuthorizedEmail falhou (ignorado):', authErr);
        }
        break;

      case 'REFUND':
      case 'CHARGEBACK':
        try {
          await deactivateEmail(customerEmail);
          console.log('[Webhook] Email deactivated:', customerEmail);
        } catch (deErr) {
          console.error('[Webhook] deactivateEmail falhou (ignorado):', deErr);
        }
        break;

      default:
        console.log('[Webhook] Unhandled event type:', payload.event);
    }

    // Log best-effort (não pode quebrar a resposta)
    try {
      await logWebhook({
        event: payload.event,
        payload: JSON.stringify(req.body),
        customerEmail: customerEmail,
        saleId: saleId,
        processed: true,
        errorMessage: null,
      });
    } catch (_) {}

    return res.status(200).json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    
    // Tentar registrar o erro
    try {
      await logWebhook({
        event: req.body?.event || 'ERROR',
        payload: JSON.stringify(req.body),
        customerEmail: req.body?.customer?.email,
        saleId: req.body?.sale_id,
        processed: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });
    } catch (logError) {
      console.error('[Webhook] Failed to log error:', logError);
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Endpoint de teste para verificar se o webhook está funcionando
 * GET /api/webhook/test
 */
webhookRouter.get('/test', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    message: 'Webhook endpoint is working',
    timestamp: new Date().toISOString()
  });
});

/**
 * Importação em massa de vendas históricas (CSV).
 * POST /api/webhook/import-sales  body: { key, sales: [...] }
 */
webhookRouter.post('/import-sales', async (req: Request, res: Response) => {
  try {
    if (req.body?.key !== 'codice2026') return res.status(401).json({ error: 'unauthorized' });
    const arr = Array.isArray(req.body?.sales) ? req.body.sales : [];
    const { recordSale } = await import('./db');
    let ok = 0;
    for (const s of arr) {
      await recordSale({
        saleId: s.saleId || null,
        event: s.event || 'SALE_APPROVED',
        status: s.status || 'APPROVED',
        customerEmail: s.customerEmail || null,
        customerName: s.customerName || null,
        customerPhone: s.customerPhone || null,
        productName: s.productName || null,
        paymentMethod: s.paymentMethod || null,
        totalPrice: s.totalPrice || '0',
        bumps: s.bumps || null,
        createdAt: s.createdAt ? new Date(s.createdAt) : undefined,
      } as any);
      ok++;
    }
    return res.status(200).json({ imported: ok });
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

/**
 * Limpa vendas de teste (ou tudo). POST /api/webhook/clear-sales body: { key, mode }
 */
webhookRouter.post('/clear-sales', async (req: Request, res: Response) => {
  try {
    if (req.body?.key !== 'codice2026') return res.status(401).json({ error: 'unauthorized' });
    const { clearSales } = await import('./db');
    const n = await clearSales(req.body?.mode === 'all' ? 'all' : 'test');
    return res.status(200).json({ deleted: n });
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

/**
 * Registra visita a uma página de venda (tracking de conversão).
 * GET ou POST /api/webhook/track?page=codice  (sem chave — público)
 */
webhookRouter.all('/track', async (req: Request, res: Response) => {
  try {
    const page = (req.query.page || req.body?.page || 'desconhecida').toString().slice(0, 60);
    const visitorId = (req.query.v || req.body?.v || '').toString().slice(0, 40) || null;
    const ref = (req.headers['referer'] || '').toString().slice(0, 200) || null;
    const { recordPageview } = await import('./db');
    await recordPageview({ page, visitorId, ref });
    // pixel transparente 1x1 (pra poder usar via <img> se quiser)
    res.set('Content-Type', 'image/gif');
    res.set('Cache-Control', 'no-store');
    return res.status(200).send(Buffer.from('R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', 'base64'));
  } catch (e) {
    return res.status(200).end();
  }
});

/**
 * Analytics de conversão (visitas). POST /api/webhook/conversion body:{key}
 */
webhookRouter.post('/conversion', async (req: Request, res: Response) => {
  try {
    if (req.body?.key !== 'codice2026') return res.status(401).json({ error: 'unauthorized' });
    const { getConversion } = await import('./db');
    return res.status(200).json(await getConversion());
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

/** Limpa visitas (test/all). POST /api/webhook/clear-views body:{key,mode} */
webhookRouter.post('/clear-views', async (req: Request, res: Response) => {
  try {
    if (req.body?.key !== 'codice2026') return res.status(401).json({ error: 'unauthorized' });
    const { clearPageviews } = await import('./db');
    const n = await clearPageviews(req.body?.mode === 'all' ? 'all' : 'test');
    return res.status(200).json({ deleted: n });
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

/** Tráfego do Clarity (cache 3h). GET /api/webhook/traffic */

webhookRouter.get('/traffic', async (_req: Request, res: Response) => {
  try {
    const { getClarityTraffic } = await import('./db');
    return res.status(200).json(await getClarityTraffic());
  } catch (e) {
    return res.status(200).json({ sessoes: 0, usuarios: 0, atualizadoEm: null, cache: false });
  }
});

/**
 * Aplicações da mentoria (A Máquina Viral). POST /api/webhook/aplicacao
 * body: { nome, email, whatsapp, momento } — grava e avisa no Discord na hora.
 */
webhookRouter.post('/aplicacao', async (req: Request, res: Response) => {
  try {
    const nome = String(req.body?.nome || '').slice(0, 120).trim();
    const email = String(req.body?.email || '').slice(0, 160).trim().toLowerCase();
    const whatsapp = String(req.body?.whatsapp || '').slice(0, 40).trim();
    const momento = String(req.body?.momento || '').slice(0, 500).trim();
    const cria = String(req.body?.cria || '').slice(0, 40).trim();       // zero | posto | vivo
    const vende = String(req.body?.vende || '').slice(0, 40).trim();     // negocio | afiliado | naosei
    const invest = String(req.body?.invest || '').slice(0, 40).trim();   // pronto | parcelado | entender | agoranao
    if (!nome || !email || !whatsapp) return res.status(400).json({ ok: false, erro: 'campos obrigatórios' });

    // Calibragem do lead: A = prioridade máxima, B = chama no dia, C = lista de agosto
    let pontos = 0;
    if (invest === 'pronto') pontos += 3; else if (invest === 'parcelado') pontos += 2; else if (invest === 'entender') pontos += 1;
    if (vende === 'negocio') pontos += 2; else if (vende === 'afiliado') pontos += 1;
    if (cria === 'vivo') pontos += 2; else if (cria === 'posto') pontos += 1;
    const nota = (!cria && !vende && !invest) ? 'B' : invest === 'agoranao' ? 'C' : pontos >= 5 ? 'A' : pontos >= 3 ? 'B' : 'C';

    await logWebhook({ event: 'APLICACAO_MENTORIA', customerEmail: email, payload: JSON.stringify({ nome, whatsapp, momento, cria, vende, invest, nota }), processed: true } as any);

    const hook = process.env.DISCORD_WEBHOOK;
    if (hook) {
      const rot: Record<string, string> = { zero: 'nunca criou', posto: 'posta mas não viraliza', vivo: 'já vive de conteúdo', negocio: 'TEM negócio/produto', afiliado: 'afiliado', naosei: 'não sabe o que vender', pronto: 'PRONTO pra investir', parcelado: 'pronto no parcelado', entender: 'quer entender melhor', agoranao: 'sem condição agora' };
      const cab = nota === 'A' ? '🔥🔥 **LEAD A — CHAMA EM 30 MIN**' : nota === 'B' ? '🟡 **LEAD B — chama hoje**' : '❄️ **LEAD C — lista de agosto (não gastar conversa)**';
      await fetch(hook, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `${cab}\n🎓 **${nome}**\n📱 ${whatsapp}\n✉️ ${email}\n🎬 ${rot[cria] || cria || '?'} · 💼 ${rot[vende] || vende || '?'} · 💰 ${rot[invest] || invest || '?'}\n💬 ${momento || '(sem resposta)'}` }),
      }).catch(() => {});
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
});

/** Captura de e-mail nos funis de DM (portão das páginas de entrega). POST /api/webhook/email-captura body:{email, origem} */
webhookRouter.post('/email-captura', async (req: Request, res: Response) => {
  try {
    const email = String(req.body?.email || '').slice(0, 160).trim().toLowerCase();
    const origem = String(req.body?.origem || 'desconhecida').slice(0, 60).trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ ok: false });
    await logWebhook({ event: 'EMAIL_CAPTURA', customerEmail: email, payload: JSON.stringify({ origem }), processed: true } as any);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: true }); // nunca travar a entrega por erro nosso
  }
});

/** Tamanho da fila do Códice OS (público, só o número). GET /api/webhook/fila */
webhookRouter.get('/fila', async (_req: Request, res: Response) => {
  try {
    const { listWebhookLogs } = await import('./db');
    const logs = await listWebhookLogs(5000);
    const vistos = new Set<string>();
    let n = 0;
    for (const l of logs as any[]) {
      if (l.event === 'EMAIL_CAPTURA' && String(l.payload || '').includes('"origem":"codice-os"') && !vistos.has(l.customerEmail)) { vistos.add(l.customerEmail); n++; }
    }
    return res.status(200).json({ fila: n });
  } catch (e) {
    return res.status(200).json({ fila: 0 });
  }
});

/** Lista e-mails capturados. POST /api/webhook/emails body:{key} */
webhookRouter.post('/emails', async (req: Request, res: Response) => {
  try {
    if (req.body?.key !== 'codice2026') return res.status(401).json({ error: 'unauthorized' });
    const { listWebhookLogs } = await import('./db');
    const logs = await listWebhookLogs(5000);
    const vistos = new Set<string>();
    const emails = (logs as any[]).filter(l => l.event === 'EMAIL_CAPTURA').map(l => ({ email: l.customerEmail, ...(JSON.parse(l.payload || '{}')), em: l.createdAt })).filter(e => { if (vistos.has(e.email)) return false; vistos.add(e.email); return true; });
    return res.status(200).json({ total: emails.length, emails });
  } catch (e) {
    return res.status(500).json({ error: 'erro' });
  }
});

/** Lista aplicações da mentoria. POST /api/webhook/aplicacoes body:{key} */
webhookRouter.post('/aplicacoes', async (req: Request, res: Response) => {
  try {
    if (req.body?.key !== 'codice2026') return res.status(401).json({ error: 'unauthorized' });
    const { listWebhookLogs } = await import('./db');
    const logs = await listWebhookLogs(500);
    const apps = (logs as any[]).filter(l => l.event === 'APLICACAO_MENTORIA').map(l => ({ email: l.customerEmail, ...(JSON.parse(l.payload || '{}')), em: l.createdAt }));
    return res.status(200).json({ total: apps.length, aplicacoes: apps });
  } catch (e) {
    return res.status(500).json({ error: 'erro' });
  }
});

/** Pessoas online agora nos apps (ativas < 5min). GET /api/webhook/online */
webhookRouter.get('/online', async (_req: Request, res: Response) => {
  try {
    const { getOnlineNow } = await import('./db');
    return res.status(200).json(await getOnlineNow());
  } catch (e) {
    return res.status(200).json({ codice: 0, frequencia: 0 });
  }
});

export { webhookRouter };
