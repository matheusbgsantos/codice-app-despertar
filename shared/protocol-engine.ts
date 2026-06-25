// O CÓDICE — Motor de Protocolo (PURO e DETERMINÍSTICO).
// buildProtocol(answers) → Protocol. Mesmo input SEMPRE gera o mesmo output.
// Lógica (ESTRUTURA-DESAFIO-30D.md, Parte 2):
//   1. Soma pesos do quiz → corrente DOMINANTE.
//   2. Dominante abre o desafio e ganha mais dias (~12); as outras ~9 cada (=30).
//   3. Cada dia recebe 1 hábito da fase, ordenado por intensidade crescente
//      (suave primeiro), reciclando os 7 hábitos da corrente quando faltam dias.
//   4. Q5 injeta módulos especiais (porn/açúcar/isolamento) em dias específicos.
//   5. seal = hash curto determinístico das respostas (ex "#A7F").
//   6. diagnosisText montado do resultado.

import { habitsByChain, type ChainKey, type HabitId } from "./habits";
import { quiz, moduleHabitId, type Weights, type ModuleTag, type Promise } from "./quiz";

/** Respostas do quiz. Índices das opções escolhidas (Q5 = multi). */
export interface QuizAnswers {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  /** Multi-seleção — array de índices (pode ser vazio). */
  q5: number[];
  q6: number;
  q7: number;
}

/** Um dia do protocolo de 30 dias. */
export interface ProtocolDay {
  /** 1..30 */
  day: number;
  /** Nome da fase (corrente trabalhada, em destaque). */
  phase: string;
  /** Corrente do dia. */
  chainKey: ChainKey;
  /** Hábito do dia. */
  habitId: HabitId;
  /** Empilhamento — Wave 2 marca os anteriores como permanentes. */
  isStacked: boolean;
}

/** Protocolo individual e intransferível. */
export interface Protocol {
  /** Selo curto determinístico (ex "#A7F"). */
  seal: string;
  /** Corrente dominante. */
  dominantChain: ChainKey;
  /** Diagnóstico montado (tom Rorschach). */
  diagnosisText: string;
  /** Promessa escolhida na Q7. */
  promise: Promise;
  /** Módulos especiais ativados (Q5). */
  modules: ModuleTag[];
  /** Os 30 dias. */
  days: ProtocolDay[];
}

const CHAIN_LABEL: Record<ChainKey, string> = {
  corpo: "O CORPO",
  mente: "A MENTE",
  espirito: "O ESPÍRITO",
};

const CHAIN_PHASE: Record<ChainKey, string> = {
  corpo: "CORPO — religar a máquina",
  mente: "MENTE — retomar o controle",
  espirito: "ESPÍRITO — reatar a fonte",
};

const PRISON_LINE: Record<ChainKey, string> = {
  corpo: "Eles te deixaram mole, seco e sem força — um corpo parado é coleira folgada.",
  mente: "Eles te prenderam no scroll e na ansiedade — tua atenção virou caco.",
  espirito: "Eles te encheram de barulho pra você nunca ouvir o que fala por dentro.",
};

const MODULE_LABEL: Record<ModuleTag, string> = {
  porn: "a pornografia",
  acucar: "o açúcar",
  isolamento: "o isolamento",
};

const HOURS_CELL: Record<number, string> = {
  0: "Menos de 3h de tela por dia — a cela é pequena, mas é cela.",
  1: "3 a 6h de tela por dia — o tamanho da tua cela.",
  2: "6 a 9h de tela por dia — o tamanho da tua cela.",
  3: "Mais de 9h de tela por dia — o tamanho da tua cela.",
};

/** Soma os pesos de todas as respostas (incluindo multi-seleção da Q5). */
function sumWeights(answers: QuizAnswers): Weights {
  const total: Weights = { corpo: 0, mente: 0, espirito: 0 };
  const pick = (qIndex: number, optIndex: number) => {
    const q = quiz[qIndex];
    const opt = q?.options[optIndex];
    if (!opt) return;
    total.corpo += opt.weights.corpo;
    total.mente += opt.weights.mente;
    total.espirito += opt.weights.espirito;
  };
  pick(0, answers.q1);
  pick(1, answers.q2);
  pick(2, answers.q3);
  pick(3, answers.q4);
  for (const i of answers.q5) pick(4, i);
  pick(5, answers.q6);
  pick(6, answers.q7);
  return total;
}

/** Ordem das correntes: dominante primeiro, depois por peso decrescente.
 *  Empate resolvido por ordem fixa corpo→mente→espirito (determinístico). */
