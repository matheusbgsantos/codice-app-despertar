// O CÓDICE — Quiz de Decodificação (7 perguntas).
// Estrutura conforme ESTRUTURA-DESAFIO-30D.md (Q1-Q7).
// Cada opção carrega pesos para corpo/mente/espírito, opcionalmente um módulo
// (Q5) e/ou uma dica de intensidade (Q3/Q6). Q5 é multi-seleção, Q7 é a promessa.
// Dados puros — consumidos por protocol-engine.ts.

import type { ChainKey, Intensity } from "./habits";

/** Pesos de uma opção sobre as 3 correntes. */
export interface Weights {
  corpo: number;
  mente: number;
  espirito: number;
}

/** Módulos especiais que a Q5 pode injetar. */
export type ModuleTag = "porn" | "acucar" | "isolamento";

/** Promessa escolhida na Q7 (frase-promessa repetida no app). */
export type Promise = "corpo" | "mente" | "espirito" | "equilibrio";

export interface QuizOption {
  /** Texto exibido (tom Códice). */
  label: string;
  /** Pesos somados ao escolher. */
  weights: Weights;
  /** Tag de módulo especial (apenas Q5). */
  module?: ModuleTag;
  /** Dica de intensidade física/mental (Q3/Q6). */
  intensity?: Intensity;
  /** Promessa associada (apenas Q7). */
  promise?: Promise;
}

export interface QuizQuestion {
  /** Id estável (q1..q7). */
  id: "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7";
  /** Enunciado (Oswald maiúsculo no app). */
  prompt: string;
  /** Opções de resposta. */
  options: QuizOption[];
  /** true = pode marcar mais de uma (Q5). */
  multi?: boolean;
}

const w = (corpo = 0, mente = 0, espirito = 0): Weights => ({ corpo, mente, espirito });

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "Como você acorda?",
    options: [
      { label: "Já cansado, como se não tivesse dormido", weights: w(1, 0, 0) },
      { label: "Com um aperto no peito, ansioso", weights: w(0, 1, 1) },
      { label: "Já pego o celular antes de levantar", weights: w(0, 1, 0) },
      { label: "Sem vontade de nada", weights: w(0, 0, 1) },
    ],
  },
  {
    id: "q2",
    prompt: "Qual corrente você sente mais forte HOJE?",
    options: [
      { label: "Meu corpo falhou: sem energia, sem força", weights: w(2, 0, 0) },
      { label: "Minha mente: disperso, não foco, ansioso", weights: w(0, 2, 0) },
      { label: "Meu espírito: vazio, sem fé, sem rumo", weights: w(0, 0, 2) },
    ],
  },
  {
    id: "q3",
    prompt: "Quantas horas no celular por dia?",
    options: [
      { label: "Menos de 3", weights: w(0, 0, 0), intensity: 1 },
      { label: "3 a 6", weights: w(0, 1, 0), intensity: 1 },
      { label: "6 a 9", weights: w(0, 1, 0), intensity: 2 },
      { label: "Mais de 9", weights: w(0, 2, 0), intensity: 3 },
    ],
  },
  {
    id: "q4",
    prompt: "Sua fé hoje está...",
    options: [
      { label: "Firme, mas quero mais", weights: w(0, 0, 1) },
      { label: "Morna, esfriou", weights: w(0, 0, 2) },
      { label: "Perdi / nunca tive", weights: w(0, 0, 3) },
    ],
  },
  {
    id: "q5",
    prompt: "O que mais te rouba? (pode marcar mais de um)",
    multi: true,
    options: [
      { label: "Pornografia", weights: w(1, 0, 1), module: "porn" },
      { label: "Redes sociais / scroll", weights: w(0, 1, 0) },
      { label: "Notícias / caos do mundo", weights: w(0, 1, 0) },
      { label: "Açúcar / comida ruim", weights: w(1, 0, 0), module: "acucar" },
      {
        label: "Isolamento / só quero ficar sozinho",
        weights: w(0, 0, 1),
        module: "isolamento",
      },
    ],
  },
  {
    id: "q6",
    prompt: "Você move o corpo (treino/caminhada)?",
    options: [
      { label: "Sim, sempre", weights: w(0, 0, 0), intensity: 3 },
      { label: "Às vezes", weights: w(1, 0, 0), intensity: 2 },
      { label: "Quase nunca", weights: w(1, 0, 0), intensity: 1 },
    ],
  },
  {
    id: "q7",
    prompt: "O que você quer DE VOLTA?",
    options: [
      { label: "Energia e virilidade", weights: w(1, 0, 0), promise: "corpo" },
      { label: "Foco e clareza", weights: w(0, 1, 0), promise: "mente" },
      { label: "Paz e propósito", weights: w(0, 0, 1), promise: "espirito" },
      { label: "Tudo. Quero acordar.", weights: w(1, 1, 1), promise: "equilibrio" },
    ],
  },
];

/** Mapa de módulo (Q5) → corrente afetada (para diagnóstico/log). */
export const moduleChain: Record<ModuleTag, ChainKey> = {
  porn: "espirito",
  acucar: "corpo",
  isolamento: "espirito",
};

/** Mapa de tag de módulo → id do hábito-módulo correspondente. */
export const moduleHabitId: Record<ModuleTag, "MOD-PORN" | "MOD-ACUCAR" | "MOD-ISOLAMENTO"> = {
  porn: "MOD-PORN",
  acucar: "MOD-ACUCAR",
  isolamento: "MOD-ISOLAMENTO",
};

export const TOTAL_QUESTIONS = quiz.length;
