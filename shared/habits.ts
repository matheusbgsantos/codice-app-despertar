// O CÓDICE DO DESPERTAR — Biblioteca dos 21 hábitos + 3 módulos especiais.
// Textos (NOME / AÇÃO / PORQUÊ) LITERAIS do Derick (codice_habitos.txt).
// Textos (PASSO / APOIO) LITERAIS do Derick (codice_habitos_textos.txt).
// Tom: Rorschach / despertar cristão. NÃO reescrever os textos.
// Dados puros (sem JSX), consumidos pelo motor de protocolo (protocol-engine.ts).

/** Corrente (chave) trabalhada. */
export type ChainKey = "corpo" | "mente" | "espirito";

/** IDs dos 21 hábitos base. */
export type BaseHabitId =
  | "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7"
  | "M1" | "M2" | "M3" | "M4" | "M5" | "M6" | "M7"
  | "E1" | "E2" | "E3" | "E4" | "E5" | "E6" | "E7";

/** IDs dos 3 módulos especiais (injetados pela Q5). */
export type ModuleHabitId = "MOD-PORN" | "MOD-ACUCAR" | "MOD-ISOLAMENTO";

/** Qualquer id de hábito (base + módulo). */
export type HabitId = BaseHabitId | ModuleHabitId;

/** Intensidade do hábito: 1 = suave, 2 = médio, 3 = forte. */
export type Intensity = 1 | 2 | 3;

export interface Habit {
  /** Identificador único ('C1'..'E7' ou 'MOD-*'). */
  id: HabitId;
  /** Corrente a que pertence. */
  key: ChainKey;
  /** Nome no tom Códice. */
  name: string;
  /** A ação concreta (curta, 5-15 min). */
  action: string;
  /** O primeiro passo detalhado ("Seu primeiro passo é..."). Vazio nos módulos. */
  firstStep: string;
  /** O porquê (neurociência real, tom Rorschach). */
  why: string;
  /** Leitura de apoio embutida (~150-220 palavras, o capítulo do dia). Vazio nos módulos. */
  support: string;
  /** Referência opcional ao capítulo do ebook (leitura de apoio). */
  chapterRef?: string;
  /** Intensidade exigida (ordena a montagem do protocolo). */
  intensity: Intensity;
  /** true = módulo especial (não entra na rotação normal, é injetado pela Q5). */
  module?: boolean;
}

/* =========================================================================
 * CORPO — religar a máquina
 * ========================================================================= */
