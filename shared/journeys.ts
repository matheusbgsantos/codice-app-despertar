// Jornadas guiadas de 30 dias (Épico 3) — dados puros (sem JSX).
// Cada trilha referencia frequências do catálogo (shared/frequencies.ts) por id.
// O ícone é referenciado por nome (iconName) e mapeado no client via getIcon().

export interface JourneyDay {
  /** Número do dia (1-30). */
  day: number;
  /** id da frequência do catálogo a ser usada neste dia. */
  frequencyId: string;
  /** Micro-frase mística (PT-BR) que guia a intenção do dia. */
  focusText: string;
}

export interface JourneyData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  /**
   * Áudio PRÓPRIO da jornada (1 único áudio que se repete nos 30 dias).
   * É um contexto de áudio SEPARADO da Biblioteca: quando o usuário toca
   * o dia DENTRO da trilha, toca esta URL — e NÃO os áudios da frequência
   * (audioUrlAmbiente/audioUrlPuro) usados na Biblioteca.
   * Deixe "" enquanto o dono não subir o arquivo: o app lida graciosamente
   * (mostra "áudio em breve" e ainda permite concluir o dia).
   */
  audioUrl: string;
  /**
   * Capa da jornada (imagem em client/public/covers). Usa a frequência
   * representativa da trilha. Acessível em runtime via este caminho.
   */
  coverImage: string;
  /** Número total de dias (sempre 30). */
  totalDays: number;
  days: JourneyDay[];
}

/**
 * Helper interno: monta os 30 dias alternando uma lista de frequências
 * e associando a cada dia uma micro-frase mística (focusText).
 */
function buildDays(pattern: string[], phrases: string[]): JourneyDay[] {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    frequencyId: pattern[i % pattern.length],
    focusText: phrases[i] ?? phrases[i % phrases.length],
  }));
}

// ---------------------------------------------------------------------------
// 1) JORNADA DA CALMA (Ansiedade) — alterna escudo / libertacao / sono
//    Progressão: começa com escudo (tem áudio), depois libertação e sono.
// ---------------------------------------------------------------------------
const calmaPattern = [
  "escudo", "escudo", "libertacao", "sono",
  "escudo", "libertacao", "sono",
];
const calmaPhrases = [
  "Hoje você ergue o primeiro escudo contra o medo.",
  "Respire fundo: a ansiedade não manda mais em você.",
  "Solte a culpa antiga que pesava em seus ombros.",
  "Permita ao corpo descansar — o sono também cura.",
  "Sinta o campo protetor se firmar ao seu redor.",
  "Liberte o que te prendia e abra espaço para o novo.",
  "Adormeça em paz, embalado pela própria serenidade.",
  "A calma vira hábito — note como reage diferente.",
  "O escudo agora é parte de você, invisível e firme.",
  "Deixe o medo passar como nuvem no céu interior.",
  "Cada noite restaura o que o dia desgastou.",
  "Você percebe: o que te tirava do sério agora é pequeno.",
  "Sua respiração é âncora — volte a ela sempre.",
  "Liberte tensões guardadas no peito e no ventre.",
  "O descanso profundo reorganiza sua mente.",
  "A serenidade começa a transbordar para os outros.",
  "Você pausa antes de reagir — eis a sua força.",
  "Solte o peso invisível que carregava há anos.",
  "Durma como quem confia plenamente na vida.",
  "Metade da jornada: a calma já é seu novo chão.",
  "O medo virou conselheiro, não mais carcereiro.",
  "Liberte-se de toda culpa que não te pertence.",
  "Seu sono é santuário — entregue-se a ele.",
  "Você habita o presente com leveza e firmeza.",
  "Nada externo abala o centro que você construiu.",
  "Coragem serena: este é o seu novo padrão.",
  "Repouse sabendo que fez o suficiente hoje.",
  "Sua presença acalma os ambientes por onde passa.",
  "Quase lá: a paz interior virou sua natureza.",
  "Você é, enfim, o porto seguro de si mesmo.",
];

