import { Hono } from 'hono';
import { randomUUID, createHash } from 'node:crypto';
import { colors, httpStatus } from '../data.js';
import { pick } from '../utils.js';

export const utilityRoute = new Hono();

utilityRoute.get('/uuid', (c) => c.json({ success: true, data: { uuid: randomUUID() } }));
utilityRoute.get('/color', (c) => c.json({ success: true, data: { hex: pick(colors) } }));
utilityRoute.get('/status-codes', (c) => c.json({ success: true, data: httpStatus.map(([code, name]) => ({ code, name })) }));
utilityRoute.get('/hash', async (c) => {
  const text = c.req.query('text');
  if (!text) return c.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Query parameter "text" is required.' } }, 400);
  return c.json({ success: true, data: { algorithm: 'sha256', hash: createHash('sha256').update(text).digest('hex') } });
});
utilityRoute.get('/base64/encode', (c) => {
  const text = c.req.query('text');
  if (text === undefined) return c.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Query parameter "text" is required.' } }, 400);
  return c.json({ success: true, data: { encoded: Buffer.from(text, 'utf8').toString('base64') } });
});
utilityRoute.get('/base64/decode', (c) => {
  const text = c.req.query('text');
  if (text === undefined) return c.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Query parameter "text" is required.' } }, 400);
  try { return c.json({ success: true, data: { decoded: Buffer.from(text, 'base64').toString('utf8') } }); }
  catch { return c.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Invalid base64 input.' } }, 400); }
});
