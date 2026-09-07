# My REST API

A modular, extensible REST API built with **TypeScript + Hono**, designed to grow into a large public API platform and deploy cleanly to Vercel.

## Production

The intended Vercel project name is **`api-lip`**, so after importing this repository into Vercel, its default production URL can be:

`https://api-lip.vercel.app`

The exact production URL is confirmed by Vercel after the project is created and deployed.

## Features

- Jokes API with categories, random selection and IDs
- Live weather API using Open-Meteo
- Curated free/public API integration hub
- Country, Pokémon, animals, recipes, books, FX, words and IP endpoints
- University, trivia, testing-data and random-user endpoints
- Anime, public holidays, sunrise/sunset, Wikipedia and public GitHub repository endpoints
- Quotes and facts API
- Developer utilities: UUID, SHA-256 hash, Base64, colors and HTTP status codes
- Consistent JSON response format
- CORS, request IDs and centralized error handling
- Zod validation for external input
- Vercel serverless entrypoint
- Provider calls isolated behind a timeout-aware upstream service

## Free API Hub

The project now exposes a curated collection under `/api/v1/free` rather than blindly proxying arbitrary URLs. This is intentional: a public API directory can contain hundreds or thousands of entries, but "public" does not always mean unlimited, commercial-use-permitted, stable, or free forever. The project therefore integrates providers that are useful and publicly accessible while keeping provider-specific limits and terms in mind.

The catalog currently includes 20 integrations across weather, geo, games, animals, food, books, finance, words, networking, education, testing, people, anime, calendar, astronomy, knowledge, developer tools and content.

### Discovery endpoints

- `GET /api/v1/free/catalog` — all integrated providers
- `GET /api/v1/free/categories` — available categories
- `GET /api/v1/free/search?q=weather` — search the provider catalog

### Integrated endpoints

- `GET /api/v1/free/country/ID` — REST Countries
- `GET /api/v1/free/pokemon/pikachu` — PokéAPI
- `GET /api/v1/free/dog/random` — Dog CEO
- `GET /api/v1/free/cat/fact` — Cat Facts
- `GET /api/v1/free/meal/random` — TheMealDB
- `GET /api/v1/free/book/search?q=javascript` — Open Library
- `GET /api/v1/free/fx?from=USD&to=IDR` — Frankfurter
- `GET /api/v1/free/words?q=happy` — Datamuse
- `GET /api/v1/free/ip` — ipify
- `GET /api/v1/free/universities?country=Indonesia` — Hipolabs Universities
- `GET /api/v1/free/trivia?amount=10` — Open Trivia DB
- `GET /api/v1/free/testing/posts` — JSONPlaceholder
- `GET /api/v1/free/testing/products` — DummyJSON
- `GET /api/v1/free/random-user` — Random User
- `GET /api/v1/free/anime/search?q=naruto` — Jikan
- `GET /api/v1/free/holidays/ID/2026` — Nager.Date
- `GET /api/v1/free/sun?lat=-7.8166&lon=112.0116` — Sunrise-Sunset
- `GET /api/v1/free/wiki/search?q=Indonesia` — Wikipedia MediaWiki API
- `GET /api/v1/free/github/repo/Magnw27/my-rest-api` — GitHub public repository metadata
- `GET /api/v1/free/quote` — Quotable

## Weather

`GET /api/v1/weather?lat=-7.8166&lon=112.0116&forecast_days=3`

Weather is fetched live from Open-Meteo. Its public API does not require an API key for the current non-commercial implementation, but fair-use and licensing conditions still apply.

## Stack

- TypeScript
- Hono
- Zod
- Vitest
- Node.js 20+
- Vercel Functions

## Deploy to Vercel

This repository contains a Vercel entrypoint at `api/index.ts` and a `vercel.json` configured for the `api-lip` project name. Import the GitHub repository into Vercel, set the project name to `api-lip`, and deploy.

No API key is required for the currently integrated no-auth providers. If a future provider needs credentials, keep them in Vercel Environment Variables and never commit secrets to Git.

### CLI

```bash
npm install
npm run build
npm test
npx vercel
npx vercel --prod
```

## Local development

```bash
npm install
npm run dev
```

Run tests:

```bash
npm test
```

Type-check:

```bash
npm run typecheck
```

## Architecture

```text
my-rest-api/
├── api/index.ts
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── data.ts
│   ├── utils.ts
│   ├── services/
│   │   └── upstream.ts
│   └── routes/
│       ├── jokes.ts
│       ├── content.ts
│       ├── utility.ts
│       ├── weather.ts
│       └── free-apis.ts
├── tests/api.test.ts
├── .env.example
├── .gitignore
├── package.json
└── vercel.json
```

## Roadmap

1. OpenAPI 3.1 generated specification + Swagger UI
2. API key authentication and per-key rate limits
3. Response caching with safe provider-specific TTLs
4. Provider health checks and circuit breakers
5. Structured upstream error mapping
6. More curated integrations: astronomy, public transport, open data, dictionaries and media metadata
7. PostgreSQL + Drizzle for persistent users/favorites/API keys
8. Redis-compatible cache/rate-limit layer
9. GitHub Actions for typecheck, tests and deployment checks
10. Admin/provider dashboard
11. Usage analytics and observability
12. Versioned provider adapters so external API changes do not break the public API

## Design principles

- Do not build an unrestricted open proxy.
- Validate every user-controlled parameter.
- Set timeouts on upstream requests.
- Never expose secrets in source code.
- Respect provider terms, attribution requirements and rate limits.
- Keep providers behind service/adapter modules.
- Return predictable JSON envelopes.
- Keep routes thin and business logic testable.
- Add new API groups without rewriting the core application.

## License

MIT — suitable for personal projects, learning, and future public API development.
