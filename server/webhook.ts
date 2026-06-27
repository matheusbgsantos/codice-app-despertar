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
        totalPrice: payload.total_price,
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

export { webhookRouter };
