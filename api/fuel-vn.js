import { getCorsHeaders, isDisallowedOrigin } from './_cors.js';

export const config = { runtime: 'edge' };

const UPSTREAMS = [
  { name: 'webtygia', url: 'https://webtygia.com/gia-xang-dau.html' },
];

const CACHE_TTL_MS = 5 * 60 * 1000;

let cacheEntry = null;
let lastGoodEntry = null;

const PRODUCT_DEFS = [
  { id: 'e5-ron92', name: 'Xăng E5 RON 92', patterns: ['E5\\s*RON\\s*92', 'RON\\s*92'] },
  { id: 'ron95-iii', name: 'Xăng RON 95-III', patterns: ['RON\\s*95(?:-?III)?', 'RON95(?:-?III)?'] },
  {
    id: 'diesel',
    name: 'Dầu DO 0,05S-II',
    patterns: [
      'DO\\s*0[,\\.]?05S(?:-?II)?',
      'Diesel\\s*0[,\\.]?05S(?:-?II)?',
      'Dầu\\s*DO\\s*0[,\\.]?05S(?:-?II)?',
    ],
  },
  { id: 'kerosene', name: 'Dầu hỏa', patterns: ['Dầu\\s*hỏa', 'Kerosene'] },
  { id: 'mazut', name: 'Dầu mazut', patterns: ['Mazut', 'FO\\s*180CST'] },
];

function decodeHtmlEntities(str) {
  return String(str || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function stripHtml(html) {
  return decodeHtmlEntities(
    String(html || '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<\/(tr|p|div|h\d|li|br)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\r/g, '\n')
      .replace(/\t/g, ' ')
      .replace(/[ ]{2,}/g, ' ')
  );
}

function toIntPrice(value) {
  if (!value) return null;
  const digitsOnly = String(value).replace(/[^\d]/g, '');
  if (!digitsOnly) return null;
  const num = Number(digitsOnly);
  if (!Number.isFinite(num)) return null;
  if (num < 7000 || num > 100000) return null;
  return Math.round(num);
}

function extractEffectiveAt(text) {
  const s = String(text || '');
  const m = s.match(/(\d{1,2}[:h]\d{2})?\s*(?:ngày|ngay)?\s*(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4})/i);
  if (!m) return null;
  const rawTime = (m[1] || '15:00').replace('h', ':');
  const rawDate = m[2] || '';
  const parts = rawDate.split(/[\/.-]/).map((x) => Number(x));
  if (parts.length !== 3 || parts.some((x) => !Number.isFinite(x))) return null;
  let [d, mo, y] = parts;
  if (y < 100) y += 2000;
  const [hh, mm] = rawTime.split(':').map((x) => Number(x));
  const dt = new Date(Date.UTC(y, mo - 1, d, (hh || 0) - 7, mm || 0, 0));
  return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
}

function pickPriceNearLabel(text, patterns) {
  for (const p of patterns) {
    const afterLabel = new RegExp(`(?:${p})[^\\d]{0,40}([0-9]{1,3}(?:[\\.,\\s][0-9]{3})+)`, 'i');
    const m1 = text.match(afterLabel);
    const v1 = toIntPrice(m1?.[1]);
    if (v1 != null) return v1;

    const beforeLabel = new RegExp(`([0-9]{1,3}(?:[\\.,\\s][0-9]{3})+)[^\\n]{0,40}(?:${p})`, 'i');
    const m2 = text.match(beforeLabel);
    const v2 = toIntPrice(m2?.[1]);
    if (v2 != null) return v2;
  }
  return null;
}

function parseFuelHtml(html) {
  const text = stripHtml(html);
  const effectiveAt = extractEffectiveAt(text);

  // First pass: parse table-like rows "Product 19.130 19.510"
  const rows = new Map();
  const rowRegex = /([A-Za-zÀ-ỹ0-9,\.\-\s\/]+?)\s+([0-9]{1,3}(?:[.,\s][0-9]{3})+)\s+([0-9]{1,3}(?:[.,\s][0-9]{3})+)/g;
  let match;
  while ((match = rowRegex.exec(text)) !== null) {
    const rawName = String(match[1] || '').replace(/\s+/g, ' ').trim();
    const v1 = toIntPrice(match[2]);
    if (!rawName || v1 == null) continue;
    rows.set(rawName, v1);
  }

  const items = PRODUCT_DEFS
    .map((def) => {
      let price = null;
      for (const [rowName, rowPrice] of rows.entries()) {
        if (def.patterns.some((p) => new RegExp(p, 'i').test(rowName))) {
          price = rowPrice;
          break;
        }
      }
      if (price == null) {
        price = pickPriceNearLabel(text, def.patterns);
      }
      if (price == null) return null;
      return {
        id: def.id,
        name: def.name,
        price,
        unit: 'VND/lít',
      };
    })
    .filter(Boolean);

  return {
    items,
    effectiveAt,
  };
}

async function fetchWithTimeout(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.7,en;q=0.6',
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function withChange(items, previousItems) {
  const previousMap = new Map((previousItems || []).map((item) => [item.id, item.price]));
  return items.map((item) => {
    const prev = previousMap.get(item.id);
    const change = Number.isFinite(prev) ? item.price - prev : 0;
    const changePct = Number.isFinite(prev) && prev !== 0 ? (change / prev) * 100 : 0;
    return { ...item, change, changePct };
  });
}

function buildResponseBody(data, cacheState) {
  return {
    source: data.source,
    cache: cacheState,
    fetchedAt: new Date().toISOString(),
    effectiveAt: data.effectiveAt || null,
    items: data.items,
  };
}

async function fetchFromUpstreams() {
  let lastError = null;
  for (const upstream of UPSTREAMS) {
    try {
      const resp = await fetchWithTimeout(upstream.url, 12000);
      if (!resp.ok) throw new Error(`${upstream.name}: HTTP ${resp.status}`);
      const html = await resp.text();
      const parsed = parseFuelHtml(html);
      if (!parsed.items || parsed.items.length < 2) {
        throw new Error(`${upstream.name}: not enough fuel rows`);
      }
      return {
        source: upstream.name,
        effectiveAt: parsed.effectiveAt,
        items: parsed.items,
      };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('All upstreams failed');
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
    return new Response(JSON.stringify(buildResponseBody(cacheEntry.data, 'hit')), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        ...corsHeaders,
      },
    });
  }

  try {
    const fresh = await fetchFromUpstreams();
    const itemsWithChange = withChange(fresh.items, lastGoodEntry?.data?.items || []);
    const data = { ...fresh, items: itemsWithChange };

    cacheEntry = { data, expiresAt: now + CACHE_TTL_MS };
    lastGoodEntry = { data, savedAt: now };

    return new Response(JSON.stringify(buildResponseBody(data, 'miss')), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        ...corsHeaders,
      },
    });
  } catch (error) {
    if (lastGoodEntry?.data?.items?.length) {
      return new Response(JSON.stringify(buildResponseBody(lastGoodEntry.data, 'stale')), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({
      error: 'Failed to fetch Vietnam fuel prices',
      details: error?.message || String(error),
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
