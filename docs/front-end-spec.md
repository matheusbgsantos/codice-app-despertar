# Front-End Spec — App de Frequência v2

> Artefato AIOX · Fase 2 (Design) · criado por @ux-design-expert (Uma) · 2026-06-23
> Deriva de: docs/prd.md (aprovado) · Template: front-end-spec-tmpl
> Status: RASCUNHO — aguardando aprovação do CEO

---

## 1. Princípios de Design (herdados da v1)

- **Estética:** preto profundo (#050505) + dourado (#C5A059), tipografia serifada elegante, minimalista, místico/premium.
- **Mobile-first:** maioria do uso é celular (PWA instalável).
- **Calma visual:** muito respiro, poucos elementos por tela, foco no áudio.
- **Continuidade:** reaproveitar componentes da v1 (cards, player, visualizer dourado) — não reinventar.

## 2. Arquitetura de Navegação (NOVO)

**Tab bar inferior fixa** (padrão de app, polegar alcança fácil no mobile):

```
┌─────────────────────────────┐
│                             │
│      [conteúdo da aba]      │
│                             │
├─────────────────────────────┤
│   🛤️ Jornada   📚 Biblioteca │  ← tab bar fixa
└─────────────────────────────┘
```

- 2 abas: **Jornada** (default ao abrir, se houver trilha ativa) e **Biblioteca**.
- Ícone + label, dourado quando ativa, cinza quando inativa.
- Header superior mantém saudação ("Bem-vindo, Iniciado") + Sair (como v1).

## 3. Telas

### 3.1 Aba BIBLIOTECA (evolui a tela atual de seleção)
- Título: "SELECIONE SUA FREQUÊNCIA" (mantém).
- Frequências agrupadas por **categoria de intenção**, cada categoria com um rótulo-seção (como o "DIÁRIAS / ESPECIAIS" da v1):
  - 😰 ANSIEDADE · 😔 TRISTEZA · ⬆️ ELEVAR · 🙏 ESPIRITUALIDADE · ⚡ FOCO · 😴 SONO · 💚 CURA · 💎 PROSPERIDADE
- Cards iguais aos da v1 (ícone, nome, Hz, benefício curto). Toca → abre o Player (tela já existente).
- Scroll vertical; categorias colapsáveis se ficar longo (opcional).

### 3.2 Aba JORNADA — Lista de Trilhas (NOVO)
- Título: "ESCOLHA SUA JORNADA".
- 5 cards de trilha grandes (1 por linha no mobile), cada um:
  - Nome (ex: "Jornada da Calma"), subtítulo (intenção), "30 dias".
  - Se já iniciada: barra de progresso + "Dia 8 de 30".
  - Se não: botão "Começar jornada".
- Visual: card escuro com borda dourada, ícone temático.

### 3.3 Aba JORNADA — Trilha Ativa (NOVO — tela central da v2)
Quando o usuário tem uma trilha em andamento, a aba Jornada abre direto aqui:
- **Topo:** nome da trilha + anel/barra de progresso circular ("Dia 8 / 30", "26%").
- **"HOJE":** card destacado com a frequência do dia → botão grande "Ouvir agora" (abre Player).
- **Streak:** "🔥 8 dias seguidos" (gamificação leve).
- **Linha do tempo:** os 30 dias como pontos/selos — completos (dourado), hoje (pulsando), futuros (apagados).
- Ao concluir a sessão do dia → o ponto vira dourado, streak +1, desbloqueia o próximo.

### 3.4 Player (evolui a tela v1)
- Mantém tudo da v1 (descrição, modos Ambiente/Puro, visualizer, barra de progresso, como-usar).
- **NOVO:** sleep-timer (botão "⏱ Tocar por: 15/30/60 min / ∞") — default ∞ (loop infinito).
- **NOVO (se veio da Jornada):** ao terminar a sessão mínima, botão "✓ Concluir dia da jornada".
- Áudio em loop contínuo (FR-3.1) — sem corte audível.

### 3.5 "Sua Evolução" (transforma o texto fixo em dado real)
- Mantém os 4 estágios da v1 (Primeiro Contato → Reprogramação → Transformação → Potencial Máximo).
- **NOVO:** marca em qual estágio o usuário ESTÁ baseado no progresso real (dias usados):
  - estágios passados = dourados/concluídos; estágio atual = destacado; futuros = apagados.
  - Ex: "Você está em REPROGRAMAÇÃO NEURAL (dia 8). Faltam 22 dias para TRANSFORMAÇÃO."

## 4. Fluxos principais

**Fluxo A — Usuário novo:**
abre app → escolhe entre Jornada ou Biblioteca → (Jornada) escolhe trilha → começa Dia 1 → ouve → conclui dia.

**Fluxo B — Usuário recorrente:**
abre app → cai na Trilha Ativa → vê "Hoje: Dia 8" → ouve a frequência do dia → conclui → streak sobe.

**Fluxo C — Alívio pontual:**
abre app → Biblioteca → categoria Ansiedade → toca Escudo → ouve em loop.

## 5. Micro-interações (delight)

- Anel de progresso anima ao concluir o dia.
- Streak com chama 🔥 que "acende" ao manter dias seguidos.
- Selo do dia vira dourado com brilho ao completar.
- Visualizer dourado pulsa no ritmo (mantém v1).

## 6. Componentes a reaproveitar vs criar

| Reaproveitar (v1) | Criar (v2) |
|---|---|
| Card de frequência | Tab bar inferior |
| Player completo | Card de trilha |
| Visualizer dourado | Anel de progresso |
| Header (saudação/sair) | Linha do tempo de 30 dias |
| Estética/tokens de cor | Selo de streak |

## 7. Próximo Passo (workflow AIOX)

Handoff para **@architect** — definir arquitetura técnica (modelo de dados de trilhas/progresso, endpoints tRPC, estratégia de áudio longo+loop, integração com a base existente).
