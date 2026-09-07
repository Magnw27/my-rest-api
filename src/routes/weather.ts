import { Hono } from 'hono';
import { z } from 'zod';
import { weatherCode } from '../utils.js';

export const weatherRoute = new Hono();

const querySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  forecast_days: z.coerce.number().int().min(1).max(16).default(3)
});

weatherRoute.get('/', async (c) => {
  const parsed = querySchema.safeParse({ lat: c.req.query('lat'), lon: c.req.query('lon'), forecast_days: c.req.query('forecast_days') });
  if (!parsed.success) return c.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Valid lat and lon query parameters are required.', details: parsed.error.issues } }, 400);
  const { lat, lon, forecast_days } = parsed.data;
  const params = new URLSearchParams({ latitude: String(lat), longitude: String(lon), current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m', hourly: 'temperature_2m,precipitation_probability,weather_code', daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset', forecast_days: String(forecast_days), timezone: 'auto' });
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Weather provider returned ${response.status}`);
    const data = await response.json() as any;
    return c.json({ success: true, source: 'Open-Meteo', location: { latitude: lat, longitude: lon, timezone: data.timezone }, current: { ...data.current, weather_description: weatherCode(data.current.weather_code) }, daily: data.daily });
  } catch {
    return c.json({ success: false, error: { code: 'UPSTREAM_ERROR', message: 'Weather provider is temporarily unavailable.' } }, 503);
  }
});
