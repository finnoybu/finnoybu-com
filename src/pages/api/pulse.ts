import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { PROJECTS } from '~/data/projects';

// "Signs of life" for the project ring. One request fans out to GitHub (last
// push per project), a quick up-check of each live site, and AFP's RSS feed,
// then the result is cached at the edge for an hour so visitors never hit
// GitHub themselves.
//
// Only good news leaves this route: a site that responds gets `live`, a repo
// pushed within ACTIVE_DAYS gets `days`, a feed gets its newest item. Anything
// stale, failing, or private-without-a-token is simply omitted, so a quiet
// project shows nothing rather than "updated 7 months ago".
//
// GITHUB_PULSE_TOKEN (optional Worker secret): a fine-grained, read-only
// token. Without it the private repos (memoir, trilogy, Sturrock's) 404 and
// stay quiet, and public lookups share GitHub's 60/hr anonymous limit, which
// the hourly cache keeps us far under.

export const prerender = false;

const CACHE_SECONDS = 3600;
const ACTIVE_DAYS = 30;
const DAY_MS = 86_400_000;
const UA = 'finnoybu.com-pulse';
const TIMEOUT_MS = 6000;

type Pulse = {
  live?: true;
  days?: number;
  latest?: { title: string; url: string };
};

const timeout = () => AbortSignal.timeout(TIMEOUT_MS);

async function lastPush(spec: string, token?: string): Promise<number | null> {
  const path = spec.startsWith('org:')
    ? `/orgs/${spec.slice(4)}/repos?sort=pushed&direction=desc&per_page=1&type=all`
    : `/repos/${spec}`;
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        'user-agent': UA,
        accept: 'application/vnd.github+json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      signal: timeout(),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { pushed_at?: string } | { pushed_at?: string }[];
    const repo = Array.isArray(body) ? body[0] : body;
    const t = Date.parse(repo?.pushed_at ?? '');
    return Number.isFinite(t) ? t : null;
  } catch {
    return null;
  }
}

async function isLive(url: string): Promise<boolean> {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        headers: { 'user-agent': UA },
        signal: timeout(),
      });
      res.body?.cancel();
      if (res.ok) return true;
    } catch {
      /* fall through to GET, then give up */
    }
  }
  return false;
}

const decode = (s: string) =>
  s
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();

async function latestItem(feed: string): Promise<Pulse['latest'] | null> {
  try {
    const res = await fetch(feed, { headers: { 'user-agent': UA }, signal: timeout() });
    if (!res.ok) return null;
    const item = (await res.text()).match(/<item[\s>][\s\S]*?<\/item>/)?.[0];
    const title = item?.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const link = item?.match(/<link>([\s\S]*?)<\/link>/)?.[1];
    if (!title || !link) return null;
    const url = decode(link);
    return url.startsWith('https://') ? { title: decode(title), url } : null;
  } catch {
    return null;
  }
}

const isSite = (url?: string) =>
  !!url && new URL(url).hostname.replace(/^www\./, '') !== 'github.com';

async function buildPulse(): Promise<Record<string, Pulse>> {
  const token = (env as Partial<Env> | undefined)?.GITHUB_PULSE_TOKEN || undefined;
  const now = Date.now();
  const entries = await Promise.all(
    PROJECTS.map(async (p) => {
      const [live, pushed, latest] = await Promise.all([
        isSite(p.url) ? isLive(p.url!) : false,
        p.pulse?.repo ? lastPush(p.pulse.repo, token) : null,
        p.pulse?.feed ? latestItem(p.pulse.feed) : null,
      ]);
      const out: Pulse = {};
      if (live) out.live = true;
      if (pushed !== null) {
        const days = Math.max(0, Math.floor((now - pushed) / DAY_MS));
        if (days <= ACTIVE_DAYS) out.days = days;
      }
      if (latest) out.latest = latest;
      return [p.id, out] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export const GET: APIRoute = async ({ request }) => {
  const cache = (globalThis as { caches?: CacheStorage & { default?: Cache } })
    .caches?.default;
  const key = new Request(new URL('/api/pulse', request.url).toString());

  const hit = await cache?.match(key).catch(() => undefined);
  if (hit) return hit;

  const body = JSON.stringify({
    generatedAt: new Date().toISOString(),
    projects: await buildPulse(),
  });
  const res = new Response(body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': `public, max-age=${CACHE_SECONDS}`,
    },
  });
  await cache?.put(key, res.clone()).catch(() => undefined);
  return res;
};