// ---------------------------------------------------------------------------
// 2) JORNADA DA PROSPERIDADE — chave-mestra / abundancia / intuicao
// ---------------------------------------------------------------------------
const prosperidadePattern = [
  "chave-mestra", "abundancia", "intuicao",
  "chave-mestra", "abundancia",
];
const prosperidadePhrases = [
  "Abra o portal: a prosperidade começa por dentro.",
  "Há o bastante para você — sinta a fartura chegar.",
  "Confie na intuição que aponta o próximo passo.",
  "Defina sua intenção e deixe o universo responder.",
  "Receba de palmas abertas tudo o que é seu por direito.",
  "Sua mente se reprograma para a abundância.",
  "As sincronicidades começam a falar com você.",
  "Visualize a meta como se já fosse realidade.",
  "O dinheiro flui por canais que você nem imaginava.",
  "Escute o saber silencioso antes de decidir.",
  "Você se torna um ímã para boas oportunidades.",
  "Gratidão antecipada acelera o que está por vir.",
  "A escassez perde força diante da sua certeza.",
  "Sua presença atrai pessoas e recursos certos.",
  "Metade do caminho: a fartura já é seu estado.",
  "Intuição aguçada: você sente o caminho antes de vê-lo.",
  "Abra-se para receber em todas as áreas da vida.",
  "Cada visualização planta uma semente de riqueza.",
  "O universo conspira generosamente a seu favor.",
  "Note as portas que se abrem sem esforço.",
  "Você opera com uma vantagem invisível e serena.",
  "A prosperidade transborda de você para os outros.",
  "Sua intuição virou seu maior ativo.",
  "Confie no fluxo: ele sabe o caminho mais curto.",
  "Riqueza é também leveza — carregue-a com graça.",
  "Você reconhece as oportunidades disfarçadas.",
  "A fartura responde à sua frequência elevada.",
  "Tudo o que é seu encontra o caminho até você.",
  "Quase lá: você é canal vivo de abundância.",
  "Prosperidade plena: dentro e fora, em fluxo constante.",
];

// ---------------------------------------------------------------------------
// 3) JORNADA DA CURA — regeneracao / raiz / renovacao
// ---------------------------------------------------------------------------
const curaPattern = [
  "regeneracao", "raiz", "renovacao",
  "regeneracao", "renovacao",
];
const curaPhrases = [
  "Cada célula recebe hoje a mensagem de cura.",
  "Ancore-se: é seguro relaxar e se curar.",
  "Seu corpo lembra de sua forma original e perfeita.",
  "Reset celular: o cansaço antigo se dissolve.",
  "A renovação começa silenciosa, mas é real.",
  "Dores crônicas perdem força diante da regeneração.",
  "Sinta o chão firme sob seus pés outra vez.",
  "Tecidos se reorganizam enquanto você descansa.",
  "A vitalidade de tempos atrás começa a voltar.",
  "Seu corpo confia que é seguro se restaurar.",
  "Inflamações cedem ao calor restaurador.",
  "Você habita seu corpo como um lar acolhedor.",
  "Cada inspiração leva cura ao que precisa.",
  "Metade da jornada: você se sente mais inteiro.",
  "A energia presa na dor agora circula livre.",
  "Regeneração ativa: recuperação em dobro.",
  "Segurança profunda assenta-se em seus ossos.",
  "Pele e tecidos refletem a renovação interior.",
  "Você se cura com mais facilidade a cada dia.",
  "O alicerce do seu corpo está firme e seguro.",
  "A renovação chega aos campos sutis ao seu redor.",
  "Vitalidade restaurada: note sua nova disposição.",
  "Seu organismo opera em modo de autocura.",
  "A relação com a dor se transforma em cuidado.",
  "Você irradia saúde — e os outros percebem.",
  "Reconstrução contínua: célula após célula.",
  "Segunda juventude: o corpo responde grato.",
  "Integridade restaurada por dentro e por fora.",
  "Quase lá: você é alicerce firme de si mesmo.",
  "Cura completa: máquina viva de regeneração.",
];

// ---------------------------------------------------------------------------
// 4) JORNADA DO RECOMEÇO (Tristeza) — mudanca / coracao / escudo
// ---------------------------------------------------------------------------
const recomecoPattern = [
  "mudanca", "coracao", "escudo",
  "mudanca", "coracao",
];
const recomecoPhrases = [
  "A maré começa a reorganizar o que estava parado.",
  "Aqueça o coração fechado pela mágoa.",
  "Erga um escudo gentil enquanto se transforma.",
  "Deixe o velho ir — há espaço para o novo.",
  "Perdoe alguém hoje, inclusive você mesmo.",
  "Você está protegido enquanto recomeça.",
  "Traumas antigos perdem o peso que tinham.",
  "Reconecte-se com quem ama, com menos defesas.",
  "Firmeza e ternura caminham juntas em você.",
  "Solte hábitos e relações que não servem mais.",
  "O nó no peito começa, enfim, a se desfazer.",
  "Você se sente seguro para sentir o que sente.",
  "A mudança deixa de assustar e passa a animar.",
  "Metade do caminho: você troca de pele.",
  "Seu coração se reabre para o amor verdadeiro.",
  "O passado vira história, não mais prisão.",
  "Empatia substitui a cobrança nas relações.",
  "Você surfa as ondas que antes te derrubavam.",
  "Ternura inesperada brota por você mesmo.",
  "O escudo te protege sem te isolar.",
  "Situações cristalizadas se dissolvem suaves.",
  "Amar sem medo: você encontra segurança dentro.",
  "Você é agente da própria transformação.",
  "A tristeza dá lugar a um recomeço sereno.",
  "Seu peito aquece e cura quem se aproxima.",
  "Você se reconhece renovado, em movimento.",
  "Mágoas viram compaixão, peso vira leveza.",
  "Coragem serena guia cada novo passo.",
  "Quase lá: o novo flui livremente em você.",
  "Recomeço pleno: coração aberto, vida em frente.",
];

