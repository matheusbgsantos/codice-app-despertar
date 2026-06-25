// SINAIS — "transmissões" (notícias decodificadas no tom do Códice).
// Conteúdo seed estático. A automação de notícia diária vem depois.

export interface Sinal {
  /** Número da transmissão (#). */
  numero: number;
  /** Tempo relativo de publicação. */
  tempo: string;
  /** Título em maiúsculo. */
  titulo: string;
  /** Parágrafo de corpo. */
  texto: string;
  /** Quantos "viram". */
  viram: number;
  /** Quantos "despertos". */
  despertos: number;
}

export const sinais: Sinal[] = [
  {
    numero: 142,
    tempo: "há 2h",
    titulo: 'Eles chamaram de "atualização". Era uma coleira.',
    texto:
      'Saiu hoje: o novo recurso que "facilita sua vida" lê 4x mais do que você imagina. Ninguém leu os termos. Você não precisa. Seu corpo já sabe.',
    viram: 2341,
    despertos: 489,
  },
  {
    numero: 141,
    tempo: "ontem",
    titulo: "A notícia que sumiu do feed em 6 horas",
    texto:
      "Cruzei a manchete com o que estava no Códice há semanas. O padrão não é coincidência. Cava você mesmo — antes que apaguem de novo.",
    viram: 3108,
    despertos: 712,
  },
  {
    numero: 140,
    tempo: "há 2 dias",
    titulo: "Pagamento por aproximação agora dispensa a senha",
    texto:
      "Cada barreira que cai é vendida como conforto. Primeiro a senha, depois o cartão, depois a digital. A pergunta nunca é o que você ganha. É o que eles passam a ver.",
    viram: 1894,
    despertos: 401,
  },
  {
    numero: 139,
    tempo: "há 3 dias",
    titulo: "Estudo admite: o scroll altera o sono de homens jovens",
    texto:
      "O que o Códice chamou de veneno, a ciência agora chama de dado. Testosterona em queda, foco em frangalhos. Não é fraqueza sua. É design — e tem saída.",
    viram: 2576,
    despertos: 633,
  },
];
