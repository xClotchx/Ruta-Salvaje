import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  lugar: z.string().trim().min(3, 'Escribe el nombre del lugar.').max(120),
  mensaje: z.string().trim().max(500).optional().default(''),
  nombre: z.string().trim().max(60).optional().default(''),
  website: z.string().optional().default(''), // honeypot
});

// Límite por IP en memoria. En Vercel cada instancia tiene su propio contador,
// así que frena abuso casual; para un límite estricto usa Upstash/Vercel KV.
const hits = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > MAX_HITS;
}

const json = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  // Solo desde nuestro propio sitio
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.get('host')) return json({ error: 'Origen no permitido.' }, 403);
    } catch {
      return json({ error: 'Origen no permitido.' }, 403);
    }
  }
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'Formato no válido.' }, 415);
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconocida';
  if (limited(ip)) return json({ error: 'Demasiados envíos. Prueba de nuevo en unos minutos.' }, 429);

  const raw = await req.text();
  if (raw.length > 4096) return json({ error: 'El mensaje es demasiado largo.' }, 413);

  let parsed;
  try {
    parsed = schema.safeParse(JSON.parse(raw));
  } catch {
    return json({ error: 'Datos no válidos.' }, 400);
  }
  if (!parsed.success) return json({ error: parsed.error.issues[0]?.message ?? 'Datos no válidos.' }, 400);

  const { website, ...row } = parsed.data;
  if (website) return json({ ok: true }); // bot: respondemos "ok" sin guardar nada

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // solo servidor; nunca NEXT_PUBLIC_
  if (!url || !key) return json({ error: 'El formulario aún no está disponible.' }, 503);

  try {
    const res = await fetch(`${url}/rest/v1/sugerencias`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return json({ ok: true });
  } catch {
    return json({ error: 'No se pudo guardar. Inténtalo de nuevo.' }, 502);
  }
}
