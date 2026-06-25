# Backlog de Stories — App de Frequência v2

> Artefato AIOX · @po (Pax) · 2026-06-23
> Validação dos artefatos + sharding do PRD em stories prontas para @dev
> Status: validado · pronto para ciclo @sm → @dev → @qa

---

## ✅ Validação dos Artefatos (po-master-checklist)

| Checagem | Resultado |
|---|---|
| Brief → PRD: todos os objetivos do brief viraram FR? | ✓ |
| PRD → Spec: toda tela necessária está desenhada? | ✓ |
| Spec → Arquitetura: todo elemento de UI tem suporte técnico? | ✓ |
| Rastreabilidade (No-Invention): toda story deriva de um FR? | ✓ |
| Brownfield-safe: nada quebra a v1? | ✓ |
| Constituição (CLI-first, Quality-first)? | ✓ |

**Veredito:** artefatos consistentes e completos. Liberado para desenvolvimento.

---

## 📋 Stories (ordem de execução)

Status legend: `Draft` → `Approved` → `InProgress` → `Review` → `Done`

### ÉPICO 0 — Independência do Manus (FUNDAÇÃO — vem primeiro) 🔌

> Decisão de arquitetura (Aria + CEO): banco = **SQLite** (arquivo único, zero instalação, roda 100% local). Migração futura p/ Postgres possível se virar assinatura com escala.

**STORY 0.1 — Banco local SQLite** · `Draft`
- Trocar Drizzle de `mysql2` → `better-sqlite3`/`libsql`; `drizzle.config.ts` dialect sqlite; DATABASE_URL → arquivo `./data/app.db`.
- **AC:** `npm run db:push` cria o .db local; tabelas existentes (users, authorizedEmails, visitors, webhookLogs) migram; sem MySQL.
- Deriva de: meta-objetivo "sair do Manus" + NFR-2.

**STORY 0.2 — Auth standalone por e-mail** · `Draft`
- Remover dependência do `sdk.ts`/auth Manus; usar o fluxo de e-mail já existente (visitors.verifyEmail/access.checkEmail) como auth principal.
- **AC:** login por e-mail funciona sem chamar serviço Manus; sessão por cookie local.
- Deriva de: FR-10, "sair do Manus".

**STORY 0.3 — Remover/stub helpers Manus não usados** · `Draft`
- `_core/{llm,notification,map,dataApi}.ts` e `ManusDialog.tsx`: remover ou stubbar; limpar envs FORGE_*.
- **AC:** `npm run build` e `typecheck` verdes sem nenhuma var do Manus configurada.
- Deriva de: "sair do Manus".

**STORY 0.4 — Subir local + smoke test** · `Draft`
- `npm install`, `npm run dev`; app abre no navegador local, login por e-mail, toca uma frequência.
- **AC:** app 100% funcional em localhost SEM Manus; documentado no README como rodar.
- Deriva de: "sair do Manus" (critério de saída do Épico 0).

### ÉPICO 1 — Catálogo & Biblioteca

**STORY 1.1 — Extrair catálogo para `shared/frequencies.ts`** · `Draft`
- Mover o `frequencyData` hardcoded do `Player.tsx` para `shared/frequencies.ts`, tipado.
- Adicionar campo `category` e as 8 frequências novas (396,417,639,741,852,174,285,888 Hz) com placeholders de áudio.
- **AC:** Player continua funcionando lendo de `shared/`; 13 freqs definidas; `npm run typecheck` verde.
- Deriva de: FR-2, FR-3.

**STORY 1.2 — Tela Biblioteca por categoria** · `Draft`
- Renomear/adaptar `Dashboard.tsx` → `Biblioteca.tsx`; agrupar cards por `category` (8 categorias).
- **AC:** todas as 13 freqs aparecem na categoria certa; card abre o Player; visual fiel à v1.
- Deriva de: FR-2.

### ÉPICO 2 — Navegação

