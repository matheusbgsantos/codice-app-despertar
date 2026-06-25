# Project Brief — App de Frequência v2 ("Frequências Ocultas")

> Artefato AIOX · Fase 1 (Discovery) · criado por @analyst (Atlas) · 2026-06-23
> Status: RASCUNHO — aguardando aprovação do Vibe CEO (Matheus)

---

## 1. Visão Geral

Evolução (brownfield) do web app de frequências existente (React + TS + tRPC, base do Manus, já PWA). A v1 entrega 5 frequências soltas com áudios (modo Ambiente/Puro) e uma "Evolução" em texto fixo. A v2 transforma o produto de um "tocador de sons" em um **programa de transformação guiado**, com dois caminhos de uso e progresso real rastreado.

## 2. Problema / Oportunidade

- A v1 tem copy forte e estética premium, mas o usuário **escolhe solto** e a "evolução" é só texto — o app não sabe onde a pessoa está.
- A audiência **pede o app** (demanda orgânica validada).
- Falta um caminho **conduzido** (pra quem quer disciplina) e uma **organização por necessidade emocional** (pra quem quer alívio imediato).

## 3. Objetivos

- Aumentar retenção/hábito via progresso rastreado e jornadas de 30 dias.
- Servir 2 perfis: o disciplinado (Jornada) e o que busca alívio pontual (Biblioteca).
- Posicionar como **produto vendável separado** (não bônus).

## 4. Estrutura do Produto (decidida pelo CEO)

### Duas abas principais

**🛤️ JORNADA (guiada)**
- Trilhas de **30 dias**, uma por intenção (ex: Jornada da Ansiedade, da Prosperidade, da Cura).
- O usuário escolhe a trilha e o app conduz o avanço dia a dia.
- **Progresso rastreado e exibido**: dia atual na trilha, dias completos, % de avanço, etapa.
- Não é "passo a passo travado" — é acompanhamento do avanço.

**📚 BIBLIOTECA (livre)**
- Todas as frequências organizadas por **intenção**, pra ouvir quando quiser.
- Categorias: Ansiedade, Tristeza, Elevar a Frequência, Espiritualidade / Frequência de Deus, Foco, Sono, Cura, Prosperidade.

## 5. Catálogo de Frequências (PROPOSTA — @analyst)

Base nas frequências consagradas (Solfeggio + ondas cerebrais). As 5 da v1 são mantidas e re-categorizadas; novas propostas marcadas [NOVA].

| Frequência | Hz | Categoria(s) | Status |
|---|---|---|---|
| Escudo | 432Hz | Ansiedade | v1 |
| Foco Laser | Gamma 40Hz | Foco | v1 |
| Regeneração | 528Hz | Cura | v1 |
| Sono Profundo | Delta 0.5-4Hz | Sono | v1 |
| Chave Mestra | 963Hz | Espiritualidade/Deus | v1 |
| Libertação | 396Hz | Ansiedade (medo/culpa) | [NOVA] |
| Mudança | 417Hz | Tristeza (limpar trauma) | [NOVA] |
| Coração | 639Hz | Tristeza (relações/amor) | [NOVA] |
| Despertar | 741Hz | Elevar a Frequência (limpeza) | [NOVA] |
| Intuição | 852Hz | Elevar a Frequência / Espiritualidade | [NOVA] |
| Raiz | 174Hz | Cura (dor física/segurança) | [NOVA] |
| Renovação | 285Hz | Cura (campos de energia) | [NOVA] |
| Abundância | 888Hz | Prosperidade | [NOVA] |

> Cada frequência mantém os 2 modos da v1: **Ambiente** (freq + som/música) e **Puro** (só o tom). Áudios podem vir da web.

## 6. Trilhas de Jornada (PROPOSTA — 30 dias cada)

1. **Jornada da Calma** (Ansiedade) — Escudo, Libertação, Sono
2. **Jornada da Prosperidade** — Chave Mestra, Abundância, Intuição
3. **Jornada da Cura** — Regeneração, Raiz, Renovação
4. **Jornada do Recomeço** (Tristeza) — Mudança, Coração, Escudo
5. **Jornada do Despertar** (Espiritualidade) — Intuição, Despertar, Chave Mestra

## 7. Modelo de Negócio

- Produto **separado** do Códice (não bônus).
- **Order bump** a **R$27,90 fixo** inicialmente.
- Futuro: possível migração para **assinatura** (recorrência) — arquitetura deve permitir.

## 8. Login / Acesso

- **Somente por e-mail** (mantém simplicidade da v1).
- Como agora é produto separado: verificação de compra própria (a definir com @architect/@pm).

## 9. Restrições / Premissas

- **Brownfield**: preservar a base que já funciona (player, áudios, PWA, estética preto/dourado).
- Stack mantido: React + TS + tRPC.
- Progresso deve ser salvo no **servidor** (não só localStorage) — multi-dispositivo.
- Áudios novos podem vir da web (curadoria de fontes livres/compradas).

## 10. Fora de Escopo (v2)

- App nativo (iOS/Android stores) — segue PWA.
- Assinatura/recorrência (preparar arquitetura, mas não implementar agora).
- Comunidade/social.

## 11. Próximo Passo (workflow AIOX)

Handoff para **@pm** criar o PRD (brownfield-prd-tmpl) a partir deste brief.
