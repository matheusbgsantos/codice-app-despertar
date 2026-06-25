# Arquitetura Brownfield — App de Frequência v2

> Artefato AIOX · Fase 2 (Architecture) · criado por @architect (Aria) · 2026-06-23
> Deriva de: docs/prd.md + docs/front-end-spec.md · Template: brownfield-architecture-tmpl
> Status: RASCUNHO — aguardando aprovação do CEO

---

## 1. Análise do Sistema Existente (o que já temos)

| Camada | Tecnologia | Implicação |
|---|---|---|
| Frontend | React + TS + Vite, wouter (router) | adicionar rotas/abas é trivial |
| UI | Radix UI + Tailwind | **`@radix-ui/react-tabs` JÁ instalado** → tab bar fácil |
| API | tRPC v11 + React Query | adicionar routers de progresso é o padrão |
| ORM/DB | Drizzle ORM + MySQL | adicionar tabelas via migration |
| Storage | AWS S3 + presigner | **JÁ temos S3** → hospedar áudios longos resolvido |
| Auth | e-mail + cookie de sessão | mantém |
| PWA | manifest + sw.js | mantém |

**Conclusão-chave:** quase tudo que a v2 precisa **já está no stack**. É adição incremental, baixo risco. Nenhuma dependência nova obrigatória.

## 2. Decisões de Arquitetura

### D1 — Áudio longo + loop (resolve FR-3.1) ⭐
**Decisão:** NÃO hospedar arquivos de 1h. Hospedar faixas de **5–10 min com loop-point perfeito** (sem clique na emenda) e tocar com `loop=true` no `<audio>` (já usado na v1). O usuário percebe sessão infinita; o arquivo é leve (~5-10 MB).
- Áudios em **S3** (já temos), servidos por CDN.
- Loop sem corte: a faixa é exportada com começo/fim casados (cross-fade no encode). Para tom Puro, é trivial (onda contínua). Para Ambiente, masterizar com loop-point.
- **Alternativa futura (não agora):** gerar o tom Puro via Web Audio API (oscillator) = peso zero. Fica registrado como evolução; v2 mantém .mp3 por consistência com a v1.

### D2 — Catálogo: dados versionados em código, não no DB
**Decisão:** as 13 frequências e 5 trilhas são **conteúdo estático** (mudam pouco) → ficam em arquivos TS no `shared/` (ex: `shared/frequencies.ts`, `shared/journeys.ts`), tipados. Isso evita over-engineering de CMS. O DB guarda só o que é **por-usuário** (progresso).
- Migra o `frequencyData` que hoje está hardcoded no `Player.tsx` para `shared/frequencies.ts` (fonte única, usada por Player + Biblioteca + Jornada).

### D3 — Progresso por usuário no DB (resolve FR-7)
Novas tabelas Drizzle/MySQL:

```
user_progress
  id, email (idx), active_journey_id (nullable),
  current_day (int), streak_count (int),
  last_session_date (date), created_at, updated_at

journey_day_completions
  id, email (idx), journey_id, day_number,
  frequency_id, completed_at

frequency_sessions   (telemetria leve p/ "Sua Evolução")
  id, email (idx), frequency_id, mode (ambiente|puro),
  duration_seconds, started_at
```

- Chave por **email** (consistente com auth atual — sem user_id obrigatório).
- Streak: calculado ao concluir dia (se last_session_date == ontem → +1, se hoje → mantém, senão → reset 1).

### D4 — Novos endpoints tRPC (resolve FR-5,6,7,8)
Novo router `progress`:
```
progress.get(email)              → estado atual (trilha, dia, streak, stats)
progress.startJourney(journeyId) → inicia trilha
progress.completeDay(journeyId, day, frequencyId)
progress.logSession(frequencyId, mode, durationSeconds)
```
Padrão idêntico aos routers existentes (`visitors`, `access`).

### D5 — Navegação 2 abas (resolve FR-1)
- Componente `<TabBar>` fixo inferior usando wouter + estado de rota.
- Rotas: `/biblioteca` (atual Dashboard renomeado), `/jornada` (lista), `/jornada/:id` (trilha ativa), `/player/:id` (mantém).

## 3. Estrutura de Arquivos (o que nasce vs muda)

```
shared/
  frequencies.ts      [NOVO] 13 freqs + categorias (extrai do Player.tsx)
  journeys.ts         [NOVO] 5 trilhas de 30 dias (mapa dia→freq)
drizzle/
  schema.ts           [MODIFICA] +3 tabelas
server/
  db.ts               [MODIFICA] +funções de progresso
  routers.ts          [MODIFICA] +router progress
client/src/
  components/TabBar.tsx        [NOVO]
  components/ProgressRing.tsx  [NOVO]
  components/JourneyTimeline.tsx [NOVO]
  pages/Biblioteca.tsx [MODIFICA de Dashboard.tsx]
  pages/Jornadas.tsx   [NOVO] lista de trilhas
  pages/Trilha.tsx     [NOVO] trilha ativa
  pages/Player.tsx     [MODIFICA] +sleep-timer, +concluir dia, lê de shared/
  pages/Evolucao.tsx   [NOVO/extrai] evolução dinâmica
```

## 4. Conformidade com a Constituição AIOX

- **CLI-First:** lógica de progresso/streak vive no servidor (tRPC), testável sem UI. ✓
- **Quality-First:** cada story passa lint+typecheck+test+build. ✓
- **No-Invention:** todo item rastreia a um FR do PRD. ✓
- **Brownfield-safe:** zero reescrita; só adição. Player/áudio/PWA/auth preservados. ✓

## 5. Riscos & Mitigações

| Risco | Mitigação |
|---|---|
| Loop com clique audível | Masterizar faixas com loop-point; testar emenda |
| Áudios novos (8) não existem ainda | @dev integra placeholders; áudios entram via S3 conforme curadoria |
| Streak/fuso horário | Usar data local do cliente enviada ao servidor |
| Migration em DB de produção | Migration aditiva (só CREATE TABLE), não toca tabelas existentes |

## 6. Próximo Passo (workflow AIOX)

Handoff para **@po** validar todos os artefatos (brief, PRD, spec, arquitetura) e **fatiar (shard)** o PRD em stories prontas para o ciclo @sm → @dev → @qa.