**STORY 2.1 — TabBar inferior (Jornada | Biblioteca)** · `Draft`
- Componente `TabBar.tsx` fixo; rotas `/biblioteca` e `/jornada`.
- **AC:** alterna entre abas; ativa em dourado; mobile-first; não quebra rotas existentes.
- Deriva de: FR-1.

### ÉPICO 4 — Progresso (fundação de dados — vem antes das jornadas)

**STORY 4.1 — Schema de progresso (3 tabelas)** · `Draft`
- Migration aditiva Drizzle: `user_progress`, `journey_day_completions`, `frequency_sessions`.
- **AC:** migration roda sem tocar tabelas existentes; tipos gerados.
- Deriva de: FR-7, NFR-2.

**STORY 4.2 — Router tRPC `progress`** · `Draft`
- Endpoints: `get`, `startJourney`, `completeDay`, `logSession`. Lógica de streak no servidor.
- **AC:** testável via chamada (CLI-first); testes unitários do cálculo de streak passam.
- Deriva de: FR-5, FR-6, FR-7.

### ÉPICO 3 — Jornadas

**STORY 3.1 — Definir trilhas em `shared/journeys.ts`** · `Draft`
- 5 trilhas de 30 dias (mapa dia→frequência), tipado.
- **AC:** 5 trilhas × 30 dias definidas; cada dia referencia uma freq válida do catálogo.
- Deriva de: FR-4.

**STORY 3.2 — Tela lista de Jornadas** · `Draft`
- `Jornadas.tsx`: 5 cards; mostra progresso se iniciada; botão "Começar".
- **AC:** inicia trilha (chama `startJourney`); card reflete estado.
- Deriva de: FR-4, FR-5.

**STORY 3.3 — Tela Trilha Ativa** · `Draft`
- `Trilha.tsx`: anel de progresso, card "HOJE", streak, linha do tempo de 30 dias.
- Componentes `ProgressRing.tsx`, `JourneyTimeline.tsx`.
- **AC:** mostra dia atual real; "Ouvir agora" abre Player do dia; selos refletem dias completos.
- Deriva de: FR-5, FR-6, FR-8.

**STORY 3.4 — Concluir dia + streak** · `Draft`
- Botão "Concluir dia" no Player (quando veio da Jornada) → `completeDay`; atualiza streak e desbloqueia próximo.
- **AC:** concluir marca o selo, incrementa streak, avança current_day.
- Deriva de: FR-6, FR-7.

### ÉPICO 5 — Player turbinado

**STORY 5.1 — Sleep-timer + loop garantido** · `Draft`
- Botão timer (15/30/60/∞); loop infinito default; `logSession` ao tocar.
- **AC:** áudio em loop sem corte; timer para no tempo; sessão registrada.
- Deriva de: FR-3.1, FR-9, FR-4.4.

### ÉPICO 6 — Acesso & Negócio

**STORY 6.1 — Verificação de compra própria** · `Draft`
- Adaptar webhook/authorizedEmails para o produto separado (order bump R$27,90).
- **AC:** e-mail comprador do app v2 é autorizado; gancho de assinatura preparado (não ativo).
- Deriva de: FR-10, CON-4, NFR-3.

### ÉPICO 4 (final)

**STORY 4.3 — "Sua Evolução" dinâmica** · `Draft`
- `Evolucao.tsx`: marca o estágio real baseado em dias usados.
- **AC:** estágio atual destacado conforme progresso; passados em dourado.
- Deriva de: FR-8.

---

## 🎯 Ordem recomendada de execução

`1.1 → 1.2 → 2.1 → 4.1 → 4.2 → 3.1 → 3.2 → 3.3 → 3.4 → 5.1 → 4.3 → 6.1`

(conteúdo → navegação → fundação de dados → jornadas → player → evolução → negócio)

## Próximo Passo (workflow AIOX)

@sm pega a STORY 1.1, detalha para implementação, @dev implementa, @qa revisa. Repete até completar.
