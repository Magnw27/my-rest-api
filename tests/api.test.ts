import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';

describe('My REST API', () => {
  it('returns API metadata', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it('returns a random joke', async () => {
    const res = await app.request('/api/v1/jokes/random');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data).toHaveProperty('setup');
    expect(body.data).toHaveProperty('punchline');
  });

  it('creates a UUID', async () => {
    const res = await app.request('/api/v1/utility/uuid');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.uuid).toMatch(/^[0-9a-f-]{36}$/);
  });
});