// ---------------------------------------------------------------------------
// 5) JORNADA DO DESPERTAR (Espiritualidade) — intuicao / despertar / chave-mestra
// ---------------------------------------------------------------------------
const despertarPattern = [
  "intuicao", "despertar", "chave-mestra",
  "intuicao", "despertar",
];
const despertarPhrases = [
  "Um olho interior começa, enfim, a se abrir.",
  "Limpe a névoa: sua voz verdadeira desperta.",
  "Conecte-se à Fonte — a porta interior se abre.",
  "Confie na sabedoria silenciosa que vem de dentro.",
  "Dissolva o que é denso e abafa quem você é.",
  "Defina uma intenção clara e escute a resposta.",
  "Sinais e sincronicidades começam a aparecer.",
  "Sua percepção vai além das aparências.",
  "Diga sua verdade com clareza e elegância.",
  "Insights chegam sobre situações travadas.",
  "Você 'sabe' coisas antes mesmo de acontecerem.",
  "A mente se aquieta e fica mais perceptiva.",
  "Padrões mentais tóxicos se desfazem em luz.",
  "Metade do caminho: sua intuição é bússola.",
  "O terceiro olho desperta com suavidade.",
  "Sua expressão se torna instrumento autêntico.",
  "Você navega a vida alinhado a algo maior.",
  "Sonhos ficam nítidos e cheios de símbolos.",
  "As ilusões perdem o poder de te enganar.",
  "Você é canal límpido entre o sentir e o manifestar.",
  "Sincronicidades viram seu cotidiano.",
  "Serenidade profunda irradia da sua presença.",
  "A clareza interior guia suas decisões.",
  "Você reconhece a verdade por trás dos véus.",
  "Intuição e razão trabalham juntas em você.",
  "Sua voz inspira, esclarece e transforma.",
  "Você se sente parte de algo infinitamente maior.",
  "O despertar se assenta como novo estado.",
  "Quase lá: visão interior desperta e plena.",
  "Despertar completo: alinhado à ordem espiritual.",
];

// ---------------------------------------------------------------------------
// 6) JORNADA DA LIBERTAÇÃO (Medo e Culpa) — libertacao / escudo / mudanca / sono
//    Progressão: libertar do medo -> proteger -> transmutar -> descansar.
// ---------------------------------------------------------------------------
const libertacaoPattern = [
  "libertacao", "libertacao", "escudo", "mudanca",
  "libertacao", "sono",
];
const libertacaoPhrases = [
  "Hoje você reconhece as correntes invisíveis que te prendem.",
  "Nomeie o medo: o que tem nome perde poder sobre você.",
  "Ergue-se o escudo enquanto você se desfaz dos pesos antigos.",
  "Deixe a velha culpa se dissolver como névoa ao amanhecer.",
  "Sinta as raízes te ancorarem firmes na terra.",
  "Adormeça soltando o que carregou o dia inteiro.",
  "O peso no peito começa, enfim, a ceder.",
  "Você percebe: o medo era apenas uma sombra, não muralha.",
  "Solte a culpa que nunca foi sua para carregar.",
  "Cada respiração afrouxa um pouco mais as amarras.",
  "O campo protetor se firma — você está seguro para soltar.",
  "Transmute a dor antiga em sabedoria silenciosa.",
  "Hoje você pisa firme onde antes hesitava.",
  "Liberte o ventre e o peito das tensões guardadas.",
  "Metade da jornada: as correntes já estão frouxas.",
  "O medo virou conselheiro discreto, não mais carcereiro.",
  "Você se perdoa por capítulos que já se fecharam.",
  "Descanse sabendo que nada mais te aprisiona à noite.",
  "A coragem serena começa a ser seu novo padrão.",
  "Solte a autossabotagem que se vestia de proteção.",
  "Você age a partir do desejo, não mais do medo.",
  "O que travava seus passos agora flui como rio livre.",
  "Sua presença firme já não pede permissão para existir.",
  "Liberte-se das vozes que diziam que você não podia.",
  "O sono profundo sela cada libertação do dia.",
  "Você caminha sem o freio invisível que sempre te segurou.",
  "A raiz do seu ser começa, finalmente, a descansar em paz.",
  "Você liberta os outros só de existir mais leve.",
  "Quase lá: medo e culpa já não têm endereço em você.",
  "Libertação plena: você é, enfim, dono das próprias escolhas.",
];