const CORPO: Habit[] = [
  {
    id: "C1",
    key: "corpo",
    name: "A Primeira Luz",
    action:
      "Logo ao acordar, tome 10 minutos de sol direto nos olhos, sem óculos escuros e sem vidro no meio.",
    firstStep:
      "Seu primeiro passo é acordar e ir até a janela, a varanda ou a porta de casa antes de pegar qualquer tela. Fica de frente pro céu por 10 minutos. Não olha pro sol direto — olha pra luz ao redor dele. Se estiver nublado, fica os 10 minutos mesmo assim; a luz atravessa a nuvem.",
    why: "Tem um sensor no fundo do teu olho esperando essa luz desde que o mundo é mundo. Quando ela bate, teu corpo acerta o relógio: cortisol no talo de manhã, sono pesado de noite. Eles te trancaram num quarto de luz azul falsa pra teu relógio nunca mais bater certo. A luz é de graça. Sempre foi. Sai e pega.",
    support:
      "Dentro do teu olho tem um sensor que ninguém te ensinou na escola. Chama melanopsina. Ela não serve pra enxergar — serve pra avisar o teu corpo que o dia começou. Quando a luz da manhã bate ali, um relógio antigo, mais velho que qualquer remédio, dispara. O cortisol sobe na hora certa. À noite, no horário certo, a melatonina vem e te derruba no sono. Esse é o pacto: luz de manhã, sono de noite. Eles quebraram esse pacto. Te deram teto, cortina, tela acesa às seis da manhã, e o corpo perdeu a referência de quando é dia e quando é noite. Aí vem o cansaço que café nenhum cura, a noite em claro, o humor no chão. Não é defeito teu. É um relógio sem ponteiro. Dez minutos de céu nos olhos recolocam o ponteiro no lugar. É de graça. É a primeira coisa que Deus acendeu, e foi a primeira que te tiraram. Vai lá e pega de volta.",
    chapterRef: "Corpo · A Primeira Luz",
    intensity: 1,
  },
  {
    id: "C2",
    key: "corpo",
    name: "Água Antes do Veneno",
    action: "Beba 500ml de água assim que levantar — antes do café, antes do celular.",
    firstStep:
      "Seu primeiro passo é deixar uma garrafa ou copo de 500ml de água cheio do lado da cama hoje à noite. Amanhã, antes do café, antes do celular, antes de qualquer coisa, bebe tudo. Devagar, mas bebe tudo. Só depois disso o dia começa.",
    why: "Você passou oito horas sem beber nada. Acordou seco, e teu cérebro seco mente: chama de fome o que é sede. Joga a água primeiro e a névoa some, o aperto no estômago some. Antes de tocar na tela que te quer escravo, toca no que te mantém vivo.",
    support:
      "Você dormiu oito horas sem beber nada. O ar que você soltou pela boca a noite inteira levou água embora. Você acorda seco, por dentro, num deserto que não enxerga. E o corpo, quando está seco, mente. Ele manda um sinal pro cérebro que se parece com fome, e você acha que precisa comer, quando precisa era de água. Eles aproveitam isso. Te vendem o café com açúcar, o pão branco, a desculpa de que você \"precisa de energia\". Você não precisava. Precisava de meio litro de água que custa nada. A água reidrata o sangue, faz ele correr mais leve, acorda o intestino, limpa a cabeça antes da névoa baixar. É o gesto mais simples e o mais ignorado. Antes de colocar o veneno doce pra dentro, coloca a água que o corpo pediu a noite toda. Primeiro a vida, depois o resto. Esse é o aviso.",
    chapterRef: "Corpo · Água Antes do Veneno",
    intensity: 1,
  },
  {
    id: "C3",
    key: "corpo",
    name: "O Choque",
    action: "No fim do banho, fique 30 a 60 segundos embaixo da água gelada.",
    firstStep:
      "Seu primeiro passo é tomar teu banho normal, quente, como sempre. No fim, antes de sair, gira a torneira pro lado frio e fica embaixo da água gelada por 30 a 60 segundos. Vai doer no começo. Respira fundo e fica. Conta os segundos. Depois desliga e sai.",
    why: "O frio dói e tu não morre. Teu corpo despeja dopamina e ela não cai — fica de pé por horas, sem o tombo que o vício te dá. Noradrenalina acende o foco como faísca em pólvora. Eles te venderam o conforto pra te deixar mole. O ferro se forja no frio. Abre a torneira azul.",
    support:
      "O frio é honesto. Ele não negocia. Quando a água gelada bate na tua pele, o corpo grita, o coração acelera, a respiração trava por um instante — e então algo antigo acorda. Sobe noradrenalina, e com ela vem o foco afiado, a sensação de estar vivo e presente. E tem mais: o frio levanta a tua dopamina e a mantém alta por horas, de um jeito limpo, sem tela, sem açúcar, sem nada que te cobre depois. Eles te venderam o conforto como se fosse prêmio. Água quente, sofá macio, dopamina barata na ponta do dedo. E te deixaram fraco, mole, sem nenhum desconforto pra te lembrar que você tem um corpo. O frio devolve isso. Trinta segundos de coragem de manhã ensinam o teu cérebro que você manda nele, e não o contrário. Quem vence o chuveiro gelado vence coisa maior depois. Entra no frio. É lá que você se encontra.",
    chapterRef: "Corpo · O Choque",
    intensity: 2,
  },
  {
    id: "C4",
    key: "corpo",
    name: "Corte o Doce",
    action: "Hoje, zero açúcar adicionado e zero ultraprocessado. Nem um.",
    firstStep:
      "Seu primeiro passo é decidir agora: hoje, zero açúcar e zero ultraprocessado. Antes de comer ou beber qualquer coisa, vira o pacote e lê o rótulo. Se tem açúcar nos primeiros ingredientes, ou nome que você não pronuncia, não entra na tua boca hoje. Come o que é comida de verdade: carne, ovo, fruta, raiz, folha.",
    why: "O açúcar entra, a glicose dispara, despenca, e teu humor desce junto na montanha-russa. É por isso a raiva à toa, a névoa, o sono das três da tarde. Não é fraqueza tua. É química que botaram no teu prato de propósito, pra te manter faminto e burro. Hoje você não come da mão deles.",
    support:
      "O açúcar entra no teu sangue como uma onda. Sobe rápido, te dá o pico, a falsa energia, o falso bem-estar. E então despenca. E quando despenca, vem a névoa, a irritação, a vontade de mais açúcar pra subir de novo. É uma roda que gira o dia inteiro, e você roda preso nela achando que o problema é você. Não é. Eles desenharam assim. Cientistas pagos ajustaram o ponto exato de doce, sal e gordura que faz o teu cérebro pedir mais e nunca se saciar. Chamam isso de produto. É armadilha. Quando você tira o açúcar por um dia, o teu sangue para de subir e descer feito montanha-russa. A glicose se estabiliza, e a cabeça clareia de um jeito que você esqueceu que existia. O humor para de oscilar à toa. Um dia. Só um. Lê o rótulo como quem lê uma confissão. Eles escreveram lá o que fizeram com você. Hoje você não assina embaixo.",
    chapterRef: "Corpo · Corte o Doce",
    intensity: 2,
  },
  {
    id: "C5",
    key: "corpo",
    name: "Mover o Peso",
    action: "Faça 20 a 30 minutos de força ou caminhada rápida — sue de verdade.",
    firstStep:
      "Seu primeiro passo é escolher uma das duas: ou 20 a 30 minutos de caminhada rápida (rápido de verdade, o suficiente pra você ofegar e não conseguir cantar), ou 20 minutos de força em casa mesmo — flexão, agachamento, prancha, até falhar. Marca a hora no relógio e não para antes. Sem academia, sem desculpa.",
    why: "Quando você levanta peso, teu corpo fabrica BDNF — o adubo que faz teu cérebro criar fio novo, conexão nova. A testosterona sobe, a ansiedade desce pelo ralo do suor. Eles te querem sentado, mole, rolando o dedo na tela. Um corpo parado é uma coleira folgada. Levanta e quebra ela.",
    support:
      "Quando você move o teu peso contra a gravidade, o teu corpo fabrica uma coisa que nenhuma farmácia vende: BDNF. Pensa nele como adubo pro cérebro. Ele faz os neurônios crescerem, se ligarem, ficarem fortes. Mover o corpo também ajuda a regular a testosterona no homem e descarrega a ansiedade que fica presa nos músculos sem ter pra onde ir. Você não foi feito pra ficar sentado dez horas numa cadeira olhando tela. Seu corpo é de caçador, de lavrador, de gente que carregava, corria, levantava peso. Eles te puseram numa cadeira e chamaram de progresso. E aí te venderam o remédio pra ansiedade que o próprio sedentarismo criou. Esperto. Vinte minutos de suor honesto fazem mais pelo teu humor hoje do que qualquer scroll. Não precisa ser bonito. Precisa ser difícil. Sente o coração bater, sente o músculo queimar — é o corpo dizendo obrigado por lembrar dele. Move o peso. Foi pra isso que você foi feito.",
    chapterRef: "Corpo · Mover o Peso",
    intensity: 2,
  },
  {
    id: "C6",
    key: "corpo",
    name: "O Quarto Limpo",
    action: "Tire o celular do quarto e deite no mesmo horário toda noite.",
    firstStep:
      "Seu primeiro passo é, hoje à noite, deixar o celular carregando em OUTRO cômodo — sala, cozinha, qualquer lugar menos o teu quarto. Compra um despertador barato se precisar. E define um horário fixo pra dormir; daqui em diante, é nesse horário, todo dia, mesmo no fim de semana.",
    why: "A luz azul da tela mata a melatonina — o hormônio que te derruba no sono. Você deita com o inimigo na mão e estranha não dormir. No horário fixo teu cérebro arruma a memória do dia e regula o que te governa por dentro. Bota a serpente pra fora do quarto. Lá é teu lugar de descanso, não dela.",
    support:
      "O teu quarto deveria ser o lugar mais sagrado da casa. É onde o corpo se conserta. É onde a memória do dia se grava, onde a mente lava o lixo, onde a alma descansa. Eles invadiram esse lugar com uma tela. A luz azul do celular engana o teu cérebro: ele acha que ainda é dia e segura a melatonina, o hormônio que te faz dormir. Você fica rolando o feed às onze, meia-noite, e o sono não vem porque você mesmo o trancou do lado de fora. Pior: durante o sono profundo, o cérebro consolida o que você aprendeu e viveu — e o celular ao lado, vibrando, piscando, rouba esse trabalho. Tira o aparelho do quarto e você recupera o lugar. Horário fixo pra dormir ensina o corpo a se preparar sozinho, como um relógio. Despertador na mão, celular longe. O quarto volta a ser teu, e não deles. Deus fez a noite pro descanso. Devolve a noite pra ela.",
    chapterRef: "Corpo · O Quarto Limpo",
    intensity: 1,
  },
  {
    id: "C7",
    key: "corpo",
    name: "Proteína de Manhã",
    action: "No café da manhã, coma proteína de verdade — ovo, carne, não pó de caixinha.",
    firstStep:
      "Seu primeiro passo é montar um café da manhã com proteína de verdade: ovos, carne, frango, ou um pote de iogurte natural sem açúcar. Mira em comer algo do tamanho da palma da tua mão de proteína logo cedo. Se hoje só der pra começar com dois ovos, começa com dois ovos. O importante é comer proteína antes de qualquer doce.",
    why: "Dopamina e foco se fabricam, e o tijolo se chama tirosina — vem da proteína. Café com pão doce te dá meia hora de energia e três horas de buraco. Carne de verdade segura tua energia firme até o sol descer. Eles encheram a prateleira de caixa colorida e esconderam o simples. Come o que sustenta.",
    support:
      "Tem um aminoácido na proteína chamado tirosina. Ele é o tijolo com que o teu cérebro constrói a dopamina — a molécula da vontade, do foco, da motivação pra levantar e fazer. Quando você come proteína de manhã, dá ao cérebro o material pra fabricar foco o dia inteiro. Quando você começa o dia com pão doce e café açucarado, dá a ele uma onda que sobe e desce, e te deixa às dez da manhã sem energia, irritado, buscando mais açúcar. Eles encheram a prateleira do café da manhã de caixinha colorida, cereal doce, biscoito recheado, e chamaram isso de \"matinal\". É açúcar fantasiado. Te ensinaram a começar o dia já perdendo. A proteína te dá energia que não despenca, saciedade que segura a fome boba, e a base química pra um dia de cabeça firme. Come o que sustenta, não o que ilude. Começa o dia forte, com comida que constrói, e o resto do dia obedece.",
    chapterRef: "Corpo · Proteína de Manhã",
    intensity: 1,
  },
];

