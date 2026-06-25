// Catálogo de frequências — dados puros (sem JSX).
// O ícone é referenciado por nome (iconName) e mapeado para o componente
// lucide-react via helper getIcon() no client.

export interface FrequencyData {
  id: string;
  title: string;
  frequency: string;
  iconName: string;
  category: string;
  tagline: string;
  description: string;
  howToUse: {
    equipment: string;
    posture: string;
    duration: string;
    bestTime: string;
    tips: string[];
  };
  evolution: {
    day1: {
      title: string;
      physical: string;
      mental: string;
      sensation: string;
    };
    week1: {
      title: string;
      physical: string;
      mental: string;
      sensation: string;
    };
    month1: {
      title: string;
      physical: string;
      mental: string;
      sensation: string;
    };
    month3: {
      title: string;
      description: string;
    };
  };
  audioUrlAmbiente?: string;
  audioUrlPuro?: string;
}

export const frequencyData: Record<string, FrequencyData> = {
  escudo: {
    id: "escudo",
    title: "ESCUDO",
    frequency: "432Hz",
    iconName: "Shield",
    category: "ansiedade",
    tagline: "Anula a ansiedade e o medo",
    description:
      "A frequência de 432Hz é conhecida como a 'frequência do universo'. Ela ressoa com a vibração natural da Terra e do corpo humano, criando um campo protetor que dissolve padrões de ansiedade e medo acumulados no sistema nervoso.",
    audioUrlAmbiente: "/audio/escudo-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a tecnologia binaural só funciona com fones)",
      posture: "Sentado confortavelmente ou deitado, coluna alinhada, olhos fechados",
      duration: "Mínimo 7 minutos | Ideal 15-30 minutos | Máximo 1 hora",
      bestTime: "Manhã ao acordar OU momentos de crise de ansiedade",
      tips: [
        "Respire profundamente 3x antes de começar",
        "Não use enquanto dirige ou opera máquinas",
        "Beba água após a sessão para ajudar na limpeza energética",
        "Mantenha o celular no modo avião para evitar interrupções",
      ],
    },
    evolution: {
      day1: {
        title: "🌅 PRIMEIRO CONTATO",
        physical:
          "Formigamento leve no topo da cabeça (coroa). Desaceleração perceptível dos batimentos cardíacos. Sensação de 'peso saindo dos ombros'. Músculos faciais relaxam involuntariamente.",
        mental:
          "Pensamentos começam a desacelerar. A 'voz interna' fica mais quieta. Sensação de estar 'protegido' por um campo invisível.",
        sensation:
          "Como se você estivesse flutuando em um oceano calmo, completamente seguro.",
      },
      week1: {
        title: "🌙 REPROGRAMAÇÃO NEURAL",
        physical:
          "Sono mais profundo e restaurador. Menos tensão no pescoço e ombros. Digestão melhora (o estresse afeta o intestino). Pressão arterial tende a normalizar.",
        mental:
          "Ansiedade do dia-a-dia reduz em 40-60%. Você consegue 'pausar' antes de reagir impulsivamente. Pensamentos catastróficos perdem força. Maior tolerância a situações estressantes.",
        sensation:
          "Você percebe que coisas que antes te tiravam do sério agora parecem menores.",
      },
      month1: {
        title: "⭐ TRANSFORMAÇÃO PROFUNDA",
        physical:
          "Sistema imunológico fortalecido. Menos dores de cabeça tensionais. Aparência mais descansada (olheiras diminuem). Energia mais estável durante o dia.",
        mental:
          "O medo deixa de controlar suas decisões. Clareza mental para resolver problemas complexos. Relacionamentos melhoram (você não projeta mais ansiedade). Confiança natural aumenta.",
        sensation:
          "Você se torna a pessoa mais centrada do ambiente. Outros começam a notar sua calma.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "Você desenvolve um 'escudo energético' permanente. Situações que antes causavam pânico são gerenciadas com maestria. Sua presença transmite segurança para outros. Você se torna referência de equilíbrio emocional. O medo se transforma em ferramenta de discernimento, não mais em prisão.",
      },
    },
    audioUrlPuro: "/audio/escudo-puro.mp3",
  },
  foco: {
    id: "foco",
    title: "FOCO LASER",
    frequency: "GAMMA 40Hz",
    iconName: "Zap",
    category: "foco",
    tagline: "Produtividade extrema e clareza mental",
    description:
      "As ondas Gamma (40Hz) são encontradas em estados de alta performance cognitiva. Monges tibetanos em meditação profunda e gênios durante momentos de insight apresentam picos de atividade Gamma. Esta frequência 'liga' seu cérebro no modo máximo.",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (batidas binaurais requerem separação de canais)",
      posture:
        "Sentado em posição de trabalho, olhos fechados nos primeiros 5 minutos, depois pode abrir",
      duration: "Mínimo 10 minutos | Ideal 25-45 minutos | Máximo 2 horas",
      bestTime: "Antes de tarefas que exigem concentração intensa (Deep Work)",
      tips: [
        "Use ANTES de começar o trabalho, não durante",
        "Tenha a tarefa definida antes de iniciar",
        "Evite usar após 18h (pode atrapalhar o sono)",
        "Combine com técnica Pomodoro para resultados máximos",
      ],
    },
    evolution: {
      day1: {
        title: "⚡ IGNIÇÃO MENTAL",
        physical:
          "Sensação de 'despertar' cerebral. Olhos ficam mais alertas. Postura naturalmente se endireita. Energia física aumenta sem agitação.",
        mental:
          "A mente para de 'pular' entre pensamentos. Você consegue iniciar tarefas difíceis sem resistência. Procrastinação desaparece temporariamente. Sensação de 'túnel de concentração'.",
        sensation:
          "Como se alguém tivesse ligado um interruptor no seu cérebro. Tudo fica mais nítido.",
      },
      week1: {
        title: "🎯 PRODUTIVIDADE DOBRADA",
        physical:
          "Menos fadiga mental ao final do dia. Memória de curto prazo melhora visivelmente. Capacidade de processar informações acelera. Menos necessidade de café para funcionar.",
        mental:
          "Você completa em 4 horas o que antes levava 8. Reuniões se tornam mais produtivas. Ideias criativas surgem com mais frequência. Menos erros por distração.",
        sensation:
          "Você começa a se perguntar como conseguia trabalhar antes sem isso.",
      },
      month1: {
        title: "🚀 PERFORMANCE DE ELITE",
        physical:
          "Cérebro se adapta e entra em alta performance naturalmente. Neuroplasticidade aumentada. Capacidade de aprender novas habilidades acelera. Resistência mental para longas sessões de trabalho.",
        mental:
          "Você é conhecido por entregar resultados excepcionais. Problemas complexos parecem mais simples. Capacidade de manter múltiplos projetos sem confusão. Criatividade e lógica trabalham juntas.",
        sensation:
          "Você opera em um nível que poucos alcançam. Sua mente é sua maior ferramenta.",
      },
      month3: {
        title: "🧠 POTENCIAL MÁXIMO",
        description:
          "Você opera no nível cognitivo dos top 5%. Capacidade de resolver problemas que antes pareciam impossíveis. Você se torna a pessoa que todos procuram para decisões importantes. Sua mente funciona como um supercomputador biológico. Aprendizado de novas habilidades acontece em fração do tempo normal.",
      },
    },
    audioUrlAmbiente: "/audio/foco-ambiente.mp3",
    audioUrlPuro: "/audio/foco-puro.mp3",
  },
  regeneracao: {
    id: "regeneracao",
    title: "REGENERAÇÃO",
    frequency: "528Hz",
    iconName: "Dna",
    category: "cura",
    tagline: "Reparação do DNA e alívio do cansaço físico",
    description:
      "528Hz é chamada de 'frequência do milagre' ou 'frequência do amor'. Cientistas descobriram que ela pode reparar DNA danificado. É a frequência central do arco-íris e está presente na clorofila das plantas. Seu corpo reconhece essa vibração como 'casa'.",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (frequência precisa penetrar profundamente)",
      posture: "Deitado de barriga para cima, braços ao lado do corpo, palmas para cima",
      duration: "Mínimo 15 minutos | Ideal 30-45 minutos | Máximo 2 horas",
      bestTime: "Final da tarde (pós-trabalho) OU após exercícios físicos",
      tips: [
        "Vista roupas confortáveis e soltas",
        "Ambiente escuro ou com luz baixa potencializa",
        "Pode usar após treinos para acelerar recuperação",
        "Hidrate-se bem antes e depois da sessão",
      ],
    },
    evolution: {
      day1: {
        title: "💫 RESET CELULAR",
        physical:
          "Ondas de calor percorrendo o corpo (células respondendo). Tensões físicas começam a se dissolver. Respiração naturalmente se aprofunda. Sensação de 'estar sendo curado por dentro'.",
        mental:
          "Mente entra em estado meditativo naturalmente. Preocupações parecem distantes. Sensação de gratidão espontânea. Conexão com algo maior que você.",
        sensation:
          "Como se cada célula do seu corpo estivesse recebendo um abraço.",
      },
      week1: {
        title: "🌿 REGENERAÇÃO ATIVA",
        physical:
          "Dores crônicas diminuem significativamente. Recuperação de exercícios acelera 2x. Pele começa a ficar mais vibrante. Menos necessidade de sono (qualidade aumenta). Digestão e metabolismo melhoram.",
        mental:
          "Humor mais estável e positivo. Menos irritabilidade. Paciência aumenta naturalmente. Sensação de 'estar em paz' com a vida.",
        sensation:
          "Você acorda sentindo que realmente descansou. Energia dura o dia todo.",
      },
      month1: {
        title: "✨ RENOVAÇÃO COMPLETA",
        physical:
          "Pessoas comentam que você parece mais jovem. Sistema imunológico fortalecido (você adoece menos). Dores que pareciam permanentes desaparecem. Vitalidade física de anos atrás retorna.",
        mental:
          "Resiliência emocional aumenta drasticamente. Você processa traumas antigos naturalmente. Relacionamentos se curam. Autoperdão e aceitação florescem.",
        sensation:
          "Você se sente renovado, como se tivesse ganhado uma segunda chance.",
      },
      month3: {
        title: "🌟 POTENCIAL MÁXIMO",
        description:
          "Você experimenta uma 'segunda juventude'. Marcadores de inflamação reduzem. Você se torna exemplo de vitalidade para outros. Capacidade física e mental operam no pico. Seu corpo se torna uma máquina de autocura. Você irradia saúde e as pessoas sentem isso.",
      },
    },
    audioUrlAmbiente: "/audio/regeneracao-ambiente.mp3",
    audioUrlPuro: "/audio/regeneracao-puro.mp3",
  },
  sono: {
    id: "sono",
    title: "SONO PROFUNDO",
    frequency: "DELTA 0.5-4Hz",
    iconName: "Moon",
    category: "sono",
    tagline: "Desliga o cérebro e induz sono REM instantâneo",
    description:
      "As ondas Delta são as mais lentas do cérebro, presentes apenas no sono profundo. A Elite mundial dorme 5 horas mas descansa como se fossem 8 porque dominam o sono Delta. Esta frequência 'hackeia' seu cérebro para entrar nesse estado rapidamente.",
    howToUse: {
      equipment:
        "Fones de ouvido confortáveis para dormir (existem modelos específicos) OU caixinha de som baixa",
      posture: "Deitado na posição que você dorme, pronto para adormecer",
      duration: "Deixe tocando até adormecer | Pode deixar a noite toda em loop",
      bestTime: "Na hora de dormir OU para cochilos estratégicos de 20 minutos",
      tips: [
        "Escureça completamente o ambiente",
        "Temperatura do quarto entre 18-22°C",
        "Não olhe telas 30min antes",
        "Use máscara de dormir se necessário",
      ],
    },
    evolution: {
      day1: {
        title: "🌙 DESLIGAMENTO INSTANTÂNEO",
        physical:
          "Músculos relaxam profundamente. Respiração desacelera automaticamente. Batimentos cardíacos diminuem. Corpo fica 'pesado' de forma agradável.",
        mental:
          "Pensamentos param de acelerar. A 'tagarelice mental' silencia. Você adormece em menos de 15 minutos. Sensação de afundar em nuvens.",
        sensation:
          "Pela primeira vez em muito tempo, você consegue 'desligar' a mente.",
      },
      week1: {
        title: "💤 SONO RESTAURADOR",
        physical:
          "Você acorda REALMENTE descansado. Menos rigidez matinal. Energia sustentada durante todo o dia. Olheiras começam a diminuir.",
        mental:
          "Sonhos se tornam mais vívidos (sinal de sono REM profundo). Memória consolida melhor. Humor matinal melhora drasticamente. Menos necessidade de alarmes.",
        sensation:
          "Você redescobre o que é acordar naturalmente, sentindo-se renovado.",
      },
      month1: {
        title: "🌟 DOMÍNIO DO DESCANSO",
        physical:
          "Você dorme menos horas mas descansa mais. Recuperação física durante o sono maximizada. Sistema hormonal se regula (cortisol, melatonina). Aparência mais descansada e jovem.",
        mental:
          "Insônia se torna coisa do passado. Capacidade de 'cochilos estratégicos' de 20min que rendem como 2h. Clareza mental matinal excepcional. Produtividade do dia seguinte dispara.",
        sensation:
          "Você domina seu sono como um atleta de elite domina seu corpo.",
      },
      month3: {
        title: "😴 POTENCIAL MÁXIMO",
        description:
          "Você consegue adormecer em qualquer lugar em minutos. Acorda no horário exato sem alarme. Seu corpo se regenera completamente toda noite. Você precisa de menos sono mas tem mais energia. Jet lag e mudanças de fuso não te afetam mais. Você tem o sono de uma criança saudável.",
      },
    },
    audioUrlAmbiente: "/audio/sono-ambiente.mp3",
    audioUrlPuro: "/audio/sono-puro.mp3",
  },
  "chave-mestra": {
    id: "chave-mestra",
    title: "CHAVE MESTRA",
    frequency: "963Hz + THETA",
    iconName: "Gem",
    category: "espiritualidade",
    tagline: "Prosperidade, intuição e conexão com a Fonte",
    description:
      "963Hz é a 'frequência de Deus' - ativa a glândula pineal (terceiro olho) e conecta você com campos de informação superiores. Combinada com ondas Theta, cria o estado perfeito para manifestação, intuição aguçada e atração de oportunidades.",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (ativação pineal requer precisão)",
      posture: "Sentado em meditação (coluna reta) OU deitado com intenção clara",
      duration: "Mínimo 15 minutos | Ideal 30-45 minutos | Máximo 1 hora",
      bestTime: "Antes de planejar negócios, visualizar metas OU ao acordar",
      tips: [
        "Defina uma intenção clara antes de começar",
        "Visualize seus objetivos durante a sessão",
        "Mantenha um diário de insights e sincronicidades",
        "Use cristais ou objetos significativos se ressoar com você",
      ],
    },
    evolution: {
      day1: {
        title: "💎 ABERTURA DO PORTAL",
        physical:
          "Pressão ou formigamento na região da testa (terceiro olho). Sensação de expansão no topo da cabeça. Arrepios pelo corpo. Lágrimas espontâneas (liberação).",
        mental:
          "Pensamentos limitantes perdem força. Insights surgem sobre situações travadas. Sensação de estar 'conectado a algo maior'. Clareza sobre próximos passos.",
        sensation:
          "Como se uma porta invisível tivesse se aberto na sua mente.",
      },
      week1: {
        title: "🔮 INTUIÇÃO AGUÇADA",
        physical:
          "Sonhos se tornam proféticos e significativos. Sensibilidade energética aumenta. Você 'sente' pessoas e ambientes. Sincronicidades físicas começam (encontros 'coincidentes').",
        mental:
          "Você começa a 'saber' coisas antes de acontecerem. Decisões se tornam mais fáceis. Pessoas certas aparecem na sua vida. Oportunidades surgem 'do nada'.",
        sensation: "O universo parece estar conspirando a seu favor.",
      },
      month1: {
        title: "👑 MANIFESTAÇÃO ATIVA",
        physical:
          "Sua presença atrai pessoas e recursos. Negociações fluem a seu favor. Dinheiro e oportunidades aparecem de formas inesperadas. Saúde e vitalidade aumentam.",
        mental:
          "O que você visualiza começa a se materializar. Você opera com uma 'vantagem invisível'. Medo de escassez desaparece. Abundância se torna seu estado natural.",
        sensation: "Você se torna um ímã para o que deseja.",
      },
      month3: {
        title: "✨ POTENCIAL MÁXIMO",
        description:
          "Você vive em estado de flow constante com o universo. Sua intuição se torna seu maior ativo nos negócios e na vida. Oportunidades que pareciam impossíveis se abrem. Você atrai sua tribo - pessoas alinhadas com seu propósito. Prosperidade flui naturalmente. Você se torna um canal de abundância para si e para outros.",
      },
    },
    audioUrlAmbiente: "/audio/chave-mestra-ambiente.mp3",
    audioUrlPuro: "/audio/chave-mestra-puro.mp3",
  },
  libertacao: {
    id: "libertacao",
    title: "LIBERTAÇÃO",
    frequency: "396Hz",
    iconName: "Unlock",
    category: "ansiedade",
    tagline: "Dissolve o medo e liberta da culpa",
    description:
      "396Hz é a primeira das frequências Solfeggio sagradas, vibrando na raiz do seu ser. Ela trabalha diretamente sobre o medo paralisante e a culpa enraizada - aqueles pesos invisíveis que sabotam seus passos. Ao soar, dissolve correntes emocionais antigas e devolve o solo firme sob seus pés, transformando o medo em coragem serena.",
    audioUrlAmbiente: "/audio/libertacao-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a frequência precisa alcançar o chakra raiz com precisão)",
      posture: "Sentado com os pés firmes no chão OU deitado, mãos sobre o ventre",
      duration: "Mínimo 10 minutos | Ideal 20-30 minutos | Máximo 1 hora",
      bestTime: "Ao acordar para começar o dia leve OU à noite para soltar os pesos do dia",
      tips: [
        "Antes de iniciar, nomeie em silêncio o medo ou a culpa que deseja soltar",
        "Imagine raízes saindo dos seus pés ancorando você na terra",
        "Permita que lágrimas venham se precisarem - é liberação, não fraqueza",
        "Beba água após a sessão para selar a limpeza energética",
      ],
    },
    evolution: {
      day1: {
        title: "🔓 PRIMEIRA SOLTURA",
        physical:
          "Sensação de peso deixando o peito e o estômago. Respiração mais ampla e profunda. Calor suave na região da base da coluna. Ombros descem naturalmente.",
        mental:
          "Pensamentos de culpa perdem nitidez. O medo parece um pouco mais distante. Surge uma vontade silenciosa de recomeçar. Alívio inesperado.",
        sensation:
          "Como se você tivesse colocado no chão uma mochila pesada que carregava há anos.",
      },
      week1: {
        title: "🌱 RAÍZES FIRMES",
        physical:
          "Tensão crônica no abdômen diminui. Sono mais tranquilo. Sensação de estar mais 'aterrado' e presente no corpo. Menos sobressaltos e reações de pânico.",
        mental:
          "A culpa antiga começa a perder o poder de te paralisar. Você toma pequenas decisões sem o medo travar você. Padrões autossabotadores ficam visíveis - e por isso, mais fáceis de soltar.",
        sensation:
          "Você percebe que pode pisar firme onde antes hesitava.",
      },
      month1: {
        title: "🛡️ LIBERDADE INTERIOR",
        physical:
          "Corpo mais leve e relaxado de forma constante. Digestão e respiração mais equilibradas. Energia que estava presa no medo agora circula livre.",
        mental:
          "Você age a partir do desejo, não do medo. A culpa deixa de ser bússola. Você se perdoa por capítulos antigos. Coragem serena se torna seu novo padrão.",
        sensation:
          "Você caminha pela vida sem aquele freio invisível que sempre te segurou.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "O medo deixa de ser dono das suas escolhas e vira um conselheiro discreto. A culpa do passado se transforma em sabedoria, não em prisão. Você se move pelo mundo com leveza e firmeza ao mesmo tempo. Sua presença liberta os outros, pois você se tornou prova viva de que é possível recomeçar. A raiz do seu ser está finalmente em paz.",
      },
    },
    audioUrlPuro: "/audio/libertacao-puro.mp3",
  },
  mudanca: {
    id: "mudanca",
    title: "MUDANÇA",
    frequency: "417Hz",
    iconName: "RefreshCw",
    category: "tristeza",
    tagline: "Limpa traumas e facilita transformações",
    description:
      "417Hz é a frequência da reviravolta. Ela penetra nas memórias celulares onde traumas ficaram congelados e desfaz situações cristalizadas que te prendem ao passado. Como uma maré que reorganiza a areia, esta vibração limpa o terreno emocional e abre espaço para o novo - tornando a mudança não apenas possível, mas natural.",
    audioUrlAmbiente: "/audio/mudanca-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a frequência atua em camadas profundas da memória)",
      posture: "Deitado confortavelmente OU sentado em posição relaxada, olhos fechados",
      duration: "Mínimo 12 minutos | Ideal 25-40 minutos | Máximo 1h30",
      bestTime: "Em momentos de transição de vida OU sempre que se sentir 'travado'",
      tips: [
        "Antes de começar, escreva em uma frase o que você deseja transformar",
        "Não force lembranças - deixe que o que precisa vir, venha",
        "Respire fundo quando emoções surgirem e deixe-as passar",
        "Após a sessão, anote qualquer insight sobre mudanças necessárias",
      ],
    },
    evolution: {
      day1: {
        title: "🌊 PRIMEIRA ONDA",
        physical:
          "Sensação de movimento sutil pelo corpo, como ondas. Leve formigamento nas mãos. Calor no plexo solar. Respiração que se solta em suspiros.",
        mental:
          "Memórias antigas afloram sem o peso habitual. Sensação de que algo travado começou a se mexer. Vontade de organizar, mudar, recomeçar.",
        sensation:
          "Como se uma porta enferrujada finalmente começasse a girar nas dobradiças.",
      },
      week1: {
        title: "🍂 SOLTANDO O VELHO",
        physical:
          "Menos tensão acumulada nos ombros e mandíbula. Sono com sonhos de reorganização. Sensação de mais espaço interno. Energia que estava estagnada começa a fluir.",
        mental:
          "Traumas antigos perdem a carga emocional. Você consegue olhar para o passado sem se machucar tanto. Surgem ideias claras sobre o que precisa mudar na sua vida.",
        sensation:
          "Você sente que está finalmente saindo de um lugar onde estava preso há tempo demais.",
      },
      month1: {
        title: "🦋 METAMORFOSE",
        physical:
          "Corpo mais flexível e responsivo. Padrões físicos de estresse se desfazem. Você se sente leve, como quem trocou de pele.",
        mental:
          "Situações que pareciam imutáveis começam a se transformar. Você abandona hábitos e relações que não servem mais. A mudança deixa de assustar e passa a animar.",
        sensation:
          "Você se reconhece como alguém em plena transformação, não mais preso ao que foi.",
      },
      month3: {
        title: "✨ POTENCIAL MÁXIMO",
        description:
          "Traumas que definiam sua vida se tornam apenas histórias antigas, sem poder sobre você. Você se torna fluido diante das mudanças, surfando ondas que antes te derrubavam. Situações cristalizadas se dissolveram e o novo flui livremente. Você é agora um agente da própria transformação - e inspira os outros a também se libertarem do passado.",
      },
    },
    audioUrlPuro: "/audio/mudanca-puro.mp3",
  },
  coracao: {
    id: "coracao",
    title: "CORAÇÃO",
    frequency: "639Hz",
    iconName: "Heart",
    category: "tristeza",
    tagline: "Harmoniza relações e abre o coração para o amor",
    description:
      "639Hz é a frequência do amor que conecta. Ela sintoniza o chakra cardíaco e harmoniza os campos energéticos entre as pessoas, curando feridas em relacionamentos e dissolvendo ressentimentos. Esta vibração reabre o coração fechado pela mágoa, restaurando a capacidade de amar, perdoar e se conectar verdadeiramente.",
    audioUrlAmbiente: "/audio/coracao-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a harmonização cardíaca requer imersão completa)",
      posture: "Sentado ou deitado, com uma das mãos sobre o coração",
      duration: "Mínimo 12 minutos | Ideal 25-40 minutos | Máximo 1 hora",
      bestTime: "Antes de conversas importantes OU ao pensar em alguém que deseja perdoar",
      tips: [
        "Visualize a pessoa com quem deseja se harmonizar durante a sessão",
        "Respire 'para dentro do coração', sentindo a região se aquecer",
        "Envie mentalmente perdão e gratidão - inclusive a você mesmo",
        "Não se surpreenda se sentir vontade de chorar ou de abraçar alguém",
      ],
    },
    evolution: {
      day1: {
        title: "💗 PRIMEIRO BATIMENTO",
        physical:
          "Calor agradável no centro do peito. Respiração mais suave e ampla. Sensação de relaxamento ao redor do coração. Leve arrepio de emoção.",
        mental:
          "Ressentimentos perdem força. Surge ternura inesperada por pessoas e por si mesmo. Memórias afetivas afloram com doçura.",
        sensation:
          "Como se um nó apertado no peito começasse, enfim, a se desfazer.",
      },
      week1: {
        title: "🤝 RECONEXÃO",
        physical:
          "Menos aperto no peito em situações emocionais. Sono mais tranquilo. Sensação de calor e abertura na região cardíaca durante o dia.",
        mental:
          "Você perdoa mágoas que carregava há tempo. Conversas difíceis ficam mais leves. Você se aproxima de quem ama com menos defesas e mais verdade.",
        sensation:
          "Você percebe que está mais disponível para amar e ser amado.",
      },
      month1: {
        title: "💞 CORAÇÃO ABERTO",
        physical:
          "Sensação constante de leveza no peito. Maior vitalidade e calor humano irradiando de você. Tensões emocionais antigas dissolvidas.",
        mental:
          "Seus relacionamentos se transformam - mais empatia, menos cobrança. Você atrai pessoas mais afetuosas. O amor-próprio floresce e se reflete em tudo.",
        sensation:
          "Você ama com mais profundidade e se sente verdadeiramente conectado aos outros.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "Seu coração se torna uma fonte de amor que transborda para todos ao seu redor. Antigas mágoas e ressentimentos se transformaram em compaixão. Suas relações são marcadas pela harmonia, pela verdade e pela ternura. Você ama sem medo de se machucar, porque encontrou a segurança dentro do próprio peito. Sua presença aquece e cura quem se aproxima.",
      },
    },
    audioUrlPuro: "/audio/coracao-puro.mp3",
  },
  despertar: {
    id: "despertar",
    title: "DESPERTAR",
    frequency: "741Hz",
    iconName: "Sparkles",
    category: "elevar",
    tagline: "Limpeza profunda e poder de expressão",
    description:
      "741Hz é a frequência da limpeza e da voz verdadeira. Ela dissolve toxinas energéticas e padrões mentais densos, ao mesmo tempo em que desbloqueia a garganta - o centro da expressão. Esta vibração desperta a clareza, fortalece sua capacidade de dizer a sua verdade e purifica corpo e mente das interferências que abafam quem você realmente é.",
    audioUrlAmbiente: "/audio/despertar-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a limpeza vibracional exige precisão)",
      posture: "Sentado com a coluna ereta, queixo levemente recolhido, garganta relaxada",
      duration: "Mínimo 10 minutos | Ideal 20-35 minutos | Máximo 1 hora",
      bestTime: "Antes de falar em público, criar ou se expressar OU para uma faxina energética",
      tips: [
        "Faça alguns sons ou cantarole suavemente antes de começar para abrir a garganta",
        "Visualize uma luz azul limpando sua garganta e seu campo energético",
        "Defina a intenção de purificar o que está pesado em você",
        "Beba bastante água ao longo do dia para apoiar a limpeza",
      ],
    },
    evolution: {
      day1: {
        title: "🌬️ PRIMEIRA LIMPEZA",
        physical:
          "Sensação de leveza na garganta e no peito. Vontade de respirar fundo e suspirar. Leve formigamento no pescoço. Corpo parece mais 'limpo'.",
        mental:
          "Confusão mental começa a se dissipar. Clareza sobre o que você quer dizer. Vontade de se expressar com mais verdade.",
        sensation:
          "Como se uma névoa estivesse se dissipando ao redor da sua mente.",
      },
      week1: {
        title: "🗣️ VOZ DESPERTA",
        physical:
          "Garganta mais aberta e relaxada. Menos sensação de 'nó' ao falar de coisas difíceis. Energia mais limpa e vibrante. Sono mais reparador.",
        mental:
          "Você se expressa com mais coragem e clareza. Para de engolir o que precisa dizer. Pensamentos densos perdem força e a mente fica mais nítida.",
        sensation:
          "Você sente que sua voz finalmente começa a ocupar o espaço que merece.",
      },
      month1: {
        title: "💎 EXPRESSÃO PLENA",
        physical:
          "Vitalidade renovada, corpo livre de peso energético. Garganta e respiração plenamente desbloqueadas. Aparência mais luminosa.",
        mental:
          "Você comunica suas verdades com naturalidade e firmeza. Sua clareza inspira respeito. Padrões mentais tóxicos foram dissolvidos e substituídos por lucidez.",
        sensation:
          "Você se sente limpo, lúcido e autêntico em tudo o que diz e faz.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "Sua expressão se torna um instrumento poderoso e autêntico - você diz a sua verdade sem medo e com elegância. Corpo e mente operam em estado de limpeza constante, livres de toxinas energéticas. Você desperta para uma versão mais clara e luminosa de si mesmo. Sua voz inspira, esclarece e transforma. Você se tornou um canal límpido entre o que sente e o que manifesta no mundo.",
      },
    },
    audioUrlPuro: "/audio/despertar-puro.mp3",
  },
  intuicao: {
    id: "intuicao",
    title: "INTUIÇÃO",
    frequency: "852Hz",
    iconName: "Eye",
    category: "elevar",
    tagline: "Retorno à ordem espiritual e abertura do terceiro olho",
    description:
      "852Hz é a frequência do retorno à ordem espiritual. Ela ativa o terceiro olho e dissolve as ilusões que turvam sua percepção, reconectando você à sua intuição mais profunda. Esta vibração eleva a consciência acima do ruído mental, despertando a visão interior e o reconhecimento da sua natureza espiritual.",
    audioUrlAmbiente: "/audio/intuicao-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a ativação do terceiro olho requer precisão)",
      posture: "Sentado em meditação, coluna ereta, atenção voltada ao ponto entre as sobrancelhas",
      duration: "Mínimo 12 minutos | Ideal 25-45 minutos | Máximo 1 hora",
      bestTime: "Ao amanhecer ou anoitecer OU antes de meditar e buscar respostas",
      tips: [
        "Concentre suavemente a atenção no ponto entre as sobrancelhas",
        "Não tente forçar visões - permita que a percepção venha sozinha",
        "Faça uma pergunta interior e fique aberto a sinais e intuições",
        "Mantenha um diário de sonhos e insights ao lado da cama",
      ],
    },
    evolution: {
      day1: {
        title: "👁️ PRIMEIRA VISÃO",
        physical:
          "Pressão suave entre as sobrancelhas. Sensação de expansão na testa. Leve formigamento no topo da cabeça. Olhos relaxados, como se enxergassem para dentro.",
        mental:
          "A mente se aquieta e fica mais perceptiva. Surgem intuições sutis. Sensação de reconexão com algo maior e mais antigo dentro de você.",
        sensation:
          "Como se um olho interior, há muito adormecido, começasse a se abrir.",
      },
      week1: {
        title: "🔮 PERCEPÇÃO AMPLIADA",
        physical:
          "Maior sensibilidade à luz e aos ambientes. Sonhos mais nítidos e simbólicos. Sensação frequente de leveza na região da testa.",
        mental:
          "Sua intuição começa a guiar pequenas decisões com acerto. Você percebe sinais e sincronicidades. Ilusões e autoenganos ficam mais evidentes.",
        sensation:
          "Você passa a confiar mais naquela sabedoria silenciosa que vem de dentro.",
      },
      month1: {
        title: "🌌 VISÃO INTERIOR",
        physical:
          "Terceiro olho ativo e desperto. Percepção apurada do entorno. Estados meditativos profundos alcançados com facilidade.",
        mental:
          "Sua intuição se torna uma bússola confiável. Você enxerge além das aparências. A conexão com sua dimensão espiritual orienta sua vida com clareza.",
        sensation:
          "Você sente que voltou para uma ordem maior, onde tudo faz sentido.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "Seu terceiro olho permanece desperto e sua intuição se torna seu guia mais confiável. Você percebe a verdade por trás das aparências e navega a vida com sabedoria silenciosa. As ilusões perderam o poder de te enganar. Você vive alinhado à ordem espiritual, sentindo-se parte de algo infinitamente maior. Sua presença irradia serenidade e profundidade.",
      },
    },
    audioUrlPuro: "/audio/intuicao-puro.mp3",
  },
  raiz: {
    id: "raiz",
    title: "RAIZ",
    frequency: "174Hz",
    iconName: "Anchor",
    category: "cura",
    tagline: "Alívio da dor física e sensação de segurança",
    description:
      "174Hz é a mais grave das frequências de cura, vibrando como um alicerce. Ela age como um anestésico natural, aliviando dores físicas e tensões, ao mesmo tempo em que envolve o corpo em uma profunda sensação de segurança. Esta vibração ancora você, sinalizando a cada célula que é seguro relaxar e se curar.",
    audioUrlAmbiente: "/audio/raiz-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a frequência grave precisa ser sentida por inteiro)",
      posture: "Deitado confortavelmente, corpo bem apoiado, atenção sobre a área dolorida",
      duration: "Mínimo 15 minutos | Ideal 30-45 minutos | Máximo 2 horas",
      bestTime: "Em momentos de dor ou tensão física OU antes de dormir para relaxar o corpo",
      tips: [
        "Direcione a atenção e a respiração para a região que dói",
        "Imagine a frequência como um cobertor pesado e quente sobre você",
        "Permita-se ficar completamente imóvel e apoiado",
        "Use em conjunto com calor (bolsa térmica) para potencializar o alívio",
      ],
    },
    evolution: {
      day1: {
        title: "⚓ PRIMEIRO ALÍVIO",
        physical:
          "Sensação de peso confortável relaxando o corpo. Diminuição perceptível de dores e tensões. Calor que se espalha pelos músculos. Respiração mais lenta e profunda.",
        mental:
          "Sensação de segurança e proteção. A mente para de focar na dor. Surge uma tranquilidade que vem do corpo relaxado.",
        sensation:
          "Como se o corpo todo recebesse a permissão para finalmente descansar.",
      },
      week1: {
        title: "🧱 ALICERCE FIRME",
        physical:
          "Dores crônicas começam a diminuir de intensidade. Músculos menos contraídos. Sono mais profundo e contínuo. Corpo mais relaxado ao longo do dia.",
        mental:
          "Sensação constante de estar mais seguro e ancorado. Menos ansiedade ligada ao corpo. Maior paciência com processos de cura.",
        sensation:
          "Você sente que tem um chão firme sob você, mesmo nos dias difíceis.",
      },
      month1: {
        title: "🏔️ CORPO SEGURO",
        physical:
          "Redução significativa de dores físicas. Tensões antigas dissolvidas. Corpo que relaxa com facilidade. Vitalidade física restaurada.",
        mental:
          "Sensação profunda e estável de segurança. Você confia no seu corpo novamente. A relação com a dor se transforma - menos medo, mais cuidado.",
        sensation:
          "Você habita seu corpo como um lar seguro e acolhedor.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "Seu corpo se torna um território de segurança e alívio. Dores que pareciam permanentes perderam força e você domina o relaxamento profundo. A sensação de estar ancorado e protegido se tornou seu estado natural. Você se cura com mais facilidade porque seu corpo confia que é seguro fazê-lo. Você é, enfim, alicerce firme para si mesmo.",
      },
    },
    audioUrlPuro: "/audio/raiz-puro.mp3",
  },
  renovacao: {
    id: "renovacao",
    title: "RENOVAÇÃO",
    frequency: "285Hz",
    iconName: "Leaf",
    category: "cura",
    tagline: "Regeneração de tecidos e campos energéticos",
    description:
      "285Hz é a frequência da regeneração estrutural. Ela atua reorganizando tecidos e órgãos, enviando uma mensagem de restauração às células danificadas, ao mesmo tempo em que repara o campo energético ao redor do corpo. Esta vibração lembra a sua matéria de sua forma original e saudável, acelerando a renovação em todos os níveis.",
    audioUrlAmbiente: "/audio/renovacao-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a regeneração celular requer imersão profunda)",
      posture: "Deitado de barriga para cima, corpo relaxado, mãos sobre a área a regenerar",
      duration: "Mínimo 15 minutos | Ideal 30-45 minutos | Máximo 2 horas",
      bestTime: "Após esforço físico ou em processos de recuperação OU antes de dormir",
      tips: [
        "Visualize a região do corpo se reconstruindo, célula por célula",
        "Mantenha as mãos sobre a área que precisa de regeneração",
        "Respire calmamente, imaginando que cada inspiração leva cura ao local",
        "Hidrate-se bem para apoiar a reconstrução dos tecidos",
      ],
    },
    evolution: {
      day1: {
        title: "🌱 PRIMEIRO BROTO",
        physical:
          "Formigamento sutil nas áreas em recuperação. Calor restaurador percorrendo o corpo. Sensação de relaxamento profundo nos tecidos. Respiração que se aprofunda sozinha.",
        mental:
          "Sensação de esperança e renovação. A mente entra em estado de cura. Surge uma confiança silenciosa de que o corpo sabe se curar.",
        sensation:
          "Como se algo dentro de você começasse, delicadamente, a se reconstruir.",
      },
      week1: {
        title: "🌿 REGENERAÇÃO EM CURSO",
        physical:
          "Recuperação física mais rápida. Pele e tecidos com aparência mais saudável. Menos inflamação e desconforto. Energia vital aumentando.",
        mental:
          "Maior senso de integridade e bem-estar. Otimismo em relação à própria saúde. Sensação de estar 'inteiro' de novo.",
        sensation:
          "Você percebe seu corpo se renovando dia após dia.",
      },
      month1: {
        title: "🍃 RENOVAÇÃO PROFUNDA",
        physical:
          "Tecidos visivelmente mais saudáveis e fortes. Campo energético equilibrado e íntegro. Vitalidade restaurada em alto nível. Aparência rejuvenescida.",
        mental:
          "Confiança plena na capacidade de cura do seu corpo. Sensação de estar renovado por dentro e por fora. Bem-estar estável e contínuo.",
        sensation:
          "Você se sente reconstruído, como uma versão renovada de si mesmo.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "Seu corpo se torna uma máquina de regeneração contínua, restaurando tecidos e campos energéticos com eficiência notável. O que estava danificado encontrou o caminho de volta à integridade. Sua vitalidade e aparência refletem uma renovação profunda. Você irradia saúde estrutural e energética, e seu organismo opera lembrando, a cada instante, da sua forma original e perfeita.",
      },
    },
    audioUrlPuro: "/audio/renovacao-puro.mp3",
  },
  abundancia: {
    id: "abundancia",
    title: "ABUNDÂNCIA",
    frequency: "888Hz",
    iconName: "Coins",
    category: "prosperidade",
    tagline: "Atrai fartura e sincronicidades",
    description:
      "888Hz é a frequência da abundância infinita. Associada ao fluxo ininterrupto de prosperidade, ela sintoniza seu campo energético com a fartura do universo e abre os canais para que oportunidades e sincronicidades se manifestem. Esta vibração dissolve a mentalidade de escassez e reprograma você para receber - dinheiro, amor, oportunidades e graças em abundância.",
    audioUrlAmbiente: "/audio/abundancia-ambiente.mp3",
    howToUse: {
      equipment:
        "Fones de ouvido estéreo obrigatórios (a sintonia com a abundância requer imersão)",
      posture: "Sentado em posição confortável, mãos abertas com as palmas para cima",
      duration: "Mínimo 12 minutos | Ideal 25-40 minutos | Máximo 1 hora",
      bestTime: "Ao acordar para programar o dia OU antes de planejar metas e negócios",
      tips: [
        "Visualize a abundância chegando a você por todos os canais",
        "Mantenha as palmas para cima, em gesto de recebimento",
        "Sinta gratidão antecipada, como se a fartura já fosse sua",
        "Anote as sincronicidades e oportunidades que surgirem ao longo dos dias",
      ],
    },
    evolution: {
      day1: {
        title: "💰 PRIMEIRA SINTONIA",
        physical:
          "Sensação de expansão no peito e nas mãos. Calor agradável percorrendo o corpo. Leveza e abertura. Respiração ampla e tranquila.",
        mental:
          "A mentalidade de escassez se afrouxa. Surge uma sensação de possibilidade. Gratidão e otimismo afloram naturalmente.",
        sensation:
          "Como se o universo abrisse as portas e dissesse: há o bastante para você.",
      },
      week1: {
        title: "🌟 FLUXO ABERTO",
        physical:
          "Sensação constante de abertura e leveza. Energia mais alta e magnética. Sono tranquilo com sonhos de fartura.",
        mental:
          "Você começa a notar pequenas sincronicidades. Oportunidades inesperadas aparecem. O medo de não ter o suficiente perde força.",
        sensation:
          "Você sente que está, enfim, no fluxo certo das coisas boas.",
      },
      month1: {
        title: "✨ ÍMÃ DE PROSPERIDADE",
        physical:
          "Presença magnética que atrai pessoas e recursos. Vitalidade e entusiasmo elevados. Energia de abundância irradiando de você.",
        mental:
          "Oportunidades fluem com frequência crescente. Sincronicidades se tornam comuns. Você opera a partir da certeza da fartura, não do medo da falta.",
        sensation:
          "Você se torna um ímã natural para a prosperidade em todas as áreas.",
      },
      month3: {
        title: "👑 POTENCIAL MÁXIMO",
        description:
          "Você vive em estado constante de abundância e fluxo. Dinheiro, oportunidades e graças chegam por caminhos inesperados e sincronicidades se tornam o seu cotidiano. A mentalidade de escassez foi completamente reprogramada para a de fartura. Você não apenas recebe em abundância, mas se torna um canal de prosperidade para os outros. O universo conspira, de forma generosa e contínua, a seu favor.",
      },
    },
    audioUrlPuro: "/audio/abundancia-puro.mp3",
  },
};

// Ordem e rótulos das categorias para a tela Biblioteca.
export const categoryOrder: string[] = [
  "ansiedade",
  "tristeza",
  "elevar",
  "espiritualidade",
  "foco",
  "sono",
  "cura",
  "prosperidade",
];

export const categoryLabels: Record<string, string> = {
  ansiedade: "Ansiedade",
  tristeza: "Tristeza",
  elevar: "Elevar a Frequência",
  espiritualidade: "Espiritualidade",
  foco: "Foco",
  sono: "Sono",
  cura: "Cura",
  prosperidade: "Prosperidade",
};
