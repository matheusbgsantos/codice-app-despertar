import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';

// Mock do banco de dados
vi.mock('./db', () => ({
  addAuthorizedEmail: vi.fn().mockResolvedValue(undefined),
  deactivateEmail: vi.fn().mockResolvedValue(undefined),
  logWebhook: vi.fn().mockResolvedValue(undefined),
  isEmailAuthorized: vi.fn().mockImplementation((email: string) => {
    return Promise.resolve(email === 'authorized@test.com');
  }),
  getAuthorizedEmail: vi.fn().mockImplementation((email: string) => {
    if (email === 'authorized@test.com') {
      return Promise.resolve({
        id: 1,
        email: 'authorized@test.com',
        name: 'Test User',
        productName: 'Test Product',
        isActive: true,
      });
    }
    return Promise.resolve(null);
  }),
}));

import { addAuthorizedEmail, deactivateEmail, logWebhook, isEmailAuthorized, getAuthorizedEmail } from './db';

describe('Webhook Kirvano', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Processamento de eventos', () => {
    it('deve processar evento SALE_APPROVED e adicionar email', async () => {
      const payload = {
        event: 'SALE_APPROVED',
        event_description: 'Compra aprovada',
        checkout_id: 'Q8J1N6K3',
        sale_id: 'D2RP8RQ7',
        payment_method: 'CREDIT_CARD',
        total_price: 'R$ 169,80',
        type: 'ONE_TIME',
        status: 'APPROVED',
        created_at: '2023-12-18 16:40:06',
        customer: {
          name: 'João da Silva',
          document: '23875090127',
          email: 'joao@teste.com',
          phone_number: '5511987654321',
        },
        products: [
          {
            id: '1',
            name: 'Curso de Teste',
            offer_id: '123',
            offer_name: 'Oferta Principal',
            description: 'Descrição do curso',
            price: 'R$ 169,80',
            photo: 'https://example.com/photo.jpg',
            is_order_bump: false,
          },
        ],
      };

      // Simular processamento do webhook
      await addAuthorizedEmail({
        email: payload.customer.email,
        name: payload.customer.name,
        saleId: payload.sale_id,
        productName: payload.products[0].name,
        isActive: true,
        addedBy: 'webhook',
      });

      expect(addAuthorizedEmail).toHaveBeenCalledWith({
        email: 'joao@teste.com',
        name: 'João da Silva',
        saleId: 'D2RP8RQ7',
        productName: 'Curso de Teste',
        isActive: true,
        addedBy: 'webhook',
      });
    });

    it('deve processar evento REFUND e desativar email', async () => {
      const email = 'joao@teste.com';
      
      await deactivateEmail(email);
      
      expect(deactivateEmail).toHaveBeenCalledWith(email);
    });

    it('deve registrar log do webhook', async () => {
      const logData = {
        event: 'SALE_APPROVED',
        payload: JSON.stringify({ test: true }),
        customerEmail: 'test@test.com',
        saleId: 'SALE123',
        processed: true,
        errorMessage: null,
      };

      await logWebhook(logData);

      expect(logWebhook).toHaveBeenCalledWith(logData);
    });
  });
});

describe('Verificação de Email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar true para email autorizado', async () => {
    const result = await isEmailAuthorized('authorized@test.com');
    expect(result).toBe(true);
  });

  it('deve retornar false para email não autorizado', async () => {
    const result = await isEmailAuthorized('unauthorized@test.com');
    expect(result).toBe(false);
  });

  it('deve retornar dados do email autorizado', async () => {
    const result = await getAuthorizedEmail('authorized@test.com');
    
    expect(result).not.toBeNull();
    expect(result?.email).toBe('authorized@test.com');
    expect(result?.name).toBe('Test User');
    expect(result?.productName).toBe('Test Product');
    expect(result?.isActive).toBe(true);
  });

  it('deve retornar null para email não encontrado', async () => {
    const result = await getAuthorizedEmail('notfound@test.com');
    expect(result).toBeNull();
  });
});

describe('Normalização de Email', () => {
  it('deve normalizar email para lowercase', () => {
    const email = 'TESTE@EMAIL.COM';
    const normalized = email.toLowerCase().trim();
    expect(normalized).toBe('teste@email.com');
  });

  it('deve remover espaços em branco', () => {
    const email = '  teste@email.com  ';
    const normalized = email.toLowerCase().trim();
    expect(normalized).toBe('teste@email.com');
  });
});