function chainOrder(weights: Weights): ChainKey[] {
  const fixed: ChainKey[] = ["corpo", "mente", "espirito"];
  return [...fixed].sort((a, b) => {
    if (weights[b] !== weights[a]) return weights[b] - weights[a];
    return fixed.indexOf(a) - fixed.indexOf(b);
  });
}

/** Sequência de hábitos de uma corrente, ordem de intensidade crescente,
 *  reciclando para preencher `count` dias. Determinístico. */
function chainSequence(key: ChainKey, count: number): HabitId[] {
  const ordered = habitsByChain(key)
    .slice()
    .sort((a, b) => {
      if (a.intensity !== b.intensity) return a.intensity - b.intensity;
      return a.id.localeCompare(b.id);
    });
  const seq: HabitId[] = [];
  for (let i = 0; i < count; i++) {
    seq.push(ordered[i % ordered.length].id);
  }
  return seq;
}

/** Hash determinístico curto das respostas → "#A7F" (3 hex maiúsculos). */
function computeSeal(answers: QuizAnswers): string {
  const canonical = [
    answers.q1,
    answers.q2,
    answers.q3,
    answers.q4,
    [...answers.q5].sort((a, b) => a - b).join(","),
    answers.q6,
    answers.q7,
  ].join("|");
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < canonical.length; i++) {
    h ^= canonical.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  const hex = (h & 0xfff).toString(16).toUpperCase().padStart(3, "0");
  return `#${hex}`;
}

/** Módulos ativados pela Q5, em ordem fixa de declaração das opções. */
function activeModules(answers: QuizAnswers): ModuleTag[] {
  const q5 = quiz[4];
  const mods: ModuleTag[] = [];
  for (const i of [...answers.q5].sort((a, b) => a - b)) {
    const m = q5.options[i]?.module;
    if (m && !mods.includes(m)) mods.push(m);
  }
  return mods;
}

/** Dias (1-based) onde os módulos são injetados. Determinístico. */
const MODULE_INJECTION_DAYS = [4, 9, 14];

/**
 * Monta o protocolo completo (PURO, DETERMINÍSTICO).
 */
export function buildProtocol(answers: QuizAnswers): Protocol {
  const weights = sumWeights(answers);
  const order = chainOrder(weights);
  const dominantChain = order[0];

  // Distribuição: dominante 12, outras 9 cada (= 30).
  const counts: Record<ChainKey, number> = { corpo: 9, mente: 9, espirito: 9 };
  counts[dominantChain] = 12;

  // Sequência de dias por fase, na ordem (dominante primeiro).
  const days: ProtocolDay[] = [];
  let dayNum = 1;
  for (const key of order) {
    const seq = chainSequence(key, counts[key]);
    for (const habitId of seq) {
      days.push({
        day: dayNum,
        phase: CHAIN_PHASE[key],
        chainKey: key,
        habitId,
        isStacked: false,
      });
      dayNum++;
    }
  }

  // Injeta módulos da Q5 em dias específicos (sobrescreve o hábito daquele dia).
  const modules = activeModules(answers);
  modules.forEach((mod, idx) => {
    const targetDay = MODULE_INJECTION_DAYS[idx];
    if (targetDay == null) return;
    const d = days[targetDay - 1];
    if (!d) return;
    const modId = moduleHabitId[mod];
    d.habitId = modId;
    // chainKey do módulo segue a corrente do hábito-módulo.
    d.chainKey = mod === "acucar" ? "corpo" : "espirito";
  });

  const seal = computeSeal(answers);
  const promise = quiz[6].options[answers.q7]?.promise ?? "equilibrio";

  // Diagnóstico montado.
  const hoursLine = HOURS_CELL[answers.q3] ?? "";
  const modLine =
    modules.length > 0
      ? ` O que mais te rouba: ${modules.map((m) => MODULE_LABEL[m]).join(", ")} — teu protocolo já mira nisso.`
      : "";
  const diagnosisText =
    `DECODIFICADO. Tua corrente dominante: ${CHAIN_LABEL[dominantChain]}. ` +
    `${PRISON_LINE[dominantChain]} ${hoursLine}` +
    `${modLine} Teu protocolo foi selado: 30 dias, começando pelo ${CHAIN_LABEL[dominantChain].toLowerCase()}. ` +
    `Não vai ser confortável. Vai ser livre.`;

  return {
    seal,
    dominantChain,
    diagnosisText,
    promise,
    modules,
    days,
  };
}
