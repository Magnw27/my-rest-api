import { Hono } from 'hono';
import { jokes } from '../data.js';
import { parseLimit, pick } from '../utils.js';

export const jokesRoute = new Hono();

jokesRoute.get('/', (c) => {
  const type = c.req.query('type');
  const limit = parseLimit(c.req.query('limit'));
  const filtered = type ? jokes.filter(j => j.type === type) : jokes;
  return c.json({ success: true, count: Math.min(filtered.length, limit), data: filtered.slice(0, limit) });
});

jokesRoute.get('/random', (c) => {
  const type = c.req.query('type');
  const filtered = type ? jokes.filter(j => j.type === type) : jokes;
  if (!filtered.length) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'No jokes match that type.' } }, 404);
  return c.json({ success: true, data: pick(filtered) });
});

jokesRoute.get('/:id', (c) => {
  const joke = jokes.find(j => j.id === Number(c.req.param('id')));
  if (!joke) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Joke not found.' } }, 404);
  return c.json({ success: true, data: joke });
});
