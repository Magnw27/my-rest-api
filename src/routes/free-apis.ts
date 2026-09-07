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
  { id: 'random-user', category: 'people', auth: false, description: 'Generated fictional user profiles for development.' },
  { id: 'jikan', category: 'anime', auth: false, description: 'Unofficial MyAnimeList data API.' },
  { id: 'nager-date', category: 'calendar', auth: false, description: 'Public holidays and country date information.' },
  { id: 'sunrise-sunset', category: 'astronomy', auth: false, description: 'Sunrise and sunset times by coordinates.' },
  { id: 'mediawiki', category: 'knowledge', auth: false, description: 'Wikipedia/MediaWiki search and page data.' },
  { id: 'github-public', category: 'developer', auth: false, description: 'Public GitHub repository metadata; anonymous calls are rate limited.' },
  { id: 'quotable', category: 'content', auth: false, description: 'Random quotations and authors.' }
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

freeApisRoute.get('/dog/random', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://dog.ceo/api/breeds/image/random'), 'dog-ceo')));
freeApisRoute.get('/cat/fact', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://catfact.ninja/fact'), 'cat-fact')));
freeApisRoute.get('/meal/random', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://www.themealdb.com/api/json/v1/1/random.php'), 'the-meal-db')));

freeApisRoute.get('/book/search', async (c) => {
  const q = z.string().min(1).max(120).parse(c.req.query('q'));
  return c.json(apiResult(await upstreamJson<unknown>(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10`), 'open-library', { query: q }));
});

freeApisRoute.get('/fx', async (c) => {
  const from = (c.req.query('from') ?? 'EUR').toUpperCase();
  const to = (c.req.query('to') ?? 'USD').toUpperCase();
  return c.json(apiResult(await upstreamJson<unknown>(`https://api.frankfurter.app/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`), 'frankfurter'));
});

freeApisRoute.get('/words', async (c) => {
  const word = z.string().min(1).max(80).parse(c.req.query('q'));
  return c.json(apiResult(await upstreamJson<unknown>(`https://api.datamuse.com/words?ml=${encodeURIComponent(word)}&max=20`), 'datamuse', { query: word }));
});

freeApisRoute.get('/ip', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://api64.ipify.org?format=json'), 'ipify')));

freeApisRoute.get('/universities', async (c) => {
  const name = c.req.query('name')?.trim() ?? '';
  const country = c.req.query('country')?.trim() ?? '';
  if (!name && !country) return c.json({ success: false, error: { code: 'MISSING_QUERY', message: 'Provide name or country.' } }, 400);
  const params = new URLSearchParams();
  if (name) params.set('name', name);
  if (country) params.set('country', country);
  return c.json(apiResult(await upstreamJson<unknown>(`https://universities.hipolabs.com/search?${params}`), 'universities'));
});

freeApisRoute.get('/trivia', async (c) => {
  const raw = Number(c.req.query('amount') ?? 10);
  const amount = Number.isFinite(raw) ? Math.min(Math.max(Math.floor(raw), 1), 50) : 10;
  return c.json(apiResult(await upstreamJson<unknown>(`https://opentdb.com/api.php?amount=${amount}&type=multiple`), 'opentdb'));
});

freeApisRoute.get('/testing/posts', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://jsonplaceholder.typicode.com/posts?_limit=10'), 'jsonplaceholder')));
freeApisRoute.get('/testing/products', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://dummyjson.com/products?limit=10'), 'dummyjson')));
freeApisRoute.get('/random-user', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://randomuser.me/api/'), 'random-user')));

freeApisRoute.get('/anime/search', async (c) => {
  const q = z.string().min(1).max(80).parse(c.req.query('q'));
  return c.json(apiResult(await upstreamJson<unknown>(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=10`), 'jikan', { query: q }));
});

freeApisRoute.get('/holidays/:country/:year', async (c) => {
  const country = c.req.param('country').toUpperCase();
  const year = Number(c.req.param('year'));
  if (!/^[A-Z]{2}$/.test(country) || !Number.isInteger(year) || year < 2000 || year > 2100) {
    return c.json({ success: false, error: { code: 'INVALID_DATE_QUERY', message: 'Use an ISO country code and a year between 2000 and 2100.' } }, 400);
  }
  return c.json(apiResult(await upstreamJson<unknown>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`), 'nager-date'));
});

freeApisRoute.get('/sun', async (c) => {
  const lat = Number(c.req.query('lat'));
  const lon = Number(c.req.query('lon'));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return c.json({ success: false, error: { code: 'INVALID_COORDINATES', message: 'Provide valid lat and lon coordinates.' } }, 400);
  }
  return c.json(apiResult(await upstreamJson<unknown>(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`), 'sunrise-sunset'));
});

freeApisRoute.get('/wiki/search', async (c) => {
  const q = z.string().min(1).max(120).parse(c.req.query('q'));
  const params = new URLSearchParams({ action: 'query', list: 'search', srsearch: q, format: 'json', origin: '*' });
  return c.json(apiResult(await upstreamJson<unknown>(`https://en.wikipedia.org/w/api.php?${params}`), 'mediawiki', { query: q }));
});

freeApisRoute.get('/github/repo/:owner/:repo', async (c) => {
  const owner = encodeURIComponent(c.req.param('owner'));
  const repo = encodeURIComponent(c.req.param('repo'));
  return c.json(apiResult(await upstreamJson<unknown>(`https://api.github.com/repos/${owner}/${repo}`, { headers: { 'User-Agent': 'my-rest-api' } }), 'github-public'));
});

freeApisRoute.get('/quote', async (c) => c.json(apiResult(await upstreamJson<unknown>('https://api.quotable.io/random'), 'quotable')));