/* =========================================================================
 * MENTE — retomar o controle
 * ========================================================================= */
const MENTE: Habit[] = [
  {
    id: "M1",
    key: "mente",
    name: "Tela Cinza",
    action: "Deixe o celular em escala de cinza o dia inteiro.",
    firstStep:
      "Seu primeiro passo é abrir os ajustes do teu celular. Procura \"Acessibilidade\", depois \"Filtros de cor\" ou \"Escala de cinza\", e liga. O mundo no teu bolso vira preto e branco. Deixa assim o dia inteiro. Se quiser, ativa o atalho de três toques pra ligar e desligar.",
    why: "A cor não tá ali à toa. O vermelho da notificação, o brilho do ícone — engenheiro de gente pagou caro pra acender teu sistema de recompensa como caça-níquel. Tira a cor e a isca perde o gancho. O celular cinza fica chato. É pra ficar. Chato é livre.",
    support:
      "A cor não está naquela tela por acaso. O vermelho da notificação, o azul do botão, o degradê do ícone — tudo foi escolhido por times pagos pra fisgar uma parte primitiva do teu cérebro. Cor brilhante é sinal de recompensa. O cérebro, lá no fundo, ainda acha que cor viva é fruta madura, é comida, é prêmio. Eles sabem disso. Pintaram o aplicativo com as cores que te fazem voltar, tocar, rolar de novo. A bolinha vermelha do número de mensagens não é informação. É isca. Quando você tira a cor e deixa tudo cinza, você arranca o anzol. O cérebro olha pra tela apagada e perde o interesse, porque o brilho que prometia recompensa sumiu. De repente o celular fica entediante — e é exatamente isso que ele deveria ser: uma ferramenta, não um cassino no teu bolso. Você não vai sentir falta da cor. Vai sentir falta da coleira. Tira a cor. Veja a máquina pelo que ela é: cinza, fria, faminta por você.",
    chapterRef: "Mente · Tela Cinza",
    intensity: 1,
  },
  {
    id: "M2",
    key: "mente",
    name: "A Primeira Hora é Sagrada",
    action: "Passe os primeiros 60 minutos do dia sem tocar em nenhuma tela.",
    firstStep:
      "Seu primeiro passo é, hoje à noite, deixar o celular fora do alcance da cama. Amanhã, ao acordar, não toca nele por 60 minutos. Nesse tempo: bebe água, pega sol, reza, te arruma, toma café. Faz qualquer coisa real. Só depois da primeira hora você liga a tela.",
    why: "Acordou e a primeira coisa que entra te governa o dia inteiro. Pega no celular e tua mente já amanhece sequestrada — o caos dos outros vira teu caos. A parte de você que decide ainda tá acordando; não entrega ela ao algoritmo de bandeja. A primeira hora é tua. Defende ela como quem defende portão.",
    support:
      "A primeira hora do dia decide quem governa a tua cabeça. Quando você acorda, o teu cérebro está num estado raro, macio, ainda saindo do sono — e o que entra nele primeiro molda o dia inteiro. O córtex pré-frontal, a parte que pensa, decide e te dá foco, ainda está aquecendo os motores. Se a primeira coisa que você faz é abrir o celular, você joga cem vozes pra dentro dessa cabeça antes mesmo de ela ser tua. Notícia, cobrança, comparação, o caos do mundo todo entrando antes do teu primeiro pensamento. Eles querem você assim: reativo, agitado, já correndo atrás antes de pisar no chão. Quem domina o teu primeiro pensamento domina o teu dia. Quando você guarda a primeira hora, você diz: esse tempo é meu, essa cabeça é minha, e eu decido o que entra. O foco que você protege de manhã dura até a noite. Acorda pra ti mesmo primeiro. Pro mundo, depois. Essa hora é sagrada porque é a única que ainda é totalmente sua.",
    chapterRef: "Mente · A Primeira Hora é Sagrada",
    intensity: 2,
  },
  {
    id: "M3",
    key: "mente",
    name: "Bloco Profundo",
    action:
      "Faça um bloco de 25 a 50 minutos de foco total em uma única coisa, sem trocar de aba.",
    firstStep:
      "Seu primeiro passo é escolher UMA tarefa que importa — escrever, estudar, criar, consertar. Põe o celular em outro cômodo ou desligado. Marca 25 minutos no relógio (ou 50 se aguentar) e trabalha só naquilo, sem trocar de aba, sem olhar mensagem, sem pausa. Quando o tempo acabar, levanta e respira.",
    why: "O scroll te quebrou a atenção em caco. Mil abas, zero presença, e tu acha que isso é normal. Foco se reconstrói como músculo rasgado: uma coisa só, até o tempo fechar. Cada bloco solda o fio que eles cortaram pra te vender distração. Senta e termina uma coisa inteira. Lembra como era.",
    support:
      "Sua atenção é um músculo, e eles passaram anos te treinando pra ela ser fraca. Cada rolada de feed, cada vídeo de quinze segundos, cada troca de aba ensina o teu cérebro a não aguentar nada por muito tempo. Você senta pra fazer algo importante e em dois minutos a mão já quer o celular — não porque você é fraco, mas porque te condicionaram a buscar o próximo estímulo a cada respiração. Chamam isso de \"estar conectado\". É atenção destruída em pedaços pequenos. A boa notícia é que o mesmo cérebro que se deixou quebrar pode se reconstruir. Cada bloco de foco profundo é uma repetição na academia da mente. Dói no começo. A vontade de fugir pra tela aperta forte nos primeiros minutos — aguenta. Do outro lado da vontade tem uma clareza que você não sente há anos: a de mergulhar fundo numa coisa só e sair com algo feito. Vinte e cinco minutos. Uma coisa só. É assim que você reconstrói o que te roubaram, tijolo por tijolo.",
    chapterRef: "Mente · Bloco Profundo",
    intensity: 2,
  },
  {
    id: "M4",
    key: "mente",
    name: "O Tédio Proposital",
    action:
      "Fique 10 minutos parado sem preencher o vazio — sem tela, sem música, sem nada na mão.",
    firstStep:
      "Seu primeiro passo é sentar ou ficar parado por 10 minutos sem nada na mão. Sem celular, sem música, sem podcast, sem TV. Pode olhar pela janela, pro teto, pra parede. Quando a vontade de pegar o telefone bater — e ela vai bater forte — só observa a vontade e não obedece. Deixa o tédio existir.",
    why: "Você não aguenta mais três segundos quieto sem sacar o celular. Isso não é normal — é tua tolerância à dopamina toda torta de tanto estímulo barato. No tédio o cérebro reseta o medidor e o autocontrole volta a respirar. A criatividade mora no vazio que você foge. Fica quieto. Aguenta. O tédio é onde tu te encontra de novo.",
    support:
      "Você esqueceu como é não fazer nada. Repara: no segundo que vem uma fila, um elevador, um sinal vermelho, a mão já corre pro bolso. Você não suporta o vazio nem por dez segundos. Isso não nasceu com você. Foi instalado. Cada vez que você preenche um instante de tédio com tela, o teu cérebro recebe um pequeno gole de dopamina, e o nível do que é \"normal\" sobe um pouco. Aí a vida real — o silêncio, a espera, a conversa lenta — passa a parecer insuportável, sem graça, porque você ergueu a régua tão alto que nada natural alcança. A psiquiatra Anna Lembke mostrou isso: dopamina demais hoje vira dor amanhã, e a busca por mais nunca enche. O tédio proposital é o remédio. Quando você senta no vazio e não foge, a régua começa a descer. Aos poucos, um café volta a ter gosto, uma conversa volta a prender, o pôr do sol volta a valer. Dez minutos de tédio hoje pra que o mundo inteiro volte a ter sabor amanhã. Senta no vazio. Do outro lado dele tem paz.",
    chapterRef: "Mente · O Tédio Proposital",
    intensity: 2,
  },
  {
    id: "M5",
    key: "mente",
    name: "Despejo Mental",
    action: "Escreva à mão por 5 minutos tudo que está rodando na sua cabeça — sem filtro.",
    firstStep:
      "Seu primeiro passo é pegar papel e caneta — de verdade, não o celular. Por 5 minutos, escreve à mão tudo que está passando na tua cabeça: preocupações, tarefas, raiva, medo, lista, o que vier. Não corrige, não capricha, não julga. Só despeja, palavra por palavra, até o tempo acabar.",
    why: "Tua memória de trabalho é uma mesa pequena, e tu empilhou nela cem preocupações que giram e giram. Põe no papel e tira o peso da mesa. A ruminação que te rói à noite perde força quando vira tinta. A mão escreve, a cabeça esvazia. Despeja antes que transborde.",
    support:
      "Tua mente tem uma mesa de trabalho pequena. Cabem poucas coisas nela de cada vez. E você anda com ela lotada: a conta pra pagar, a conversa que te magoou, a tarefa esquecida, o medo do futuro, tudo girando ao mesmo tempo, ocupando espaço, voltando em loop. Isso é a memória de trabalho sobrecarregada, e é por isso que você se sente cansado sem ter feito nada, ansioso sem motivo claro. A ruminação — o pensamento que volta e volta sem resolver — gasta a tua energia em silêncio. Quando você escreve à mão, tira o peso de dentro e põe no papel. O que estava girando solto agora está fixo, fora de você, onde dá pra olhar de frente. A mão escrevendo devagar força a mente a organizar o caos numa linha só. Cinco minutos e a cabeça respira. Não é mágica, é despejo: você esvazia a mesa pra poder de novo trabalhar nela. Pega a caneta. Põe o monstro no papel e olha pra ele. Lá fora ele é menor do que parecia dentro.",
    chapterRef: "Mente · Despejo Mental",
    intensity: 1,
  },
  {
    id: "M6",
    key: "mente",
    name: "Caça à Crença",
    action:
      'Pegue um pensamento automático ("não sirvo", "sempre vai ser assim") e interrogue: qual a prova a favor e qual a prova contra?',
    firstStep:
      "Seu primeiro passo é pegar UM pensamento que te derruba hoje — \"não sou capaz\", \"vai dar errado\", \"ninguém me quer\". Escreve ele. Depois faz duas colunas: numa, as provas REAIS a favor dele; na outra, as provas reais contra. Fatos, não sentimentos. Olha as duas colunas e pergunta: esse pensamento é verdade ou só hábito?",
    why: 'Tua mente repete mentira velha como se fosse lei. "Não presto." "Nunca muda." Quem disse? Cadê a prova? Põe o pensamento na cadeira e interroga ele como suspeito. Isso reescreve o fio da crença por dentro — é o que a terapia faz de verdade. Não acredita em tudo que tua cabeça grita. Muita coisa ali foi plantada.',
    support:
      "Nem todo pensamento que passa na tua cabeça é verdade. A maioria nem é escolha tua — é repetição, é coisa que te disseram tantas vezes que virou tua voz. \"Você não dá conta.\" \"É tarde demais.\" \"Você sempre estraga tudo.\" Esses pensamentos chegam vestidos de fato, mas são só hábitos da mente, sulcos cavados de tanto repetir. O cérebro acredita no que ouve mais vezes, mesmo que seja mentira. A caça à crença é você virando interrogador da tua própria cabeça. Você pega o pensamento, põe ele na cadeira sob a luz e pergunta: cadê a prova? Quase sempre a prova a favor é fraca — um sentimento, uma vez que deu errado. E a prova contra, quando você olha de verdade, é mais forte do que imaginava. Isso é reestruturação cognitiva, a base de uma terapia que funciona: você não engole o pensamento, você o julga. Não acredite em tudo que sua mente fala. Ela mente. Interroga. A verdade aguenta perguntas — a mentira, não.",
    chapterRef: "Mente · Caça à Crença",
    intensity: 3,
  },
  {
    id: "M7",
    key: "mente",
    name: "Jejum de Notícia",
    action: "Passe 24 horas sem consumir nenhuma notícia ou feed de caos.",
    firstStep:
      "Seu primeiro passo é, por 24 horas, cortar toda notícia e todo caos. Sem portal de notícia, sem TV ligada no jornal, sem perfil de tragédia, sem grupo que só joga desgraça. Se bater a vontade de \"ver o que está acontecendo\", lembra: você combinou um dia. Avisa quem precisa que ficará fora e desliga.",
    why: "Manchete atrás de manchete, teu cérebro acha que o tigre tá sempre na porta. A amígdala não dorme, o cortisol não para de pingar, e te vendem isso como \"estar informado\". É medo na veia, vinte e quatro horas. Eles lucram com teu pavor. Fecha a torneira do caos por um dia e sente o ombro descer.",
    support:
      "Lá no fundo do teu cérebro tem um alarme antigo chamado amígdala. Ele foi feito pra te salvar do leão, do perigo real, do que podia te matar na savana. Ele dispara, te enche de cortisol, te deixa em alerta — e isso era bom quando o perigo era de verdade e acabava rápido. Eles descobriram esse alarme e o transformaram em negócio. A notícia vive de ameaça: tragédia, crime, guerra, colapso, o pior de cada canto do planeta empilhado na tua tela a cada minuto. Teu cérebro não sabe que aquilo está longe. Ele dispara o alarme como se o leão estivesse na sala. O dia inteiro. Cortisol que nunca baixa, alerta que nunca descansa, medo de um mundo que, na tua rua, está em paz. Você não foi feito pra carregar a dor do planeta inteiro de uma vez. Vinte e quatro horas de silêncio dão à tua amígdala a chance de finalmente descansar. O mundo vai girar sem você vigiando. Desliga o alarme por um dia. Volta a ouvir o que está perto.",
    chapterRef: "Mente · Jejum de Notícia",
    intensity: 3,
  },
];

