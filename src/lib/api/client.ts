export async function apiFetch(path: string, init?: RequestInit) {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  if (!base) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE env var');
  }
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
}
