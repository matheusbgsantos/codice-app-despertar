// PROVAS — dossiês desclassificados (acervo do Códice).
// Conteúdo seed estático.

export interface Prova {
  /** Emoji/ícone. */
  icone: string;
  /** Título em maiúsculo. */
  titulo: string;
  /** Subtítulo. */
  subtitulo: string;
  /** Bloqueado (acervo crescendo). */
  bloqueado?: boolean;
}

export const provas: Prova[] = [
  {
    icone: "🛸",
    titulo: "UAP / Pentágono",
    subtitulo: "o que foram obrigados a admitir",
  },
  {
    icone: "💳",
    titulo: "DREX × Apocalipse 13",
    subtitulo: "a moeda cruzada com o texto",
  },
  {
    icone: "🧊",
    titulo: "KGB — 4 Estágios",
    subtitulo: "o manual pra desmoralizar uma nação",
  },
  {
    icone: "👁",
    titulo: "Os Vigilantes",
    subtitulo: "Gênesis 6 + Neuralink",
  },
  {
    icone: "🔒",
    titulo: "+ acervo crescendo",
    subtitulo: "novos dossiês toda semana",
    bloqueado: true,
  },
];