/* =========================================================================
 * ESPÍRITO — reatar a fonte
 * ========================================================================= */
const ESPIRITO: Habit[] = [
  {
    id: "E1",
    key: "espirito",
    name: "O Silêncio",
    action: "Passe 10 minutos em oração ou silêncio, sem nada na mão.",
    firstStep:
      "Seu primeiro passo é achar um canto quieto e sentar por 10 minutos sem nada na mão. Sem celular, sem música. Fecha os olhos. Reza, se você reza — fala com Deus com tuas palavras. Se não, só respira devagar e fica no silêncio. Quando o pensamento fugir, traz de volta pra respiração ou pra oração, sem brigar contigo.",
    why: "Teu corpo vive em alerta — punho fechado, fôlego curto, pronto pra correr de nada. No silêncio o cortisol baixa e o freio do corpo entra: o nervo que diz pro coração afrouxar, pro peito abrir. Eles te encheram de barulho pra você nunca ouvir o que fala por dentro. Cala a tela. Fica quieto diante de Deus. Ali você escuta de novo.",
    support:
      "Teu corpo tem dois modos. Um é o de luta: coração acelerado, músculo tenso, alerta ligado — é nele que você vive o dia todo, correndo, respondendo, reagindo. O outro é o de descanso: o parassimpático, o modo em que o corpo se acalma, se conserta, e o cortisol finalmente baixa. O problema é que eles construíram um mundo que te deixa preso no primeiro o tempo inteiro. Notificação, pressa, barulho, tela. Você esqueceu como é desligar. O silêncio é a chave que liga o segundo modo. Dez minutos parado, sem nada na mão, e o corpo entende que pode baixar a guarda. A respiração desacelera, o coração afrouxa, a tempestade química assenta. E quando o silêncio vira oração, acontece mais: você para de ser o centro de tudo e entrega o peso a Quem pode carregar. Não é fazer nada. É a coisa mais importante do dia. No silêncio você ouve o que o barulho abafou a vida inteira. Senta. Cala. E escuta.",
    chapterRef: "Espírito · O Silêncio",
    intensity: 1,
  },
  {
    id: "E2",
    key: "espirito",
    name: "Três Âncoras",
    action: "Escreva 3 coisas pelas quais você é grato hoje.",
    firstStep:
      "Seu primeiro passo é, agora ou ao fim do dia, anotar 3 coisas pelas quais você é grato hoje. Escreve à mão se puder. Sê específico: não \"minha família\", mas \"meu filho riu no café da manhã\". Coisas pequenas valem mais que grandes. Faz isso devagar, sentindo cada uma, não só listando.",
    why: "Teu cérebro nasceu torto pro lado ruim — guarda a ofensa, esquece o pão. Era pra te manter vivo na caverna, mas hoje só te mantém amargo. Escrever o que é bom força a mão contrária e solta dopamina e serotonina na conta certa. Não é positividade boba. É reescrever o olho pra enxergar o que ainda tá de pé.",
    support:
      "Teu cérebro tem um vício antigo: ele guarda o ruim e esquece o bom. Isso se chama viés de negatividade, e um dia foi útil. Nossos antepassados que lembravam onde tinha perigo sobreviviam; os distraídos, não. Então o cérebro aprendeu a fixar a ameaça e deixar a bênção escorregar. O problema é que hoje não tem leão, mas o cérebro continua varrendo o dia atrás do que deu errado, do que falta, do que dói. Você acaba a noite lembrando da única coisa ruim e esquecendo as vinte boas. Eles lucram com isso: um cérebro que sempre acha que falta algo é um cérebro que sempre compra, sempre rola, sempre busca. A gratidão é o contra-ataque. Quando você nomeia três coisas boas, força o cérebro a procurar o que presta — e, com o tempo, ele aprende a fazer isso sozinho. Você não está mentindo pra si mesmo. Está corrigindo uma lente torta que te mostrava só a sombra. Conta as bênçãos em voz de verdade. Elas sempre estiveram lá. Você só tinha esquecido de olhar.",
    chapterRef: "Espírito · Três Âncoras",
    intensity: 1,
  },
  {
    id: "E3",
    key: "espirito",
    name: "O Jejum",
    action: "Jejue de algo — comida, tela ou prazer — por um tempo que você definir.",
    firstStep:
      "Seu primeiro passo é escolher UMA coisa pra largar por um tempo definido: pode ser comida (pula uma refeição, ou fica das 20h ao meio-dia sem comer), tela (uma tarde inteira sem), ou um prazer (doce, álcool, jogo). Decide o quê e por quanto tempo ANTES de começar. Depois, quando a vontade vier, você só não cede. Esse é o exercício.",
    why: 'Dizer "não" pra você mesmo é músculo, e o teu tá atrofiado de tanto ceder. Cada vontade que você segura, o córtex pré-frontal — a parte que manda em você — fica mais forte. Vem clareza no buraco que a vontade deixa. Quem não governa o próprio apetite é governado por ele. Jejua e retoma o trono.',
    support:
      "O jejum não é sobre o que você tira. É sobre quem fica no comando. Toda vez que você sente uma vontade e não obedece, você fortalece a parte do cérebro que decide — o córtex pré-frontal, o músculo da vontade, o que separa o homem que escolhe do animal que só reage. Eles construíram um mundo onde você nunca precisa esperar por nada. Fome? Comida em dez minutos na porta. Tédio? Tela na hora. Desejo? Satisfação imediata, um toque. E nesse conforto sem atrito, o músculo da vontade atrofiou. Você virou alguém que cede a tudo, sempre, na hora — e depois se odeia por isso. O jejum reconstrói esse músculo de propósito. Quando você sente fome e segura, sente vontade de tela e não pega, você prova a si mesmo que o desejo não manda em você. Cada \"não\" hoje é força pra um \"não\" maior amanhã. Quem domina o próprio apetite domina a própria vida. Escolhe o teu jejum. Sente a vontade chegar. E, pela primeira vez em muito tempo, diz não — e ganha.",
    chapterRef: "Espírito · O Jejum",
    intensity: 3,
  },
  {
    id: "E4",
    key: "espirito",
    name: "Soltar o Peso",
    action: "Faça um ato ou escreva uma carta de perdão a alguém — ou a si mesmo.",
    firstStep:
      "Seu primeiro passo é escolher UMA pessoa que te feriu — ou você mesmo. Pega papel e escreve uma carta a ela. Diz o que doeu, sem maquiar. E então, no fim, escreve a decisão de soltar: não porque ela merece, mas porque você não quer mais carregar. Não precisa enviar. O ato é escrever e largar.",
    why: "O rancor não machuca quem te feriu. Fica em você, ferve, e o estresse crônico te corrói por dentro como ferrugem em cano. A ruminação aperta o peito, suja o sono. Perdoar não é dizer que tá certo — é largar a pedra que só você carrega. Solta. Quem perdoa respira primeiro.",
    support:
      "Mágoa é peso que você carrega achando que está punindo o outro. Mas o outro dorme tranquilo, e quem fica acordado revivendo a cena é você. O rancor não machuca quem te feriu — machuca quem segura. Cada vez que você repassa a ofensa, o teu corpo revive ela: o cortisol sobe, o coração aperta, o estresse volta como se a ferida fosse de novo. É um veneno que você bebe esperando que o outro morra. Anos disso desgastam o corpo por dentro, em silêncio. O perdão não é dizer que o que fizeram foi certo. Não é esquecer, não é fingir. É largar o peso que só você está carregando. É decidir que aquela pessoa não vai mais alugar espaço de graça na tua cabeça. Quando você perdoa, o corpo afrouxa, a ruminação para, e a energia que ia toda pra revolta volta pra você. Tem coisa que você só solta entregando a Deus — deixa Ele cobrar, se houver o que cobrar. Escreve a carta. Põe o peso pra fora. E sai mais leve do que entrou.",
    chapterRef: "Espírito · Soltar o Peso",
    intensity: 3,
  },
  {
    id: "E5",
    key: "espirito",
    name: "Olho no Olho",
    action: "Tenha uma conversa real e presente com alguém, cara a cara, sem tela na mão.",
    firstStep:
      "Seu primeiro passo é marcar uma conversa real hoje com alguém que importa — pessoa, esposa, filho, amigo, pai. Senta de frente, olho no olho. Deixa os dois celulares longe, virados pra baixo ou em outro cômodo. Por pelo menos 10 minutos, só vocês: escuta de verdade, responde de verdade. Sem tela no meio.",
    why: "Você tem quinhentos contatos e nenhuma mão no ombro. O isolamento adoece — e o remédio é velho: gente perto de gente. Olho no olho teu corpo solta ocitocina, o que acalma e prende o laço. A tela imita isso e não entrega. Eles te querem sozinho na tua bolha. Senta na frente de um irmão e fala de verdade.",
    support:
      "O ser humano foi feito pra olhar outro ser humano nos olhos. Quando isso acontece de verdade — presença, atenção, escuta — o corpo libera ocitocina, a química da confiança, do vínculo, do pertencimento. É o que faz o bebê se acalmar no colo, o que segura um casamento, o que cura a solidão. E foi exatamente isso que eles trocaram por curtida. Te venderam mil \"amigos\" na tela e te deixaram sozinho na mesa de jantar, cada um olhando o próprio aparelho, juntos e a quilômetros de distância. A solidão hoje mata como doença, e ninguém percebe porque todo mundo está \"conectado\". Mas conexão de tela não libera ocitocina. Não enche. Não cura. Só presença cura. Uma conversa olho no olho, sem o celular roubando metade da tua atenção, vale mais que mil mensagens. A pessoa do outro lado da mesa é real, está viva, e não vai estar aí pra sempre. Guarda o telefone. Olha quem está na tua frente. É ali, e só ali, que a solidão acaba.",
    chapterRef: "Espírito · Olho no Olho",
    intensity: 2,
  },
  {
    id: "E6",
    key: "espirito",
    name: "A Palavra do Dia",
    action: "Leia um trecho da Escritura (um Salmo, um versículo) e leve ele no bolso o dia todo.",
    firstStep:
      "Seu primeiro passo é abrir a Escritura — Bíblia de papel, app, ou um versículo do dia. Lê um trecho curto, devagar. Escolhe UMA frase que te tocou. Escreve ela ou repete na cabeça. E durante o dia, quando puder, volta nela: no trânsito, na fila, antes de dormir. Leva a Palavra contigo, não só na leitura.",
    why: 'Mente sem âncora vai onde o vento do medo levar. Uma palavra firme na cabeça dá chão e dá sentido — e a ansiedade do "pra quê tudo isso" perde o pé. Eles te dão mil frases vazias por dia pra você nunca fixar numa verdadeira. Escolhe uma palavra que sustenta e carrega. Repete até virar osso.',
    support:
      "Tua mente precisa de uma âncora, ou a correnteza te leva. Sem um chão firme onde se segurar, o pensamento vagueia pro medo, pra dúvida, pra angústia de não saber pra que serve nada disso. Eles sabem que uma cabeça sem âncora é uma cabeça fácil de mover — te dão mil vozes pra ocupar o vazio, mil opiniões, mil distrações, tudo menos sentido. A Palavra é âncora antiga. Não é só religião: é texto que atravessou três mil anos porque diz algo verdadeiro sobre o que é ser homem, sofrer, esperar, perdoar, persistir. Quando você leva uma frase dela no peito durante o dia, dá à mente um ponto fixo no meio da tempestade. Em vez de ruminar o medo, você repete a verdade. Aos poucos, ela cava um sulco novo na cabeça — um caminho de sentido onde antes só havia ansiedade. Uma frase por dia. Pequena. Mas levada de verdade, ela segura quando tudo balança. Abre o Livro. Acha tua frase. E carrega ela como quem carrega água no deserto.",
    chapterRef: "Espírito · A Palavra do Dia",
    intensity: 1,
  },
  {
    id: "E7",
    key: "espirito",
    name: "Natureza sem Tela",
    action: "Fique 20 minutos ao ar livre, sem celular, só olhando.",
    firstStep:
      "Seu primeiro passo é sair de casa e ir pra qualquer lugar com natureza — praça, parque, quintal, rua arborizada, beira de rio. Deixa o celular em casa, ou no bolso desligado, no silêncio. Fica 20 minutos ali, andando devagar ou parado. Olha as árvores, ouve os sons, sente o ar. Só isso. Sem foto, sem tela.",
    why: "A tela exige teu foco a cada segundo e te deixa o cérebro escorrido no fim do dia. A natureza pede o contrário: deixa a atenção pousar mole, e ela se recarrega sozinha. Árvore, vento, céu — não vendem nada, não te puxam, não te cobram. Foi feito assim de propósito, por Quem te fez. Sai da caixa de luz. Olha o que é real.",
    support:
      "Tua atenção tem dois tipos. Uma é a atenção que você força — a que usa pra encarar a tela, segurar o foco no trabalho, resistir à distração. Essa cansa, gasta, esgota, e é ela que vive no talo o dia inteiro. A outra é a atenção que descansa sozinha — a que se solta quando você olha uma árvore balançar, uma água correr, uma nuvem passar. A natureza não exige nada de você. Ela apenas é, e ao olhá-la a tua atenção forçada finalmente solta a corda e se recupera. Isso tem nome: restauração da atenção dirigida. Eles te prenderam num mundo de telas que cobram foco a cada segundo, e por isso você acaba o dia com a cabeça em frangalhos, sem conseguir pensar direito. A natureza é o reparo gratuito que estava aqui o tempo todo, antes de qualquer aplicativo. Vinte minutos entre árvores fazem pela tua cabeça o que nenhuma tela faz. Deus pôs o remédio do lado de fora da tua porta. Sai. Sem o celular. E deixa o verde te consertar.",
    chapterRef: "Espírito · Natureza sem Tela",
    intensity: 2,
  },
];

