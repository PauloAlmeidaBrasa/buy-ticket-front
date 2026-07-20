# Buy Tickets Frontend

Aplicacao frontend para compra de ingressos, desenvolvida com Vue 3, TypeScript e Vite.

## Tecnologias Utilizadas

- Vue 3 (Single File Components)
- TypeScript
- Vite
- Vue Router
- Pinia (gerenciamento de estado)
- Axios (cliente HTTP)
- Tailwind CSS v4
- Docker (execucao em desenvolvimento)

## Pre-requisitos

- Node.js 20+
- npm 10+

Para executar com Docker:

- Docker instalado e em execucao

## Variavel de Ambiente

O projeto utiliza a seguinte variavel de ambiente do Vite:

- `VITE_API_BASE_URL`: URL base para requisicoes da API backend.

Exemplo no arquivo `.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:8082/api/v1/
```

Observacoes importantes:

- Nomes de variaveis devem comecar com `VITE_` para ficarem disponiveis no frontend via Vite.
- Reinicie o servidor de desenvolvimento apos alterar valores no `.env`.

## Executando Localmente (Node)

1. Instale as dependencias:

```bash
npm ci
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse:

- `http://localhost:5173`

## Executando com Docker

Este repositorio inclui o arquivo `Dockerfile.dev` para desenvolvimento.

1. Construa a imagem:

```bash
docker build -f Dockerfile.dev -t buy-tickets-front:dev .
```

2. Execute o container:

```bash
docker run --rm -it \
	-p 5173:5173 \
	--env-file .env \
	-v "$(pwd)":/app \
	-v /app/node_modules \
	buy-tickets-front:dev
```

3. Acesse:

- `http://localhost:5173`

Observacoes:

- `--env-file .env` injeta `VITE_API_BASE_URL` e quaisquer outras variaveis de ambiente.
- O bind mount mantem alteracoes locais sincronizadas no container em tempo real.

## Scripts Disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento do Vite.
- `npm run build`: faz type-check com `vue-tsc` e gera o build de producao.
- `npm run preview`: serve localmente o build de producao.

## TypeScript

TypeScript e utilizado em todo o projeto para:

- Logica dos componentes
- Tipagem da camada de servicos
- Contratos de requisicao/resposta da API
- Tipagem de stores com Pinia

Arquivos relevantes:

- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `src/types/`

O comando abaixo valida as tipagens antes do empacotamento:

```bash
npm run build
```

## Estrutura do Projeto

```text
.
├── Dockerfile.dev
├── index.html
├── package.json
├── vite.config.ts
├── public/
└── src/
    ├── main.ts                  # bootstrap da aplicacao
    ├── App.vue                  # componente raiz
    ├── style.css                # estilos globais
    ├── api/
    │   ├── axios.ts             # configuracao da instancia Axios
    │   └── interceptors.ts      # interceptadores de requisicao/resposta
    ├── assets/                  # assets estaticos importados no codigo
    ├── components/              # componentes Vue reutilizaveis
    ├── router/
    │   └── index.ts             # definicoes de rotas
    ├── service/                 # camada de servicos por dominio
    │   ├── ticket.ts
    │   └── user.ts
    ├── stores/                  # stores do Pinia
    │   ├── ticket.ts
    │   └── user.ts
    ├── types/                   # contratos/interfaces TypeScript
    │   ├── login.ts
    │   ├── loginResponse.ts
    │   ├── ticket.ts
    │   └── user.ts
    ├── util/
    │   └── generalUtil.ts
    └── views/
        ├── LoginView.vue
        └── tickets/
            ├── BuyTicketModal.vue
            └── TicketListView.vue
```

## Notas de Desenvolvimento

- Mantenha alteracoes de endpoints centralizadas nos arquivos em `src/service/`.
- Prefira tipar novos payloads e respostas em `src/types/` antes de adicionar chamadas de API.
- Se a URL do backend mudar por ambiente, crie arquivos `.env` correspondentes (exemplo: `.env.development`, `.env.production`).
