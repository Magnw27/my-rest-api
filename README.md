# My REST API

A modular, extensible REST API built with **TypeScript + Hono**, designed to grow into a large public API platform and deploy cleanly to Vercel.

## Production

The intended Vercel project name is **`api-lip`**, so after importing this repository into Vercel, its default production URL can be:

`https://api-lip.vercel.app`

Vercel assigns the `vercel.app` production domain from the project name; the exact URL is confirmed by Vercel after the project is created/deployed. citeturn0search8

## Features

- Jokes API with categories, random selection and IDs
- Live weather API using Open-Meteo, with forecast support
- Quotes and facts API
- Developer utilities: UUID, SHA-256 hash, Base64, colors and HTTP status codes
- Consistent JSON response format
- CORS, request IDs and centralized error handling
- Zod validation for external input
- Unit/integration tests with Vitest
- Vercel serverless entrypoint
- Clean route/data/util separation for future database and authentication layers

## Stack

- TypeScript
- Hono
- Zod
- Vitest
- Node.js 20+
- Vercel Functions

## API

### Production

`https://api-lip.vercel.app`

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

## Deploy to Vercel

This repository already contains a Vercel entrypoint at `api/index.ts` and a `vercel.json` configured for the `api-lip` project name. Vercel officially supports Hono deployments and can deploy from Git or the Vercel CLI. citeturn0search0turn0search1

### Recommended: GitHub import

1. Open Vercel and choose **New Project**.
2. Import `Magnw27/my-rest-api`.
3. Set the project name to **`api-lip`** if Vercel does not pick it automatically.
4. Keep the repository root as the project root.
5. Deploy.
6. Vercel will provide the production `vercel.app` URL.

No API key is required for the current weather implementation. If future modules need secrets, add them in **Project Settings → Environment Variables** rather than committing them to Git. Vercel requires a redeploy for changed environment variables to take effect. citeturn0search3

### CLI

```bash
npm install
npm run build
npm test
npx vercel
npx vercel --prod
```

Vercel documents `vercel --prod` as the production deployment command. citeturn0search14

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
├── api/index.ts          # Vercel serverless entrypoint
├── src/
│   ├── app.ts             # App + middleware + route mounting
│   ├── server.ts          # Local Node server
│   ├── data.ts            # Built-in datasets
│   ├── utils.ts           # Shared helpers
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

The project is intentionally structured for expansion:

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
