
# FRONT-END OMNICHAT

Plataforma WEB do trabalho de conclusão de curso de Ciência da Computação

## Contextualização do projeto
Tony era conhecido por fazer as melhores pizzas. Sua pizzaria, a "Estrela da Pizza", estava sempre cheia de clientes ansiosos por uma fatia do céu. No entanto, com o avanço da tecnologia e a crescente demanda por conveniência, os clientes começaram a preferir fazer pedidos online e por diferentes canais, como WhatsApp, Instagram e Facebook, onde os funcionários não conseguiam acompanhar os pedidos, enquanto precisavam prepará-los para seu público alvo. Nesse cenário, O Omnichat é a solução perfeita para Tony conseguir resolver seus problemas de forma prática e rápida 

## Descrição Geral do projeto:
Omnichat é uma solução omnichannel para redes de restaurantes que possuem dificuldade em gerenciar seus pedidos vindos de diferentes plataformas, onde seus clientes poderiam realizar seus pedidos em plataformas de comunicação convencionais como WhatsApp, Instagram, e Facebook, sem necessidade de baixar um aplicativo próprio do estabelecimento. Ao se comunicarem com a pizzaria, os clientes são automaticamente respondidos por um Chat-Bot, responsável pela montagem dos pedidos no sistema em tempo real, enviando-os diretamente para a cozinha quando prontos.

### Pontos relevantes do projeto
- #### Multiplataforma:
  A plataforma unirá as conversas de diferentes redes sociais em um só lugar, facilitando o acompanhamento dos pedidos

- #### ChatBot
  Os pedidos são gerenciados por um assistente 
  pré-treinado, onde através do Processamento de     Linguagem Natural (NLP), os clientes podem se comunicar de forma mais livre para realizarem seus pedidos

- #### Controle do atendente sobre as conversas:
O atendente pode gerenciar e conduzir manualmente a conversa com seus clientes e os pedidos, seja a pedido do cliente ou não


## 🛠 Tecnologias e Bibliotecas

Este projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- **Frontend:**
  - **ReactJS**: Uma biblioteca JavaScript para construção de interfaces de usuário de forma eficiente e flexível.
  - **Redux**: Uma biblioteca JavaScript utilizada para gerenciar o estado da aplicação de forma previsível.
  - **Sass**: Um pré-processador CSS que permite usar recursos como variáveis, aninhamento, mixins e funções, tornando o CSS mais extensível e mantível.

- **Chatbot e IA:**
  - **Dialogflow**: Plataforma de desenvolvimento de chatbots que oferece integração com várias ferramentas e suporte a NLP (Processamento de Linguagem Natural).
- **Comunicação e Mensagens** :

  - **Twilio**: Plataforma de comunicação em nuvem que permite a programação de chamadas telefônicas, envio de SMS e outras funcionalidades de comunicação, facilitando a integração com diversos canais.

- **Outras Bibliotecas e Ferramentas:**
 
  - **Socket.io**: Biblioteca que permite comunicação em tempo real, bidirecional e baseada em eventos.
  

Estas tecnologias foram escolhidas com o objetivo de criar uma aplicação robusta, escalável e com uma excelente experiência do usuário. Cada ferramenta tem sua importância dentro do projeto e juntas formam a espinha dorsal do nosso sistema.
## Instalação e Execução

Após dar o git clone e ir para o diretorio 
`/Front-End_Omnichat`, realize o seguinte comando:

```bash
  yarn add .
```
Para executar o projeto realize o comando:

```bash
  yarn run dev
```

## Deploy

Para fazer o deploy desse projeto, basta dar commit em sua branch e fazer o merge com a branch principal `main` que será feito o deploy em produção do projeto no Vercel: [omnichat-deploy](https://vercel.com/tiagoary15/omnichat-deploy)

caso queira construir o projeto, basta rodar o comando
```bash
  yarn run build
```
será gerado a build dentro da pasta `dist` do projeto

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`GCP_CHATS_URL`: Url para as google functions do chat




## Autores

- [Tiago Ary Castelo](https://github.com/tiagoAry15)
- [Davi Tavares Frota](https://github.com/Davitfrota)

