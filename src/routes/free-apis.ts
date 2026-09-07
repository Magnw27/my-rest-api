import { Hono } from 'hono';
import { z } from 'zod';
import { apiResult, upstreamJson } from '../services/upstream.js';

export const freeApisRoute = new Hono();

const catalog = [
  { id: 'open-meteo', category: 'weather', auth: false, description: 'Weather forecast, historical weather, air quality and geocoding.' },
  { id: 'rest-countries', category: 'geo', auth: false, description: 'Country information, flags, currencies and regional data.' },
  { id: 'pokeapi', category: 'games', auth: false, description: 'Pokémon data and species information.' },
  { id: 'dog-ceo', category: 'animals', auth: false, description: 'Random dog images and breed data.' },
  { id: 'cat-fact', category: 'animals', auth: false, description: 'Random cat facts.' },
  { id: 'the-meal-db', category: 'food', auth: false, description: 'Recipes, meals and ingredients.' },
  { id: 'open-library', category: 'books', auth: false, description: 'Books, authors, editions and covers.' },
  { id: 'frankfurter', category: 'finance', auth: false, description: 'Foreign-exchange reference rates from the ECB.' },
  { id: 'datamuse', category: 'words', auth: false, description: 'Word meanings, synonyms, sounds and related terms.' },
  { id: 'ipify', category: 'network', auth: false, description: 'Public IP address lookup.' },
  { id: 'universities', category: 'education', auth: false, description: 'University search data.' },
  { id: 'opentdb', category: 'games', auth: false, description: 'Trivia questions.' },
  { id: 'jsonplaceholder', category: 'testing', auth: false, description: 'Fake REST resources for testing and prototyping.' },
  { id: 'dummyjson', category: 'testing', auth: false, description: 'Sample products, users, posts and other JSON datasets.' },
  { id: 'random-user', category: 'people', auth: false, description: 'Generated fictional user profiles for development.' }
] as const;

freeApisRoute.get('/catalog', (c) => c.json(apiResult(catalog, 'my-rest-api')));

freeApisRoute.get('/categories', (c) => {
  const categories = [...new Set(catalog.map((item) => item.category))].sort();
  return c.json(apiResult(categories, 'my-rest-api'));
});

freeApisRoute.get('/search', (c) => {
  const q = c.req.query('q')?.trim().toLowerCase() ?? '';
  const results = q ? catalog.filter((item) => `${item.id} ${item.category} ${item.description}`.toLowerCase().includes(q)) : catalog;
  return c.json(apiResult(results, 'my-rest-api', { query: q }));
});

freeApisRoute.get('/country/:code', async (c) => {
  const code = c.req.param('code').trim();
  if (!/^[a-zA-Z]{2,3}$/.test(code)) return c.json({ success: false, error: { code: 'INVALID_COUNTRY_CODE', message: 'Country code must contain 2 or 3 letters.' } }, 400);
  const data = await upstreamJson<unknown>(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}`);
  return c.json(apiResult(data, 'rest-countries'));
});

freeApisRoute.get('/pokemon/:name', async (c) => {
  const name = encodeURIComponent(c.req.param('name').trim().toLowerCase());
  const data = await upstreamJson<unknown>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return c.json(apiResult(data, 'pokeapi'));
});

freeApisRoute.get('/dog/random', async (c) => {
  const data = await upstreamJson<unknown>('https://dog.ceo/api/breeds/image/random');
  return c.json(apiResult(data, 'dog-ceo'));
});

freeApisRoute.get('/cat/fact', async (c) => {
  const data = await upstreamJson<unknown>('https://catfact.ninja/fact');
  return c.json(apiResult(data, 'cat-fact'));
});

freeApisRoute.get('/meal/random', async (c) => {
  const data = await upstreamJson<unknown>('https://www.themealdb.com/api/json/v1/1/random.php');
  return c.json(apiResult(data, 'the-meal-db'));
});

freeApisRoute.get('/book/search', async (c) => {
  const q = z.string().min(1).max(120).parse(c.req.query('q'));
  const data = await upstreamJson<unknown>(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10`);
  return c.json(apiResult(data, 'open-library', { query: q }));
});

freeApisRoute.get('/fx', async (c) => {
  const from = (c.req.query('from') ?? 'EUR').toUpperCase();
  const to = (c.req.query('to') ?? 'USD').toUpperCase();
  const data = await upstreamJson<unknown>(`https://api.frankfurter.app/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
  return c.json(apiResult(data, 'frankfurter'));
});

freeApisRoute.get('/words', async (c) => {
  const word = z.string().min(1).max(80).parse(c.req.query('q'));
  const data = await upstreamJson<unknown>(`https://api.datamuse.com/words?ml=${encodeURIComponent(word)}&max=20`);
  return c.json(apiResult(data, 'datamuse', { query: word }));
});

freeApisRoute.get('/ip', async (c) => {
  const data = await upstreamJson<unknown>('https://api64.ipify.org?format=json');
  return c.json(apiResult(data, 'ipify'));
});

freeApisRoute.get('/universities', async (c) => {
  const name = c.req.query('name')?.trim() ?? '';
  const country = c.req.query('country')?.trim() ?? '';
  if (!name && !country) return c.json({ success: false, error: { code: 'MISSING_QUERY', message: 'Provide name or country.' } }, 400);
  const params = new URLSearchParams();
  if (name) params.set('name', name);
  if (country) params.set('country', country);
  const data = await upstreamJson<unknown>(`http://universities.hipolabs.com/search?${params}`);
  return c.json(apiResult(data, 'universities'));
});

freeApisRoute.get('/trivia', async (c) => {
  const amount = Math.min(Math.max(Number(c.req.query('amount') ?? 10), 1), 50);
  const data = await upstreamJson<unknown>(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
  return c.json(apiResult(data, 'opentdb'));
});

freeApisRoute.get('/testing/posts', async (c) => {
  const data = await upstreamJson<unknown>('https://jsonplaceholder.typicode.com/posts?_limit=10');
  return c.json(apiResult(data, 'jsonplaceholder'));
});

freeApisRoute.get('/testing/products', async (c) => {
  const data = await upstreamJson<unknown>('https://dummyjson.com/products?limit=10');
  return c.json(apiResult(data, 'dummyjson'));
});

freeApisRoute.get('/random-user', async (c) => {
  const data = await upstreamJson<unknown>('https://randomuser.me/api/');
  return c.json(apiResult(data, 'random-user'));
});