export const journeyData: Record<string, JourneyData> = {
  "jornada-calma": {
    id: "jornada-calma",
    title: "Jornada da Calma",
    subtitle: "30 dias contra a ansiedade",
    description:
      "Trinta dias para dissolver a ansiedade e o medo. Você alterna o ESCUDO protetor, a LIBERTAÇÃO da culpa e o SONO profundo, construindo, dia após dia, uma serenidade que vira seu novo chão.",
    iconName: "Shield",
    // Áudio próprio da jornada (placeholder — o dono sobe depois). Capa: escudo.
    audioUrl: "/audio/jornada-calma.mp3",
    coverImage: "/covers/escudo.png",
    totalDays: 30,
    days: buildDays(calmaPattern, calmaPhrases),
  },
  "jornada-prosperidade": {
    id: "jornada-prosperidade",
    title: "Jornada da Prosperidade",
    subtitle: "30 dias de abundância",
    description:
      "Trinta dias para reprogramar sua mente da escassez para a fartura. Com a CHAVE MESTRA, a ABUNDÂNCIA e a INTUIÇÃO, você se sintoniza com o fluxo da prosperidade e se torna um ímã para oportunidades.",
    iconName: "Coins",
    // Áudio próprio da jornada (placeholder — o dono sobe depois). Capa: abundancia.
    audioUrl: "/audio/jornada-prosperidade.mp3",
    coverImage: "/covers/abundancia.png",
    totalDays: 30,
    days: buildDays(prosperidadePattern, prosperidadePhrases),
  },
  "jornada-cura": {
    id: "jornada-cura",
    title: "Jornada da Cura",
    subtitle: "30 dias de regeneração",
    description:
      "Trinta dias para regenerar corpo e energia. A REGENERAÇÃO celular, a RAIZ que ancora e alivia, e a RENOVAÇÃO dos tecidos guiam seu organismo de volta à sua forma original e saudável.",
    iconName: "Leaf",
    // Áudio próprio da jornada (placeholder — o dono sobe depois). Capa: regeneracao.
    audioUrl: "/audio/jornada-cura.mp3",
    coverImage: "/covers/regeneracao.png",
    totalDays: 30,
    days: buildDays(curaPattern, curaPhrases),
  },
  "jornada-recomeco": {
    id: "jornada-recomeco",
    title: "Jornada do Recomeço",
    subtitle: "30 dias para virar a página",
    description:
      "Trinta dias para atravessar a tristeza e recomeçar. A MUDANÇA que limpa traumas, o CORAÇÃO que se reabre e o ESCUDO que protege acompanham você na travessia até um novo capítulo.",
    iconName: "RefreshCw",
    // Áudio próprio da jornada (placeholder — o dono sobe depois). Capa: coracao.
    audioUrl: "/audio/jornada-recomeco.mp3",
    coverImage: "/covers/coracao.png",
    totalDays: 30,
    days: buildDays(recomecoPattern, recomecoPhrases),
  },
  "jornada-despertar": {
    id: "jornada-despertar",
    title: "Jornada do Despertar",
    subtitle: "30 dias de consciência",
    description:
      "Trinta dias para despertar a percepção espiritual. A INTUIÇÃO que enxerga além, o DESPERTAR que limpa e liberta a voz, e a CHAVE MESTRA que conecta à Fonte elevam sua consciência acima do ruído.",
    iconName: "Sparkles",
    // Áudio próprio da jornada (placeholder — o dono sobe depois). Capa: despertar.
    audioUrl: "/audio/jornada-despertar.mp3",
    coverImage: "/covers/despertar.png",
    totalDays: 30,
    days: buildDays(despertarPattern, despertarPhrases),
  },
  "jornada-libertacao": {
    id: "jornada-libertacao",
    title: "Jornada da Libertação",
    subtitle: "Liberte-se do medo e da culpa",
    description:
      "Trinta dias para romper as correntes invisíveis do medo e da culpa. Com a LIBERTAÇÃO que dissolve as amarras, o ESCUDO que protege, a MUDANÇA que transmuta e o SONO que sela cada cura, você troca o peso antigo por uma coragem serena que vira seu novo chão.",
    iconName: "Unlock",
    // Áudio próprio da jornada. Capa: libertacao.
    audioUrl: "/audio/jornada-libertacao.mp3",
    coverImage: "/covers/libertacao.png",
    totalDays: 30,
    days: buildDays(libertacaoPattern, libertacaoPhrases),
  },
};

/** Ordem de exibição das jornadas na tela de lista. */
export const journeyOrder: string[] = [
  "jornada-calma",
  "jornada-prosperidade",
  "jornada-cura",
  "jornada-recomeco",
  "jornada-despertar",
  "jornada-libertacao",
];

export function getJourney(id: string): JourneyData | undefined {
  return journeyData[id];
}
