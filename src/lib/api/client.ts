const API_URLS = [
  'https://medusa-backend-1081502718638.us-central1.run.app/api/',
  'https://medusa-backend-rihe6bbviq-uc.a.run.app/api/'
];

export async function apiFetch(path: string, init?: RequestInit) {
  // Use environment variable if provided, otherwise use default URLs
  const envBase = process.env.NEXT_PUBLIC_API_BASE;
  const baseUrls = envBase ? [envBase] : API_URLS;
  
  let lastError: Error | null = null;
  
  // Try each URL until one works
  for (const base of baseUrls) {
    try {
      const url = base.endsWith('/') ? `${base.replace(/\/$/, '')}${path}` : `${base}${path}`;
      const res = await fetch(url, {
        ...init,
        headers: {
          Accept: 'application/json',
          ...(init?.headers || {})
        }
      });
      
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Request failed ${res.status}: ${text.slice(0,200)}`);
      }
      
      return res.json();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Failed to fetch from ${base}: ${error}`);
      continue;
    }
  }
  
  throw lastError || new Error('All API endpoints failed');
}
