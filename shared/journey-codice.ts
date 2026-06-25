// O Códice do Despertar — Jornada Guiada de 30 dias.
// Conteúdo derivado do ebook "O Códice do Despertar" (Plano de 30 dias, Cap 24).
// Dados puros (sem JSX). Tom: Rorschach / despertar cristão.

export type Chave = "corpo" | "mente" | "espirito";

export interface CodiceDay {
  /** Número do dia (1-30). */
  dia: number;
  /** Semana da jornada (1-4). */
  semana: number;
  /** Nome da fase exibido na home (ex.: "I — A Faxina"). */
  faseNome: string;
  /** Chave (corrente) trabalhada no dia. */
  chave: Chave;
  /** Título curto da missão (maiúsculo no app). */
  missaoTitulo: string;
  /** Texto curto da missão (1-2 frases, tom Rorschach). */
  missaoTexto: string;
  /** Texto maior da leitura do dia (capitular no app). */
  leitura: string;
}

/** Id único da jornada (uma só jornada neste app). */
export const JOURNEY_ID = "codice-30-dias";

/** Total de dias da travessia. */
export const TOTAL_DIAS = 30;

/** Metadados das 4 fases (semanas). */
export const fases = [
  { semana: 1, nome: "I — A Faxina", intervalo: "Dias 1–7" },
  { semana: 2, nome: "II — A Restauração", intervalo: "Dias 8–14" },
  { semana: 3, nome: "III — A Substituição", intervalo: "Dias 15–21" },
  { semana: 4, nome: "IV — O Foco Sustentável", intervalo: "Dias 22–30" },
] as const;

/** Metadados das 3 chaves (correntes). */
export const chaveInfo: Record<
  Chave,
  { nome: string; icone: string; intervalo: [number, number] }
> = {
  corpo: { nome: "Corpo", icone: "⚔️", intervalo: [1, 10] },
  mente: { nome: "Mente", icone: "🧠", intervalo: [11, 20] },
  espirito: { nome: "Espírito", icone: "🕯️", intervalo: [21, 30] },
};

