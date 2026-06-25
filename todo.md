# Project TODO - Portal de Frequências Sonoras

## Portal de Experiência Imersiva

### Tela 1: O Portão (Login)
- [x] Fundo preto absoluto (#050505)
- [x] Logo da marca (Olho/Pirâmide Dourado) com efeito de respiração/pulsação
- [x] Campo de email com linha dourada fina
- [x] Botão "ENTRAR NO SISTEMA" dourado fosco
- [x] Design limpo e minimalista

### Tela 2: Painel de Controle (Dashboard)
- [x] Saudação "Bem-vindo, Iniciado [Nome]"
- [x] Título "SELECIONE SUA FREQUÊNCIA"
- [x] Grid de 3 cards visuais:
  - [x] ESCUDO (432Hz) - Ícone de escudo protetor
  - [x] REGENERAÇÃO (528Hz) - Ícone de DNA/gota
  - [x] FOCO (GAMMA) - Ícone de raio/olho
- [x] Botão "Acessar Documentário e Biblioteca (PDF)"

### Tela 3: Câmara de Ressonância (Player)
- [x] Visualizer: Imagem Cimática Dourada girando lentamente
- [x] Player com barra de progresso dourada
- [x] Botão Play/Pause centralizado
- [x] Botão Loop (Repetir)
- [x] Manual de Instruções (Protocolo de Uso):
  - [x] Função da frequência
  - [x] Como Ouvir (fones obrigatórios)
  - [x] Postura recomendada
  - [x] Tempo mínimo
  - [x] Sensação esperada
- [x] Botão "Voltar ao Painel" discreto

### Style Guide
- Fundo: #050505 (Preto absoluto)
- Dourado: #C5A059
- Branco: #EAEAEA
- Fonte Títulos: Cinzel
- Fonte Texto: Montserrat

### Funcionalidades Backend (já implementadas)
- [x] Tabela de emails autorizados
- [x] Webhook Kirvano para adicionar emails automaticamente
- [x] Verificação de email para acesso


## Acesso Livre com Captura de Leads

- [x] Permitir entrada de qualquer email (sem verificação)
- [x] Salvar todos os emails no banco de dados
- [x] Criar tabela de visitantes/leads

## Atualização de Frequências e Mobile

### Remover
- [x] Remover botão "Acessar Documentário e Biblioteca (PDF)"
- [x] Remover página de Biblioteca

### Adicionar Novas Frequências
- [x] SONO PROFUNDO (Ondas Delta) - Induzir sono REM e desligar pensamentos
- [x] CHAVE MESTRA (963Hz/Theta) - Prosperidade e intuição

### Ajustes Mobile
- [x] Melhorar layout responsivo no celular
- [x] Cards de frequência em coluna única no mobile
- [x] Ajustar tamanhos de fonte para mobile

## Persistência de Login

- [x] Salvar email no localStorage após primeiro acesso
- [x] Redirecionar automaticamente para dashboard se email já estiver salvo
- [x] Manter opção de sair/trocar email

## Simplificar Portal de Acesso

- [x] Remover campo de email do login
- [x] Deixar apenas botão de entrada direta

## Modos de Potência nas Frequências

- [x] Adicionar seletor de modo (Ambiente/Puro) no Player
- [x] Modo Ambiente como padrão (áudio bonito)
- [x] Modo Puro (frequência tecnológica)
- [x] Aviso de recomendação (7 dias no Modo Ambiente)
- [x] Salvar preferência do modo selecionado

## Jornada de Transformação

- [x] Adicionar seção de benefícios detalhados em cada frequência
- [x] Mostrar evolução: 1 dia, 1 semana, 1 mês
- [x] Mostrar potencial máximo alcançável
- [x] Design elegante com timeline visual

## Melhorias na Seção de Evolução

- [x] Deixar seção de benefícios e evolução sempre visível (não escondida)
- [x] Adicionar mais detalhes em cada etapa (1 dia, 1 semana, 1 mês)
- [x] Incluir instruções mais completas de como usar
- [x] Mostrar claramente a progressão/evolução do usuário
- [x] Aplicar em todas as 5 frequências (Escudo, Foco, Regeneração, Sono, Chave Mestra)

## Integração de Áudios

- [x] Upload áudio ESCUDO - AMBIENTE
- [x] Integrar URL do áudio no player

- [x] Upload áudio ESCUDO - PURO
- [x] Configurar loop infinito por padrão no modo Puro (já estava ativado por padrão)

- [x] Remover botão de loop do player
- [x] Deixar loop automático sempre ativado

- [x] Upload áudio FOCO LASER - AMBIENTE

- [x] Implementar botão de compartilhamento nas páginas de frequência
- [x] Adicionar opções: WhatsApp, Facebook, Twitter, Telegram, Copiar Link

- [x] Remover botão de compartilhamento do player

## Áudios Pendentes

- [x] FOCO LASER - Puro
- [x] REGENERAÇÃO - Ambiente
- [x] REGENERAÇÃO - Puro
- [x] SONO PROFUNDO - Ambiente
- [x] SONO PROFUNDO - Puro
- [x] CHAVE MESTRA - Ambiente
- [x] CHAVE MESTRA - Puro

## Transformação em PWA com Autenticação

- [x] Adicionar tela de login com verificação de email
- [x] Bloquear acesso ao dashboard para emails não autorizados
- [x] Configurar manifest.json para PWA
- [x] Adicionar service worker para funcionar offline
- [x] Adicionar ícones do app
- [ ] Testar instalação do PWA no celular
- [ ] Documentar configuração do webhook Kirvano

## Remover Verificação Obrigatória de Email

- [x] Remover verificação de email autorizado no backend (não necessário)
- [x] Atualizar Home.tsx para aceitar qualquer email sem validação
- [ ] Testar fluxo de login sem verificação
