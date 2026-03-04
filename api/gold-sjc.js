import { getCorsHeaders, isDisallowedOrigin } from './_cors.js';

export const config = { runtime: 'edge' };

const API_URL = 'https://www.vang.today/api/prices?type=SJL1L10&days=30';
const CACHE_TTL_MS = 5 * 60 * 1000;

let cacheEntry = null;
let lastGoodEntry = null;

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseTimestamp(value) {
  if (!value || typeof value !== 'string') return null;
  const dt = new Date(value);
  if (!Number.isNaN(dt.getTime())) return dt.getTime();
  const normalized = value.replace(' ', 'T');
  const dt2 = new Date(normalized);
  return Number.isNaN(dt2.getTime()) ? null : dt2.getTime();
}

function normalizeSeries(payload) {
  const symbol = 'SJL1L10';
  const history = Array.isArray(payload?.history) ? payload.history : [];
  const parsedFromHistory = history
    .map((item) => {
      const price = item?.prices?.[symbol];
      const buy = toNumber(price?.buy);
      const sell = toNumber(price?.sell);
      const date = typeof item?.date === 'string' ? `${item.date}T12:00:00+07:00` : null;
      const ts = date ? parseTimestamp(date) : null;
      if (buy == null || sell == null || ts == null) return null;
      const low = Math.min(buy, sell);
      const high = Math.max(buy, sell);
      return { ts, open: buy, close: sell, low, high };
    })
    .filter(Boolean)
    .sort((a, b) => a.ts - b.ts);

  if (parsedFromHistory.length > 0) return parsedFromHistory;

  const currentBuy = toNumber(payload?.buy);
  const currentSell = toNumber(payload?.sell);
  const currentTs = toNumber(payload?.timestamp) != null ? Number(payload.timestamp) * 1000 : null;
  if (currentBuy == null || currentSell == null || currentTs == null) return [];
  return [{
    ts: currentTs,
    open: currentBuy,
    close: currentSell,
    low: Math.min(currentBuy, currentSell),
    high: Math.max(currentBuy, currentSell),
  }];
}

function buildResponseBody(series, cacheState) {
  const latest = series[series.length - 1] || null;
  const previous = series.length > 1 ? series[series.length - 2] : null;
  const change = latest && previous ? latest.close - previous.close : 0;
  const changePct = latest && previous && previous.close !== 0
    ? (change / previous.close) * 100
    : 0;

  return {
    source: 'vang.today',
    symbol: 'SJL1L10',
    cache: cacheState,
    fetchedAt: new Date().toISOString(),
    current: latest
      ? {
        open: latest.open,
        close: latest.close,
        low: latest.low,
        high: latest.high,
        ts: new Date(latest.ts).toISOString(),
        change,
        changePct,
      }
      : null,
    series,
  };
}

async function fetchWithTimeout(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req) {
  const corsHeaders = getCorsHeaders(req, 'GET, OPTIONS');

  if (isDisallowedOrigin(req)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const now = Date.now();
  if (cacheEntry && cacheEntry.expiresAt > now) {
    return new Response(JSON.stringify(buildResponseBody(cacheEntry.series, 'hit')), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        ...corsHeaders,
      },
    });
  }

  try {
    const resp = await fetchWithTimeout(API_URL, 12000);
    if (!resp.ok) throw new Error(`Upstream HTTP ${resp.status}`);
    const payload = await resp.json();
    const series = normalizeSeries(payload);
    if (series.length === 0) throw new Error('Empty series');

    cacheEntry = { series, expiresAt: now + CACHE_TTL_MS };
    lastGoodEntry = { series, savedAt: now };

    return new Response(JSON.stringify(buildResponseBody(series, 'miss')), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        ...corsHeaders,
      },
    });
  } catch (error) {
    if (lastGoodEntry?.series?.length) {
      return new Response(JSON.stringify(buildResponseBody(lastGoodEntry.series, 'stale')), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({
      error: 'Failed to fetch SJC gold data',
      details: error?.message || String(error),
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