export const codiceDays: CodiceDay[] = [
  // ============ SEMANA 1 — A FAXINA (1-7) · CORPO ============
  {
    dia: 1,
    semana: 1,
    faseNome: "I — A Faxina",
    chave: "corpo",
    missaoTitulo: "Encare o número",
    missaoTexto:
      "Hoje você não muda nada. Só mede. Anote seu tempo de tela de ontem. A verdade vem antes da cura.",
    leitura:
      "Nenhuma corrente cai enquanto você finge que não a sente. O primeiro ato de um homem que desperta não é lutar — é ver. Pegue o número exato: quantas horas de tela ontem. Sem desconto, sem desculpa. A caixa de Skinner social foi desenhada por engenheiros pagos para te manter rolando, e o vício foi projetado, não é falha de caráter. Mas o projeto só funciona no escuro. Quando você acende a luz e olha o número de frente, o feitiço começa a rachar. Anote. Esse número é o tamanho da sua prisão hoje — e o ponto de partida da travessia.",
  },
  {
    dia: 2,
    semana: 1,
    faseNome: "I — A Faxina",
    chave: "corpo",
    missaoTitulo: "Conte as vezes",
    missaoTexto:
      "Conte quantas vezes você pega o celular sem motivo. Não julgue. Registre. O reflexo precisa ser exposto.",
    leitura:
      "A mão vai ao bolso sozinha. No elevador, na fila, no segundo de silêncio. Não é vontade — é reflexo condicionado, exatamente como o rato de Skinner aperta a alavanca esperando o grão. Hoje sua missão é contar. Cada vez que a mão buscar a tela sem razão, faça um risco no papel. Você vai se assustar com o número. Bom. O susto é o despertar. Você não está quebrado; você foi treinado. E o que foi treinado pode ser destreinado — mas só depois que você enxerga o automatismo trabalhando contra você em tempo real.",
  },
  {
    dia: 3,
    semana: 1,
    faseNome: "I — A Faxina",
    chave: "corpo",
    missaoTitulo: "Os três ladrões",
    missaoTexto:
      "Identifique os 3 apps que mais roubam seu tempo. Olhe nos olhos do inimigo. Nomeie cada um.",
    leitura:
      "Todo ladrão depende do anonimato. Enquanto o vício não tem nome, ele governa. Hoje você abre o relatório de uso e nomeia os três apps que mais devoram suas horas. Não são entretenimento — são extratores. Cada toque seu vira dado, cada minuto vira lucro de alguém. Você é o produto sendo vendido enquanto pensa que está se distraindo de graça. Escreva os três nomes num papel. Olhe. Esses são os carcereiros que você convidou pra dentro de casa. Nos próximos dias você vai começar a despejá-los, um a um, com método e sem dó.",
  },
  {
    dia: 4,
    semana: 1,
    faseNome: "I — A Faxina",
    chave: "corpo",
    missaoTitulo: "Tela em cinza",
    missaoTexto:
      "Ative a escala de cinza no celular. A cor é a isca. Tire a isca e veja o anzol nu.",
    leitura:
      "As cores vivas dos ícones não estão ali por beleza. O vermelho do alerta, o azul do toque — tudo foi calibrado em laboratório para disparar dopamina no seu cérebro antes de você pensar. É manipulação química via pixel. Hoje você desliga isso: ative a escala de cinza nas configurações de acessibilidade. De repente o feed fica sem graça, e é exatamente esse o ponto. Sem a cor, você enxerga a máquina pelada: conteúdo medíocre embrulhado em estímulo de cassino. A faxina é tirar a maquiagem do veneno até que ele revele o gosto amargo que sempre teve.",
  },
  {
    dia: 5,
    semana: 1,
    faseNome: "I — A Faxina",
    chave: "corpo",
    missaoTitulo: "Mate as notificações",
    missaoTexto:
      "Desligue toda notificação que não venha de um ser humano de verdade. Silêncio é soberania.",
    leitura:
      "Cada notificação é uma coleira puxando seu pescoço. Ela não te informa — ela te comanda. Interrompe seu pensamento, sequestra sua atenção e te devolve ao feed sem que você tenha decidido voltar. Hoje você corta a coleira. Entre nas configurações e desligue tudo que não for mensagem direta de uma pessoa real. App não tem o direito de te chamar. A partir de hoje, é você quem decide quando abrir, não o algoritmo quem decide quando te puxar. Esse é o primeiro gosto de soberania: o silêncio do aparelho que parou de latir ordens.",
  },
  {
    dia: 6,
    semana: 1,
    faseNome: "I — A Faxina",
    chave: "corpo",
    missaoTitulo: "Limpe a tela inicial",
    missaoTexto:
      "Tire da primeira tela tudo que vicia. Atrito salva. Esconda o veneno em pastas e telas distantes.",
    leitura:
      "O desenho é proposital: os apps que mais viciam ficam à mão, no polegar, prontos no instinto. Eles vencem pela ausência de atrito. Então hoje você adiciona atrito. Tire os extratores da tela inicial, jogue-os para a terceira página, enterre-os em pastas. Cada segundo a mais que você leva pra abrir é um segundo em que a consciência acorda e pergunta: 'eu realmente quero isso?'. A liberdade muitas vezes não é força de vontade heroica — é arquitetura inteligente. Você não precisa vencer a tentação cem vezes ao dia; precisa apenas dificultar o caminho até ela.",
  },
  {
    dia: 7,
    semana: 1,
    faseNome: "I — A Faxina",
    chave: "corpo",
    missaoTitulo: "O quarto é zona livre",
    missaoTexto:
      "Hoje o carregador sai do quarto. O quarto é templo de descanso, não fliperama de madrugada.",
    leitura:
      "A última corrente da faxina é a mais íntima: o celular ao lado da cama. Ele rouba seu sono pela noite e sequestra seus primeiros minutos pela manhã. A luz azul mente para o seu corpo dizendo que ainda é dia, a testosterona despenca, o descanso vira raso. Hoje você tira o carregador do quarto e dorme com o aparelho longe. Compre um despertador de R$15 se precisar. O quarto volta a ser o que sempre deveria ter sido: um templo de descanso e restauração, não a sala de máquinas do vício. Você fechou a primeira semana. A faxina acabou — agora vem a cura.",
  },
  // ============ SEMANA 2 — A RESTAURAÇÃO (8-14) ============
  {
    dia: 8,
    semana: 2,
    faseNome: "II — A Restauração",
    chave: "corpo",
    missaoTitulo: "A caminhada sem coleira",
    missaoTexto:
      "Caminhe 20 minutos sem o celular. Só você e o mundo real. Deixe o aparelho em casa.",
    leitura:
      "Você esvaziou a cela; agora precisa reaprender a andar livre. A caminhada sem celular é o primeiro exercício do homem restaurado. Vinte minutos, sem fones, sem tela, sem trilha sonora algorítmica. Só seus passos, o ar e o mundo que estava ali o tempo todo enquanto você olhava para baixo. Vai ser estranho. A mão vai procurar o bolso vazio. Deixe procurar. É o sintoma da abstinência, e abstinência é prova de que o veneno está saindo. Caminhar sozinho com os próprios pensamentos é uma habilidade que você terceirizou para a tela. Hoje você começa a retomá-la.",
  },
  {
    dia: 9,
    semana: 2,
    faseNome: "II — A Restauração",
    chave: "corpo",
    missaoTitulo: "O sol primeiro",
    missaoTexto:
      "60 minutos sem tela ao acordar. Sol, água e Palavra — antes do feed. Decida o tom do dia.",
    leitura:
      "Quem ganha seus primeiros sessenta minutos ganha o seu dia inteiro. Se a primeira coisa que entra na sua mente é o feed, você terceirizou o leme da sua manhã para estranhos que lucram com sua ansiedade. Hoje você inverte a ordem. Ao acordar, nada de tela por uma hora. Tome sol na janela ou na rua — a luz natural regula seu corpo e sua mente melhor que qualquer aplicativo. Beba água. Abra a Palavra. Ore. Você está dizendo ao seu sistema nervoso quem manda. O dia que começa em silêncio e luz tem outra densidade — e você sente isso já na primeira hora.",
  },
  {
    dia: 10,
    semana: 2,
    faseNome: "II — A Restauração",
    chave: "corpo",
    missaoTitulo: "90 minutos de paz",
    missaoTexto:
      "90 minutos sem tela antes de dormir. Devolva ao seu corpo o sono que roubaram dele.",
    leitura:
      "O sono é o campo onde o corpo se reconstrói, e a tela é o que mais o destrói. A luz azul engana sua glândula pineal, a melatonina não sobe, e você passa anos dormindo mal achando que é normal. Hoje você devolve ao corpo o que é dele: 90 minutos sem tela antes de deitar. Leia um livro de papel, converse, ore, fique no silêncio. Vai parecer uma eternidade no começo — é o vício gritando. Mas o sono que vem depois é diferente: profundo, restaurador, o tipo que conserta a testosterona, o humor e a clareza. Você não está perdendo entretenimento. Está recuperando vitalidade.",
  },
  {
    dia: 11,
    semana: 2,
    faseNome: "II — A Restauração",
    chave: "mente",
    missaoTitulo: "Tolere o tédio",
    missaoTexto:
      "Hoje, na fila, no elevador, na espera — não saque o celular. Fique no tédio. É lá que a mente volta.",
    leitura:
      "O tédio não é seu inimigo; é o solo onde nascem as ideias, as orações e o autoconhecimento. Mas o vício te ensinou a fugir dele no primeiro segundo, preenchendo cada microvazio com scroll. Hoje você pratica o oposto: quando a espera chegar, não saque a tela. Fique. Sinta o desconforto. Deixe a mente vagar sem combustível externo. É treino, como musculação — no início dói, depois fortalece. A mente que sabe ficar parada sem pânico é uma mente livre. A que precisa de estímulo a cada quinze segundos é uma mente em cativeiro, mesmo que se ache entretida.",
  },
  {
    dia: 12,
    semana: 2,
    faseNome: "II — A Restauração",
    chave: "mente",
    missaoTitulo: "Dez minutos de silêncio",
    missaoTexto:
      "10 minutos de oração ou silêncio total. Treine a mente a não fugir. Sente-se e apenas esteja.",
    leitura:
      "Existe uma diferença entre ficar quieto e estar em paz. O homem moderno não consegue ficar dez minutos sozinho com a própria mente sem buscar uma distração — e isso deveria assustá-lo. Hoje você senta em silêncio ou em oração por dez minutos. Sem música, sem podcast, sem tela. Sua mente vai se rebelar, pular de pensamento em pensamento, inventar urgências. Deixe. Respire. Volte. Você está reconstruindo a capacidade de habitar o próprio interior. É ali, no silêncio que aprendemos a temer, que a voz de Deus e a sua própria voz finalmente conseguem ser ouvidas sobre o ruído.",
  },
  {
    dia: 13,
    semana: 2,
    faseNome: "II — A Restauração",
    chave: "mente",
    missaoTitulo: "O veneno saindo",
    missaoTexto:
      "Vai sentir falta da tela como falta de cigarro. Isso não é fracasso — é o sintoma da cura.",
    leitura:
      "Por volta de agora a abstinência aperta. Irritação, ansiedade, a mão indo ao bolso vazio, a sensação de que falta algo. Escute com atenção: isso não é recaída iminente, é o veneno saindo do organismo. O fumante que larga o cigarro sente exatamente isso, e ninguém diz que ele está piorando — está curando. A névoa começa a levantar entre a segunda e a quarta semana, e você está bem no meio da travessia. Ninguém atravessa o deserto correndo, e ninguém chega à Terra Prometida sem atravessá-lo. O desconforto de hoje é a prova de que você finalmente parou de adormecer.",
  },
  {
    dia: 14,
    semana: 2,
    faseNome: "II — A Restauração",
    chave: "mente",
    missaoTitulo: "Natureza",
    missaoTexto:
      "Coloque os pés na terra, na grama, no parque. O corpo lembra de onde veio. Reconecte.",
    leitura:
      "Fomos feitos do barro e desenhados para o sol, a terra e o verde — não para a luz fria de uma tela num quarto fechado. Hoje você busca a natureza de propósito. Um parque, uma praça, um quintal, um rio. Tire os sapatos se puder e sinta o chão. Olhe para algo que esteja longe, deixe os olhos descansarem da distância de um palmo a que o vício os condenou. O sistema nervoso se acalma perto da natureza de um jeito que nenhum app de meditação reproduz. Você fechou a segunda semana. O corpo está acordando, o sono está voltando, e a mente começa a clarear.",
  },
  // ============ SEMANA 3 — A SUBSTITUIÇÃO (15-21) ============
  {
    dia: 15,
    semana: 3,
    faseNome: "III — A Substituição",
    chave: "mente",
    missaoTitulo: "Preencha o vazio",
    missaoTexto:
      "O vazio que sobrou pede o real, senão volta pro feed. Escolha UMA coisa concreta pra fazer hoje.",
    leitura:
      "A natureza tem horror ao vácuo, e a alma também. Você esvaziou horas que antes o feed ocupava — e se não preencher esse espaço com algo real, a corrente volta sozinha, mais forte. A terceira semana é sobre substituição, não privação. Não basta 'parar de rolar o feed'; é preciso trocar o feed por uma vida. Hoje escolha uma única coisa concreta para colocar no lugar do scroll: um livro, um instrumento, um projeto, um exercício. Algo que construa em vez de consumir. O homem livre não vive de ausências; vive de presenças melhores. A pergunta deixa de ser 'o que eu corto?' e vira 'o que eu construo?'.",
  },
  {
    dia: 16,
    semana: 3,
    faseNome: "III — A Substituição",
    chave: "mente",
    missaoTitulo: "Ofício das mãos",
    missaoTexto:
      "Faça algo com as mãos. Conserte, construa, cozinhe, plante. Mãos ocupadas, mente livre.",
    leitura:
      "Existe uma sabedoria antiga no trabalho manual que a era digital quase apagou. Quando as mãos constroem algo real, a mente se aquieta e a alma encontra um tipo de satisfação que nenhuma curtida entrega. Hoje você faz algo com as mãos: conserte o que está quebrado, cozinhe do zero, plante, lixe, monte, escreva à mão. Não importa o ofício — importa criar matéria a partir do esforço. O homem que só consome se esvazia; o que produz se enche. Há dignidade em transformar o mundo com as próprias mãos, e essa dignidade é exatamente o que o vício de tela rouba sem que percebamos.",
  },
  {
    dia: 17,
    semana: 3,
    faseNome: "III — A Substituição",
    chave: "mente",
    missaoTitulo: "Olho no olho",
    missaoTexto:
      "Uma conversa real, presencial, sem celular na mesa. Reaprenda a presença. Esteja inteiro.",
    leitura:
      "Estamos hiperconectados e profundamente sós. Trocamos a conversa olho no olho por reações e emojis, e nos esquecemos do peso de estar inteiro diante de outra pessoa. Hoje você tem uma conversa real: presencial, com o celular fora de vista, sem o olhar fugindo para a tela a cada pausa. Ouça de verdade. Sustente o silêncio. Olhe nos olhos. A presença é uma forma de respeito que a era digital tornou rara e, por isso mesmo, poderosa. O isolamento foi parte do projeto que te adormeceu — porque homem sozinho é homem fácil de manter dormindo. Reatar laços reais é um ato de resistência.",
  },
  {
    dia: 18,
    semana: 3,
    faseNome: "III — A Substituição",
    chave: "mente",
    missaoTitulo: "Sirva alguém",
    missaoTexto:
      "Faça algo por outra pessoa hoje — sem postar, sem contar. O bem em silêncio é o que cura.",
    leitura:
      "O vício de tela vira o olhar para dentro: meu feed, minha imagem, minha dopamina. O remédio é virar o olhar para fora. Hoje você serve alguém sem plateia: ajude um vizinho, ligue para quem está só, faça um favor que ninguém vai ver nem aplaudir. O bem feito em silêncio não alimenta o ego — alimenta a alma. E há uma libertação enorme em fazer algo que não rende curtidas, que não vira conteúdo, que existe só pelo valor de existir. O homem que aprende a servir em segredo quebra a corrente mais sutil de todas: a necessidade de ser visto para sentir que vale.",
  },
  {
    dia: 19,
    semana: 3,
    faseNome: "III — A Substituição",
    chave: "mente",
    missaoTitulo: "As crenças instaladas",
    missaoTexto:
      "Capture um pensamento que te trava. Pergunte: essa verdade é minha — ou foi instalada em mim?",
    leitura:
      "Crença limitante é uma regra interna que trava antes mesmo de você tentar: 'não sirvo pra isso', 'sempre vai ser assim', 'gente como eu não consegue'. Ela trabalha em silêncio, e a mecânica é simples — pensamento vira crença, crença gera emoção, emoção dita o comportamento. O ângulo duro: muitas das suas 'verdades sobre si mesmo' não são suas; foram instaladas por um pai, um professor, uma humilhação, uma mídia. Desinstalar tem método. Capture o pensamento exato. Identifique a distorção. Interrogue: qual a evidência a favor e contra? A mente que você não examina foi programada por outros — e hoje você começa a reescrever o código.",
  },
  {
    dia: 20,
    semana: 3,
    faseNome: "III — A Substituição",
    chave: "mente",
    missaoTitulo: "Jejum de estímulo",
    missaoTexto:
      "1 a 2 horas hoje sem nenhum estímulo compulsivo. Jejum treina a vontade. Sinta a fome e não ceda.",
    leitura:
      "O jejum é uma das tecnologias espirituais mais antigas e mais esquecidas. Ele não serve só ao estômago — serve à vontade. Abster-se de propósito de algo que o corpo pede ensina a alma quem é que manda. Hoje você faz um jejum de estímulo: uma a duas horas sem nenhuma fonte de dopamina fácil. Sem feed, sem doce, sem nicotina, sem o atalho preferido para fugir do desconforto. Sinta a fome do estímulo e, conscientemente, não ceda. Cada vez que você diz 'não' ao impulso, fortalece o músculo da autodisciplina. E homem com vontade treinada é homem livre — porque já não é refém do próprio apetite.",
  },
  {
    dia: 21,
    semana: 3,
    faseNome: "III — A Substituição",
    chave: "espirito",
    missaoTitulo: "Troque o feed por uma vida",
    missaoTexto:
      "Não é só 'parar de rolar'. É construir algo grande o bastante pra você não precisar fugir pra tela.",
    leitura:
      "Aqui está a virada da terceira semana: ninguém abandona o feed por força de vontade pura — abandona porque encontrou algo melhor pra fazer com a própria vida. O scroll preenche o vazio de quem não tem um propósito grande o suficiente para puxá-lo de volta ao mundo real. Hoje você pensa grande: que vida vale a pena construir a ponto de tornar o feed irrelevante? Que missão, que vocação, que serviço? A liberdade definitiva não é resistir à tela para sempre com os dentes cerrados; é estar tão tomado por algo que importa que a tela perde a graça sozinha. Você fechou a substituição. Falta o foco — e o Espírito.",
  },
  // ============ SEMANA 4 — O FOCO SUSTENTÁVEL (22-30) ============
  {
    dia: 22,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "Bloco de foco",
    missaoTexto:
      "Escolha 1 tarefa. 45 minutos. Celular em outro cômodo. Foco profundo, sem interrupção.",
    leitura:
      "A capacidade de foco profundo é a habilidade mais rara e mais valiosa da nossa era — justamente porque a indústria da distração trabalha dia e noite para destruí-la. Hoje você a treina deliberadamente. Escolha uma tarefa que importe, ponha o celular em outro cômodo e trabalhe 45 minutos sem nenhuma interrupção. Quando a mente pedir uma fuga — e vai pedir —, respire e volte. O foco é músculo; ele atrofia com o scroll e cresce com a prática. Quem recupera a atenção profunda recupera o poder de criar, de aprender e de pensar até o fim — coisas impossíveis para uma mente fragmentada em mil notificações.",
  },
  {
    dia: 23,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "A armadura",
    missaoTexto:
      "Leia o Salmo 91. Vista a armadura antes de sair pra guerra do dia. Nenhum soldado sai nu.",
    leitura:
      "Nenhum soldado entra em batalha sem armadura, e cada dia é uma batalha por sua mente. Hoje você lê o Salmo 91 e o toma como couraça. 'Aquele que habita no esconderijo do Altíssimo descansará à sombra do Onipotente.' Não é poesia decorativa — é declaração de guerra espiritual. Você passou três semanas limpando correntes do corpo e da mente; agora reata com a fonte. A terceira corrente é a do espírito, e ela se rompe quando você para de viver órfão e volta a viver coberto. Vista a Palavra pela manhã como quem veste um colete. O homem que sai protegido enfrenta o dia de um lugar de força, não de medo.",
  },
  {
    dia: 24,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "Renovar a mente",
    missaoTexto:
      "Substitua uma mentira que você crê por uma verdade das Escrituras. Reprograme a raiz.",
    leitura:
      "'Transformai-vos pela renovação da vossa mente.' A reprogramação não termina em técnica de terapia cognitiva — ela se completa na verdade que você escolhe plantar no lugar da mentira arrancada. Hoje você pega uma das crenças instaladas que identificou e a confronta com o que as Escrituras dizem sobre quem você é. Onde a mentira diz 'você não presta', a verdade responde com identidade de filho. Onde diz 'sempre será assim', a verdade fala de redenção e novidade de vida. Não basta esvaziar a mente do veneno; é preciso enchê-la de verdade, senão o vazio é recolonizado. Renovar a mente é trocar o sistema operacional, não só fechar um aplicativo.",
  },
  {
    dia: 25,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "Escravo ou filho",
    missaoTexto:
      "Você age como escravo do medo ou como filho? Hoje, escolha conscientemente a identidade de filho.",
    leitura:
      "O escravo trabalha por medo do castigo; o filho age por amor e pertencimento. A maioria dos homens vive escravizada sem saber — escrava da aprovação, do medo, do vício, da opinião alheia — e chama isso de vida normal. Hoje você examina de que lugar está vivendo. Suas escolhas vêm do pânico de não ser suficiente ou da segurança de quem sabe a quem pertence? 'Não recebestes o espírito de escravidão para outra vez estardes em temor, mas recebestes o espírito de adoção de filhos.' Trocar a identidade muda tudo: o filho não precisa provar valor a cada toque de tela, porque o valor dele já está garantido por quem o gerou.",
  },
  {
    dia: 26,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "O perdão que liberta",
    missaoTexto:
      "Perdoe alguém — inclusive você mesmo. Mágoa é corrente. Soltar o outro é soltar a si.",
    leitura:
      "Há correntes que não vêm de telas, mas de feridas. A mágoa que você carrega não pune quem te machucou — pune você, todos os dias, em silêncio. O perdão não é dizer que o que fizeram foi certo; é recusar-se a continuar acorrentado ao que aconteceu. Hoje você perdoa: alguém que te marcou, e talvez o mais difícil de todos, você mesmo. Solte o peso que você arrasta há anos achando que era justiça. Quem não perdoa bebe veneno esperando o outro morrer. A travessia para a liberdade passa por aqui — porque um homem cheio de ressentimento ainda está preso, mesmo que tenha largado todos os vícios.",
  },
  {
    dia: 27,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "As três perguntas",
    missaoTexto:
      "Antes de reinstalar qualquer app: serve ao que valorizo? É a melhor forma? Tenho regra clara? Falhou numa = fora.",
    leitura:
      "Você não vai viver numa caverna sem tecnologia — vai voltar a usá-la, mas agora como senhor, não como servo. A reintrodução exige um filtro brutal. Antes de trazer de volta qualquer ferramenta, passe-a por três perguntas: ela serve a algo que eu valorizo de verdade? É a melhor forma de servir a isso? Tenho uma regra clara de quando e como vou usá-la? Falhou em uma só das três, fica de fora. Esse é o critério do homem soberano: a tecnologia entra na vida dele a convite, com função definida e limites desenhados — nunca mais como inquilina que toma a casa inteira e dita as regras.",
  },
  {
    dia: 28,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "A regra clara",
    missaoTexto:
      "Defina QUANDO e COMO você usa cada ferramenta. Sem regra escrita, é a ferramenta que te usa.",
    leitura:
      "Boas intenções não sobrevivem ao contato com a tentação; só regras claras sobrevivem. Hoje você escreve as suas. Para cada ferramenta que ficou, defina horário, lugar e limite: redes só depois das tarefas e por tempo marcado, celular fora das refeições e do quarto, e-mail em janelas específicas. Coloque no papel, porque o que não é escrito é renegociado no calor do impulso — e no calor do impulso o vício sempre vence o argumento. O homem livre não improvisa o autocontrole todo dia; ele decide uma vez, com a mente fria, e depois apenas obedece à própria lei. A regra clara é a cerca que protege a liberdade conquistada.",
  },
  {
    dia: 29,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "Revisão da travessia",
    missaoTexto:
      "15 minutos olhando pra trás. O que mudou em 29 dias? O que ainda te escraviza? Anote.",
    leitura:
      "Quase no fim do deserto, o homem sábio para e olha para trás. Hoje você dedica quinze minutos a revisar a travessia inteira. Compare o homem do dia 1 com o de agora: o sono, o foco, a ansiedade, o tempo de tela, a paz. Escreva o que mudou — e seja honesto sobre o que ainda escraviza, porque negar a corrente que resta é o caminho de volta à cela. Essa revisão não é vaidade; é estratégia. A liberdade não é um estado que se conquista uma vez e se mantém sozinho — é uma vigilância que se renova. Saber exatamente onde você está é o que permite continuar avançando depois que a jornada de 30 dias terminar.",
  },
  {
    dia: 30,
    semana: 4,
    faseNome: "IV — O Foco Sustentável",
    chave: "espirito",
    missaoTitulo: "A porta tem um Nome",
    missaoTexto:
      "Trinta dias. Você atravessou o deserto. A liberdade sempre teve um Nome: Jesus. Romanos 13:12.",
    leitura:
      "Eles construíram uma prisão sem grades e te convenceram de que era liberdade. Durante trinta dias você fez o caminho contrário: encarou o número, cortou as correntes, atravessou a abstinência, preencheu o vazio com vida real e reatou com a fonte. A pílula vermelha sempre teve o formato de uma decisão simples e brutal — largar o que te adormece. Mas a travessia não foi só sobre hábitos; foi sobre acordar. E a porta para a liberdade definitiva tem um Nome: Jesus. Ela está aberta — mas não para sempre. 'A noite é passada, e o dia é chegado; rejeitemos, pois, as obras das trevas e vistamo-nos das armas da luz.' Acorda. Você atravessou o deserto. Agora viva como homem livre.",
  },
];

/** Retorna o dia da jornada (1-30); faz clamp nos limites. */
export function getCodiceDay(dia: number): CodiceDay {
  const idx = Math.min(Math.max(dia, 1), TOTAL_DIAS) - 1;
  return codiceDays[idx];
}

/** Progresso de uma chave (dias concluídos / total) com base no dia atual. */
export function chaveProgress(chave: Chave, currentDay: number) {
  const [ini, fim] = chaveInfo[chave].intervalo;
  const total = fim - ini + 1;
  // Dias anteriores ao atual são considerados concluídos.
  const done = Math.min(Math.max(currentDay - ini, 0), total);
  const locked = currentDay < ini;
  return { done, total, locked, pct: Math.round((done / total) * 100) };
}
