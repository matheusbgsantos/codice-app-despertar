# Front-End Spec — App do Códice v2 "O Desafio dos 30 Dias"

> Artefato AIOX · Fase 2 (Design) · @ux-design-expert (Uma) · 2026-06-24
> Deriva de: docs/prd-v2.md (aprovado)
> Status: RASCUNHO — aguardando aprovação do Vibe CEO

## 1. PRINCÍPIO DE DESIGN — "Bunker / Dossiê Vivo"
A v1 falhou por ser "app comum de cards". A v2 é um RITUAL. Sensação: você entrou num bunker secreto e está decodificando a própria prisão. Menos interface, mais atmosfera. Cada interação pesa.

## 2. TOKENS (tema escuro/ritual)
- **Fundo:** #000 absoluto (não #070605). Profundidade via gradiente radial dourado MUITO sutil no topo (rgba(192,146,47,.05)).
- **Dourado:** #c0922f base / #d4a93f brilho / usar com PARCIMÔNIA (só o que importa brilha).
- **Vermelho-sangue:** #b81d13 só em alertas/carimbos "confidencial".
- **Texto:** #c7bca0 corpo / #f4efe4 títulos / #6f6147 dim.
- **Brasa:** partículas douradas subindo lentas no fundo (já existe no site, reaproveitar).
- **Selo:** 𓂀 (olho de Hórus) como marca recorrente.
- **Fontes:** Oswald (títulos MAIÚSCULO, peso), Cinzel (números/selos, serifa imperial), PT Serif (corpo de leitura).
- **Textura:** grão sutil (radial dots) sobre tudo.
- **Sem cards "bonitinhos":** usar linhas finas douradas, divisores, respiro generoso, tipografia grande. Cantos retos (dossiê), não arredondados demais.

## 3. FLUXO DE TELAS
```
[Login email] → (sem protocolo?) → [Abertura do Quiz] → [Q1..Q7] → [Calibração] → [Diagnóstico] → [Hoje]
                (com protocolo?) ───────────────────────────────────────────────────→ [Hoje]
```

### 3.1 Abertura do Quiz
Tela preta. 𓂀 pulsando. Texto centralizado grande:
"Antes de te dar o mapa, preciso saber onde te prenderam. Responde sem mentir — ninguém tá vendo."
Botão: "Começar a decodificação →"

### 3.2 As 7 perguntas (uma por tela)
- Topo: progresso discreto "01 / 07" (Cinzel, dim).
- Pergunta grande (Oswald maiúsculo).
- Opções como "botões-arquivo": linha dourada fina, texto, sem card pesado. Selecionar = preenche dourado + tátil.
- Q5 é multi-seleção (checkbox estilo "marcação de dossiê").
- Transição entre perguntas: fade + leve glitch/scan (sensação de terminal).

### 3.3 Calibração (o momento mágico)
Tela preta, animação de "decodificação": linhas de texto correndo tipo terminal ("analisando padrões... cruzando correntes... selando protocolo..."), 𓂀 girando/brasa intensificando. 3-4 segundos. Cria a sensação de que algo único está sendo gerado pra ELA.

### 3.4 Diagnóstico
"DECODIFICADO." grande.
"Tua corrente dominante: A MENTE." (a corrente em destaque dourado)
1-2 frases sobre a prisão dela (montadas do quiz).
Selo: "Protocolo #A7F · calibrado para você · intransferível."
Botão: "Entrar no Dia 1 →"

### 3.5 HOJE (o coração)
- Topo: brand "O CÓDICE" + selo do protocolo (#A7F) pequeno no canto (reforça personalização).
- Anel de progresso "DIA X / 30" (Cinzel grande, dourado).
- Fase atual + streak ("🔥 8 dias de pé. A maioria parou no 3.").
- **HÁBITO DE HOJE** (bloco principal, destaque): nome grande + ação concreta + botão "Ver o porquê / leitura".
- **MANUTENÇÃO** (hábitos empilhados dos dias anteriores): lista enxuta com check de cada um do dia ("os que você já não larga"). Reforça o empilhamento.
- Botão grande: "✓ Selar o dia X".
- Timeline 30 dias (dots) ao final.

### 3.6 Leitura/Porquê (do hábito)
- Nome do hábito + "POR QUE ISSO TE LIBERTA".
- Parágrafo de neurociência no tom Códice.
- Leitura de apoio (trecho do ebook) — colapsável.
- Botão volta pro Hoje.

### 3.7 Selado (confirmação do dia)
𓂀 grande. "DIA X — SELADO." Streak. Frase de reforço. "Volte amanhã — o dia X+1 abre à meia-noite." Botão "Voltar ao mapa".

## 4. NAVEGAÇÃO
- DURANTE o desafio: foco total no Hoje (sem tabbar competindo). 
- Tabbar minimalista com no MÁXIMO: HOJE · PROVAS (dossiês) — Sinais fica pra v3. (Decisão: enxugar pra não distrair da dor única. Confirmar com CEO.)
- Selo do protocolo sempre visível = âncora de "isso é meu".

## 5. MICRO-INTERAÇÕES (o que dá alma)
- Selar o dia: animação de carimbo + brasa sobe + (opcional haptic).
- Hábito empilhado novo: entra com "destravado".
- Tudo com peso/ritual, transições lentas e deliberadas (não "appzinho rápido").

## 6. REAPROVEITAMENTO
- Brasa/grão/paleta: do site codice.html.
- Anel de progresso, timeline, motor de streak: do app-codice atual (só re-skin).

## Aprovação pendente: CEO valida (1) o tom "bunker/ritual", (2) tabbar enxuta (Hoje+Provas, Sinais depois), (3) o fluxo do quiz→calibração→diagnóstico.
