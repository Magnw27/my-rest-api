export async function upstreamJson<T>(url: string, init: RequestInit = {}, timeoutMs = 8000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(init.headers ?? {})
      }
    });

    if (!response.ok) {
      throw new Error(`Upstream request failed with HTTP ${response.status}`);
    }

    return await response.json() as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function apiResult<T>(data: T, source: string, extra: Record<string, unknown> = {}) {
  return {
    success: true,
    source,
    timestamp: new Date().toISOString(),
    data,
    ...extra
  };
}
