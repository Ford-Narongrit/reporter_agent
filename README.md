# Reporter Agent

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database and Ollama service setup

```bash
$ docker compose up -d
```

## env setup

1. Copy `.env.example` to `.env`
2. Set MONGO_URI
3. Set Ollama api url
4. install Ollama model with `POST ' pull'`with body `{ "model": "llama2" }`
5. Set Ollama model name in `.env` file
6. Set Google search api engine cx `https://programmablesearchengine.google.com`
7. Set Google search api key `https://developers.google.com/custom-search/v1/introduction#api_key`
