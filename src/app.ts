import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { requestId } from './utils.js';
import { jokesRoute } from './routes/jokes.js';
import { contentRoute } from './routes/content.js';
import { utilityRoute } from './routes/utility.js';
import { weatherRoute } from './routes/weather.js';
import { freeApisRoute } from './routes/free-apis.js';
import { sandboxHtml } from './sandbox.js';

export const app = new Hono();

app.use('*', logger());
app.use('*', cors());
app.use('*', async (c, next) => {
  const id = requestId();
  c.header('X-Request-ID', id);
  c.header('X-API-Version', '1');
  await next();
});

app.get('/', (c) => c.html(sandboxHtml));
app.get('/sandbox', (c) => c.html(sandboxHtml));

app.get('/health', (c) => c.json({ success: true, status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() }));

app.get('/docs', (c) => c.json({
  success: true,
  openapi: '3.0.3',
  message: 'API documentation endpoint.',
  sandbox: '/',
  base: '/api/v1'
}));

app.route('/api/v1/jokes', jokesRoute);
app.route('/api/v1/content', contentRoute);
app.route('/api/v1/utility', utilityRoute);
app.route('/api/v1/weather', weatherRoute);
app.route('/api/v1/free', freeApisRoute);

app.get('/api', (c) => c.json({
  success: true,
  version: 'v1',
  groups: ['jokes', 'content', 'utility', 'weather', 'free'],
  sandbox: '/',
  examples: [
    '/api/v1/jokes/random',
    '/api/v1/content/quote',
    '/api/v1/utility/uuid',
    '/api/v1/weather?lat=-7.8166&lon=112.0116',
    '/api/v1/free/catalog',
    '/api/v1/free/country/ID',
    '/api/v1/free/pokemon/pikachu',
    '/api/v1/free/dog/random',
    '/api/v1/free/meal/random',
    '/api/v1/free/book/search?q=javascript',
    '/api/v1/free/fx?from=USD&to=IDR',
    '/api/v1/free/trivia?amount=10'
  ]
}));

app.notFound((c) => c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Endpoint not found.' } }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } }, 500);
});
