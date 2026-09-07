import { randomUUID } from 'node:crypto';

export const pick = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];

export const parseLimit = (value: string | undefined, fallback = 10, max = 50) => {
  const n = Number(value ?? fallback);
  if (!Number.isInteger(n) || n < 1) return fallback;
  return Math.min(n, max);
};

export const requestId = () => randomUUID();

export const jsonError = (message: string, code = 'BAD_REQUEST', details?: unknown) => ({
  success: false,
  error: { code, message, ...(details === undefined ? {} : { details }) }
});

export const weatherCode = (code: number) => {
  if (code === 0) return 'Clear sky';
  if ([1, 2, 3].includes(code)) return 'Partly cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain';
  if ([71, 73, 75, 77].includes(code)) return 'Snow';
  if ([80, 81, 82].includes(code)) return 'Rain showers';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Unknown';
};
