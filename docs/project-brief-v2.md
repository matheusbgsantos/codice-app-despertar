# Project Brief — App do Códice v2 ("O Desafio dos 30 Dias")

> Artefato AIOX · Fase 1 (Discovery) · @analyst (Atlas) · 2026-06-24
> Workflow: brownfield (app-codice já existe como base técnica; pivô de conceito)
> Status: RASCUNHO — aguardando aprovação do Vibe CEO (Matheus)

## 1. O Pivô (por que v2)
A v1 do app-codice virou um "leitor de ebook em 30 dias" — entregável fraco, design comum. Matheus rejeitou. A v2 é um PIVÔ de conceito (mesma base técnica React+tRPC+SQLite, novo produto):
**De "ler o ebook" PARA "um DESAFIO de transformação de 30 dias, com hábitos reais de neurociência, PERSONALIZADO por um quiz."**

## 2. Problema / Dor (uma só)
Homem brasileiro, nicho despertar/conspiração cristão: "me sinto preso, cansado, ansioso, isolado, viciado em tela — e não consigo mudar sozinho. Me dá um caminho diário que eu consiga seguir."

## 3. A Solução
Um app de DESAFIO de 30 dias que:
- Começa com um QUIZ de decodificação (7 perguntas) que diagnostica a "corrente dominante" (Corpo/Mente/Espírito) e as dores.
- Monta um PROTOCOLO PERSONALIZADO de 30 dias (selecionando de uma biblioteca curada de ~21 hábitos + 3 módulos especiais, todos com base neurocientífica real).
- Cada dia = 1 hábito novo pra FAZER (5-15min) + o "porquê" (neurociência no tom Códice) + leitura de apoio (cap do ebook).
- HÁBITOS EMPILHAM: cada hábito vira permanente; dia 30 = 30 hábitos rodando = comportamento mudou.
- O ebook vira leitura de apoio, não o centro.

## 4. PILAR DE NEGÓCIO (inegociável)
Protocolo INDIVIDUAL e INTRANSFERÍVEL — cada um só vê o próprio, trancado na conta. Isso é VENDIDO ao lead (página + quiz + selo "Protocolo #XXX intransferível"). É o diferencial que justifica preço e segura reembolso.

## 5. Objetivos
- Transformar comportamento real (hábito empilhável) → menos reembolso, mais resultado.
- Valor percebido alto (personalização) → sustenta o ticket e order bumps.
- Hábito de retorno diário → base pra recorrência futura (Sinais/comunidade).

## 6. Escopo v2 (o que muda na base existente)
- ADICIONAR: motor de quiz + lógica de personalização + geração de protocolo por usuário.
- ADICIONAR: biblioteca de hábitos (dados) + estrutura de "hábito empilhável".
- REFAZER: design (preto absoluto, bunker/ritual — não o "card comum" atual).
- ADAPTAR: o motor de progresso/streak que já existe (reaproveitar) pra marcar hábito cumprido.
- MANTER: login email, SQLite, PWA, base tRPC.

## 7. Fora de escopo (depois)
- Automação de Sinais diários (notícia decodificada) — fase futura.
- Comunidade. Deploy. Áudio narrado real.

## 8. Métrica de sucesso
Pessoa termina o quiz, vê o protocolo dela (≠ de outro), cumpre dias e o streak sobe. Build verde, roda local, design aprovado pelo Matheus.

## Referência de conteúdo
- Estrutura completa (quiz, biblioteca de hábitos, lógica): prototipo-app-codice/ESTRUTURA-DESAFIO-30D.md
- Conteúdo do ebook: prototipo-app-codice/CONTEUDO-EBOOK.md
- Base técnica a reaproveitar: C:\Users\mathe\Downloads\app-codice
