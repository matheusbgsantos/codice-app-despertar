# PRD — App do Códice v2 "O Desafio dos 30 Dias"

> Artefato AIOX · Fase 2 (Planning) · @pm (Morgan) · 2026-06-24
> Deriva de: docs/project-brief-v2.md (aprovado) · Workflow: brownfield major enhancement
> Status: RASCUNHO — aguardando aprovação do Vibe CEO

## Visão
Transformar o app-codice (hoje "leitor de ebook") num DESAFIO de 30 dias de hábitos reais (neurociência), PERSONALIZADO por quiz, com protocolo individual e intransferível. Preservar a base técnica (login email, SQLite, tRPC, PWA, motor de progresso/streak).

## Requisitos Funcionais (FR)
- **FR-1:** Quiz de decodificação de 7 perguntas, uma por tela, estética interrogatório/dossiê. Captura corrente dominante (corpo/mente/espírito), dores (Q5 multi), intensidade (Q3/Q6), promessa desejada (Q7).
- **FR-2:** Motor de personalização: a partir das respostas, calcula a corrente dominante (soma de pesos), define ordem/ênfase das fases, injeta módulos especiais (porn/açúcar/isolamento) e intensidade. Resultado: 1 protocolo de 30 dias entre ~6-9 variações.
- **FR-3:** Tela de diagnóstico pós-quiz ("DECODIFICADO. Tua corrente: X...") com animação de "calibração/selagem".
- **FR-4:** Protocolo salvo no banco vinculado ao email do usuário. Cada usuário só acessa o PRÓPRIO. Intransferível.
- **FR-5:** Biblioteca de hábitos (dados): 21 hábitos (7 corpo, 7 mente, 7 espírito) + 3 módulos especiais. Cada hábito: id, chave, nome (tom Códice), ação concreta, porquê (neurociência), capítulo de apoio.
- **FR-6:** Tela do dia: hábito de hoje (grande) + porquê + leitura de apoio opcional + botão "Cumpri hoje".
- **FR-7:** HÁBITOS EMPILHÁVEIS: hábitos de dias anteriores permanecem ativos e listados como "manutenção diária". Dia N mostra o de hoje + os anteriores a manter.
- **FR-8:** Marcar "cumpri hoje" → sela o dia, incrementa streak (reaproveita motor existente), avança pro próximo dia.
- **FR-9:** Selo de protocolo: "Protocolo #XXX — calibrado para você em [data]. Intransferível." visível no app.
- **FR-10:** Refazer quiz? Não no MVP (protocolo é selado uma vez). Reset só manual/admin.

## Requisitos Não-Funcionais (NFR)
- **NFR-1:** Mobile-first, PWA instalável.
- **NFR-2:** Design preto absoluto (#000), dourado contido, cara bunker/ritual/dossiê. NÃO "card comum".
- **NFR-3:** Build verde (tsc + vite). Roda local porta 3000, acessível na rede (celular).
- **NFR-4:** Privacidade: protocolo isolado por usuário (sem vazar entre contas).
- **NFR-5:** Conteúdo de hábitos com base científica real (sem inventar estudo).

## Constraints (CON)
- **CON-1:** Brownfield — reaproveita app-codice (login, SQLite, tRPC, PWA, progresso/streak). Não recomeçar do zero.
- **CON-2:** Tom Rorschach/despertar cristão (bíblia de voz). Copy sensível = via Derick.
- **CON-3:** Sem deploy/Sinais-automáticos/comunidade no MVP.

## Épicos (ordem de implementação)
- **ÉPICO 1 — Dados & Personalização (fundação):** biblioteca de hábitos + estrutura de quiz + motor de cálculo do protocolo + schema de protocolo por usuário. (Sem UI ainda — CLI-first, testável.)
- **ÉPICO 2 — Design System v2:** refazer o visual (preto absoluto/bunker), tokens, componentes base. Aplicar nas telas existentes.
- **ÉPICO 3 — O Quiz:** 7 telas de pergunta + tela de "calibração" + tela de diagnóstico. Salva protocolo no backend.
- **ÉPICO 4 — O Desafio (Hoje):** tela do dia com hábito + porquê + leitura, hábitos empilhados, selo de protocolo, anel/streak.
- **ÉPICO 5 — Cumprir & Progresso:** marcar cumprido, selar dia, streak, timeline 30 dias (reaproveita motor).
- **ÉPICO 6 — Gate de acesso:** quem não fez o quiz vai pro quiz; quem já fez vai pro desafio. Isolamento por conta.

## Fora de escopo (v3+)
Sinais diários automáticos, comunidade, deploy, áudio narrado real, refazer quiz.

## Sucesso
Dois usuários diferentes → dois protocolos diferentes → cada um só vê o seu → cumprem dias → streak sobe. Design aprovado. Build verde.