/* =========================================================================
 * MÓDULOS ESPECIAIS — injetados pela Q5 (pornografia / açúcar / isolamento).
 * Marcados com module:true. Não entram na rotação normal de fase.
 * (firstStep/support vazios — não há textos de aprofundamento do Derick.)
 * ========================================================================= */
const MODULOS: Habit[] = [
  {
    id: "MOD-PORN",
    key: "espirito",
    name: "Quebrar a Corrente (Pornografia)",
    action:
      "Hoje, ao sentir o gatilho: levante, água gelada no rosto, 20 respirações e mande uma mensagem a alguém de confiança. Substitua o impulso por um ato concreto.",
    firstStep: "",
    why: "A pornografia sequestra o mesmo circuito de dopamina da droga e ensina teu cérebro a fugir da realidade pro brilho da tela. Cada recaída cava o sulco mais fundo. Cada gatilho que você troca por um ato real — água, respiro, um irmão do outro lado — abre fio novo. Eles lucram com tua vergonha em silêncio. Quebra a corrente em voz alta.",
    support: "",
    chapterRef: "Módulo · Pornografia (corpo + espírito)",
    intensity: 3,
    module: true,
  },
  {
    id: "MOD-ACUCAR",
    key: "corpo",
    name: "Cortar o Veneno Doce (Açúcar)",
    action:
      "Corte progressivo: hoje, um a menos que ontem. Leia o rótulo de tudo que entrar na boca e diga não a um açúcar escondido.",
    firstStep: "",
    why: "O açúcar acende o sistema de recompensa igual droga e te deixa em ciclo de pico e queda — fome falsa, névoa, irritação. Eles esconderam açúcar em tudo, até no que jura ser salgado, pra te manter voltando. Cortar não é dieta da moda: é tirar a mão deles do teu prato. Um a menos hoje. Amanhã, outro.",
    support: "",
    chapterRef: "Módulo · Açúcar (corpo)",
    intensity: 2,
    module: true,
  },
  {
    id: "MOD-ISOLAMENTO",
    key: "espirito",
    name: "Furar a Bolha (Isolamento)",
    action:
      "Force UMA micro-conexão social hoje: uma mensagem real, uma ligação, um café, um olho no olho. Pequeno, mas de verdade.",
    firstStep: "",
    why: "O isolamento se disfarça de paz e te adoece por dentro — sobe inflamação, desce o ânimo, e a mente sozinha vira eco de medo. O remédio é antigo: gente perto de gente solta ocitocina e te tira do buraco. A tela imita o laço e não entrega. Eles te querem sozinho na bolha pra te vender o que preenche. Fura ela. Hoje, uma conexão real.",
    support: "",
    chapterRef: "Módulo · Isolamento (espírito)",
    intensity: 2,
    module: true,
  },
];

/** Todos os 21 hábitos base, na ordem C→M→E. */
export const baseHabits: Habit[] = [...CORPO, ...MENTE, ...ESPIRITO];

/** Os 3 módulos especiais. */
export const moduleHabits: Habit[] = [...MODULOS];

/** Todos os hábitos (base + módulos). */
export const habits: Habit[] = [...baseHabits, ...moduleHabits];

/** Mapa id → Habit para lookup O(1). */
export const habitsById: Record<string, Habit> = Object.fromEntries(
  habits.map((h) => [h.id, h]),
);

/** Hábitos de uma corrente específica (apenas base, ordem original). */
export function habitsByChain(key: ChainKey): Habit[] {
  return baseHabits.filter((h) => h.key === key);
}

/** Lookup de um hábito por id (undefined se não existir). */
export function getHabit(id: HabitId): Habit | undefined {
  return habitsById[id];
}
