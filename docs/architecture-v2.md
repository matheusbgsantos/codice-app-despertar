# Arquitetura — App do Códice v2 "O Desafio dos 30 Dias"

> Artefato AIOX · Fase 2 (Architecture) · @architect (Aria) · 2026-06-24
> Deriva de: prd-v2.md + front-end-spec-v2.md · Workflow: brownfield
> Status: RASCUNHO — aguardando aprovação do Vibe CEO

## 1. Princípio: REAPROVEITAR a base, ADICIONAR o novo
A base app-codice já tem: React+TS+Vite, tRPC+Express, Drizzle+better-sqlite3, wouter, PWA, login email, motor de progresso/streak (tabelas user_progress + completions, router 'progress'). A v2 NÃO recomeça — adiciona 3 coisas: (1) dados de hábitos/quiz, (2) motor de personalização, (3) re-skin + telas de quiz.

## 2. Decisões-chave

### D1 — Catálogo em código, protocolo no banco ⭐
Os 21 hábitos + 3 módulos + as 7 perguntas do quiz são CONTEÚDO FIXO → ficam em arquivos shared/ (versionados, sem over-engineering de DB). O que é do USUÁRIO (respostas, protocolo gerado, dias cumpridos) → banco. Mesmo padrão validado no app de frequência.

- `shared/habits.ts` — biblioteca: array de Habit {id, key:'corpo'|'mente'|'espirito', name, action, why(neurociência), chapterRef, intensity:1-3}
- `shared/quiz.ts` — as 7 perguntas + pesos por opção + módulos disparados.
- `shared/protocol-engine.ts` — função PURA: buildProtocol(answers) → Protocol (30 dias ordenados). Determinística e testável via CLI (regra AIOX CLI-first). Sem efeito colateral.

### D2 — O motor de personalização (lógica)
`buildProtocol(answers)`:
1. Soma pesos → dominantChain (corpo/mente/espirito).
2. Define sequência das 3 fases: dominante primeiro, com mais dias (ex: dominante=10-12 dias, outras ~9 cada, total 30).
3. Seleciona hábitos de cada fase por intensidade (Q3/Q6 → começa intensity 1 pra sedentário).
4. Injeta módulos especiais (Q5) em dias específicos.
5. Gera hash curto do protocolo (ex "#A7F") a partir das respostas (determinístico) = o "selo".
Saída: Protocol { seal, dominantChain, diagnosisText, days: [{day, phase, chainKey, habitId, isStackedFrom}] }.
~6-9 variações reais emergem das combinações (qualidade garantida, não IA aberta).

### D3 — Schema novo (3  campos/tabela, mínimo)
Reaproveita user_progress existente, ADICIONA:
- tabela `user_protocol`: { email (pk), seal, dominantChain, answersJson, protocolJson, createdAt }.
  → protocolJson guarda o array de 30 dias JÁ MONTADO (snapshot) — assim o protocolo é IMUTÁVEL e ISOLADO por usuário (pilar intransferível). Cada email lê só o seu.
- Reaproveita o streak/completions atuais, chaveando por email (já é assim).
- "Hábitos empilhados": derivado em runtime (dia N → habits dos dias 1..N do protocolJson).

### D4 — Endpoints tRPC (novos no router)
- `protocol.get(email)` → retorna o protocolo do usuário (ou null se não fez quiz).
- `protocol.create(email, answers)` → roda buildProtocol, salva, retorna. (idempotente: se já existe, retorna o existente — protocolo selado uma vez, FR-10).
- `protocol.completeDay(email, day)` → marca dia cumprido, atualiza streak (reaproveita motor).
- `protocol.stats(email)` → dia atual, streak, % conclusão.

### D5 — Gate de acesso (roteamento)
No load: `protocol.get`. Se null → /quiz. Se existe → /hoje. Protege /hoje de quem não tem protocolo. Isolamento: toda query por email do localStorage (já é o padrão de auth da base).

### D6 — Design: re-skin via CSS tokens
Refazer client/src/index.css com tokens --cdc-* v2 (preto absoluto, brasa, grão). Componentes de quiz novos. Reaproveita ProgressRing/timeline (só re-skin). Brasa/grão portados do codice.html.

## 3. Stack (tudo já instalado)
React, tRPC, Drizzle, better-sqlite3, wouter, vite. Zero dependência nova. Quiz é estado local + 1 mutation no fim.

## 4. Conformidade AIOX
- CLI-first: protocol-engine é função pura testável por CLI antes de UI. ✓
- No-Invention: hábitos derivam da ESTRUTURA aprovada + neurociência real (citar base, não inventar estudo). ✓
- Brownfield-safe: não quebra login/PWA/progresso existentes. ✓
- Quality-first: tsc+build verdes; testar buildProtocol com 2 conjuntos de respostas → 2 protocolos diferentes.

## 5. Riscos
- R1: textos de "porquê" precisam de base científica real e tom Códice → copy via Derick (não inventar). 
- R2: animação de calibração não pode travar em mobile fraco → CSS/JS leve, sem libs pesadas.
- R3: garantir que protocolJson é snapshot imutável (não recalcular e mudar o protocolo do usuário depois).

## Aprovação pendente: CEO valida a abordagem (protocolo como snapshot imutável por email, motor determinístico ~6-9 variações, zero dependência nova).
