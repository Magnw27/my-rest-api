# My REST API

A modular, extensible REST API built with **TypeScript + Hono**, designed to grow into a large public API platform.

## Features

- Jokes API with categories, random selection and IDs
- Live weather API using Open-Meteo, with forecast support
- Quotes and facts API
- Developer utilities: UUID, SHA-256 hash, Base64, colors and HTTP status codes
- Consistent JSON response format
- CORS, request IDs and centralized error handling
- Zod validation for external input
- Unit/integration tests with Vitest
- Vercel-ready serverless entrypoint
- Clean route/data/util separation for future database and authentication layers

## Stack

- TypeScript
- Hono
- Zod
- Vitest
- Node.js 20+
- Vercel

## API

Base URL locally: `http://localhost:3000`

### System

- `GET /` — API metadata
- `GET /health` — health status
- `GET /api` — endpoint groups
- `GET /docs` — documentation metadata

### Jokes

- `GET /api/v1/jokes`
- `GET /api/v1/jokes?type=programming&limit=5`
- `GET /api/v1/jokes/random`
- `GET /api/v1/jokes/random?type=general`
- `GET /api/v1/jokes/:id`

### Content

- `GET /api/v1/content/quote`
- `GET /api/v1/content/quotes?limit=10`
- `GET /api/v1/content/fact`
- `GET /api/v1/content/fact?category=science`
- `GET /api/v1/content/facts?category=space&limit=10`

### Utilities

- `GET /api/v1/utility/uuid`
- `GET /api/v1/utility/color`
- `GET /api/v1/utility/status-codes`
- `GET /api/v1/utility/hash?text=hello`
- `GET /api/v1/utility/base64/encode?text=hello`
- `GET /api/v1/utility/base64/decode?text=aGVsbG8=`

### Weather

`GET /api/v1/weather?lat=-7.8166&lon=112.0116&forecast_days=3`

Weather is fetched live from Open-Meteo. No API key is required for the current implementation.

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
├── api/index.ts          # Vercel entrypoint
├── src/
│   ├── app.ts             # App + middleware + route mounting
│   ├── server.ts          # Local Node server
│   ├── data.ts            # Built-in datasets
│   ├── utils.ts            # Shared helpers
│   └── routes/
│       ├── jokes.ts
│       ├── content.ts
│       ├── utility.ts
│       └── weather.ts
├── tests/api.test.ts
├── .env.example
├── .gitignore
├── package.json
└── vercel.json
```

## Roadmap

The project is intentionally structured for expansion. Recommended next modules:

1. `auth` — API keys, JWT and permissions
2. `users` — developer accounts and profiles
3. `favorites` — saved jokes/quotes/facts
4. `search` — unified content search
5. `images` — image metadata and random image endpoints
6. `animals` — cat/dog/random animal APIs
7. `games` — trivia, dice, coin flip and random generators
8. `geo` — countries, cities, timezones and coordinates
9. `finance` — currencies, exchange-rate adapters and market snapshots
10. `system` — metrics, versioning, rate limits and diagnostics
11. Database layer — PostgreSQL + Drizzle when persistent data is needed
12. OpenAPI/Swagger — generated interactive API documentation
13. Redis/cache — upstream response caching and rate limiting
14. GitHub Actions — lint, test, typecheck and deployment checks

## Design principles

- Keep providers behind service modules.
- Validate every user-controlled parameter.
- Never expose secrets in source code.
- Return predictable JSON envelopes.
- Keep routes thin and business logic testable.
- Add new API groups without rewriting the core application.

## License

MIT — suitable for personal projects, learning, and future public API development.
