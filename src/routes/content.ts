import { Hono } from 'hono';
import { facts, quotes } from '../data.js';
import { parseLimit, pick } from '../utils.js';

export const contentRoute = new Hono();

contentRoute.get('/quote', (c) => c.json({ success: true, data: pick(quotes) }));
contentRoute.get('/quotes', (c) => c.json({ success: true, data: quotes.slice(0, parseLimit(c.req.query('limit'))) }));
contentRoute.get('/fact', (c) => {
  const category = c.req.query('category');
  const list = category ? facts.filter(f => f.category === category) : facts;
  if (!list.length) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'No facts match that category.' } }, 404);
  return c.json({ success: true, data: pick(list) });
});
contentRoute.get('/facts', (c) => {
  const category = c.req.query('category');
  const list = category ? facts.filter(f => f.category === category) : facts;
  return c.json({ success: true, data: list.slice(0, parseLimit(c.req.query('limit'))) });
});
