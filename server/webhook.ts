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
        // Compra aprovada - adicionar email à lista de autorizados.
        //
        // PRODUTO: App de Frequências (produto SEPARADO / order bump R$27,90).
        // Hoje autorizamos QUALQUER venda aprovada (modelo simples). Quando o
        // produto do app tiver um ID/nome fixo na Kirvano, basta filtrar aqui:
        //
        //   const FREQ_PRODUCT_IDS = ['<id-kirvano-do-app>'];
        //   const isFreqApp =
        //     payload.products?.some(
        //       (p) =>
        //         FREQ_PRODUCT_IDS.includes(p.id) ||
        //         /frequ[eê]ncia/i.test(p.name),
        //     ) ?? false;
        //   if (!isFreqApp) break; // ignora outros produtos
        //
        // accessType: 'lifetime' = compra única vitalícia (modelo atual R$27,90).
        // GANCHO FUTURO de assinatura: se/quando existir um plano recorrente,
        // detectar o produto recorrente aqui e passar accessType: 'subscription'
        // (e tratar eventos de renovação/cancelamento mais abaixo).
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
        break;

      case 'REFUND':
      case 'CHARGEBACK':
        // Reembolso ou chargeback - desativar acesso
        await deactivateEmail(customerEmail);
        console.log('[Webhook] Email deactivated:', customerEmail);
        break;

      default:
        console.log('[Webhook] Unhandled event type:', payload.event);
    }

    // Registrar log de sucesso
    await logWebhook({
      event: payload.event,
      payload: JSON.stringify(req.body),
      customerEmail: customerEmail,
      saleId: saleId,
      processed: true,
      errorMessage: null,
    });

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

export { webhookRouter };
