# Backlog de Stories — App do Códice v2 "O Desafio dos 30 Dias"

> Artefato AIOX · @po (Pax) · 2026-06-24
> Validação dos 4 artefatos + sharding em stories prontas para @dev
> Status: validado · pronto para desenvolvimento

## ✅ Validação (checklist PO)
- brief-v2 → prd-v2 → spec-v2 → architecture-v2: encadeiam, consistentes. ✓
- Toda story rastreia a um FR. No-Invention respeitado (hábitos da estrutura aprovada). ✓
- Brownfield-safe: reaproveita login/PWA/streak, não recomeça. ✓
- Pilar de negócio (protocolo intransferível) coberto (Story 1.3 + 6.x). ✓
- LIBERADO para desenvolvimento.

Status: Draft → Approved → InProgress → Review → Done

═══════════════════════════════════════
## ÉPICO 1 — Dados & Personalização (FUNDAÇÃO, CLI-first)
═══════════════════════════════════════
### Story 1.1 — Biblioteca de hábitos `shared/habits.ts`
- 21 hábitos (7 corpo, 7 mente, 7 espírito) + 3 módulos especiais, conforme ESTRUTURA-DESAFIO-30D.md.
- Cada: {id, key, name(tom Códice), action, why(neurociência REAL), chapterRef, intensity}.
- AC: tipos exportados; conteúdo via Derick (copy dos "why" no tom certo, base científica citada).

### Story 1.2 — Quiz data `shared/quiz.ts`
- 7 perguntas, opções com {label, weights:{corpo,mente,espirito}, module?, intensity?}.
- AC: estrutura tipada; Q5 multi-seleção; Q7 = promessa.

### Story 1.3 — Motor `shared/protocol-engine.ts`
- buildProtocol(answers) → Protocol {seal, dominantChain, diagnosisText, days[30]}.
- Determinístico; seal = hash curto das respostas; hábitos empilháveis (isStackedFrom).
- AC (CLI-first): rodar com 2 conjuntos de respostas → 2 protocolos DIFERENTES; mesmo input → mesmo output. Testar via script antes de UI.

### Story 1.4 — Schema `user_protocol` + migration
- tabela {email pk, seal, dominantChain, answersJson, protocolJson(snapshot), createdAt}.
- AC: migration aplica no SQLite; protocolo imutável após criado.

═══════════════════════════════════════
## ÉPICO 2 — Design System v2
═══════════════════════════════════════
### Story 2.1 — Tokens + base CSS v2 (preto absoluto, brasa, grão, fontes)
### Story 2.2 — Componentes base (botão-arquivo, selo 𓂀, divisores, anel re-skin)
- AC: visual bate com spec "bunker/ritual"; sem cards comuns.

═══════════════════════════════════════
## ÉPICO 3 — O Quiz
═══════════════════════════════════════
### Story 3.1 — Abertura + 7 telas de pergunta (uma por tela, progresso 01/07, multi na Q5)
### Story 3.2 — Tela de Calibração (animação decodificação terminal, 3-4s)
### Story 3.3 — Tela de Diagnóstico (DECODIFICADO + corrente + selo intransferível)
### Story 3.4 — Salvar: protocol.create no fim do quiz (idempotente)
- AC: responder o quiz gera e salva o protocolo; mostra diagnóstico correto.

═══════════════════════════════════════
## ÉPICO 4 — O Desafio (Hoje)
═══════════════════════════════════════
### Story 4.1 — Tela Hoje: anel Dia X/30, fase, streak, selo do protocolo no canto
### Story 4.2 — Bloco "Hábito de Hoje" (nome+ação) + botão ver porquê/leitura
### Story 4.3 — Bloco "Manutenção" (hábitos empilhados dias 1..N-1 com check)
### Story 4.4 — Tela Porquê/Leitura (neurociência + trecho ebook colapsável)

═══════════════════════════════════════
## ÉPICO 5 — Cumprir & Progresso
═══════════════════════════════════════
### Story 5.1 — "Selar o dia" → completeDay, streak +1, animação carimbo/brasa
### Story 5.2 — Tela "Selado" (𓂀, dia selado, streak, volta)
### Story 5.3 — Timeline 30 dias (done/now/locked) reaproveitada

═══════════════════════════════════════
## ÉPICO 6 — Gate de acesso & Isolamento
═══════════════════════════════════════
### Story 6.1 — Roteamento: sem protocolo→/quiz, com protocolo→/hoje
### Story 6.2 — Isolamento por email (cada conta só vê o próprio protocolo) — testar com 2 emails
### Story 6.3 — Limpar telas/rotas da v1 (Sinais fica oculto p/ v3; manter Provas)

## Ordem de execução
Épico 1 (fundação testável) → 2 (design) → 3 (quiz) → 4 (desafio) → 5 (progresso) → 6 (gate).

## Verificação final (Definition of Done do projeto)
- tsc + build verdes. Roda local porta 3000 + rede.
- 2 emails diferentes → 2 protocolos diferentes → cada um só vê o seu.
- Quiz→calibração→diagnóstico→Hoje→selar dia→streak sobe.
- Design aprovado pelo CEO. Sem quebrar login/PWA.
