# PRD — App de Frequência v2 ("Frequências Ocultas")

> Artefato AIOX · Fase 2 (Planning) · criado por @pm (Morgan) · 2026-06-23
> Deriva de: docs/project-brief.md (aprovado) · Template: brownfield-prd-tmpl
> Status: RASCUNHO — aguardando aprovação do CEO

---

## 1. Contexto e Análise do Existente

**Sistema atual (v1):** Web app React + TS + tRPC (base Manus), PWA, estética preto/dourado (#050505 / #C5A059). Login por e-mail. 5 frequências com player de áudio (.mp3/.mp4 em CloudFront), modos Ambiente/Puro, e "Evolução" textual em 4 estágios.

**O que preservar (NÃO quebrar):** player de áudio, sistema de modos, PWA, identidade visual, login por e-mail, painel admin.

**O que muda:** nova navegação (2 abas), catálogo expandido (13 freqs), trilhas guiadas, progresso persistido no servidor, novo modelo de acesso (produto separado).

## 2. Objetivos e Métricas de Sucesso

| Objetivo | Métrica |
|---|---|
| Aumentar hábito/retenção | % usuários que voltam 3+ dias; streak médio |
| Conduzir transformação | % que completam ≥7 dias de uma trilha |
| Vender separado | conversões via order bump R$27,90 |

## 3. Requisitos Funcionais (FR)

- **FR-1:** App tem navegação em 2 abas: Jornada e Biblioteca.
- **FR-2:** Biblioteca lista todas as frequências agrupadas por categoria de intenção (Ansiedade, Tristeza, Elevar, Espiritualidade, Foco, Sono, Cura, Prosperidade).
- **FR-3:** Catálogo de 13 frequências (5 da v1 + 8 novas), cada uma com 2 modos (Ambiente/Puro), descrição, como-usar e evolução.
- **FR-3.1:** Cada áudio de frequência DEVE ser longo (mínimo 1 hora) e tocar em LOOP contínuo (repete sem cortes audíveis até o usuário parar). Vale para os modos Ambiente e Puro.
- **FR-4:** Aba Jornada lista 5 trilhas de 30 dias; usuário inicia uma trilha.
- **FR-5:** Ao iniciar trilha, o sistema rastreia o dia atual e exibe o avanço (dia X/30, % concluído, etapa).
- **FR-6:** Cada dia da trilha indica qual(is) frequência(s) ouvir; ao concluir uma sessão, o dia é marcado.
- **FR-7:** Progresso (trilha ativa, dias completos, streak, sessões, minutos) é persistido no servidor por e-mail do usuário.
- **FR-8:** A tela "Sua Evolução" reflete o progresso REAL do usuário (não texto fixo).
- **FR-9:** Player ganha timer/sleep-timer opcional (parar após X min).
- **FR-10:** Acesso por e-mail; verificação de compra própria do produto (separado do Códice).
- **FR-11:** Admin pode gerenciar e-mails autorizados e ver visitantes (mantém v1).

## 4. Requisitos Não-Funcionais (NFR)

- **NFR-1:** Mobile-first, PWA instalável (mantém v1).
- **NFR-2:** Progresso multi-dispositivo (servidor, não só localStorage).
- **NFR-3:** Arquitetura preparada para futura assinatura (sem implementar agora).
- **NFR-4:** Manter estética e performance da v1; lint/typecheck/test/build verdes (Quality-First).
- **NFR-5:** Áudios podem vir da web; sistema tolera fontes externas (CDN) e fallback.

## 5. Constraints (CON)

- **CON-1:** Brownfield — reaproveitar a base existente, não reescrever do zero.
- **CON-2:** Stack fixo: React + TS + tRPC + o banco já existente.
- **CON-3:** Login só por e-mail.
- **CON-4:** Preço inicial R$27,90 fixo (order bump).

## 6. Épicos e Stories

### ÉPICO 1 — Catálogo Expandido & Biblioteca por Intenção
- **1.1** Estender o modelo de dados de frequências (categorias, novas 8 freqs).
- **1.2** Tela Biblioteca: listar frequências agrupadas por categoria.
- **1.3** Integrar áudios das 8 novas frequências (Ambiente/Puro).
- **1.4** Adaptar o Player existente para as novas frequências/categorias.

### ÉPICO 2 — Navegação em 2 Abas
- **2.1** Implementar shell de navegação (tab bar) Jornada / Biblioteca.
- **2.2** Mover o catálogo atual para dentro da aba Biblioteca.

### ÉPICO 3 — Jornadas Guiadas de 30 Dias
- **3.1** Modelo de dados de trilhas (5 trilhas, mapa dia→frequência).
- **3.2** Tela de seleção de trilha (lista as 5 jornadas).
- **3.3** Tela da trilha ativa: dia atual, o que ouvir hoje, avanço.
- **3.4** Lógica de "concluir o dia" e desbloquear o próximo.

### ÉPICO 4 — Progresso Persistido no Servidor
- **4.1** Schema de progresso (trilha ativa, dias completos, streak, sessões, minutos) por e-mail.
- **4.2** Endpoints tRPC: salvar/ler progresso.
- **4.3** Tela "Sua Evolução" dinâmica (reflete dados reais).
- **4.4** Registrar sessão de áudio (início/fim, minutos) alimentando o progresso.

### ÉPICO 5 — Player Turbinado (refinamento)
- **5.1** Sleep-timer / timer de sessão.
- **5.2** (Opcional) mix de frequência com som ambiente.

### ÉPICO 6 — Acesso & Modelo de Negócio
- **6.1** Verificação de compra própria (produto separado do Códice).
- **6.2** Ajustar fluxo de login/onboarding para o novo produto.
- **6.3** Preparar (sem ativar) ganchos para assinatura futura.

## 7. Ordem de Implementação Sugerida

1. ÉPICO 1 (catálogo/biblioteca) → base de conteúdo
2. ÉPICO 2 (navegação) → estrutura
3. ÉPICO 4 (progresso servidor) → fundação de dados
4. ÉPICO 3 (jornadas) → usa o progresso
5. ÉPICO 5 (player) → refinamento
6. ÉPICO 6 (acesso/negócio) → antes do lançamento

## 8. Fora de Escopo

App nativo em stores · assinatura ativa · comunidade/social · geração de áudio ao vivo (mantém .mp3).

## 9. Próximo Passo (workflow AIOX)

Handoff para **@ux-design-expert** (spec de UI/UX das telas novas) → depois **@architect** (arquitetura brownfield).
